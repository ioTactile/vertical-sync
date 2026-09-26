import type {
  CreateClimbingSpotConditionReportDto,
  GetClimbingSpotConditionsResponse,
} from '@/modules/core/model/ClimbingSpotConditions';
import prisma from '@/prisma';
import { createId } from '@paralleldrive/cuid2';

export interface IClimbingSpotConditionRepository {
  findManyByClimbingSpotId(climbingSpotId: string): Promise<GetClimbingSpotConditionsResponse>;
  create(data: CreateClimbingSpotConditionReportDto): Promise<void>;
}

export class PrismaClimbingSpotConditionRepository implements IClimbingSpotConditionRepository {
  async findManyByClimbingSpotId(
    climbingSpotId: string,
  ): Promise<GetClimbingSpotConditionsResponse> {
    const reports = await prisma.climbingSpotConditionReport.findMany({
      where: { climbingSpotId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            imageUrl: true,
            clerkId: true,
          },
        },
      },
    });

    return reports as GetClimbingSpotConditionsResponse;
  }

  async create(data: CreateClimbingSpotConditionReportDto): Promise<void> {
    await prisma.climbingSpotConditionReport.create({
      data: {
        id: createId(),
        climbingSpotId: data.climbingSpotId,
        authorId: data.authorId,
        rockState: data.rockState,
        crowdLevel: data.crowdLevel,
        comment: data.comment ?? null,
      },
    });
  }
}
