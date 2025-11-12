import { TextField, TextFieldProps } from '@mui/material';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  variant?: 'outlined' | 'filled' | 'standard';
}

/**
 * Поле ввода
 * @param root0 - пропсы
 * @param root0.variant - вариант ввода
 */
export const ComponentsInput = ({
  variant = 'outlined',
  ...props
}: InputProps) => {
  return <TextField variant={variant} {...props} />;
};
