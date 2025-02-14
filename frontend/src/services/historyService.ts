import { v4 as uuidv4 } from 'uuid';
import type { AnalysisHistory } from '../types/analysis';

const HISTORY_KEY = 'analysis_history';

interface HistoryStore {
  [key: string]: AnalysisHistory[];
}

export const historyService = {
  getHistory(type: 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi'): AnalysisHistory[] {
    try {
      const store = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}');
      
      // 处理旧版本数据格式
      if (Array.isArray(store)) {
        // 如果是数组格式，说明是旧版本数据
        const oldRecords = store as AnalysisHistory[];
        // 将旧数据按类型分类
        const newStore: HistoryStore = {};
        oldRecords.forEach(record => {
          if (!newStore[record.type]) {
            newStore[record.type] = [];
          }
          newStore[record.type].push(record);
        });
        // 保存转换后的新格式数据
        localStorage.setItem(HISTORY_KEY, JSON.stringify(newStore));
        return newStore[type] || [];
      }
      
      return (store as HistoryStore)[type] || [];
    } catch {
      return [];
    }
  },
  saveAnalysis(
    type: 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi',
    input: any,
    messages: any[],
    result: any
  ): AnalysisHistory {
    const history: AnalysisHistory = {
      id: uuidv4(),
      type,
      timestamp: new Date().toISOString(),
      input,
      messages,
      result
    };

    try {
      const store = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}') as HistoryStore;
      store[type] = [history, ...(store[type] || [])];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(store));
    } catch (error) {
      console.error('保存历史记录失败:', error);
    }

    return history;
  },

  deleteAnalysis(id: string): boolean {
    try {
      const store = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}') as HistoryStore;
      let deleted = false;

      Object.keys(store).forEach(type => {
        const index = store[type].findIndex(h => h.id === id);
        if (index !== -1) {
          store[type].splice(index, 1);
          deleted = true;
        }
      });

      if (deleted) {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(store));
      }

      return deleted;
    } catch {
      return false;
    }
  },

  clearHistory(type: 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi'): number {
    try {
      const store = JSON.parse(localStorage.getItem(HISTORY_KEY) || '{}') as HistoryStore;
      const count = store[type]?.length || 0;
      store[type] = [];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(store));
      return count;
    } catch {
      return 0;
    }
  }
};