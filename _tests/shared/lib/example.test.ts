import { describe, expect, it } from 'vitest';

import { exampleFunc } from '@/shared/lib/example';

describe('exampleFunc', () => {
  it('should be true', () => {
    expect(exampleFunc()).toBe('example');
  });
});
