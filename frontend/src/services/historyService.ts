import type { AnalysisHistory } from '../types/analysis';

class HistoryService {
  private readonly STORAGE_KEY = 'analysis_history';

  getHistory(type?: string): AnalysisHistory[] {
    const histories = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    if (type) {
      return histories.filter((history: AnalysisHistory) => history.type === type);
    }
    return histories;
  }

  saveAnalysis(type: string, input: any, messages: any[], result: any): AnalysisHistory {
    const histories = this.getHistory();
    
    // 尝试解析结果字符串为 JSON（如果是字符串的话）
    let parsedResult = result;
    if (typeof result === 'string') {
      try {
        parsedResult = JSON.parse(result);
      } catch (e) {
        // 如果解析失败，保持原样
        parsedResult = result;
      }
    }

    const newHistory: AnalysisHistory = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
      input,
      messages,
      result: parsedResult
    };

    histories.unshift(newHistory);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(histories.slice(0, 50))); // 只保留最近50条记录

    return newHistory;
  }

  getAnalysisById(id: string): AnalysisHistory | null {
    const history = this.getHistory();
    return history.find(entry => entry.id === id) || null;
  }

  // 添加删除单条记录的方法
  deleteAnalysis(id: string): boolean {
    const histories = this.getHistory();
    const filteredHistories = histories.filter(entry => entry.id !== id);
    
    if (filteredHistories.length === histories.length) {
      return false; // 没有找到要删除的记录
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistories));
    return true;
  }

  // 添加删除多条记录的方法
  deleteMultipleAnalyses(ids: string[]): number {
    const histories = this.getHistory();
    const filteredHistories = histories.filter(entry => !ids.includes(entry.id));
    
    const deletedCount = histories.length - filteredHistories.length;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistories));
    
    return deletedCount;
  }

  // 添加清空历史记录的方法
  clearHistory(type?: string): number {
    const histories = this.getHistory();
    
    if (type) {
      // 如果指定了类型，只删除该类型的记录
      const filteredHistories = histories.filter(entry => entry.type !== type);
      const deletedCount = histories.length - filteredHistories.length;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredHistories));
      return deletedCount;
    } else {
      // 没有指定类型，清空所有记录
      const deletedCount = histories.length;
      localStorage.setItem(this.STORAGE_KEY, '[]');
      return deletedCount;
    }
  }
}

export const historyService = new HistoryService(); 