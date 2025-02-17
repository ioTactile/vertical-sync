import { Talk, TalkComment, User } from "@prisma/client";
import { CreateTalkInputs } from "@/modules/react/sections/talks/_schemas/create-talk";
import { UpdateTalkInputs } from "@/modules/react/sections/talks/_schemas/update-talk";
import { CreateTalkCommentInputs } from "@/modules/react/sections/talks/_schemas/create-talk-comment";
import { DeleteTalkCommentInputs } from "@/modules/react/sections/talks/_schemas/delete-talk-comment";

// Create Talk
export type CreateTalkDto = {
  authorId: string;
} & CreateTalkInputs;

// Update Talk
export type UpdateTalkDto = {
  id: string;
  updatedAt: Date;
} & UpdateTalkInputs;

// Many Talks
export type TalkWithRelations = {
  author: User;
  _count: {
    talkComments: number;
  };
} & Talk;

export type GetTalksResponse = TalkWithRelations[];

// One Talk
export type TalkCommentWithRelations = {
  author: User;
  replyToUser: User | null;
  replies?: (Omit<TalkComment, "replies"> & {
    author: User;
    replyToUser: User | null;
  })[];
} & TalkComment;

export type GetTalkResponse = {
  author: User;
  talkComments: TalkCommentWithRelations[];
} & Talk;

// Talk Comments
export type GetTalkCommentsResponse = TalkCommentWithRelations[];

// Create Talk Comment
export type CreateTalkCommentDto = {
  talkId: string;
  authorId: string;
  replyToId: string | null;
  replyToUserId: string | null;
} & CreateTalkCommentInputs;

// Delete Talk Comment
export type DeleteTalkCommentDto = DeleteTalkCommentInputs;
