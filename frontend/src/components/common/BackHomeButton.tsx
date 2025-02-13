import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const BackHomeButton: React.FC = () => {
  return (
    <Link
      to="/"
      className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <Home className="w-4 h-4 mr-2" />
      返回首页
    </Link>
  );
};

export default BackHomeButton; 