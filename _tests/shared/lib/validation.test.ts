import { describe, expect, it } from 'vitest';

import {
  isNotEmpty,
  isValidEmail,
  isValidPassword
} from '../../../src/shared/lib/validation';

describe('isValidEmail', () => {
  it('должен возвращать true для валидного email', () => {
    expect(isValidEmail('test@example.com')).toBe(true);
    expect(isValidEmail('user.name@domain.co.uk')).toBe(true);
  });

  it('должен возвращать false для невалидного email', () => {
    expect(isValidEmail('invalid-email')).toBe(false);
    expect(isValidEmail('test@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('должен возвращать true для пароля длиной >= 6 символов', () => {
    expect(isValidPassword('123456')).toBe(true);
    expect(isValidPassword('password123')).toBe(true);
  });

  it('должен возвращать false для пароля длиной < 6 символов', () => {
    expect(isValidPassword('12345')).toBe(false);
    expect(isValidPassword('pass')).toBe(false);
  });
});

describe('isNotEmpty', () => {
  it('должен возвращать true для непустой строки', () => {
    expect(isNotEmpty('text')).toBe(true);
    expect(isNotEmpty('  text  ')).toBe(true);
  });

  it('должен возвращать false для пустой строки', () => {
    expect(isNotEmpty('')).toBe(false);
    expect(isNotEmpty('   ')).toBe(false);
  });
});
