import { MenuItem } from '@mui/material';

import { Input } from '@/shared/ui/components';
import type { TaskStatus } from '@/entities/task';
import { updateTaskStatus } from '@/entities/task';
import { useAppDispatch } from '@/shared/lib/store';

interface UpdateTaskStatusProps {
  taskId: string;
  currentStatus: TaskStatus;
}

/**
 * Изменение статуса задачи
 * @param root0 - пропсы
 * @param root0.taskId - идентификатор задачи
 * @param root0.currentStatus - текущий статус задачи
 */
export const UpdateTaskStatus = ({
  taskId,
  currentStatus
}: UpdateTaskStatusProps) => {
  const dispatch = useAppDispatch();

  /**
   * Обработчик изменения статуса задачи
   * @param e - событие изменения статуса задачи
   */
  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.target.value as TaskStatus;
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const statusLabels: Record<TaskStatus, string> = {
    todo: 'К выполнению',
    in_progress: 'В процессе',
    done: 'Выполнено'
  };

  return (
    <Input
      select
      size='small'
      value={currentStatus}
      onChange={handleStatusChange}
      sx={{ minWidth: 150 }}
    >
      {Object.entries(statusLabels).map(([value, label]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Input>
  );
};
