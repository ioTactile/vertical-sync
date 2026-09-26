import {
  CreateTagDto,
  GetTagResponse,
  GetTagsResponse,
  UpdateTagDto,
} from '@/modules/core/model/Tag';
import { ITagRepository } from '@/modules/core/repository/tag.repository';
import { DomainError } from '@/modules/core/domain/errors';

export class TagService {
  constructor(private readonly tagRepository: ITagRepository) {}

  async getTags(): Promise<GetTagsResponse> {
    return await this.tagRepository.findMany();
  }

  async getTagById(id: string): Promise<GetTagResponse | null> {
    if (!id?.trim()) {
      throw new DomainError('Id tag requis', 'VALIDATION');
    }
    return await this.tagRepository.findById(id);
  }

  async createTag(data: CreateTagDto): Promise<void> {
    const name = data.name?.trim();
    if (!name) {
      throw new DomainError('Nom du tag requis', 'VALIDATION');
    }
    const existing = await this.tagRepository.findByName(name);
    if (existing) {
      throw new DomainError('Un tag avec ce nom existe déjà', 'CONFLICT');
    }
    return await this.tagRepository.create({ name });
  }

  async updateTag(data: UpdateTagDto): Promise<void> {
    const name = data.name?.trim();
    if (!data.id?.trim()) {
      throw new DomainError('Id tag requis', 'VALIDATION');
    }
    if (!name) {
      throw new DomainError('Nom du tag requis', 'VALIDATION');
    }
    const existing = await this.tagRepository.findById(data.id);
    if (!existing) {
      throw new DomainError('Tag non trouvé', 'NOT_FOUND');
    }
    const duplicate = await this.tagRepository.findByName(name);
    if (duplicate && duplicate.id !== data.id) {
      throw new DomainError('Un tag avec ce nom existe déjà', 'CONFLICT');
    }
    return await this.tagRepository.update({ ...data, name });
  }

  async deleteTag(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new DomainError('Id tag requis', 'VALIDATION');
    }
    const existing = await this.tagRepository.findById(id);
    if (!existing) {
      throw new DomainError('Tag non trouvé', 'NOT_FOUND');
    }
    return await this.tagRepository.delete(id);
  }
}
