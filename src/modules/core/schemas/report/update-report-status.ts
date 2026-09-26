import { REPORT_STATUS_VALUES } from "@/modules/core/domain/enums";
import { z } from "zod";

export const updateReportStatusSchema = z.object({
  status: z.enum(REPORT_STATUS_VALUES),
});

export type UpdateReportStatusInputs = z.infer<typeof updateReportStatusSchema>;
