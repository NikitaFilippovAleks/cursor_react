import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { clearUser } from '@/entities/user';
import { Button as SharedButton } from '@/shared/ui/components';

/**
 * Шапка приложения
 */
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);

  /**
   * Выход из аккаунта
   */
  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/auth');
  };

  if (!currentUser) {
    return null;
  }

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color='inherit' onClick={() => navigate('/tasks')}>
            Задачи
          </Button>
          <Button color='inherit' onClick={() => navigate('/profile')}>
            Профиль
          </Button>
          <Typography variant='body2' sx={{ mr: 1 }}>
            {currentUser.name}
          </Typography>
          <SharedButton
            variant='outlined'
            color='inherit'
            onClick={handleLogout}
            size='small'
          >
            Выйти
          </SharedButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
