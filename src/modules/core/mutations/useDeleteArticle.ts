import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { notify } from "@/modules/core/ports/notifier";

export function useDeleteArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => articleGateway.deleteArticle(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la suppression de l'article",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["admin-articles"],
          }),
          queryClient.invalidateQueries({
            queryKey: ["articles"],
          }),
        ]);
        notify({
          title: "Article supprimé avec succès",
          description: "L'article a été supprimé avec succès",
        });
      }
    },
  });
}
