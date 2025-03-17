import {
  ITalkRepository,
  talkRepository,
} from "@/modules/core/repository/talk.repository";
import {
  CreateTalkCommentDto,
  CreateTalkDto,
  GetTalkCommentsResponse,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";

export class TalkService {
  constructor(private readonly talkRepository: ITalkRepository) {}

  async getTalks(): Promise<GetTalksResponse> {
    return await this.talkRepository.findMany();
  }

  async getTalkById(
    id: string,
    includeComments?: boolean
  ): Promise<GetTalkResponse | null> {
    return await this.talkRepository.findById(id, includeComments);
  }

  async createTalk(data: CreateTalkDto): Promise<void> {
    return await this.talkRepository.create(data);
  }

  async updateTalk(data: UpdateTalkDto): Promise<void> {
    return await this.talkRepository.update(data);
  }

  async deleteTalk(id: string): Promise<void> {
    await this.talkRepository.delete(id);
  }

  async getTalkComments(talkId: string): Promise<GetTalkCommentsResponse> {
    return await this.talkRepository.getTalkComments(talkId);
  }

  async createTalkComment(data: CreateTalkCommentDto): Promise<void> {
    return await this.talkRepository.createTalkComment(data);
  }

  async deleteTalkComment(
    talkId: string,
    talkCommentId: string
  ): Promise<void> {
    return await this.talkRepository.deleteTalkComment(talkId, talkCommentId);
  }
}

export const talkService = new TalkService(talkRepository);
