import { z } from 'zod';

export const createClimbingSpotCommentSchema = z.object({
  content: z.string().min(1, 'Veuillez remplir ce champ'),
  notation: z.number().min(1, 'Veuillez remplir ce champ').max(5, 'Veuillez remplir ce champ'),
});

export type CreateClimbingSpotCommentInputs = z.infer<typeof createClimbingSpotCommentSchema>;
