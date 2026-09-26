import { ITalkRepository } from '@/modules/core/repository/talk.repository';
import {
  CreateTalkCommentDto,
  CreateTalkDto,
  GetTalkCommentsResponse,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
} from '@/modules/core/model/Talk';
import { DomainError } from '@/modules/core/domain/errors';

export class TalkService {
  constructor(private readonly talkRepository: ITalkRepository) {}

  async getTalks(): Promise<GetTalksResponse> {
    return await this.talkRepository.findMany();
  }

  async getTalkById(id: string, includeComments?: boolean): Promise<GetTalkResponse | null> {
    if (!id?.trim()) {
      throw new DomainError('Id discussion requis', 'VALIDATION');
    }
    return await this.talkRepository.findById(id, includeComments);
  }

  async createTalk(data: CreateTalkDto): Promise<void> {
    if (!data.authorId?.trim()) {
      throw new DomainError('Auteur requis', 'VALIDATION');
    }
    if (!data.title?.trim()) {
      throw new DomainError('Titre requis', 'VALIDATION');
    }
    return await this.talkRepository.create(data);
  }

  async updateTalk(data: UpdateTalkDto): Promise<void> {
    if (!data.id?.trim()) {
      throw new DomainError('Id discussion requis', 'VALIDATION');
    }
    if (!data.title?.trim()) {
      throw new DomainError('Titre requis', 'VALIDATION');
    }
    const existing = await this.talkRepository.findById(data.id);
    if (!existing) {
      throw new DomainError('Discussion non trouvée', 'NOT_FOUND');
    }
    return await this.talkRepository.update(data);
  }

  async deleteTalk(id: string): Promise<void> {
    if (!id?.trim()) {
      throw new DomainError('Id discussion requis', 'VALIDATION');
    }
    await this.talkRepository.delete(id);
  }

  async getTalkComments(talkId: string): Promise<GetTalkCommentsResponse> {
    return await this.talkRepository.getTalkComments(talkId);
  }

  async createTalkComment(data: CreateTalkCommentDto): Promise<void> {
    if (!data.content?.trim()) {
      throw new DomainError('Contenu du commentaire requis', 'VALIDATION');
    }
    return await this.talkRepository.createTalkComment(data);
  }

  async deleteTalkComment(talkId: string, talkCommentId: string): Promise<void> {
    if (!talkId || !talkCommentId) {
      throw new DomainError('Identifiants requis', 'VALIDATION');
    }
    return await this.talkRepository.deleteTalkComment(talkId, talkCommentId);
  }
}
