import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ANALYSIS_PROMPTS } from '../config/prompts';
import BaZiForm from '../components/forms/BaZiForm';
import { calculationService } from '../services/localStorage';
import { useAuthStore } from '../stores/authStore';
import { chatService } from '../services/api';
import { historyService } from '../services/historyService';
import AnalysisHistoryList from '../components/analysis/AnalysisHistoryList';
import type { AnalysisResult, AnalysisHistory } from '../types/analysis';
import type { ChatMessage } from '../types/chat';

const BaZi: React.FC = () => {
  const { user } = useAuthStore();
  const [currentHistory, setCurrentHistory] = useState<AnalysisHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [histories, setHistories] = useState<AnalysisHistory[]>([]);

  // 在组件加载时获取历史记录
  useEffect(() => {
    const savedHistories = historyService.getHistory();
    setHistories(savedHistories);
  }, []);

  // 处理历史记录选择
  const handleHistorySelect = (history: AnalysisHistory) => {
    setCurrentHistory(history);
    setMessages(history.messages);
    setStreamContent('');
  };

  const handleAnalysis = async (formData: any) => {
    setIsAnalyzing(true);
    setStreamContent('');

    const systemPrompt = ANALYSIS_PROMPTS.bazi.system;
    const userPrompt = ANALYSIS_PROMPTS.bazi.questionPrompt
      .replace('{birthYear}', formData.birthYear)
      .replace('{birthMonth}', formData.birthMonth)
      .replace('{birthDay}', formData.birthDay)
      .replace('{birthHour}', formData.birthHour)
      .replace('{birthMinute}', formData.birthMinute)
      .replace('{birthLocation}', formData.birthLocation)
      .replace('{gender}', formData.gender)
      .replace('{focus}', formData.focus);

    const newMessages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    try {
      await chatService.chatStream(newMessages, {
        onContent: (content) => {
          setStreamContent(prev => prev + content);
        },
        onComplete: (result) => {
          const history = historyService.saveAnalysis(
            'bazi',
            formData,
            newMessages,
            result
          );
          setCurrentHistory(history);
          setMessages(newMessages);
        },
        onError: (error) => {
          console.error('Analysis failed:', error);
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFollowUpQuestion = async (question: string) => {
    if (!currentHistory) return;

    const newMessages = [
      ...messages,
      { role: 'user', content: question }
    ];

    setIsAnalyzing(true);
    setStreamContent('');

    try {
      await chatService.chatStream(newMessages, {
        onContent: (content) => {
          setStreamContent(prev => prev + content);
        },
        onComplete: (result) => {
          setMessages(newMessages);
          historyService.saveAnalysis(
            'bazi',
            currentHistory.input,
            newMessages,
            result
          );
        },
        onError: (error) => {
          console.error('Follow-up failed:', error);
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // 刷新历史记录
  const refreshHistories = () => {
    const savedHistories = historyService.getHistory('bazi');
    setHistories(savedHistories);
    
    if (currentHistory && !savedHistories.find(h => h.id === currentHistory.id)) {
      setCurrentHistory(null);
      setMessages([]);
      setStreamContent('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧历史记录 */}
          <div className="lg:col-span-1">
            <AnalysisHistoryList
              histories={histories}
              onSelect={handleHistorySelect}
              onHistoryChange={refreshHistories}
              currentHistoryId={currentHistory?.id}
              type="bazi"
            />
          </div>

          {/* 右侧主要内容 */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">八字分析</h1>
              <p className="mt-2 text-sm text-gray-600">
                请填写您的出生信息，我们将为您进行专业的八字分析。
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <BaZiForm onSubmit={handleAnalysis} isLoading={isAnalyzing} />
            </div>

            {streamContent && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="prose max-w-none">
                  {streamContent.startsWith('{') ? (
                    <div className="text-gray-600">分析结果生成中...</div>
                  ) : (
                    <div className="whitespace-pre-wrap">{streamContent}</div>
                  )}
                </div>
              </div>
            )}

            {currentHistory && (
              <div className="mt-8">
                <h3 className="text-lg font-medium">继续询问</h3>
                <div className="mt-4">
                  <textarea
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    placeholder="输入你的问题..."
                    value={followUpQuestion}
                    onChange={(e) => setFollowUpQuestion(e.target.value)}
                  />
                  <button
                    onClick={() => handleFollowUpQuestion(followUpQuestion)}
                    disabled={isAnalyzing}
                    className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isAnalyzing ? '分析中...' : '提交问题'}
                  </button>
                </div>
              </div>
            )}

            {currentHistory && (
              <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">分析结果</h2>
                
                {/* 基本信息 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">基本信息</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-2">出生信息：{currentHistory.result.basicInfo.birthData}</p>
                    <p className="mb-2">五行属性：{currentHistory.result.basicInfo.wuxing}</p>
                    <p>日主：{currentHistory.result.basicInfo.rizhu}</p>
                  </div>
                </div>

                {/* 详细分析 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">详细分析</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium mb-2">性格特点</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.personality}</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium mb-2">事业发展</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.career}</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium mb-2">财运分析</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.wealth}</p>
                    </div>
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-medium mb-2">感情姻缘</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.relationships}</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <h4 className="font-medium mb-2">健康提醒</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.health}</p>
                    </div>
                  </div>
                </div>

                {/* 指导建议 */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">指导建议</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">近期运势</h4>
                      <p className="text-gray-600">{currentHistory.result.guidance.shortTerm}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">长期发展</h4>
                      <p className="text-gray-600">{currentHistory.result.guidance.longTerm}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">化解建议</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {currentHistory.result.guidance.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-gray-600">{suggestion}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaZi; 