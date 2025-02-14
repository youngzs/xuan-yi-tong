import React, { useState, useEffect } from 'react';
import { chatService } from '../../services/api';
import { historyService } from '../../services/historyService';
import AnalysisHistoryList from './AnalysisHistoryList';
import type { AnalysisHistory } from '../../types/analysis';
import type { ChatMessage } from '../../types/chat';
import { useToast } from '../../hooks/useToast';

interface AnalysisPageProps {
  title: string;
  method: 'bazi' | 'ziweidoushu' | 'cezi' | 'fengshui';
  Form: React.ComponentType<any>;
  formatResult: (content: string) => React.ReactNode;
}

export const AnalysisPage: React.FC<AnalysisPageProps> = ({
  title,
  method,
  Form,
  formatResult
}) => {
  const [histories, setHistories] = useState<AnalysisHistory[]>([]);
  const [currentHistory, setCurrentHistory] = useState<AnalysisHistory | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [streamContent, setStreamContent] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    refreshHistories();
  }, [method]);

  const refreshHistories = () => {
    const savedHistories = historyService.getHistory(method);
    setHistories(savedHistories);
    
    if (currentHistory && !savedHistories.find(h => h.id === currentHistory.id)) {
      setCurrentHistory(null);
      setMessages([]);
      setStreamContent('');
    }
  };

  const handleAnalyze = async (formData: any) => {
    setIsAnalyzing(true);
    setStreamContent('');

    try {
      const analysisData = {
        ...formData,
        stream: true,
        onContent: (content: string) => {
          setStreamContent(content);
        },
        onHistoryCreated: (history: AnalysisHistory) => {
          setCurrentHistory(history);
          refreshHistories();
        }
      };

      await chatService.analyzeWithMethod(method, analysisData);
    } catch (error) {
      console.error('分析失败:', error);
      showToast('分析失败，请重试', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleHistorySelect = (history: AnalysisHistory) => {
    setCurrentHistory(history);
    setMessages(history.messages);
    setStreamContent(history.result?.toString() || '');
    if (history.input) {
      Form.defaultProps?.onDataLoad?.(history.input);
    }
  };

  const handleFollowUpQuestion = async (question: string) => {
    if (!currentHistory || !question.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user' as const, content: question }
    ];

    setIsAnalyzing(true);
    setStreamContent('');
    setFollowUpQuestion('');

    try {
      await chatService.chatStream(newMessages, {
        onContent: setStreamContent,
        onComplete: (result) => {
          setMessages(newMessages);
          historyService.saveAnalysis(
            method,
            currentHistory.input,
            newMessages,
            result
          );
          refreshHistories();
        },
        onError: (error) => {
          console.error('Follow-up failed:', error);
          showToast('追问失败，请重试', 'error');
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
          <div className="lg:col-span-1">
            <AnalysisHistoryList
              histories={histories}
              onSelect={handleHistorySelect}
              onHistoryChange={refreshHistories}
              currentHistoryId={currentHistory?.id}
              type={method}
            />
          </div>

          <div className="lg:col-span-2">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
              <Form onSubmit={handleAnalyze} isLoading={isAnalyzing} />
            </div>

            {streamContent && (
              <div className="mt-6 bg-white shadow rounded-lg p-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">分析结果</h2>
                {currentHistory && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-md font-medium text-gray-700 mb-2">测算信息</h3>
                    <div className="text-sm text-gray-600">
                      {Object.entries(currentHistory.input).map(([key, value]) => {
                        const fieldMap: Record<string, string> = {
                          birthDateTime: '出生时间',
                          gender: '性别',
                          birthLocation: '出生地点',
                          focus: '关注重点'
                        };
                        const displayValue = key === 'birthDateTime'
                          ? new Date(value as string).toLocaleString('zh-CN', {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: false
                            }).replace(/\//g, '年').replace(',', '').replace(/:/, '时') + '分'
                          : key === 'gender'
                          ? (value === 'male' ? '男' : '女')
                          : String(value);
                        return (
                          <div key={key} className="mb-1">
                            <span className="font-medium">{fieldMap[key] || key}: </span>
                            <span>{displayValue}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="prose max-w-none">
                  {formatResult(streamContent)}
                </div>
              </div>
            )}

            {currentHistory && (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">对话历史</h3>
                <div className="space-y-4 mb-6">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${message.role === 'user' ? 'bg-indigo-50' : 'bg-gray-50'}`}
                    >
                      <div className="text-sm font-medium mb-1">
                        {message.role === 'user' ? '您的问题' : '分析回答'}
                      </div>
                      <div className="text-gray-700">{message.content}</div>
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-medium">继续询问</h3>
                <div className="mt-4">
                  <textarea
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                    placeholder="基于以上分析结果和对话记录，您可以继续提问..."
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
          </div>
        </div>
      </div>
    </div>
  );
};