import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { useToast } from "@/app/_hooks/use-toast";

export function useDeleteArticle() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => articleGateway.deleteArticle(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la suppression de l'article",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["admin-articles"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
        toast({
          title: "Article supprimé avec succès",
          description: "L'article a été supprimé avec succès",
        });
      }
    },
  });
}
