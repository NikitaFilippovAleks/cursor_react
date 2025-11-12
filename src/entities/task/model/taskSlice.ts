import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Task, TaskStatus } from './types';

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: []
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    /**
     * Добавление задачи
     * @param state - состояние
     * @param action - действие
     */
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    /**
     * Изменение статуса задачи
     * @param state - состояние
     * @param action - действие
     */
    updateTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    },
    /**
     * Изменение задачи
     * @param state - состояние
     * @param action - действие
     */
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString()
        };
      }
    },
    /**
     * Удаление задачи
     * @param state - состояние
     * @param action - действие
     */
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    }
  }
});

export const { addTask, updateTaskStatus, updateTask, removeTask } =
  taskSlice.actions;
export default taskSlice.reducer;
