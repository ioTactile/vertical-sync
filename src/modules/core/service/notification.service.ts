import type {
  CreateNotificationDto,
  GetNotificationsResponse,
} from "@/modules/core/model/Notification";
import {
  INotificationRepository,
  notificationRepository,
} from "@/modules/core/repository/notification.repository";

export class NotificationService {
  constructor(
    private readonly repository: INotificationRepository,
  ) {}

  async getByUserId(userId: string): Promise<GetNotificationsResponse> {
    return this.repository.findManyByUserId(userId);
  }

  async create(data: CreateNotificationDto): Promise<void> {
    await this.repository.create(data);
  }

  async markAsRead(id: string): Promise<void> {
    await this.repository.markAsRead(id);
  }

  async alreadyNotified(
    userId: string,
    climbingSpotId: string,
    goodDayDate: Date,
  ): Promise<boolean> {
    return this.repository.existsForUserAndSpotAndDay(
      userId,
      climbingSpotId,
      goodDayDate,
    );
  }
}

export const notificationService = new NotificationService(
  notificationRepository,
);
