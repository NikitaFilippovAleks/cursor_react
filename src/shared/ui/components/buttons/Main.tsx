import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps
} from '@mui/material';

interface ButtonProps extends MuiButtonProps {
  children: React.ReactNode;
}

/**
 * Кнопка
 * @param root0 - пропсы
 * @param root0.children - дочерние элементы кнопки
 */
export const ButtonsMain = ({ children, ...props }: ButtonProps) => {
  return <MuiButton {...props}>{children}</MuiButton>;
};
