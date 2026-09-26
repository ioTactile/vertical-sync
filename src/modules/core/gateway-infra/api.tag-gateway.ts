import { axiosInstance } from '@/lib/globals';
import { ITagGateway } from '@/modules/core/gateway/tag.gateway';
import {
  CreateTagDto,
  GetTagResponse,
  GetTagsResponse,
  UpdateTagDto,
} from '@/modules/core/model/Tag';

export class ApTagGateway implements ITagGateway {
  async getTags(): Promise<GetTagsResponse> {
    const response = await axiosInstance.get<GetTagsResponse>('/api/tag');
    return response.data;
  }

  async getTagById(id: string): Promise<GetTagResponse> {
    const response = await axiosInstance.get<GetTagResponse>(`/api/tag/${id}`);
    return response.data;
  }

  async createTag(tag: CreateTagDto): Promise<{ message: string }> {
    const response = await axiosInstance.post<{ message: string }>('/api/tag', tag);
    return response.data;
  }

  async updateTag(tag: UpdateTagDto): Promise<{ message: string }> {
    const response = await axiosInstance.patch<{ message: string }>(`/api/tag/${tag.id}`, tag);
    return response.data;
  }

  async deleteTag(id: string): Promise<{ message: string }> {
    const response = await axiosInstance.delete<{ message: string }>(`/api/tag/${id}`, {
      data: {
        id,
      },
    });
    return response.data;
  }
}

export const tagGateway = new ApTagGateway();
