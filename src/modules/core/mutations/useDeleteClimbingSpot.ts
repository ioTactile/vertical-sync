import { useMutation, useQueryClient } from "@tanstack/react-query";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";
import { useToast } from "@/app/_hooks/use-toast";

export function useDeleteClimbingSpot() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => climbingSpotGateway.deleteClimbingSpot(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
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
        toast({
          title: "Spot supprimé avec succès",
          description: "Le spot a été supprimé avec succès",
        });
      }
    },
  });
}
