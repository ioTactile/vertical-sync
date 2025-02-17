import { z } from "zod";

export const deleteTalkCommentSchema = z.object({
  talkId: z.string().cuid(),
  talkCommentId: z.string().cuid(),
});

export type DeleteTalkCommentInputs = z.infer<typeof deleteTalkCommentSchema>;
