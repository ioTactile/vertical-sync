import {
  ArticleFilters,
  articleRepository,
  IArticleRepository,
} from "@/modules/core/repository/article.repository";
import {
  CreateArticleCommentDto,
  CreateArticleDto,
  DeleteArticleCommentDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  GetArticleWithRelationsResponse,
  UpdateArticleDto,
} from "@/modules/core/model/Article";

export class ArticleService {
  constructor(private readonly articleRepository: IArticleRepository) {}

  async getPublicArticles({
    userId,
    page,
  }: Omit<ArticleFilters, "publishedOnly">): Promise<GetArticlesResponse> {
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
    withRelations?: boolean
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    return await this.articleRepository.findById(id, withRelations);
  }

  async getArticleBySlug(
    slug: string,
    withRelations?: boolean
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    return await this.articleRepository.findBySlug(slug, withRelations);
  }

  async createArticle(data: CreateArticleDto): Promise<void> {
    return await this.articleRepository.create(data);
  }

  async updateArticle(data: UpdateArticleDto): Promise<void> {
    return await this.articleRepository.update(data);
  }

  async updateArticlePublishStatus(
    id: string,
    published: boolean
  ): Promise<void> {
    return await this.articleRepository.updatePublishStatus(id, published);
  }

  async deleteArticle(id: string): Promise<void> {
    await this.articleRepository.delete(id);
  }

  async getArticleComments(
    articleId: string
  ): Promise<GetArticleCommentsResponse> {
    return await this.articleRepository.getArticleComments(articleId);
  }

  async createArticleComment(data: CreateArticleCommentDto): Promise<void> {
    return await this.articleRepository.createArticleComment(data);
  }

  async deleteArticleComment(data: DeleteArticleCommentDto): Promise<void> {
    return await this.articleRepository.deleteArticleComment(data);
  }

  async likeArticle(articleId: string, userId: string): Promise<void> {
    await this.articleRepository.like(articleId, userId);
  }

  async unlikeArticle(articleId: string, userId: string): Promise<void> {
    await this.articleRepository.unlike(articleId, userId);
  }
}

export const articleService = new ArticleService(articleRepository);
