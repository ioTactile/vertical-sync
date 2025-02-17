import {
  CreateTalkCommentDto,
  CreateTalkDto,
  DeleteTalkCommentDto,
  GetTalkResponse,
  UpdateTalkDto,
} from "@/modules/core/model/Talk";
import { Talk, TalkComment } from "@prisma/client";
import { mockUser } from "./user.fixture";

export const mockTalk: Talk = {
  id: "talk_1",
  title: "Talk 1",
  content: "Talk 1 content",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "user_1",
};

export const mockTalks: Talk[] = [
  { ...mockTalk, id: "1" },
  { ...mockTalk, id: "2" },
];

export const mockTalkDto: CreateTalkDto = {
  title: "Talk 1",
  content: "Talk 1 content",
  authorId: "user_1",
};

export const mockUpdateTalkDto: UpdateTalkDto = {
  id: "talk_1",
  title: "Talk 1",
  content: "Talk 1 content",
  updatedAt: new Date(),
};

export const mockTalkComment: TalkComment = {
  id: "talk_comment_1",
  content: "Talk comment 1 content",
  createdAt: new Date(),
  updatedAt: new Date(),
  authorId: "user_1",
  talkId: "talk_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockCreateTalkCommentDto: CreateTalkCommentDto = {
  content: "Talk comment 1 content",
  authorId: "user_1",
  talkId: "talk_1",
  replyToId: null,
  replyToUserId: null,
};

export const mockDeleteTalkCommentDto: DeleteTalkCommentDto = {
  talkId: "talk_1",
  talkCommentId: "talk_comment_1",
};

export const mockTalkComments: TalkComment[] = [
  { ...mockTalkComment, id: "1" },
  { ...mockTalkComment, id: "2" },
];

export const mockTalkWithComments: GetTalkResponse = {
  ...mockTalk,
  author: mockUser,
  talkComments: mockTalkComments.map((comment) => ({
    ...comment,
    author: mockUser,
    replyToUser: mockUser,
  })),
};
