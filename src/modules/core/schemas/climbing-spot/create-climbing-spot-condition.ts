import { z } from "zod";

export const createClimbingSpotConditionSchema = z.object({
  rockState: z.enum(["DRY", "DAMP", "WET"], {
    error: "Veuillez sélectionner l'état de la roche",
  }),
  crowdLevel: z.enum(["EMPTY", "FEW_PEOPLE", "BUSY", "PACKED"], {
    error: "Veuillez sélectionner l'affluence",
  }),
  comment: z.string().max(500).optional().nullable(),
});

export type CreateClimbingSpotConditionInputs = z.infer<
  typeof createClimbingSpotConditionSchema
>;
