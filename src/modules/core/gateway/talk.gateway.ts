import {
  CreateTalkDto,
  GetTalkResponse,
  GetTalksResponse,
  UpdateTalkDto,
  CreateTalkCommentDto,
  GetTalkWithCommentsResponse,
} from "@/modules/core/model/Talk";

export interface ITalkGateway {
  getTalks: () => Promise<GetTalksResponse>;
  getTalk: (id: string) => Promise<GetTalkResponse>;
  getTalkWithComments: (id: string) => Promise<GetTalkWithCommentsResponse>;
  createTalk: (talk: CreateTalkDto) => Promise<{
    message: string;
  }>;
  updateTalk: (talk: UpdateTalkDto) => Promise<{
    message: string;
  }>;
  deleteTalk: (id: string) => Promise<{
    message: string;
  }>;
  createTalkComment: (talkComment: CreateTalkCommentDto) => Promise<{
    message: string;
  }>;
  deleteTalkComment: (
    talkId: string,
    talkCommentId: string
  ) => Promise<{
    message: string;
  }>;
}
