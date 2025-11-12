import { Box, Card, CardContent, Container, Typography } from '@mui/material';

import { useAppSelector } from '@/shared/lib/store';

/**
 * Страница профиля
 */
export const ProfilePage = () => {
  const { currentUser } = useAppSelector(state => state.user);
  const { tasks } = useAppSelector(state => state.task);

  if (!currentUser) {
    return null;
  }

  const userTasks = tasks.filter(task => task.userId === currentUser.id);
  const tasksByStatus = {
    todo: userTasks.filter(task => task.status === 'todo').length,
    in_progress: userTasks.filter(task => task.status === 'in_progress').length,
    done: userTasks.filter(task => task.status === 'done').length
  };

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Профиль
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Информация о пользователе
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant='body1'>
              <strong>Имя:</strong> {currentUser.name}
            </Typography>
            <Typography variant='body1' sx={{ mt: 1 }}>
              <strong>Email:</strong> {currentUser.email}
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Статистика задач
          </Typography>
          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant='body1'>
              <strong>Всего задач:</strong> {userTasks.length}
            </Typography>
            <Typography variant='body1'>
              <strong>К выполнению:</strong> {tasksByStatus.todo}
            </Typography>
            <Typography variant='body1'>
              <strong>В процессе:</strong> {tasksByStatus.in_progress}
            </Typography>
            <Typography variant='body1'>
              <strong>Выполнено:</strong> {tasksByStatus.done}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
