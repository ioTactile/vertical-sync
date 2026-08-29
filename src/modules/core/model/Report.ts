import { CreateReportInputs } from "@/modules/react/sections/_schemas/create-report";
import { UpdateReportStatusInputs } from "@/modules/react/sections/admin/reports/_schemas/update-report-status";
import { ReportEntityType } from "@/prisma/client";

export type CreateReportDto = {
  reporterId: string;
} & CreateReportInputs;

export type UpdateReportStatusDto = {
  entityType: ReportEntityType;
  entityId: string;
  reporterId: string;
} & UpdateReportStatusInputs;
