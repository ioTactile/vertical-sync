import { CreateReportDto, UpdateReportStatusDto } from '@/modules/core/model/Report';
import { IReportRepository } from '@/modules/core/repository/report.repository';

export class ReportService {
  constructor(private readonly reportRepository: IReportRepository) {}

  async createReport(data: CreateReportDto): Promise<void> {
    return await this.reportRepository.createReport(data);
  }

  async updateReportStatus(data: UpdateReportStatusDto): Promise<void> {
    return await this.reportRepository.updateReportStatus(data);
  }
}
