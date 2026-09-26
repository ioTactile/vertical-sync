import { describe, it, expect } from 'vitest';
import { getCapitalize, getIdFromSlug } from '@/modules/core/utils/string';

describe('string utils', () => {
  it('getCapitalize doit mettre en majuscule la première lettre', () => {
    expect(getCapitalize('vertical')).toBe('Vertical');
    expect(getCapitalize('v')).toBe('V');
  });

  it('getIdFromSlug doit récupérer le dernier segment après le tiret', () => {
    expect(getIdFromSlug('my-awesome-slug-123')).toBe('123');
    expect(getIdFromSlug('id-only')).toBe('only');
  });
});
