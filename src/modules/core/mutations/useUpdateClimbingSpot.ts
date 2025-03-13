import { useMutation } from "@tanstack/react-query";
import { UpdateClimbingSpotDto } from "@/modules/core/model/ClimbingSpot";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

export function useUpdateClimbingSpot() {
  return useMutation({
    mutationFn: (climbingSpot: UpdateClimbingSpotDto) =>
      climbingSpotGateway.updateClimbingSpot(climbingSpot.id, climbingSpot),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      }
    },
  });
}
