import {
  CreateTagDto,
  GetTagResponse,
  GetTagsResponse,
  UpdateTagDto,
} from '@/modules/core/model/Tag';

export interface ITagGateway {
  getTags: () => Promise<GetTagsResponse>;
  getTagById: (id: string) => Promise<GetTagResponse>;
  createTag: (tag: CreateTagDto) => Promise<{
    message: string;
  }>;
  updateTag: (tag: UpdateTagDto) => Promise<{
    message: string;
  }>;
  deleteTag: (id: string) => Promise<{
    message: string;
  }>;
}
