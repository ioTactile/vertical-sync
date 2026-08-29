import { Talk, TalkComment } from "@/prisma/client";
import { CreateTalkInputs } from "@/modules/react/sections/talks/_schemas/create-talk";
import { UpdateTalkInputs } from "@/modules/react/sections/talks/_schemas/update-talk";
import { CreateTalkCommentInputs } from "@/modules/react/sections/talks/_schemas/create-talk-comment";
import { DeleteTalkCommentInputs } from "@/modules/react/sections/talks/_schemas/delete-talk-comment";
import { Author } from "@/modules/core/model/User";

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
  author: Author;
  _count: {
    talkComments: number;
  };
} & Talk;

export type GetTalksResponse = TalkWithRelations[];

// One Talk
export type GetTalkResponse = Talk;

// One Talk with comments
export type TalkCommentWithRelations = {
  author: Author;
  replyToUser: Author | null;
  replies?: (Omit<TalkComment, "replies"> & {
    author: Author;
    replyToUser: Author | null;
  })[];
} & TalkComment;

export type GetTalkWithCommentsResponse = {
  author: Author;
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
