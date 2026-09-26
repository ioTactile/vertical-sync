import { z } from "zod";

export const createArticleCommentSchema = z.object({
  content: z.string().min(1, "Veuillez remplir ce champ"),
});

export type CreateArticleCommentInputs = z.infer<
  typeof createArticleCommentSchema
>;
