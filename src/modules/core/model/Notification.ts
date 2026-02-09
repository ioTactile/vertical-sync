export type Notification = {
  id: string;
  userId: string;
  climbingSpotId: string;
  title: string;
  message: string;
  goodDayDate: Date;
  isRead: boolean;
  createdAt: Date;
};

export type GetNotificationResponse = Notification & {
  climbingSpot: { id: string; name: string };
};

export type GetNotificationsResponse = GetNotificationResponse[];

export type CreateNotificationDto = {
  userId: string;
  climbingSpotId: string;
  title: string;
  message: string;
  goodDayDate: Date;
};
