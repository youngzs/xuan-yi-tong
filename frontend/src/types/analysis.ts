import { ChatMessage } from './chat';

export type AnalysisResult = string | {
  basicInfo?: {
    birthData?: string;
    wuxing?: string;
    rizhu?: string;
    character?: string;
    strokes?: string;
    radicals?: string;
    fiveElements?: string;
  };
  analysis?: {
    personality?: string;
    career?: string;
    wealth?: string;
    relationships?: string;
    health?: string;
    meaning?: string;
    structure?: string;
    pronunciation?: string;
    fortune?: string;
  };
  guidance?: {
    shortTerm?: string;
    longTerm?: string;
    suggestions?: string[];
  };
  environment?: {
    direction?: string;
    surroundings?: string;
    layout?: string;
    energy?: string;
  };
  palaceAnalysis?: Record<string, string>;
  yearlyFortune?: string;
};

export interface AnalysisHistory {
  id: string;
  type: 'bazi' | 'ziweidoushu' | 'fengshui' | 'cezi';
  timestamp: string;
  input: any;
  messages: ChatMessage[];
  result: AnalysisResult;
}