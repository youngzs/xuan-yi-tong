import React from 'react';
import { AnalysisPage } from '../components/analysis/AnalysisPage';
import CeZiForm from '../components/forms/CeZiForm';

const formatCeZiResult = (content: string) => {
  try {
    const result = JSON.parse(content);
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium mb-2">字义分析</h3>
          <div className="space-y-2">
            <p><span className="font-medium">测字：</span>{result.basicInfo.character}</p>
            <p><span className="font-medium">笔画：</span>{result.basicInfo.strokes}</p>
            <p><span className="font-medium">部首：</span>{result.basicInfo.radicals}</p>
            <p><span className="font-medium">五行：</span>{result.basicInfo.fiveElements}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">深入解析</h3>
          <div className="space-y-2">
            <p><span className="font-medium">字义解析：</span>{result.analysis.meaning}</p>
            <p><span className="font-medium">字形分析：</span>{result.analysis.structure}</p>
            <p><span className="font-medium">音韵五行：</span>{result.analysis.pronunciation}</p>
            <p><span className="font-medium">吉凶判断：</span>{result.analysis.fortune}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">预测指导</h3>
          <div className="space-y-2">
            <p><span className="font-medium">总体预测：</span>{result.prediction.general}</p>
            <p><span className="font-medium">具体事项：</span>{result.prediction.specific}</p>
            <p><span className="font-medium">时间指引：</span>{result.prediction.timing}</p>
            <div>
              <p className="font-medium mb-1">具体建议：</p>
              <ul className="list-disc list-inside pl-4">
                {result.prediction.suggestions.map((suggestion: string, index: number) => (
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

const CeZi: React.FC = () => {
  return (
    <AnalysisPage
      title="测字预测"
      method="cezi"
      Form={CeZiForm}
      formatResult={formatCeZiResult}
    />
  );
};

export default CeZi; 