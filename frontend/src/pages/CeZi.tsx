import React, { useState, useEffect } from 'react';
import { ANALYSIS_PROMPTS } from '../config/prompts';
import CeZiForm from '../components/forms/CeZiForm';
import { useAuthStore } from '../stores/authStore';
import { chatService } from '../services/api';
import { historyService } from '../services/historyService';
import AnalysisHistoryList from '../components/analysis/AnalysisHistoryList';
import type { AnalysisHistory } from '../types/analysis';
import type { ChatMessage } from '../types/chat';

const CeZi: React.FC = () => {
  const [currentHistory, setCurrentHistory] = useState<AnalysisHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [streamContent, setStreamContent] = useState('');
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const [histories, setHistories] = useState<AnalysisHistory[]>([]);

  useEffect(() => {
    const savedHistories = historyService.getHistory('cezi');
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

    const systemPrompt = ANALYSIS_PROMPTS.cezi.system;
    const userPrompt = ANALYSIS_PROMPTS.cezi.questionPrompt
      .replace('{character}', formData.character)
      .replace('{question}', formData.question)
      .replace('{motivation}', formData.motivation);

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
            'cezi',
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
              <h1 className="text-2xl font-semibold text-gray-900">测字预测</h1>
              <p className="mt-2 text-sm text-gray-600">
                请输入一个汉字，我们将为您进行专业的测字分析。
              </p>
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              <CeZiForm onSubmit={handleAnalysis} isLoading={isAnalyzing} />
            </div>

            {streamContent && (
              <div className="mt-4 bg-gray-50 p-4 rounded-md">
                <div className="prose max-w-none">
                  <div className="whitespace-pre-wrap">{streamContent}</div>
                </div>
              </div>
            )}

            {currentHistory && (
              <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">分析结果</h2>
                
                {/* 基本信息 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">字义解析</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p className="mb-2">测字：{currentHistory.result.basicInfo.character}</p>
                    <p className="mb-2">字形分析：{currentHistory.result.basicInfo.structure}</p>
                    <p>五行属性：{currentHistory.result.basicInfo.element}</p>
                  </div>
                </div>

                {/* 预测分析 */}
                <div className="mb-8">
                  <h3 className="text-md font-medium text-gray-700 mb-4">预测分析</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-indigo-500 pl-4">
                      <h4 className="font-medium mb-2">事项预测</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.prediction}</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium mb-2">吉凶判断</h4>
                      <p className="text-gray-600">{currentHistory.result.analysis.fortune}</p>
                    </div>
                  </div>
                </div>

                {/* 指导建议 */}
                <div>
                  <h3 className="text-md font-medium text-gray-700 mb-4">指导建议</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">行动建议</h4>
                      <p className="text-gray-600">{currentHistory.result.guidance.action}</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">注意事项</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {currentHistory.result.guidance.precautions.map((item, index) => (
                          <li key={index} className="text-gray-600">{item}</li>
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

export default CeZi; 