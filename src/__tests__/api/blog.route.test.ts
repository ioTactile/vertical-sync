import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';

vi.mock('@/modules/core/di/container', () => ({
  articleService: {
    getPublicArticles: vi.fn(),
    createArticle: vi.fn(),
    getArticleByIdentifier: vi.fn(),
    updateArticle: vi.fn(),
    deleteArticle: vi.fn(),
  },
}));

import { articleService } from '@/modules/core/di/container';
import { GET as getBlog, POST as postBlog } from '@/app/api/blog/route';
import { GET as getArticle } from '@/app/api/blog/[id]/route';
import { DomainError } from '@/modules/core/domain/errors';

describe('API /api/blog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GET retourne les articles publics', async () => {
    vi.mocked(articleService.getPublicArticles).mockResolvedValue({
      articles: [],
      total: 0,
    });

    const request = new NextRequest('http://localhost/api/blog?page=1&userId=u1');
    const response = await getBlog(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(articleService.getPublicArticles).toHaveBeenCalledWith({
      userId: 'u1',
      page: 1,
    });
    expect(body).toEqual({ articles: [], total: 0 });
  });

  it('POST mappe DomainError VALIDATION → 400', async () => {
    vi.mocked(articleService.createArticle).mockRejectedValue(
      new DomainError('Titre requis', 'VALIDATION'),
    );

    const request = new NextRequest('http://localhost/api/blog', {
      method: 'POST',
      body: JSON.stringify({ title: '' }),
    });
    const response = await postBlog(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.code).toBe('VALIDATION');
  });

  it('GET [id] retourne 404 si absent', async () => {
    vi.mocked(articleService.getArticleByIdentifier).mockResolvedValue(null);

    const request = new NextRequest('http://localhost/api/blog/unknown-slug');
    const response = await getArticle(request, {
      params: Promise.resolve({ id: 'unknown-slug' }),
    });

    expect(response.status).toBe(404);
  });
});
