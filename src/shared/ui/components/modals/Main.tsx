import { Dialog, DialogProps } from '@mui/material';

interface ModalProps extends Omit<DialogProps, 'open'> {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Модальное окно
 * @param root0 - пропсы
 * @param root0.open - открытие модального окна
 * @param root0.onClose - закрытие модального окна
 * @param root0.children - дочерние элементы модального окна
 */
export const ModalsMain = ({
  open,
  onClose,
  children,
  ...props
}: ModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} {...props}>
      {children}
    </Dialog>
  );
};
