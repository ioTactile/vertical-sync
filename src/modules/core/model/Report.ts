import { CreateReportInputs } from '@/modules/core/schemas/report/create-report';
import { UpdateReportStatusInputs } from '@/modules/core/schemas/report/update-report-status';
import type { ReportEntityType } from '@/modules/core/domain/enums';

export type CreateReportDto = {
  reporterId: string;
} & CreateReportInputs;

export type UpdateReportStatusDto = {
  entityType: ReportEntityType;
  entityId: string;
  reporterId: string;
} & UpdateReportStatusInputs;
