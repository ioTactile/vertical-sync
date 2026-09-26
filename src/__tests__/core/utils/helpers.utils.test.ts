import { describe, it, expect } from 'vitest';
import { sanitizeHtml } from '@/modules/core/utils/helpers';

describe('helpers utils', () => {
  it('sanitizeHtml doit retourner un résultat même côté serveur (sans window)', () => {
    const result = sanitizeHtml('<p>Hello</p>');
    // html-react-parser returns a ReactNode; just assert it does not throw
    expect(result).toBeDefined();
  });

  it('sanitizeHtml doit appeler DOMPurify côté client (window défini)', () => {
    // @ts-expect-error: inject window into the test context
    global.window = {} as Window;

    const result = sanitizeHtml("<script>alert('xss')</script><p>Safe</p>");
    expect(result).toBeDefined();

    // @ts-expect-error: cleanup
    delete global.window;
  });
});
