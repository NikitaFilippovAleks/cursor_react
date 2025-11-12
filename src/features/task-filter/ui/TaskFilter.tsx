import { Box, Chip } from '@mui/material';

import type { Category } from '@/entities/category';
import { useAppSelector } from '@/shared/lib/store';

interface TaskFilterProps {
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

/**
 * Фильтрация задач по категории
 * @param root0 - пропсы
 * @param root0.selectedCategoryId - идентификатор выбранной категории
 * @param root0.onCategoryChange - функция для изменения выбранной категории
 */
export const TaskFilter = ({
  selectedCategoryId,
  onCategoryChange
}: TaskFilterProps) => {
  const { categories } = useAppSelector(state => state.category);

  return (
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
      <Chip
        label='Все'
        onClick={() => onCategoryChange(null)}
        color={selectedCategoryId === null ? 'primary' : 'default'}
        variant={selectedCategoryId === null ? 'filled' : 'outlined'}
      />
      {categories.map((category: Category) => (
        <Chip
          key={category.id}
          label={category.name}
          onClick={() => onCategoryChange(category.id)}
          color={selectedCategoryId === category.id ? 'primary' : 'default'}
          variant={selectedCategoryId === category.id ? 'filled' : 'outlined'}
          sx={{
            backgroundColor:
              selectedCategoryId === category.id ? category.color : undefined,
            '&:hover': {
              backgroundColor: category.color + '40'
            }
          }}
        />
      ))}
    </Box>
  );
};
