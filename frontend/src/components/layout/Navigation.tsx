import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, FengShuiIcon, BaZiIcon, CeZiIcon, ZiWeiIcon } from '../icons';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <HomeIcon />, text: '首页' },
    { path: '/bazi', icon: <BaZiIcon />, text: '八字分析' },
    { path: '/ziweidoushu', icon: <ZiWeiIcon />, text: '紫微斗数' },
    { path: '/fengshui', icon: <FengShuiIcon />, text: '风水堪舆' },
    { path: '/cezi', icon: <CeZiIcon />, text: '测字预测' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 