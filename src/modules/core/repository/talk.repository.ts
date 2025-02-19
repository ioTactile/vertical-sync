import prisma from "@/prisma";
import {
  GetTalkCommentsResponse,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
  CreateTalkDto,
  CreateTalkCommentDto,
} from "@/modules/core/model/Talk";

export interface ITalkRepository {
  findMany(): Promise<GetTalksResponse>;
  findById(id: string): Promise<GetTalkResponse | null>;
  create(data: CreateTalkDto): Promise<void>;
  update(data: UpdateTalkDto): Promise<void>;
  delete(id: string): Promise<void>;
  getTalkComments(talkId: string): Promise<GetTalkCommentsResponse>;
  createTalkComment(data: CreateTalkCommentDto): Promise<void>;
  deleteTalkComment(talkId: string, talkCommentId: string): Promise<void>;
}

export class PrismaTalkRepository implements ITalkRepository {
  async findMany(): Promise<GetTalksResponse> {
    return await prisma.talk.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        _count: {
          select: {
            talkComments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string): Promise<GetTalkResponse | null> {
    return await prisma.talk.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        talkComments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            replyToUser: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            replies: {
              include: {
                author: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
                replyToUser: {
                  select: {
                    id: true,
                    name: true,
                    imageUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async create(data: CreateTalkDto): Promise<void> {
    await prisma.talk.create({
      data: {
        title: data.title,
        content: data.content,
        authorId: data.authorId,
      },
    });
  }

  async update(data: UpdateTalkDto): Promise<void> {
    await prisma.talk.update({
      where: { id: data.id },
      data: {
        title: data.title,
        content: data.content,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.talk.delete({
      where: { id },
    });
  }

  async getTalkComments(talkId: string): Promise<GetTalkCommentsResponse> {
    return await prisma.talkComment.findMany({
      where: { talkId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        replyToUser: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
            replyToUser: {
              select: {
                id: true,
                name: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async createTalkComment(data: CreateTalkCommentDto): Promise<void> {
    await prisma.talkComment.create({
      data,
    });
  }

  async deleteTalkComment(
    talkCommentId: string,
    talkId: string
  ): Promise<void> {
    await prisma.talkComment.delete({
      where: { id: talkCommentId, talkId },
    });
  }
}

export const talkRepository = new PrismaTalkRepository();
