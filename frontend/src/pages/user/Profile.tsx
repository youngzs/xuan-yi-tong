import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Calendar, MapPin, Phone, Clock } from 'lucide-react';
import { UserProfile } from '../../types/user';
import { useAuthStore } from '../../stores/authStore';
import { userService } from '../../services/localStorage';

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error('未登录');
      return userService.getProfile(user.id);
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* 个人信息头部 */}
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              个人资料
            </h3>
          </div>

          {/* 标签页切换 */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                className={`${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('profile')}
              >
                基本信息
              </button>
              <button
                className={`${
                  activeTab === 'history'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                onClick={() => setActiveTab('history')}
              >
                测算历史
              </button>
            </nav>
          </div>

          {/* 内容区域 */}
          <div className="px-4 py-5 sm:p-6">
            {activeTab === 'profile' ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">生日</div>
                    <div className="mt-1 text-sm text-gray-900">
                      {profile?.birthday || '未设置'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      出生时间
                    </div>
                    <div className="mt-1 text-sm text-gray-900">
                      {profile?.birthTime || '未设置'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      出生地点
                    </div>
                    <div className="mt-1 text-sm text-gray-900">
                      {profile?.location || '未设置'}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-sm font-medium text-gray-500">
                      联系电话
                    </div>
                    <div className="mt-1 text-sm text-gray-900">
                      {profile?.phone || '未设置'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {profile?.savedCalculations.map((calc) => (
                  <div
                    key={calc.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {calc.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(calc.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 capitalize">
                      {calc.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 