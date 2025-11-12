import { Box, Card, CardContent, Chip, Typography } from '@mui/material';

import { formatDate } from '@/shared/lib';
import type { Task } from '@/entities/task';
import { UpdateTaskStatus } from '@/features/task-update-status';
import { useAppSelector } from '@/shared/lib/store';

interface TaskListProps {
  tasks: Task[];
}

/**
 * Список задач
 * @param root0 - пропсы
 * @param root0.tasks - список задач
 */
export const TaskList = ({ tasks }: TaskListProps) => {
  const { categories } = useAppSelector(state => state.category);

  /**
   * Получение названия категории
   * @param categoryId - идентификатор категории
   */
  const getCategoryName = (categoryId: string) => {
    return (
      categories.find(cat => cat.id === categoryId)?.name || 'Без категории'
    );
  };

  /**
   * Получение цвета категории
   * @param categoryId - идентификатор категории
   */
  const getCategoryColor = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.color || '#757575';
  };

  if (tasks.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant='h6' color='text.secondary'>
          Нет задач
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {tasks.map(task => (
        <Card key={task.id} sx={{ width: '100%' }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 1
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant='h6' component='h3' gutterBottom>
                  {task.title}
                </Typography>
                {task.description && (
                  <Typography variant='body2' color='text.secondary' paragraph>
                    {task.description}
                  </Typography>
                )}
                <Box
                  sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 2 }}
                >
                  <Chip
                    label={getCategoryName(task.categoryId)}
                    size='small'
                    sx={{
                      backgroundColor: getCategoryColor(task.categoryId) + '20',
                      color: getCategoryColor(task.categoryId)
                    }}
                  />
                  <Typography variant='caption' color='text.secondary'>
                    Создано: {formatDate(task.createdAt)}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ ml: 2 }}>
                <UpdateTaskStatus
                  taskId={task.id}
                  currentStatus={task.status}
                />
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
