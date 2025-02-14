import React from 'react';
import BaZiForm from '../components/forms/BaZiForm';
import { AnalysisPage } from '../components/analysis/AnalysisPage';

const formatBaZiResult = (content: string) => {
  try {
    const result = JSON.parse(content);
    if (!result || !result.basicInfo) {
      return <pre className="whitespace-pre-wrap text-sm">{content}</pre>;
    }
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium mb-2">基本信息</h3>
          <div className="space-y-2">
            <p><span className="font-medium">出生信息：</span>{result.basicInfo.birthData || '未提供'}</p>
            <p><span className="font-medium">五行属性：</span>{result.basicInfo.wuxing || '未提供'}</p>
            <p><span className="font-medium">日主：</span>{result.basicInfo.rizhu || '未提供'}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">命理分析</h3>
          <div className="space-y-2">
            <p><span className="font-medium">性格特点：</span>{result.analysis.personality}</p>
            <p><span className="font-medium">事业发展：</span>{result.analysis.career}</p>
            <p><span className="font-medium">财运分析：</span>{result.analysis.wealth}</p>
            <p><span className="font-medium">人际关系：</span>{result.analysis.relationships}</p>
            <p><span className="font-medium">健康状况：</span>{result.analysis.health}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">运势指导</h3>
          <div className="space-y-2">
            <p><span className="font-medium">近期运势：</span>{result.guidance.shortTerm}</p>
            <p><span className="font-medium">长期发展：</span>{result.guidance.longTerm}</p>
            <div>
              <p className="font-medium mb-1">具体建议：</p>
              <ul className="list-disc list-inside pl-4">
                {result.guidance.suggestions.map((suggestion: string, index: number) => (
                  <li key={index}>{suggestion}</li>
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

const BaZi: React.FC = () => {
  return (
    <AnalysisPage
      title="八字分析"
      method="bazi"
      Form={BaZiForm}
      formatResult={formatBaZiResult}
    />
  );
};

export default BaZi;