import React from 'react';
import ArticleLayout from '../../components/articles/ArticleLayout';
import { Calendar } from 'lucide-react';

const BaZiBasics: React.FC = () => {
  return (
    <ArticleLayout title="八字命理基础解读">
      <div className="space-y-8">
        {/* 引言 */}
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
          <Calendar className="w-12 h-12 text-gray-700 mr-4" />
          <p className="text-lg text-gray-600 italic">
            "八字命理，解析人生"
          </p>
        </div>

        {/* 基本概念 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">什么是八字</h2>
          <p className="mb-4">
            八字，又称四柱，是由年、月、日、时四个时间单位的天干地支组合而成，共八个字，故称"八字"。每个时间单位都由天干和地支组成，反映了出生时刻的宇宙能量状态。
          </p>
          <div className="bg-indigo-50 p-6 rounded-lg">
            <h3 className="text-xl font-medium text-indigo-900 mb-3">天干地支</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium mb-2">十天干：</p>
                <p className="text-gray-700">甲、乙、丙、丁、戊、己、庚、辛、壬、癸</p>
              </div>
              <div>
                <p className="font-medium mb-2">十二地支：</p>
                <p className="text-gray-700">子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥</p>
              </div>
            </div>
          </div>
        </section>

        {/* 基础理论 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">基础理论</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">阴阳五行</h3>
              <p className="text-gray-700 mb-4">
                天干地支都包含阴阳五行属性，这是理解八字的基础：
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>木：甲（阳）、乙（阴）</li>
                <li>火：丙（阳）、丁（阴）</li>
                <li>土：戊（阳）、己（阴）</li>
                <li>金：庚（阳）、辛（阴）</li>
                <li>水：壬（阳）、癸（阴）</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 命盘解读 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">命盘解读要素</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-rose-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-rose-900 mb-3">日主</h3>
              <p className="text-gray-700">
                日柱天干代表命主本身，是整个八字的核心，决定了命主的基本性格和特质。
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-amber-900 mb-3">喜忌</h3>
              <p className="text-gray-700">
                通过分析日主的强弱，判断命局需要补充或克制的五行，指导趋吉避凶。
              </p>
            </div>
          </div>
        </section>

        {/* 应用方法 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">实际应用</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <ol className="list-decimal list-inside space-y-4 text-gray-700">
              <li>
                <span className="font-medium text-gray-900">性格分析：</span>
                通过日主和命局特征分析性格倾向
              </li>
              <li>
                <span className="font-medium text-gray-900">事业方向：</span>
                根据喜用神选择适合的职业领域
              </li>
              <li>
                <span className="font-medium text-gray-900">人际关系：</span>
                通过命局特征了解人际互动模式
              </li>
              <li>
                <span className="font-medium text-gray-900">吉凶判断：</span>
                预测人生不同时期的机遇与挑战
              </li>
            </ol>
          </div>
        </section>

        {/* 学习建议 */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-900 mb-3">学习建议</h2>
          <p className="text-gray-700 mb-4">
            八字命理学习需要循序渐进，建议从以下步骤开始：
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>首先掌握天干地支的基本属性</li>
            <li>理解阴阳五行的相生相克关系</li>
            <li>学习日主判断和喜忌分析方法</li>
            <li>通过实际案例积累经验</li>
          </ul>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default BaZiBasics; 