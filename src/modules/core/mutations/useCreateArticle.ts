import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { CreateArticleDto } from "@/modules/core/model/Article";
import { notify } from "@/modules/core/ports/notifier";

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: CreateArticleDto) =>
      articleGateway.createArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la création de l'article",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["admin-articles"] }),
          queryClient.invalidateQueries({ queryKey: ["articles"] }),
        ]);
      }
    },
  });
}
