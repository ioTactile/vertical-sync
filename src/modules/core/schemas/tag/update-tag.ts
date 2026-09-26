import { z } from "zod";

export const updateTagSchema = z.object({
  name: z.string().min(1, "Veuillez remplir ce champ"),
});

export type UpdateTagInputs = z.infer<typeof updateTagSchema>;
