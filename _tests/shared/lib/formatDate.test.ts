import { describe, expect, it } from 'vitest';

import { formatDate } from '../../../src/shared/lib/formatDate';

describe('formatDate', () => {
  it('должен форматировать дату в читаемый формат', () => {
    const dateString = '2024-01-15T10:30:00.000Z';
    const formatted = formatDate(dateString);
    expect(formatted).toContain('2024');
    expect(formatted).toContain('15');
  });

  it('должен обрабатывать различные форматы дат', () => {
    const dateString = '2024-12-31T23:59:59.000Z';
    const formatted = formatDate(dateString);
    expect(formatted).toBeTruthy();
    expect(typeof formatted).toBe('string');
  });
});
