import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { CreateArticleDto } from "@/modules/core/model/Article";
import { toast } from "@/app/_hooks/use-toast";

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: CreateArticleDto) =>
      articleGateway.createArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la création de l'article",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
        await queryClient.invalidateQueries({ queryKey: ["articles"] });
      }
    },
  });
}
