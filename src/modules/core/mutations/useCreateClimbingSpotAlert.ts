import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateClimbingSpotAlertDto } from '@/modules/core/model/ClimbingSpotAlert';
import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';

export function useCreateClimbingSpotAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ spotId, data }: { spotId: string; data: CreateClimbingSpotAlertDto }) =>
      climbingSpotGateway.createClimbingSpotAlert(spotId, data),
    onSettled: async (_data, _error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ['climbing-spot-alerts', variables.data.userId],
      });
    },
  });
}
