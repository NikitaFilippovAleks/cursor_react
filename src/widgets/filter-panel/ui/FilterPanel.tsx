import { TaskFilter } from '@/features/task-filter';

interface FilterPanelProps {
  selectedCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
}

/**
 * Панель фильтрации
 * @param root0 - пропсы
 * @param root0.selectedCategoryId - идентификатор выбранной категории
 * @param root0.onCategoryChange - функция для изменения выбранной категории
 */
export const FilterPanel = ({
  selectedCategoryId,
  onCategoryChange
}: FilterPanelProps) => {
  return (
    <TaskFilter
      selectedCategoryId={selectedCategoryId}
      onCategoryChange={onCategoryChange}
    />
  );
};
