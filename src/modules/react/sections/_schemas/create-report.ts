import { ReportEntityType } from "@/prisma/client";
import { z } from "zod";

export const createReportSchema = z.object({
  reason: z
    .string()
    .min(1, "Veuillez remplir ce champ")
    .max(100, "Le message ne doit pas dépasser 100 caractères"),
  entityType: z.enum(ReportEntityType),
  entityId: z.string().cuid(),
});

export type CreateReportInputs = z.infer<typeof createReportSchema>;
