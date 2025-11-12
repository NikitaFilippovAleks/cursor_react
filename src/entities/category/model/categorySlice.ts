import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Category } from './types';

interface CategoryState {
  categories: Category[];
}

const initialState: CategoryState = {
  categories: [
    { id: '1', name: 'Работа', color: '#1976d2' },
    { id: '2', name: 'Личное', color: '#2e7d32' },
    { id: '3', name: 'Срочное', color: '#d32f2f' }
  ]
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    /**
     * Добавление категории
     * @param state - состояние
     * @param action - действие
     */
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    /**
     * Удаление категории
     * @param state - состояние
     * @param action - действие
     */
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        cat => cat.id !== action.payload
      );
    }
  }
});

export const { addCategory, removeCategory } = categorySlice.actions;
export default categorySlice.reducer;
