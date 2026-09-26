import { z } from "zod";

export const deleteArticleCommentSchema = z.object({
  articleId: z.string().cuid(),
  articleCommentId: z.string().cuid(),
});

export type DeleteArticleCommentInputs = z.infer<
  typeof deleteArticleCommentSchema
>;
