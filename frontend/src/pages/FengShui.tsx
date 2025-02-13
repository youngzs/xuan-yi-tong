import React, { useState, useEffect } from 'react';
import { ANALYSIS_PROMPTS } from '../config/prompts';
import FengShuiForm from '../components/forms/FengShuiForm';
import { useAuthStore } from '../stores/authStore';
import { chatService } from '../services/api';
import { historyService } from '../services/historyService';
import AnalysisHistoryList from '../components/analysis/AnalysisHistoryList';
import type { AnalysisHistory } from '../types/analysis';
import type { ChatMessage } from '../types/chat';

const FengShui: React.FC = () => {
  const [currentHistory, setCurrentHistory] = useState<AnalysisHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [histories, setHistories] = useState<AnalysisHistory[]>([]);

  useEffect(() => {
    const savedHistories = historyService.getHistory('fengshui');
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

    const systemPrompt = ANALYSIS_PROMPTS.fengshui.system;
    const userPrompt = ANALYSIS_PROMPTS.fengshui.questionPrompt
      .replace('{direction}', formData.direction)
      .replace('{floor}', formData.floor)
      .replace('{entranceDirection}', formData.entranceDirection)
      .replace('{layout}', formData.layout)
      .replace('{concern}', formData.concern);

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
            'fengshui',
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
              <h1 className="text-2xl font-semibold text-gray-900">风水堪舆</h1>
              <p className="mt-2 text-sm text-gray-600">
                请填写房屋信息，我们将为您进行专业的风水分析。
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <FengShuiForm onSubmit={handleAnalysis} isLoading={isAnalyzing} />
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
                
                {/* 基本信息 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">房屋信息</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-2">座向分析：{currentHistory.result.basicInfo?.direction}</p>
                    <p className="mb-2">内部格局：{currentHistory.result.basicInfo?.layout}</p>
                    <p>气场评估：{currentHistory.result.basicInfo?.energy}</p>
                  </div>
                </div>

                {/* 详细分析 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">风水分析</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium mb-2">环境分析</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.environment}</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium mb-2">格局评估</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.layout}</p>
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-4">
                      <h4 className="font-medium mb-2">五行配置</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis?.elements}</p>
                    </div>
                  </div>
                </div>

                {/* 改善建议 */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">改善建议</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">布局调整</h4>
                      <p className="text-gray-600">{currentHistory.result.guidance?.layout}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">化解方案</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {currentHistory.result.guidance?.suggestions.map((suggestion, index) => (
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

export default FengShui; 