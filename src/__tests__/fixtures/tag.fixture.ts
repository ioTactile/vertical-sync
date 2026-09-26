import { CreateTagDto, UpdateTagDto } from '@/modules/core/model/Tag';
import { Tag } from '@/prisma/client';

export const mockTag: Tag = {
  id: 'tag_1',
  name: 'Test Tag',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockTags: Tag[] = [
  { ...mockTag, id: 'tag_1' },
  { ...mockTag, id: 'tag_2' },
];

export const mockTagDto: CreateTagDto = {
  name: 'Test Tag',
};

export const mockUpdateTagDto: UpdateTagDto = {
  id: 'tag_1',
  name: 'Updated Test Tag',
  updatedAt: new Date(),
};
