import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { User as UserIcon, Edit2, Trash2, Search } from 'lucide-react';
// mport { useAuthStore } from '../../stores/authStore';
import { User } from '../../types/user';

const UserManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // const { user: currentUser } = useAuthStore();

  const { data: users } = useQuery({
    queryKey: ['users', searchTerm],
    queryFn: async () => {
      const response = await fetch(`/api/users?search=${searchTerm}`);
      if (!response.ok) throw new Error('Failed to fetch users');
      return response.json();
    },
  });

  // if (!hasPermission(currentUser?.role ?? '', 'ADMIN_ACCESS')) {
  //   return <div>无权限访问</div>;
  // }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">用户管理</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="搜索用户..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {users?.map((user: User) => (
              <li key={user.id}>
                <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                  <div className="flex items-center">
                    <UserIcon className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-red-500">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;