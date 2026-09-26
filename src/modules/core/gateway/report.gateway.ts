import { CreateReportDto } from '@/modules/core/model/Report';

export interface IReportGateway {
  createReport: (report: CreateReportDto) => Promise<void>;
}
