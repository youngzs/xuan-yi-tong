import React from 'react';
import ArticleLayout from '../../components/articles/ArticleLayout';
import TaiChi from '../../components/icons/TaiChi';

const BasicKnowledge: React.FC = () => {
  return (
    <ArticleLayout title="玄学入门基础知识">
      <div className="space-y-8">
        {/* 引言部分 */}
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
          <TaiChi className="w-12 h-12 text-gray-700 mr-4" />
          <p className="text-lg text-gray-600 italic">
            "天人合一，道法自然"
          </p>
        </div>

        {/* 基本概念 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">基本概念</h2>
          <p className="mb-4">
            玄学是中国传统文化的重要组成部分，包含了对宇宙规律、人生哲理的深刻认知。其核心理念建立在阴阳五行、天人合一的基础之上。阴阳代表宇宙间对立统一的两极，五行则是金木水火土这五种基本元素的运动变化规律。
          </p>
          <p>
            在玄学体系中，这些基本元素之间存在着相生相克的关系：木生火，火生土，土生金，金生水，水生木；同时，金克木，木克土，土克水，水克火，火克金。这种循环往复的关系构成了万物运行的基本规律。
          </p>
        </section>

        {/* 主要分支 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">主要分支</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-indigo-900 mb-3">命理学</h3>
              <p className="text-gray-700">
                包括八字、紫微斗数等，主要研究人的命运规律。通过出生时间的天干地支组合，分析个人的性格特征、人生际遇等。
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-emerald-900 mb-3">风水学</h3>
              <p className="text-gray-700">
                研究环境与人的关系，通过调整住宅、办公场所的方位布局，以达到趋吉避凶的目的。
              </p>
            </div>
          </div>
        </section>

        {/* 实践应用 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">现代实践应用</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>个人生涯规划：通过八字分析选择适合的职业方向</li>
              <li>居家环境布置：运用风水原理改善生活空间</li>
              <li>时间选择：选择重要事项的吉利时间</li>
              <li>人际关系：了解人际关系的和谐之道</li>
            </ul>
          </div>
        </section>

        {/* 学习建议 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">入门学习建议</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <span className="font-medium text-gray-900">打好基础：</span>
                首先要理解阴阳五行的基本概念和运作规律
              </li>
              <li>
                <span className="font-medium text-gray-900">循序渐进：</span>
                从简单的风水布局原则开始，逐步深入到命理分析
              </li>
              <li>
                <span className="font-medium text-gray-900">实践验证：</span>
                将学到的知识应用到生活中，通过实践来加深理解
              </li>
              <li>
                <span className="font-medium text-gray-900">保持理性：</span>
                以科学的态度看待玄学，避免迷信
              </li>
            </ol>
          </div>
        </section>

        {/* 注意事项 */}
        <div className="bg-amber-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-amber-900 mb-3">学习注意事项</h2>
          <p className="text-gray-700">
            玄学知识博大精深，需要保持谦逊的学习态度。在学习过程中，要注意辨别真伪，选择可靠的学习资源。同时，也要明白玄学是一种智慧的参考，而不是决定命运的绝对准则。
          </p>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default BasicKnowledge; 