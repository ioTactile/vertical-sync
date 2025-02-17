import {
  CreateArticleDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  UpdateArticleDto,
  CreateArticleCommentDto,
  CreateArticleLikeDto,
} from "@/modules/core/model/Article";

export interface IArticleGateway {
  getArticles: (
    userId: string | undefined,
    page?: number
  ) => Promise<GetArticlesResponse>;
  getArticleBySlug: (slug: string) => Promise<GetArticleResponse>;
  getArticleById: (id: string) => Promise<GetArticleResponse>;
  createArticle: (article: CreateArticleDto) => Promise<{
    message: string;
  }>;

  updateArticle: (article: UpdateArticleDto) => Promise<{
    message: string;
  }>;
  deleteArticle: (id: string) => Promise<{
    message: string;
  }>;
  getArticleComments: (id: string) => Promise<GetArticleCommentsResponse>;
  createArticleComment: (articleComment: CreateArticleCommentDto) => Promise<{
    message: string;
  }>;
  deleteArticleComment: (
    articleId: string,
    articleCommentId: string
  ) => Promise<{
    message: string;
  }>;
  createArticleLike: (articleLike: CreateArticleLikeDto) => Promise<{
    message: string;
  }>;
  deleteArticleLike: (
    articleId: string,
    userId: string
  ) => Promise<{
    message: string;
  }>;
}
