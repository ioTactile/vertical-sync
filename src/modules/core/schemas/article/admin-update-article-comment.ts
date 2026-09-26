import { z } from "zod";

export const updateArticleCommentSchema = z.object({
  content: z.string().min(1, "Veuillez remplir ce champ"),
});

export type UpdateArticleCommentInputs = z.infer<
  typeof updateArticleCommentSchema
>;
