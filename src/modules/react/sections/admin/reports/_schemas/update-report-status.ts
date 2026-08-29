import { ReportStatus } from "@/prisma/client";
import { z } from "zod";

export const updateReportStatusSchema = z.object({
  status: z.enum(ReportStatus),
});

export type UpdateReportStatusInputs = z.infer<typeof updateReportStatusSchema>;
