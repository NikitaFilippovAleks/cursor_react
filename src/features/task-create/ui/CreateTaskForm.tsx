import { Box, DialogContent, DialogTitle, MenuItem } from '@mui/material';
import { useState } from 'react';

import { Button, Input, Modal } from '@/shared/ui/components';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { addTask } from '@/entities/task';
import { isNotEmpty } from '@/shared/lib';
import type { Task } from '@/entities/task';

interface CreateTaskFormProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Форма создания задачи
 * @param root0 - пропсы
 * @param root0.open - открытие формы
 * @param root0.onClose - закрытие формы
 */
export const CreateTaskForm = ({ open, onClose }: CreateTaskFormProps) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state => state.user);
  const { categories } = useAppSelector(state => state.category);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [error, setError] = useState('');

  /**
   * Обработчик отправки формы
   * @param e - событие отправки формы
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isNotEmpty(title)) {
      setError('Введите название задачи');
      return;
    }

    if (!currentUser) {
      setError('Необходима авторизация');
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'todo',
      categoryId,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    setCategoryId(categories[0]?.id || '');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <DialogTitle>Создать задачу</DialogTitle>
      <DialogContent>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <Input
            fullWidth
            label='Название'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            margin='normal'
            required
          />

          <Input
            fullWidth
            label='Описание'
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDescription(e.target.value)
            }
            margin='normal'
            multiline
            rows={3}
          />

          <Input
            fullWidth
            select
            label='Категория'
            value={categoryId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCategoryId(e.target.value)
            }
            margin='normal'
            required
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Input>

          {error && <Box sx={{ mt: 1, color: 'error.main' }}>{error}</Box>}

          <Box
            sx={{ display: 'flex', gap: 1, mt: 2, justifyContent: 'flex-end' }}
          >
            <Button variant='outlined' onClick={onClose}>
              Отмена
            </Button>
            <Button type='submit' variant='contained'>
              Создать
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Modal>
  );
};
