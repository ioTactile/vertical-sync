import { useMutation, useQueryClient } from "@tanstack/react-query";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { CreateClimbingSpotDto } from "@/modules/core/model/ClimbingSpot";
import { notify } from "@/modules/core/ports/notifier";

export function useCreateClimbingSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (climbingSpot: CreateClimbingSpotDto) =>
      climbingSpotGateway.createClimbingSpot(climbingSpot),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la création du spot",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["climbing-spots", "admin-climbing-spots"],
        });
      }
    },
  });
}
