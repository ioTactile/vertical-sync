import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { CreateArticleDto } from "@/modules/core/model/Article";

export function useCreateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: CreateArticleDto) =>
      articleGateway.createArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["admin-articles"] });
      }
    },
  });
}
