import {
  CreateArticleCommentDto,
  CreateArticleDto,
  CreateArticleLikeDto,
  DeleteArticleCommentDto,
  UpdateArticleDto,
} from "@/modules/core/model/Article";
import { Article, ArticleComment, ArticleLike } from "@/prisma/client";

export const mockArticle: Article = {
  id: "1",
  title: "Test Article",
  content: "Test content",
  slug: "test-article",
  imageUrl: "https://example.com/image.jpg",
  excerpt: "Test excerpt",
  published: true,
  authorId: "user_1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockArticles: Article[] = [
  { ...mockArticle, id: "1" },
  { ...mockArticle, id: "2" },
];

export const mockArticleDto: CreateArticleDto = {
  title: "Test Article",
  content: "Test content",
  authorId: "user_1",
  imageUrl: "https://example.com/image.jpg",
  excerpt: "Test excerpt",
  articleTags: [],
  published: true,
};

export const mockUpdateArticleDto: UpdateArticleDto = {
  ...mockArticleDto,
  id: "1",
  updatedAt: new Date(),
};

export const mockArticleComment: ArticleComment = {
  id: "1",
  content: "Test comment",
  articleId: "1",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "user_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockCreateArticleCommentDto: CreateArticleCommentDto = {
  content: "Test comment",
  articleId: "1",
  authorId: "user_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockDeleteArticleCommentDto: DeleteArticleCommentDto = {
  articleId: "1",
  articleCommentId: "1",
};

export const mockArticleComments: ArticleComment[] = [
  { ...mockArticleComment, id: "1" },
  { ...mockArticleComment, id: "2" },
];

export const mockArticleLikeDto: CreateArticleLikeDto = {
  articleId: "1",
  userId: "user_1",
};

export const mockArticleLike: ArticleLike = {
  articleId: "1",
  userId: "user_1",
  createdAt: new Date(),
};
