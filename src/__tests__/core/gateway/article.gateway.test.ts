import { describe, it, expect, vi, beforeEach } from 'vitest';
import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';
import { axiosInstance } from '@/lib/globals';
import {
  mockArticle,
  mockCreateArticleCommentDto,
  mockArticleDto,
  mockArticleLike,
  mockArticleLikeDto,
  mockArticles,
  mockUpdateArticleDto,
  mockDeleteArticleCommentDto,
} from '@/__tests__/fixtures/article.fixture';
import { mockUser } from '@/__tests__/fixtures/user.fixture';
import { ArticleFilters } from '@/modules/core/model/Article';

vi.mock('@/lib/globals', () => ({
  axiosInstance: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('ArticleGateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('devrait récupérer la liste des articles', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockArticles,
    });

    const filters: ArticleFilters = {
      userId: mockUser.id,
      page: 1,
    };

    const result = await articleGateway.getPublicArticles(filters);
    expect(result).toEqual(mockArticles);
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/blog', {
      params: {
        userId: mockUser.id,
        page: 1,
      },
    });
  });

  it('devrait récupérer un article par son id', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockArticle,
    });

    const result = await articleGateway.getArticleById(mockArticle.id);
    expect(result).toEqual(mockArticle);
    expect(axiosInstance.get).toHaveBeenCalledWith(`/api/blog/${mockArticle.id}`);
  });

  it('devrait récupérer un article par son slug', async () => {
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockArticle,
    });

    const result = await articleGateway.getArticleBySlug(mockArticle.slug);
    expect(result).toEqual(mockArticle);
    expect(axiosInstance.get).toHaveBeenCalledWith(`/api/blog/${mockArticle.slug}`);
  });

  it('devrait créer un nouvel article', async () => {
    const mockResponse = {
      message: 'Article créé',
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticle(mockArticleDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith('/api/blog', mockArticleDto);
  });

  it('devrait mettre à jour un article', async () => {
    const mockResponse = {
      message: 'Article mis à jour',
    };

    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.updateArticle(mockUpdateArticleDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.patch).toHaveBeenCalledWith(
      `/api/blog/${mockArticle.id}`,
      mockUpdateArticleDto,
    );
  });

  it('devrait supprimer un article', async () => {
    const mockResponse = { message: 'Article supprimé' };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticle(mockArticle.id);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(`/api/blog/${mockArticle.id}`, {
      data: {
        id: mockArticle.id,
      },
    });
  });

  it('devrait créer un nouveau commentaire pour un article', async () => {
    const mockResponse = {
      message: 'Commentaire créé',
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticleComment(mockCreateArticleCommentDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/blog/${mockCreateArticleCommentDto.articleId}/comment`,
      mockCreateArticleCommentDto,
    );
  });

  it("devrait supprimer un commentaire d'article", async () => {
    const mockResponse = { message: 'Commentaire supprimé' };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticleComment(
      mockDeleteArticleCommentDto.articleId,
      mockDeleteArticleCommentDto.articleCommentId,
    );
    expect(result).toEqual(mockResponse);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/blog/${mockDeleteArticleCommentDto.articleId}/comment/${mockDeleteArticleCommentDto.articleCommentId}`,
      {
        data: {
          articleId: mockDeleteArticleCommentDto.articleId,
          articleCommentId: mockDeleteArticleCommentDto.articleCommentId,
        },
      },
    );
  });

  it('devrait créer un like pour un article', async () => {
    const mockResponse = {
      message: 'Article liké',
    };

    vi.mocked(axiosInstance.post).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.createArticleLike(mockArticleLikeDto);
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.post).toHaveBeenCalledWith(
      `/api/blog/${mockArticleLikeDto.articleId}/like`,
      mockArticleLikeDto,
    );
  });

  it('devrait supprimer un like pour un article', async () => {
    const mockResponse = { message: 'Like supprimé' };

    vi.mocked(axiosInstance.delete).mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await articleGateway.deleteArticleLike(
      mockArticleLike.articleId,
      mockArticleLike.userId,
    );
    expect(result).toEqual(mockResponse);
    expect(axiosInstance.delete).toHaveBeenCalledWith(
      `/api/blog/${mockArticleLike.articleId}/like`,
      {
        data: {
          articleId: mockArticleLike.articleId,
          userId: mockArticleLike.userId,
        },
      },
    );
  });
});
