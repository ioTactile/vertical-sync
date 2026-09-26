import { REPORT_ENTITY_TYPE_VALUES } from '@/modules/core/domain/enums';
import { z } from 'zod';

export const createReportSchema = z.object({
  reason: z
    .string()
    .min(1, 'Veuillez remplir ce champ')
    .max(100, 'Le message ne doit pas dépasser 100 caractères'),
  entityType: z.enum(REPORT_ENTITY_TYPE_VALUES),
  entityId: z.string().cuid(),
});

export type CreateReportInputs = z.infer<typeof createReportSchema>;
