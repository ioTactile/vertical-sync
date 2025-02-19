import { CreateReportDto } from "@/modules/core/model/Report";
import {
  IReportRepository,
  reportRepository,
} from "@/modules/core/repository/report.repository";

export class ReportService {
  constructor(private readonly reportRepository: IReportRepository) {}

  async createReport(data: CreateReportDto): Promise<void> {
    return await this.reportRepository.createReport(data);
  }
}

export const reportService = new ReportService(reportRepository);
