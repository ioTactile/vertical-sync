import { describe, it, expect, vi, beforeEach } from "vitest";
import { ArticleService } from "@/modules/core/service/article.service";
import type { IArticleRepository } from "@/modules/core/repository/article.repository";
import { DomainError } from "@/modules/core/domain/errors";

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

describe("ArticleService (règles métier)", () => {
  let repository: IArticleRepository;
  let service: ArticleService;

  beforeEach(() => {
    repository = createFakeArticleRepository();
    service = new ArticleService(repository);
  });

  it("createArticle génère un slug et valide le titre", async () => {
    await expect(
      service.createArticle({
        authorId: "user_1",
        title: "",
        content: "x",
        imageUrl: null,
        excerpt: null,
        published: false,
        articleTags: [],
      })
    ).rejects.toBeInstanceOf(DomainError);

    await service.createArticle({
      authorId: "user_1",
      title: "Mon Article Cool",
      content: "contenu",
      imageUrl: null,
      excerpt: null,
      published: false,
      articleTags: [],
    });

    expect(repository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Mon Article Cool",
        slug: expect.stringMatching(/^mon-article-cool-\d+$/),
      })
    );
  });

  it("updateArticle exige un titre", async () => {
    await expect(
      service.updateArticle({
        id: "a1",
        title: "",
        content: "x",
        imageUrl: null,
        excerpt: null,
        published: false,
        articleTags: [],
        updatedAt: new Date(),
      })
    ).rejects.toMatchObject({ code: "VALIDATION" });
  });
});
