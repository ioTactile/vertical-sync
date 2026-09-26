import { describe, it, expect, vi, beforeEach } from 'vitest';
import { axiosInstance } from '@/lib/globals';
import { notificationGateway } from '@/modules/core/gateway-infra/api.notification-gateway';

vi.mock('@/lib/globals', () => ({
  axiosInstance: {
    get: vi.fn(),
    patch: vi.fn(),
  },
}));

describe('NotificationGateway', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it("devrait récupérer les notifications d'un utilisateur", async () => {
    const mockNotifications = [
      {
        id: 'notif_1',
        userId: 'user_1',
        title: 'Bon jour',
        message: 'Conditions idéales',
        isRead: false,
      },
    ];
    vi.mocked(axiosInstance.get).mockResolvedValueOnce({
      data: mockNotifications,
    });

    const result = await notificationGateway.getNotifications('user_1');

    expect(result).toEqual(mockNotifications);
    expect(axiosInstance.get).toHaveBeenCalledWith('/api/notifications', {
      params: { userId: 'user_1' },
    });
  });

  it('devrait marquer une notification comme lue', async () => {
    vi.mocked(axiosInstance.patch).mockResolvedValueOnce({ data: undefined });

    await notificationGateway.markAsRead('notif_1');

    expect(axiosInstance.patch).toHaveBeenCalledWith('/api/notifications/notif_1/read');
  });
});
