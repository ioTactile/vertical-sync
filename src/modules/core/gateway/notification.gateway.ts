import type { GetNotificationsResponse } from '@/modules/core/model/Notification';

export interface INotificationGateway {
  getNotifications(userId: string): Promise<GetNotificationsResponse>;
  markAsRead(id: string): Promise<void>;
}
