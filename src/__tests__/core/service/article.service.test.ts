import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  ArticleService,
  isArticleCuid,
} from "@/modules/core/service/article.service";
import type { IArticleRepository } from "@/modules/core/repository/article.repository";
import type {
  GetArticleResponse,
  GetArticlesResponse,
} from "@/modules/core/model/Article";

function createFakeArticleRepository(
  overrides: Partial<IArticleRepository> = {}
): IArticleRepository {
  return {
    findMany: vi.fn(),
    findBySlug: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    updatePublishStatus: vi.fn(),
    delete: vi.fn(),
    getArticleComments: vi.fn(),
    createArticleComment: vi.fn(),
    deleteArticleComment: vi.fn(),
    like: vi.fn(),
    unlike: vi.fn(),
    ...overrides,
  };
}

describe("isArticleCuid", () => {
  it("détecte un CUID valide", () => {
    expect(isArticleCuid("clxy1234567890abcdefghijkl")).toBe(true);
  });

  it("rejette un slug", () => {
    expect(isArticleCuid("mon-article-slug-1739205155676")).toBe(false);
  });
});

describe("ArticleService", () => {
  let repository: IArticleRepository;
  let service: ArticleService;

  beforeEach(() => {
    repository = createFakeArticleRepository();
    service = new ArticleService(repository);
  });

  it("getPublicArticles délègue au repository avec publishedOnly par défaut", async () => {
    const response: GetArticlesResponse = { articles: [], total: 0 };
    vi.mocked(repository.findMany).mockResolvedValue(response);

    const result = await service.getPublicArticles({ page: 1, userId: "u1" });

    expect(repository.findMany).toHaveBeenCalledWith({
      page: 1,
      userId: "u1",
    });
    expect(result).toBe(response);
  });

  it("getAdminArticles force publishedOnly: false", async () => {
    vi.mocked(repository.findMany).mockResolvedValue({ articles: [] });

    await service.getAdminArticles();

    expect(repository.findMany).toHaveBeenCalledWith({
      publishedOnly: false,
    });
  });

  it("getArticleByIdentifier utilise findById pour un CUID", async () => {
    const article = { id: "clxy1234567890abcdefghijkl" } as GetArticleResponse;
    vi.mocked(repository.findById).mockResolvedValue(article);

    const result = await service.getArticleByIdentifier(
      "clxy1234567890abcdefghijkl",
      true
    );

    expect(repository.findById).toHaveBeenCalledWith(
      "clxy1234567890abcdefghijkl",
      true
    );
    expect(repository.findBySlug).not.toHaveBeenCalled();
    expect(result).toBe(article);
  });

  it("getArticleByIdentifier utilise findBySlug pour un slug", async () => {
    const article = { id: "a1", slug: "hello" } as GetArticleResponse;
    vi.mocked(repository.findBySlug).mockResolvedValue(article);

    const result = await service.getArticleByIdentifier("hello-world", false);

    expect(repository.findBySlug).toHaveBeenCalledWith("hello-world", false);
    expect(repository.findById).not.toHaveBeenCalled();
    expect(result).toBe(article);
  });

  it("likeArticle / unlikeArticle délèguent au repository", async () => {
    await service.likeArticle("a1", "u1");
    await service.unlikeArticle("a1", "u1");

    expect(repository.like).toHaveBeenCalledWith("a1", "u1");
    expect(repository.unlike).toHaveBeenCalledWith("a1", "u1");
  });

  it("deleteArticle délègue au repository", async () => {
    await service.deleteArticle("a1");
    expect(repository.delete).toHaveBeenCalledWith("a1");
  });
});
