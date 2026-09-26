import { useMutation, useQueryClient } from "@tanstack/react-query";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { notify } from "@/modules/core/ports/notifier";

export function useDeleteClimbingSpot() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => climbingSpotGateway.deleteClimbingSpot(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la suppression du spot",
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
        notify({
          title: "Spot supprimé avec succès",
          description: "Le spot a été supprimé avec succès",
        });
      }
    },
  });
}
