import { useMutation, useQueryClient } from '@tanstack/react-query';
import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';

export function useDeleteClimbingSpotAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (alertId: string) => climbingSpotGateway.deleteClimbingSpotAlert(alertId),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['climbing-spot-alerts'],
      });
    },
  });
}
