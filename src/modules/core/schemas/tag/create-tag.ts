import { z } from "zod";

export const createTagSchema = z.object({
  name: z.string().min(1, "Veuillez remplir ce champ"),
});

export type CreateTagInputs = z.infer<typeof createTagSchema>;
