import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { notify } from "@/modules/core/ports/notifier";

export function useDeleteTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => talkGateway.deleteTalk(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la suppression de la discussion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks"],
        });
        notify({
          title: "Discussion supprimée avec succès",
          description: "La discussion a été supprimée avec succès",
        });
      }
    },
  });
}
