import React from 'react';
import { AnalysisPage } from '../components/analysis/AnalysisPage';
import ZiWeiDouShuForm from '../components/forms/ZiWeiDouShuForm';

const formatZiWeiResult = (content: string) => {
  try {
    const result = JSON.parse(content);
    return (
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-medium mb-2">命盘信息</h3>
          <div className="space-y-2">
            <p>{result.basicInfo.birthData}</p>
            <p>{result.basicInfo.mainStars}</p>
            <p>{result.basicInfo.auxiliaryStars}</p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">宫位解析</h3>
          <div className="space-y-2">
            {Object.entries(result.palaceAnalysis).map(([palace, analysis]) => (
              <div key={palace}>
                <p className="font-medium">{palace}宫：</p>
                <p className="ml-4">{analysis}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-medium mb-2">运势分析</h3>
          <div className="space-y-2">
            <p><span className="font-medium">流年运势：</span>{result.yearlyFortune}</p>
            <p><span className="font-medium">重点指导：</span>{result.guidance}</p>
          </div>
        </section>
      </div>
    );
  } catch {
    return <pre className="whitespace-pre-wrap text-sm">{content}</pre>;
  }
};

const ZiWeiDouShu: React.FC = () => {
  return (
    <AnalysisPage
      title="紫微斗数"
      method="ziweidoushu"
      Form={ZiWeiDouShuForm}
      formatResult={formatZiWeiResult}
    />
  );
};

export default ZiWeiDouShu; 