/**
 * Валидация email
 * @param email - email для проверки
 * @returns true если email валиден
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация пароля (минимум 6 символов)
 * @param password - пароль для проверки
 * @returns true если пароль валиден
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Валидация непустой строки
 * @param value - строка для проверки
 * @returns true если строка не пустая
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};
