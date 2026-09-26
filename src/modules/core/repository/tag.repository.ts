import prisma from '@/prisma';
import {
  CreateTagDto,
  GetTagResponse,
  GetTagsResponse,
  UpdateTagDto,
} from '@/modules/core/model/Tag';

export interface ITagRepository {
  findMany(): Promise<GetTagsResponse>;
  findById(id: string): Promise<GetTagResponse | null>;
  findByName(name: string): Promise<GetTagResponse | null>;
  create(data: CreateTagDto): Promise<void>;
  update(data: UpdateTagDto): Promise<void>;
  delete(id: string): Promise<void>;
}

export class PrismaTagRepository implements ITagRepository {
  async findMany(): Promise<GetTagsResponse> {
    return await prisma.tag.findMany();
  }

  async findById(id: string): Promise<GetTagResponse | null> {
    return await prisma.tag.findUnique({ where: { id } });
  }

  async findByName(name: string): Promise<GetTagResponse | null> {
    return await prisma.tag.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
  }

  async create(data: CreateTagDto): Promise<void> {
    await prisma.tag.create({ data });
  }

  async update(data: UpdateTagDto): Promise<void> {
    await prisma.tag.update({
      where: { id: data.id },
      data: {
        name: data.name,
        updatedAt: data.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.tag.delete({ where: { id } });
  }
}
