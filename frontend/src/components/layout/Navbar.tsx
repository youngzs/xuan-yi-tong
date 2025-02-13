import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { HomeIcon, FengShuiIcon, BaZiIcon, CeZiIcon, ZiWeiIcon } from '../icons';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { path: '/fengshui', icon: <FengShuiIcon />, text: '风水堪舆' },
    { path: '/bazi', icon: <BaZiIcon />, text: '八字分析' },
    { path: '/ziweidoushu', icon: <ZiWeiIcon />, text: '紫微斗数' },
    { path: '/cezi', icon: <CeZiIcon />, text: '测字预测' },
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <HomeIcon />
              <span className="ml-2 text-xl font-bold text-gray-900">玄易通</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.text}
                </Link>
              ))}
              <Link
                to="/settings"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-indigo-500"
              >
                <Settings className="w-5 h-5 mr-2" />
                系统设置
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4 relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center text-gray-900 hover:text-gray-700"
                >
                  <User className="w-8 h-8 p-1 rounded-full bg-gray-100" />
                  <span className="ml-2">{user?.username}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-10 w-48 py-1 bg-white rounded-md shadow-lg z-50">
                    <Link
                      to="/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Settings className="w-4 h-4 inline-block mr-2" />
                      API 配置
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <LogOut className="w-4 h-4 inline-block mr-2" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md"
                >
                  登录
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-3 py-2 rounded-md"
                >
                  注册
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 