import React, { useState, useEffect } from 'react';
import { ANALYSIS_PROMPTS } from '../config/prompts';
import ZiWeiDouShuForm from '../components/forms/ZiWeiDouShuForm';
import { useAuthStore } from '../stores/authStore';
import { chatService } from '../services/api';
import { historyService } from '../services/historyService';
import AnalysisHistoryList from '../components/analysis/AnalysisHistoryList';
import type { AnalysisHistory } from '../types/analysis';
import type { ChatMessage } from '../types/chat';

const ZiWeiDouShu: React.FC = () => {
  const [currentHistory, setCurrentHistory] = useState<AnalysisHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [histories, setHistories] = useState<AnalysisHistory[]>([]);

  useEffect(() => {
    const savedHistories = historyService.getHistory('ziweidoushu');
    setHistories(savedHistories);
  }, []);

  const handleHistorySelect = (history: AnalysisHistory) => {
    setCurrentHistory(history);
    setMessages(history.messages);
    setStreamContent('');
  };

  const handleAnalysis = async (formData: any) => {
    setIsAnalyzing(true);
    setStreamContent('');

    const systemPrompt = ANALYSIS_PROMPTS.ziweidoushu.system;
    const userPrompt = ANALYSIS_PROMPTS.ziweidoushu.questionPrompt
      .replace('{birthYear}', formData.birthYear)
      .replace('{birthMonth}', formData.birthMonth)
      .replace('{birthDay}', formData.birthDay)
      .replace('{birthHour}', formData.birthHour)
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
            'ziweidoushu',
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

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左侧历史记录 */}
          <div className="lg:col-span-1">
            <AnalysisHistoryList
              histories={histories}
              onSelect={handleHistorySelect}
              currentId={currentHistory?.id}
            />
          </div>

          {/* 右侧主要内容 */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">紫微斗数</h1>
              <p className="mt-2 text-sm text-gray-600">
                请填写您的出生信息，我们将为您进行专业的紫微斗数分析。
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <ZiWeiDouShuForm onSubmit={handleAnalysis} isLoading={isAnalyzing} />
            </div>

            {streamContent && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap">{streamContent}</div>
                </div>
              </div>
            )}

            {currentHistory && currentHistory.result && (
              <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">分析结果</h2>
                
                {/* 命盘信息 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">命盘信息</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-2">主星排布：{currentHistory.result.basicInfo?.mainStars}</p>
                    <p className="mb-2">辅星排布：{currentHistory.result.basicInfo?.minorStars}</p>
                    <p>宫位分布：{currentHistory.result.basicInfo?.palaces}</p>
                  </div>
                </div>

                {/* 运势分析 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">运势分析</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium mb-2">性格特点</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.personality}</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium mb-2">事业发展</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.career}</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium mb-2">财运分析</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.wealth}</p>
                    </div>
                    <div className="border-l-4 border-pink-500 pl-4">
                      <h4 className="font-medium mb-2">感情姻缘</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.relationships}</p>
                    </div>
                  </div>
                </div>

                {/* 流年运势 */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">流年运势</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">年度总论</h4>
                      <p className="text-gray-600">{currentHistory.result.yearlyFortune?.overview}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">化解建议</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {currentHistory.result.yearlyFortune?.suggestions.map((suggestion, index) => (
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

export default ZiWeiDouShu; 