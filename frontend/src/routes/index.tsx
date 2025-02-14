import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import UserManagement from '../pages/admin/UserManagement';
import Profile from '../pages/user/Profile';
import Settings from '../pages/Settings';
import BasicKnowledge from '../pages/articles/BasicKnowledge';
import FengShuiGuide from '../pages/articles/FengShuiGuide';
import BaZiBasics from '../pages/articles/BaZiBasics';

// 懒加载组件
const FengShui = lazy(() => import('../pages/FengShui'));
const BaZi = lazy(() => import('../pages/BaZi'));
const ZiWeiDouShu = lazy(() => import('../pages/ZiWeiDouShu'));
const CeZi = lazy(() => import('../pages/CeZi'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'fengshui',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <FengShui />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'bazi',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <BaZi />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'ziweidoushu',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <ZiWeiDouShu />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'cezi',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <CeZi />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <UserManagement />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Suspense fallback={<div>加载中...</div>}>
              <Profile />
            </Suspense>
          </ProtectedRoute>
        ),
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/articles/basic-knowledge',
    element: <BasicKnowledge />
  },
  {
    path: '/articles/fengshui-guide',
    element: <FengShuiGuide />
  },
  {
    path: '/articles/bazi-basics',
    element: <BaZiBasics />
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);