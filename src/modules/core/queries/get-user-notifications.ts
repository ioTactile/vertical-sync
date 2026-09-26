import { notificationGateway } from '@/modules/core/gateway-infra/api.notification-gateway';

const getUserNotifications = async (userId: string) => {
  return await notificationGateway.getNotifications(userId);
};

export default getUserNotifications;
