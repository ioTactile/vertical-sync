import { CreateTalkInputs } from "@/modules/core/schemas/talk/create-talk";
import { UpdateTalkInputs } from "@/modules/core/schemas/talk/update-talk";
import { CreateTalkCommentInputs } from "@/modules/core/schemas/talk/create-talk-comment";
import { DeleteTalkCommentInputs } from "@/modules/core/schemas/talk/delete-talk-comment";
import { Author } from "@/modules/core/model/User";

export type Talk = {
  id: string;
  title: string;
  content: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type TalkComment = {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  talkId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
};

export type CreateTalkDto = {
  authorId: string;
} & CreateTalkInputs;

export type UpdateTalkDto = {
  id: string;
  updatedAt: Date;
} & UpdateTalkInputs;

export type TalkWithRelations = {
  author: Author;
  _count: {
    talkComments: number;
  };
} & Talk;

export type GetTalksResponse = TalkWithRelations[];

export type GetTalkResponse = Talk;

export type TalkCommentWithRelations = {
  author: Author;
  replyToUser: Author | null;
  replies?: (TalkComment & {
    author: Author;
    replyToUser: Author | null;
  })[];
} & TalkComment;

export type GetTalkWithCommentsResponse = {
  author: Author;
  talkComments: TalkCommentWithRelations[];
} & Talk;

export type GetTalkCommentsResponse = TalkCommentWithRelations[];

export type CreateTalkCommentDto = {
  talkId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
} & CreateTalkCommentInputs;

export type DeleteTalkCommentDto = DeleteTalkCommentInputs;
