import { TALK_TITLE_MAX_LENGTH } from "@/app/_constants/app";
import { z } from "zod";

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(1, "Veuillez remplir ce champ")
    .max(TALK_TITLE_MAX_LENGTH, "300 caractères maximum"),
  content: z.string().min(1, "Veuillez remplir ce champ"),
  imageUrl: z.string().url().nullable(),
  excerpt: z.string().nullable(),
  published: z.boolean().default(false),
  tags: z.array(z.string().cuid()),
});

export type UpdateArticleInputs = z.infer<typeof updateArticleSchema>;
