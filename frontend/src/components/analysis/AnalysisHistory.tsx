import React from 'react';
import { format } from 'date-fns';
import { AnalysisHistory } from '../../types/analysis';

interface AnalysisHistoryListProps {
  histories: AnalysisHistory[];
  onSelect: (history: AnalysisHistory) => void;
  currentId?: string;
}

export const AnalysisHistoryList: React.FC<AnalysisHistoryListProps> = ({
  histories,
  onSelect,
  currentId
}) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">历史记录</h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {histories.map((history) => (
          <li
            key={history.id}
            className={`hover:bg-gray-50 cursor-pointer ${
              currentId === history.id ? 'bg-indigo-50' : ''
            }`}
            onClick={() => onSelect(history)}
          >
            <div className="px-4 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                     {history.timestamp ? format(new Date(history.timestamp), 'yyyy年MM月dd日 HH:mm') : '未知时间'}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {history.input.birthLocation} · {history.input.gender === 'male' ? '男' : '女'}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                  {(() => {
                    switch (history.type) {
                      case 'bazi':
                        return '八字';
                      case 'ziweidoushu':
                        return '紫薇斗数';
                      case 'cezi':
                        return '测字';
                      case 'fengshui':
                        return '风水';
                      default:
                        return '其他';
                    }
                  })()}
                </span>
              </div>
              {history.input.focus && (
                <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                  {history.input.focus}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};