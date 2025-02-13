import { ChatMessage } from './chat';

export interface AnalysisResult {
  basicInfo: {
    birthData: string;
    wuxing: string;
    rizhu: string;
  };
  analysis: {
    personality: string;
    career: string;
    wealth: string;
    relationships: string;
    health: string;
  };
  guidance: {
    shortTerm: string;
    longTerm: string;
    suggestions: string[];
  };
}

export interface AnalysisHistory {
  id: string;
  type: 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi';
  timestamp: string;
  input: any;
  messages: ChatMessage[];
  result: AnalysisResult;
} 