import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateClimbingSpotDto } from "@/modules/core/model/ClimbingSpot";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { toast } from "@/app/_hooks/use-toast";

export function useUpdateClimbingSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (climbingSpot: UpdateClimbingSpotDto) =>
      climbingSpotGateway.updateClimbingSpot(climbingSpot),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la mise à jour du spot",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["admin-climbing-spots"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["climbing-spots"],
          }),
        ]);
      }
    },
  });
}
