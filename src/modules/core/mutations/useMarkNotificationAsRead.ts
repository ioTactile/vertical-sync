import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationGateway } from "@/modules/core/gateway-infra/api.notification-gateway";

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationGateway.markAsRead(id),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
