import React from 'react';
import { Link } from 'react-router-dom';
import { FengShuiIcon, BaZiIcon, CeZiIcon, ZiWeiIcon } from '../components/icons';

const Home: React.FC = () => {
  const features = [
    {
      path: '/fengshui',
      icon: <FengShuiIcon />,
      title: '风水堪舆',
      description: '阴阳五行，趋吉避凶',
      color: 'bg-indigo-50 text-indigo-700'
    },
    {
      path: '/bazi',
      icon: <BaZiIcon />,
      title: '八字分析',
      description: '生辰八字，命理推算',
      color: 'bg-rose-50 text-rose-700'
    },
    {
      path: '/ziweidoushu',
      icon: <ZiWeiIcon />,
      title: '紫微斗数',
      description: '星盘解析，格局预测',
      color: 'bg-amber-50 text-amber-700'
    },
    {
      path: '/cezi',
      icon: <CeZiIcon />,
      title: '测字预测',
      description: '字义解析，事理推断',
      color: 'bg-emerald-50 text-emerald-700'
    }
  ];

  const articles = [
    {
      title: "玄学入门基础知识",
      desc: "了解玄学的基本概念和原理",
      path: "/articles/basic-knowledge"
    },
    {
      title: "居家风水布局指南",
      desc: "科学布局，营造和谐居住环境",
      path: "/articles/fengshui-guide"
    },
    {
      title: "八字命理基础解读",
      desc: "命理知识系统学习指南",
      path: "/articles/bazi-basics"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 主要内容区 */}
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* 欢迎Banner */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">探索玄学智慧</h2>
          <p className="text-lg opacity-90 mb-6">传统文化与现代科技的完美结合</p>
          <Link 
            to="/register" 
            className="inline-block bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90"
          >
            立即开始
          </Link>
        </div>

        {/* 功能区 */}
        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link
                key={feature.path}
                to={feature.path}
                className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div>
                  <span className={`rounded-lg inline-flex p-3 ${feature.color} ring-4 ring-white`}>
                    {feature.icon}
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 推荐内容 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-medium mb-6 flex items-center">
            精选内容
          </h2>
          <div className="space-y-6">
            {articles.map((article, index) => (
              <Link
                key={index}
                to={article.path}
                className="flex items-center space-x-4 hover:bg-gray-50 p-4 rounded-lg transition-colors duration-200"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{article.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{article.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 