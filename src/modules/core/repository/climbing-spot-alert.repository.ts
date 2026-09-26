import type {
  CreateClimbingSpotAlertDto,
  GetClimbingSpotAlertsResponse,
  UpdateClimbingSpotAlertDto,
} from '@/modules/core/model/ClimbingSpotAlert';
import prisma from '@/prisma';
import { createId } from '@paralleldrive/cuid2';

export type ActiveAlertForEvaluation = {
  id: string;
  userId: string;
  climbingSpotId: string;
  minTempC: number | null;
  maxTempC: number | null;
  maxWindKmh: number | null;
  onlyWeekends: boolean;
  avoidRain: boolean;
};

export interface IClimbingSpotAlertRepository {
  findManyByUserId(userId: string): Promise<GetClimbingSpotAlertsResponse>;
  findAllActive(): Promise<ActiveAlertForEvaluation[]>;
  create(data: CreateClimbingSpotAlertDto): Promise<void>;
  update(data: UpdateClimbingSpotAlertDto): Promise<void>;
  delete(id: string): Promise<void>;
  findByUserAndSpot(userId: string, climbingSpotId: string): Promise<{ id: string } | null>;
}

export class PrismaClimbingSpotAlertRepository implements IClimbingSpotAlertRepository {
  async findManyByUserId(userId: string): Promise<GetClimbingSpotAlertsResponse> {
    const alerts = await prisma.climbingSpotAlert.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        climbingSpot: {
          select: { id: true, name: true },
        },
      },
    });

    return alerts as unknown as GetClimbingSpotAlertsResponse;
  }

  async findAllActive(): Promise<ActiveAlertForEvaluation[]> {
    const alerts = await prisma.climbingSpotAlert.findMany({
      where: { isActive: true },
      select: {
        id: true,
        userId: true,
        climbingSpotId: true,
        minTempC: true,
        maxTempC: true,
        maxWindKmh: true,
        onlyWeekends: true,
        avoidRain: true,
      },
    });
    return alerts as ActiveAlertForEvaluation[];
  }

  async create(data: CreateClimbingSpotAlertDto): Promise<void> {
    await prisma.climbingSpotAlert.upsert({
      where: {
        userId_climbingSpotId: {
          userId: data.userId,
          climbingSpotId: data.climbingSpotId,
        },
      },
      create: {
        id: createId(),
        userId: data.userId,
        climbingSpotId: data.climbingSpotId,
        minTempC: data.minTempC ?? null,
        maxTempC: data.maxTempC ?? null,
        maxWindKmh: data.maxWindKmh ?? null,
        onlyWeekends: data.onlyWeekends ?? false,
        avoidRain: data.avoidRain ?? true,
      },
      update: {
        minTempC: data.minTempC ?? null,
        maxTempC: data.maxTempC ?? null,
        maxWindKmh: data.maxWindKmh ?? null,
        onlyWeekends: data.onlyWeekends ?? false,
        avoidRain: data.avoidRain ?? true,
        isActive: true,
      },
    });
  }

  async update(data: UpdateClimbingSpotAlertDto): Promise<void> {
    await prisma.climbingSpotAlert.update({
      where: { id: data.id },
      data: {
        ...(typeof data.isActive === 'boolean' && { isActive: data.isActive }),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.climbingSpotAlert.delete({
      where: { id },
    });
  }

  async findByUserAndSpot(userId: string, climbingSpotId: string): Promise<{ id: string } | null> {
    const alert = await prisma.climbingSpotAlert.findUnique({
      where: {
        userId_climbingSpotId: { userId, climbingSpotId },
      },
      select: { id: true },
    });
    return alert;
  }
}
