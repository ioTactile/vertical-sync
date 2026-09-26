import { IArticleRepository } from '@/modules/core/repository/article.repository';
import {
  ArticleFilters,
  CreateArticleCommentDto,
  CreateArticleDto,
  DeleteArticleCommentDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  GetArticleWithRelationsResponse,
  UpdateArticleDto,
} from '@/modules/core/model/Article';
import { DomainError } from '@/modules/core/domain/errors';
import { buildArticleSlug } from '@/modules/core/utils/string';

const CUID_PATTERN = /^c[a-z0-9]{24,27}$/i;

export function isArticleCuid(identifier: string): boolean {
  return CUID_PATTERN.test(identifier);
}

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async getPublicArticles({
    userId,
    page,
  }: Omit<ArticleFilters, 'publishedOnly'>): Promise<GetArticlesResponse> {
    return await this.articleRepository.findMany({
      userId,
      page,
    });
  }

  async getAdminArticles(): Promise<GetArticlesResponse> {
    return await this.articleRepository.findMany({
      publishedOnly: false,
    });
  }

  async getArticleById(
    id: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    return await this.articleRepository.findById(id, withRelations);
  }

  async getArticleBySlug(
    slug: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    return await this.articleRepository.findBySlug(slug, withRelations);
  }

  /** Resolves an article by CUID or slug (domain rule, not HTTP). */
  async getArticleByIdentifier(
    identifier: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    if (!identifier?.trim()) {
      throw new DomainError('Identifiant article requis', 'VALIDATION');
    }
    if (isArticleCuid(identifier)) {
      return await this.getArticleById(identifier, withRelations);
    }
    return await this.getArticleBySlug(identifier, withRelations);
  }

  async createArticle(data: CreateArticleDto): Promise<void> {
    if (!data.authorId?.trim()) {
      throw new DomainError('Auteur requis', 'VALIDATION');
    }
    if (!data.title?.trim()) {
      throw new DomainError('Titre requis', 'VALIDATION');
    }
    if ((data.articleTags?.length ?? 0) > 3) {
      throw new DomainError('Maximum 3 tags autorisés', 'VALIDATION');
    }
    const slug = buildArticleSlug(data.title);
    return await this.articleRepository.create({ ...data, slug });
  }

  async updateArticle(data: UpdateArticleDto): Promise<void> {
    if (!data.id?.trim()) {
      throw new DomainError('Id article requis', 'VALIDATION');
    }
    if (!data.title?.trim()) {
      throw new DomainError('Titre requis', 'VALIDATION');
    }
    const slug = buildArticleSlug(data.title);
    return await this.articleRepository.update({ ...data, slug });
  }

  async updateArticlePublishStatus(id: string, published: boolean): Promise<void> {
    if (!id?.trim()) {
      throw new DomainError('Id article requis', 'VALIDATION');
    }
    return await this.articleRepository.updatePublishStatus(id, published);
  }

  async deleteArticle(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new DomainError('Id article requis', 'VALIDATION');
    }
    await this.articleRepository.delete(id);
  }

  async getArticleComments(articleId: string): Promise<GetArticleCommentsResponse> {
    return await this.articleRepository.getArticleComments(articleId);
  }

  async createArticleComment(data: CreateArticleCommentDto): Promise<void> {
    if (!data.content?.trim()) {
      throw new DomainError('Contenu du commentaire requis', 'VALIDATION');
    }
    return await this.articleRepository.createArticleComment(data);
  }

  async deleteArticleComment(data: DeleteArticleCommentDto): Promise<void> {
    return await this.articleRepository.deleteArticleComment(data);
  }

  async likeArticle(articleId: string, userId: string): Promise<void> {
    if (!articleId || !userId) {
      throw new DomainError('articleId et userId requis', 'VALIDATION');
    }
    await this.articleRepository.like(articleId, userId);
  }

  async unlikeArticle(articleId: string, userId: string): Promise<void> {
    if (!articleId || !userId) {
      throw new DomainError('articleId et userId requis', 'VALIDATION');
    }
    await this.articleRepository.unlike(articleId, userId);
  }
}
