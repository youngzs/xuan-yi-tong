import React from 'react';
import { Link } from 'react-router-dom';
import BackHomeButton from '../components/common/BackHomeButton';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <BackHomeButton />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">页面不存在</p>
        <p className="text-gray-500">
          抱歉，您访问的页面不存在或已被移除。
        </p>
      </div>
    </div>
  );
};

export default NotFound; 