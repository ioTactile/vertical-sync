import type { GetNotificationsResponse } from '@/modules/core/model/Notification';
import { INotificationGateway } from '@/modules/core/gateway/notification.gateway';
import { axiosInstance } from '@/lib/globals';

export class ApiNotificationGateway implements INotificationGateway {
  async getNotifications(userId: string): Promise<GetNotificationsResponse> {
    const response = await axiosInstance.get<GetNotificationsResponse>('/api/notifications', {
      params: { userId },
    });
    return response.data;
  }

  async markAsRead(id: string): Promise<void> {
    await axiosInstance.patch<void>(`/api/notifications/${id}/read`);
  }
}

export const notificationGateway = new ApiNotificationGateway();
