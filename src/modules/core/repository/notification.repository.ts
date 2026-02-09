import type {
  CreateNotificationDto,
  GetNotificationsResponse,
} from "@/modules/core/model/Notification";
import prisma from "@/prisma";
import { createId } from "@paralleldrive/cuid2";

export interface INotificationRepository {
  findManyByUserId(userId: string): Promise<GetNotificationsResponse>;
  create(data: CreateNotificationDto): Promise<void>;
  markAsRead(id: string): Promise<void>;
  existsForUserAndSpotAndDay(
    userId: string,
    climbingSpotId: string,
    goodDayDate: Date,
  ): Promise<boolean>;
}

function toDateOnly(d: Date): Date {
  const copy = new Date(d);
  copy.setUTCHours(0, 0, 0, 0);
  return copy;
}

export class PrismaNotificationRepository implements INotificationRepository {
  async findManyByUserId(userId: string): Promise<GetNotificationsResponse> {
    const list = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50,
      include: {
        climbingSpot: {
          select: { id: true, name: true },
        },
      },
    });
    return list as unknown as GetNotificationsResponse;
  }

  async create(data: CreateNotificationDto): Promise<void> {
    const day = toDateOnly(data.goodDayDate);
    await prisma.notification.create({
      data: {
        id: createId(),
        userId: data.userId,
        climbingSpotId: data.climbingSpotId,
        title: data.title,
        message: data.message,
        goodDayDate: day,
      },
    });
  }

  async markAsRead(id: string): Promise<void> {
    await prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async existsForUserAndSpotAndDay(
    userId: string,
    climbingSpotId: string,
    goodDayDate: Date,
  ): Promise<boolean> {
    const day = toDateOnly(goodDayDate);
    const existing = await prisma.notification.findUnique({
      where: {
        userId_climbingSpotId_goodDayDate: {
          userId,
          climbingSpotId,
          goodDayDate: day,
        },
      },
    });
    return !!existing;
  }
}

export const notificationRepository = new PrismaNotificationRepository();
