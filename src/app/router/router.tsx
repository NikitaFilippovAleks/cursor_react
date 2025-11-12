import { Navigate, Route, Routes } from 'react-router-dom';

import { AuthPage } from '@/pages/auth';
import { ProfilePage } from '@/pages/profile';
import { TasksPage } from '@/pages/tasks';
import { useAppSelector } from '@/shared/lib/store';

/**
 * Приватный роут
 * @param root0 - пропсы
 * @param root0.children - компоненты
 */
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAppSelector(state => state.user);
  return currentUser ? children : <Navigate to='/auth' replace />;
};

/**
 * Роутер
 */
export const Router = () => {
  const { currentUser } = useAppSelector(state => state.user);

  return (
    <Routes>
      <Route
        path='/auth'
        element={currentUser ? <Navigate to='/tasks' replace /> : <AuthPage />}
      />
      <Route
        path='/tasks'
        element={
          <PrivateRoute>
            <TasksPage />
          </PrivateRoute>
        }
      />
      <Route
        path='/profile'
        element={
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        }
      />
      <Route
        path='/'
        element={<Navigate to={currentUser ? '/tasks' : '/auth'} replace />}
      />
    </Routes>
  );
};
