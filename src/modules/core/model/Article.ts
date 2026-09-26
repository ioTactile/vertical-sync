import { CreateArticleInputs } from '@/modules/core/schemas/article/create-article';
import { UpdateArticleInputs } from '@/modules/core/schemas/article/update-article';
import { CreateArticleCommentInputs } from '@/modules/core/schemas/article/create-article-comment';
import { CreateArticleLikeInputs } from '@/modules/core/schemas/article/create-article-like';
import { DeleteArticleCommentInputs } from '@/modules/core/schemas/article/delete-article-comment';
import { Author } from '@/modules/core/model/User';

export type ArticleFilters = {
  userId?: string;
  page?: number;
  publishedOnly?: boolean;
};

/** Article entity (domain). */
export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl: string | null;
  excerpt: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type ArticleTagLink = {
  articleId: string;
  tagId: string;
  tag: {
    name: string;
  };
};

export type ArticleComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  articleId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
};

export type CreateArticleDto = {
  authorId: string;
} & CreateArticleInputs;

export type UpdateArticleDto = {
  id: string;
  updatedAt: Date;
} & UpdateArticleInputs;

type ArticleWithRelations = {
  author: Author;
  articleTags: ArticleTagLink[];
  articleLikes?: {
    userId: string;
  }[];
  _count: {
    articleComments: number;
    articleLikes: number;
  };
} & Article;

export type GetArticlesResponse = {
  articles: ArticleWithRelations[];
  total?: number;
};

export type GetArticleResponse = Article;

export type GetArticleWithRelationsResponse = ArticleWithRelations;

export type CreateArticleCommentDto = {
  articleId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
} & CreateArticleCommentInputs;

type ArticleCommentWithRelations = {
  author: Author;
  replies?: (ArticleComment & {
    author: Author;
    replyToUser: Author | null;
  })[];
  replyToUser: Author | null;
} & ArticleComment;

export type GetArticleCommentsResponse = ArticleCommentWithRelations[];

export type GetArticleCommentResponse = ArticleCommentWithRelations;

export type DeleteArticleCommentDto = DeleteArticleCommentInputs;

export type DeleteArticleDto = {
  id: string;
};

export type CreateArticleLikeDto = CreateArticleLikeInputs;
