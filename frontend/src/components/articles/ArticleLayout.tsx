import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ArticleLayoutProps {
  title: string;
  children: React.ReactNode;
}

const ArticleLayout: React.FC<ArticleLayoutProps> = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首页
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* 文章头部装饰 */}
          <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-500" />
          
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{title}</h1>
            <div className="prose prose-indigo max-w-none">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleLayout; 