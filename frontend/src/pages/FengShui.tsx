import React, { useState, useEffect } from 'react';
import { ANALYSIS_PROMPTS } from '../config/prompts';
import FengShuiForm from '../components/forms/FengShuiForm';
import { useAuthStore } from '../stores/authStore';
import { chatService } from '../services/api';
import { historyService } from '../services/historyService';
import AnalysisHistoryList from '../components/analysis/AnalysisHistoryList';
import type { AnalysisHistory } from '../types/analysis';
import type { ChatMessage } from '../types/chat';
import { AnalysisPage } from '../components/analysis/AnalysisPage';

const formatFengShuiResult = (content: string) => {
  try {
    const result = JSON.parse(content);
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium mb-2">环境分析</h3>
          <div className="space-y-2">
            <p><span className="font-medium">房屋朝向：</span>{result.environment.direction}</p>
            <p><span className="font-medium">周边环境：</span>{result.environment.surroundings}</p>
            <p><span className="font-medium">整体格局：</span>{result.environment.layout}</p>
            <p><span className="font-medium">气场分析：</span>{result.environment.energy}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">风水评估</h3>
          <div className="space-y-2">
            <div>
              <p className="font-medium mb-1">优势：</p>
              <ul className="list-disc list-inside pl-4">
                {result.analysis.advantages.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">不足：</p>
              <ul className="list-disc list-inside pl-4">
                {result.analysis.disadvantages.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <p><span className="font-medium">五行配置：</span>{result.analysis.fiveElements}</p>
            <div className="mt-2">
              <p className="font-medium mb-1">影响分析：</p>
              <p className="ml-4">财运：{result.analysis.influence.wealth}</p>
              <p className="ml-4">健康：{result.analysis.influence.health}</p>
              <p className="ml-4">人际：{result.analysis.influence.relationships}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">改善建议</h3>
          <div className="space-y-2">
            <div>
              <p className="font-medium mb-1">即时改善：</p>
              <ul className="list-disc list-inside pl-4">
                {result.recommendations.immediate.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">长期改善：</p>
              <ul className="list-disc list-inside pl-4">
                {result.recommendations.longTerm.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">禁忌事项：</p>
              <ul className="list-disc list-inside pl-4">
                {result.recommendations.taboos.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    );
  } catch {
    return <pre className="whitespace-pre-wrap text-sm">{content}</pre>;
  }
};

const FengShui: React.FC = () => {
  return (
    <AnalysisPage
      title="风水堪舆"
      method="fengshui"
      Form={FengShuiForm}
      formatResult={formatFengShuiResult}
    />
  );
};

export default FengShui; 