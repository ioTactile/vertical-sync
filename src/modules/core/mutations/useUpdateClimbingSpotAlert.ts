import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateClimbingSpotAlertDto } from "@/modules/core/model/ClimbingSpotAlert";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

export function useUpdateClimbingSpotAlert() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ alertId, data }: { alertId: string; data: UpdateClimbingSpotAlertDto }) =>
      climbingSpotGateway.updateClimbingSpotAlert(alertId, data),
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["climbing-spot-alerts"],
      });
    },
  });
}
