import { z } from "zod";

export const createArticleLikeSchema = z.object({
  articleId: z.string().cuid(),
  userId: z.string().cuid(),
});

export type CreateArticleLikeInputs = z.infer<typeof createArticleLikeSchema>;
