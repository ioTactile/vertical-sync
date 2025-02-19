import prisma from "@/prisma";
import { CreateReportDto } from "@/modules/core/model/Report";

export interface IReportRepository {
  createReport(data: CreateReportDto): Promise<void>;
}

export class PrismaReportRepository implements IReportRepository {
  async createReport(data: CreateReportDto): Promise<void> {
    await prisma.report.create({
      data,
    });
  }
}

export const reportRepository = new PrismaReportRepository();
