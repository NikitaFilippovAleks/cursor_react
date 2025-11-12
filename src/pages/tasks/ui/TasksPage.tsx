import { Box, Container, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

import { Button } from '@/shared/ui/components';
import { CreateTaskForm } from '@/features/task-create';
import { FilterPanel } from '@/widgets/filter-panel';
import type { Task } from '@/entities/task';
import { TaskList } from '@/widgets/task-list';
import { useAppSelector } from '@/shared/lib/store';

/**
 * Страница задач
 */
export const TasksPage = () => {
  const { tasks } = useAppSelector(state => state.task);
  const { currentUser } = useAppSelector(state => state.user);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    let userTasks = tasks.filter(
      (task: Task) => task.userId === currentUser?.id
    );

    if (selectedCategoryId) {
      userTasks = userTasks.filter(
        (task: Task) => task.categoryId === selectedCategoryId
      );
    }

    return userTasks;
  }, [tasks, currentUser?.id, selectedCategoryId]);

  if (!currentUser) {
    return null;
  }

  return (
    <Container maxWidth='lg' sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3
        }}
      >
        <Typography variant='h4' component='h1'>
          Мои задачи
        </Typography>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Создать задачу
        </Button>
      </Box>

      <FilterPanel
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
      />

      <TaskList tasks={filteredTasks} />

      <CreateTaskForm
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </Container>
  );
};
