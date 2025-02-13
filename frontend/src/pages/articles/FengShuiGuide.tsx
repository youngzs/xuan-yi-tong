import React from 'react';
import ArticleLayout from '../../components/articles/ArticleLayout';
import { Compass } from 'lucide-react';

const FengShuiGuide: React.FC = () => {
  return (
    <ArticleLayout title="居家风水布局指南">
      <div className="space-y-8">
        {/* 引言 */}
        <div className="flex items-center justify-center p-6 bg-gray-50 rounded-lg">
          <Compass className="w-12 h-12 text-gray-700 mr-4" />
          <p className="text-lg text-gray-600 italic">
            "居住环境影响生活品质，合理布局创造和谐空间"
          </p>
        </div>

        {/* 基本原则 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">基本原则</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-blue-900 mb-3">明亮通风</h3>
              <p className="text-gray-700">
                保持室内光线充足，空气流通，这是最基本也是最重要的风水要素。良好的采光和通风不仅有利于身体健康，也能带来积极向上的心理状态。
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium text-green-900 mb-3">整洁有序</h3>
              <p className="text-gray-700">
                保持环境整洁，物品摆放有序，避免杂乱。整洁的环境能带来清晰的思维，提高生活品质。
              </p>
            </div>
          </div>
        </section>

        {/* 各个空间的布局建议 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">空间布局指南</h2>
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">客厅布局</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>沙发背靠实墙，面向门口方向</li>
                <li>避免正对大门设置镜子</li>
                <li>保持空间开阔，避免过度拥挤</li>
                <li>适当摆放绿植，增添生机</li>
              </ul>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-medium text-gray-900 mb-3">卧室布局</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>床头靠实墙，避免正对门窗</li>
                <li>床的两侧留有适当空间</li>
                <li>避免在床头正上方放置重物</li>
                <li>保持空气流通但避免直吹</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 禁忌与化解 */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">常见禁忌与化解方法</h2>
          <div className="bg-red-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-red-900">梁压床位</h3>
                <p className="text-gray-700">化解方法：调整床位位置或使用装饰遮挡</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-red-900">镜子对床</h3>
                <p className="text-gray-700">化解方法：移动镜子位置或夜间遮挡</p>
              </div>
            </div>
          </div>
        </section>

        {/* 布局调整建议 */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-900 mb-3">布局调整建议</h2>
          <p className="text-gray-700 mb-4">
            风水调整应该循序渐进，可以从以下步骤开始：
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>首先进行彻底清理，去除不需要的物品</li>
            <li>调整主要家具的位置，确保动线流畅</li>
            <li>增添有利风水的装饰品，如绿植、流水</li>
            <li>定期维护和更新，保持空间活力</li>
          </ol>
        </div>
      </div>
    </ArticleLayout>
  );
};

export default FengShuiGuide; 