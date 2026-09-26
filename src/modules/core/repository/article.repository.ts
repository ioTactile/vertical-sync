import prisma from '@/prisma';
import {
  ArticleFilters,
  DeleteArticleCommentDto,
  GetArticleCommentsResponse,
  GetArticleResponse,
  GetArticlesResponse,
  GetArticleWithRelationsResponse,
  UpdateArticleDto,
  CreateArticleDto,
  CreateArticleCommentDto,
} from '@/modules/core/model/Article';

export type { ArticleFilters };

export interface IArticleRepository {
  findMany(filters: ArticleFilters): Promise<GetArticlesResponse>;
  findBySlug(
    slug: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null>;
  findById(
    id: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null>;
  create(data: CreateArticleDto & { slug: string }): Promise<void>;
  update(data: UpdateArticleDto & { slug: string }): Promise<void>;
  updatePublishStatus(id: string, published: boolean): Promise<void>;
  delete(id: string): Promise<void>;
  getArticleComments(articleId: string): Promise<GetArticleCommentsResponse>;
  createArticleComment(data: CreateArticleCommentDto): Promise<void>;
  deleteArticleComment(data: DeleteArticleCommentDto): Promise<void>;
  like(articleId: string, userId: string): Promise<void>;
  unlike(articleId: string, userId: string): Promise<void>;
}

export class PrismaArticleRepository implements IArticleRepository {
  async findMany(filters: ArticleFilters): Promise<GetArticlesResponse> {
    const { userId, page, publishedOnly = true } = filters;

    const articlesPromise = prisma.article.findMany({
      include: {
        author: {
          select: {
            id: true,
            clerkId: true,
            name: true,
            imageUrl: true,
          },
        },
        articleTags: {
          include: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        articleLikes: userId
          ? {
              select: {
                userId: true,
              },
              where: {
                userId: userId,
              },
            }
          : false,
        _count: {
          select: {
            articleComments: true,
            articleLikes: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ...(publishedOnly && { published: true }),
      },
      skip: page ? (page - 1) * 10 : 0,
      take: page ? 10 : undefined,
    });

    if (page) {
      const totalPromise = prisma.article.count({
        where: {
          ...(publishedOnly && { published: true }),
        },
      });

      const [articles, total] = await Promise.all([articlesPromise, totalPromise]);

      return {
        articles,
        total,
      };
    }

    const articles = await articlesPromise;

    return {
      articles,
    };
  }

  async findBySlug(
    slug: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    if (withRelations) {
      return await prisma.article.findUnique({
        where: { slug: slug, published: true },
        include: {
          author: {
            select: {
              id: true,
              clerkId: true,
              name: true,
              imageUrl: true,
            },
          },
          articleTags: {
            include: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
          },
          articleLikes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              articleComments: true,
              articleLikes: true,
            },
          },
        },
      });
    }

    return await prisma.article.findUnique({
      where: { slug: slug, published: true },
    });
  }

  async findById(
    id: string,
    withRelations?: boolean,
  ): Promise<GetArticleResponse | GetArticleWithRelationsResponse | null> {
    if (withRelations) {
      return await prisma.article.findUnique({
        where: { id, published: true },
        include: {
          author: {
            select: {
              id: true,
              clerkId: true,
              name: true,
              imageUrl: true,
            },
          },
          articleTags: {
            include: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
          },
          articleLikes: {
            select: {
              userId: true,
            },
          },
          _count: {
            select: {
              articleComments: true,
              articleLikes: true,
            },
          },
        },
      });
    }

    return await prisma.article.findUnique({
      where: { id, published: true },
    });
  }

  async create(data: CreateArticleDto & { slug: string }): Promise<void> {
    await prisma.article.create({
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        authorId: data.authorId,
        articleTags: {
          create: data.articleTags?.map((tag: { id: string }) => ({
            tagId: tag.id,
          })),
        },
        published: data.published,
      },
      include: {
        articleTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async update(data: UpdateArticleDto & { slug: string }): Promise<void> {
    await prisma.article.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
        slug: data.slug,
        excerpt: data.excerpt,
        imageUrl: data.imageUrl,
        articleTags: {
          deleteMany: {},
          create: data.articleTags?.map((tag: { id: string }) => ({
            tagId: tag.id,
          })),
        },
        updatedAt: data.updatedAt,
        published: data.published,
      },
      include: {
        articleTags: {
          include: {
            tag: true,
          },
        },
      },
    });
  }

  async updatePublishStatus(id: string, published: boolean): Promise<void> {
    await prisma.article.update({
      where: { id },
      data: { published },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.article.delete({
      where: { id },
    });
  }

  async getArticleComments(articleId: string): Promise<GetArticleCommentsResponse> {
    return await prisma.articleComment.findMany({
      where: { articleId },
      include: {
        author: {
          select: {
            id: true,
            clerkId: true,
            name: true,
            imageUrl: true,
          },
        },
        replyToUser: {
          select: {
            id: true,
            clerkId: true,
            name: true,
            imageUrl: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                clerkId: true,
                name: true,
                imageUrl: true,
              },
            },
            replyToUser: {
              select: {
                id: true,
                clerkId: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async createArticleComment(data: CreateArticleCommentDto): Promise<void> {
    await prisma.articleComment.create({
      data,
    });
  }

  async deleteArticleComment(data: DeleteArticleCommentDto): Promise<void> {
    await prisma.articleComment.delete({
      where: { id: data.articleCommentId },
    });
  }

  async like(articleId: string, userId: string): Promise<void> {
    await prisma.articleLike.create({
      data: { articleId, userId },
    });
  }

  async unlike(articleId: string, userId: string): Promise<void> {
    await prisma.articleLike.delete({
      where: { articleId_userId: { articleId, userId } },
    });
  }
}
