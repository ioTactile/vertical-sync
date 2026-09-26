import { z } from "zod";

export const createTalkCommentSchema = z.object({
  content: z.string().min(1, "Veuillez remplir ce champ"),
});

export type CreateTalkCommentInputs = z.infer<typeof createTalkCommentSchema>;
