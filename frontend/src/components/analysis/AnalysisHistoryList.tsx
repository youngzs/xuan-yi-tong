import React, { useState } from 'react';
import { Trash2, RefreshCw } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import type { AnalysisHistory } from '../../types/analysis';
import { historyService } from '../../services/historyService';
import { useToast } from '../../hooks/useToast';

interface AnalysisHistoryListProps {
  histories: AnalysisHistory[];
  onSelect: (history: AnalysisHistory) => void;
  onHistoryChange: () => void;
  currentHistoryId?: string;
  type: 'bazi' | 'fengshui' | 'ziweidoushu' | 'cezi';
}

const AnalysisHistoryList: React.FC<AnalysisHistoryListProps> = ({
  histories,
  onSelect,
  onHistoryChange,
  currentHistoryId,
  type
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { showToast } = useToast();

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    
    setIsDeleting(true);
    try {
      const success = historyService.deleteAnalysis(id);
      if (success) {
        showToast('记录已删除', 'success');
        onHistoryChange();
      } else {
        showToast('删除失败', 'error');
      }
    } catch {
      showToast('删除时出错', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClearAll = async () => {
    if (isDeleting || !histories.length) return;
    
    if (!window.confirm(`确定要清空所有${getTypeLabel()}历史记录吗？`)) return;
    
    setIsDeleting(true);
    try {
      const deletedCount = historyService.clearHistory(type);
      showToast(`已清空 ${deletedCount} 条记录`, 'success');
      onHistoryChange();
    } catch {
      showToast('清空历史记录失败', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'bazi': return '八字分析';
      case 'fengshui': return '风水分析';
      case 'ziweidoushu': return '紫微斗数';
      case 'cezi': return '测字分析';
      default: return '';
    }
  };

  const formatHistoryInfo = (input: any) => {
    switch (type) {
      case 'bazi':
        return `${input.birthYear}年${input.birthMonth}月${input.birthDay}日 ${input.birthHour}时 · ${input.gender === 'male' ? '男' : '女'}`;
      case 'fengshui':
        return `${input.location} · ${input.purpose}`;
      case 'ziweidoushu':
        return `${input.birthYear}年${input.birthMonth}月${input.birthDay}日${input.birthHour}时 · ${input.gender === 'male' ? '男' : '女'}`;
      case 'cezi':
        return `测字：${input.character}`;
      default:
        return JSON.stringify(input);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">历史记录</h3>
        {histories.length > 0 && (
          <button
            onClick={handleClearAll}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 flex items-center text-sm"
          >
            <RefreshCw className="w-4 h-4 mr-1" />
            清空记录
          </button>
        )}
      </div>
      
      <div className="divide-y divide-gray-200">
        {histories.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            暂无历史记录
          </div>
        ) : (
          histories.map((history) => (
            <div
              key={history.id}
              onClick={() => onSelect(history)}
              className={`p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center ${
                currentHistoryId === history.id ? 'bg-indigo-50' : ''
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-900">
                    {formatHistoryInfo(history.input)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(history.timestamp), {
                      addSuffix: true,
                      locale: zhCN
                    })}
                  </span>
                </div>
                {history.input.birthLocation && (
                  <p className="mt-1 text-sm text-gray-500">
                    {history.input.birthLocation}
                  </p>
                )}
              </div>
              
              <button
                onClick={(e) => handleDelete(history.id, e)}
                disabled={isDeleting}
                className="ml-4 text-gray-400 hover:text-red-600 p-1 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AnalysisHistoryList; 