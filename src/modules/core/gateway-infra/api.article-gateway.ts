import { IArticleGateway } from "@/modules/core/gateway/article.gateway";
import {
  ArticleFilters,
  CreateArticleDto,
  CreateArticleLikeDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticleWithRelationsResponse,
  GetArticlesResponse,
  UpdateArticleDto,
  CreateArticleCommentDto,
} from "@/modules/core/model/Article";
import { axiosInstance } from "@/lib/globals";

export class ApiArticleGateway implements IArticleGateway {
  async getPublicArticles(
    filters: Omit<ArticleFilters, "publishedOnly">
  ): Promise<GetArticlesResponse> {
    const params = {
      ...(filters.userId && { userId: filters.userId }),
      ...(filters.page && { page: filters.page }),
    };

    const response = await axiosInstance.get<GetArticlesResponse>("/api/blog", {
      params,
    });
    return response.data;
  }

  async getAdminArticles(): Promise<GetArticlesResponse> {
    const response = await axiosInstance.get<GetArticlesResponse>(
      "/api/admin/blog"
    );
    return response.data;
  }

  async getArticleBySlug(slug: string): Promise<GetArticleResponse> {
    const response = await axiosInstance.get<GetArticleResponse>(
      `/api/blog/${slug}`
    );
    return response.data;
  }

  async getArticleBySlugWithRelations(
    slug: string
  ): Promise<GetArticleWithRelationsResponse> {
    const response = await axiosInstance.get<GetArticleWithRelationsResponse>(
      `/api/blog/${slug}?withRelations=true`
    );
    return response.data;
  }
  async getArticleById(id: string): Promise<GetArticleResponse> {
    const response = await axiosInstance.get<GetArticleResponse>(
      `/api/blog/${id}`
    );
    return response.data;
  }

  async getArticleByIdWithRelations(
    id: string
  ): Promise<GetArticleWithRelationsResponse> {
    const response = await axiosInstance.get<GetArticleWithRelationsResponse>(
      `/api/blog/${id}?withRelations=true`
    );
    return response.data;
  }

  async getArticleComments(id: string): Promise<GetArticleCommentsResponse> {
    const response = await axiosInstance.get<GetArticleCommentsResponse>(
      `/api/blog/${id}/comment`
    );
    return response.data;
  }

  async createArticle(article: CreateArticleDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post("/api/blog", article);
    return response.data;
  }

  async updateArticle(article: UpdateArticleDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch(
      `/api/blog/${article.id}`,
      article
    );
    return response.data;
  }

  async updateArticlePublishStatus(
    id: string,
    published: boolean
  ): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.patch(`/api/blog/${id}/publish`, {
      id,
      published,
    });
    return response.data;
  }

  async deleteArticle(id: string): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/blog/${id}`, {
      data: { id },
    });
    return response.data;
  }

  async createArticleComment(articleComment: CreateArticleCommentDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post(
      `/api/blog/${articleComment.articleId}/comment`,
      articleComment
    );
    return response.data;
  }

  async deleteArticleComment(
    articleId: string,
    articleCommentId: string
  ): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(
      `/api/blog/${articleId}/comment/${articleCommentId}`,
      {
        data: { articleId, articleCommentId },
      }
    );
    return response.data;
  }

  async createArticleLike(articleLike: CreateArticleLikeDto): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.post(
      `/api/blog/${articleLike.articleId}/like`,
      articleLike
    );
    return response.data;
  }

  async deleteArticleLike(
    articleId: string,
    userId: string
  ): Promise<{
    message: string;
  }> {
    const response = await axiosInstance.delete(`/api/blog/${articleId}/like`, {
      data: { articleId, userId },
    });
    return response.data;
  }
}

export const articleGateway = new ApiArticleGateway();
