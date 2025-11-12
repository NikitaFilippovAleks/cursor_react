import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { isValidEmail, isValidPassword } from '@/shared/lib';
import { ButtonsMain } from '@/shared/ui/components/buttons/Main';
import { InputsMain } from '@/shared/ui/components/inputs/Main';
import { setUser } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/store';
import type { User } from '@/entities/user';

/**
 * Форма авторизации
 */
export const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  /**
   * Обработчик отправки формы
   * @param e - событие отправки формы
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Введите корректный email');
      return;
    }

    if (!isValidPassword(password)) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (!isLogin && !name.trim()) {
      setError('Введите имя');
      return;
    }

    // Простая авторизация через localStorage
    const user: User = {
      id: Date.now().toString(),
      email,
      name: isLogin ? email.split('@')[0] : name
    };

    dispatch(setUser(user));
    navigate('/tasks');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        maxWidth: 400,
        margin: '0 auto',
        padding: 3
      }}
    >
      <Typography variant='h4' component='h1' gutterBottom>
        {isLogin ? 'Вход' : 'Регистрация'}
      </Typography>

      <Box
        component='form'
        onSubmit={handleSubmit}
        sx={{ width: '100%', mt: 2 }}
      >
        {!isLogin && (
          <InputsMain
            fullWidth
            label='Имя'
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            margin='normal'
            required
          />
        )}

        <InputsMain
          fullWidth
          type='email'
          label='Email'
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          margin='normal'
          required
        />

        <InputsMain
          fullWidth
          type='password'
          label='Пароль'
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          margin='normal'
          required
        />

        {error && (
          <Typography color='error' sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <ButtonsMain type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </ButtonsMain>

        <ButtonsMain
          type='button'
          variant='text'
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
        >
          {isLogin
            ? 'Нет аккаунта? Зарегистрироваться'
            : 'Уже есть аккаунт? Войти'}
        </ButtonsMain>
      </Box>
    </Box>
  );
};
