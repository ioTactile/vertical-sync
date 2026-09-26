import prisma from '@/prisma';
import { CreateReportDto, UpdateReportStatusDto } from '@/modules/core/model/Report';

export interface IReportRepository {
  createReport(data: CreateReportDto): Promise<void>;
  updateReportStatus(data: UpdateReportStatusDto): Promise<void>;
}

export class PrismaReportRepository implements IReportRepository {
  async createReport(data: CreateReportDto): Promise<void> {
    await prisma.report.create({
      data,
    });
  }

  async updateReportStatus(data: UpdateReportStatusDto): Promise<void> {
    await prisma.report.update({
      where: {
        reporterId_entityType_entityId: {
          reporterId: data.reporterId,
          entityType: data.entityType,
          entityId: data.entityId,
        },
      },
      data: {
        status: data.status,
      },
    });
  }
}
