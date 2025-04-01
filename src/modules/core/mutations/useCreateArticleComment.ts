import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateArticleCommentDto } from "@/modules/core/model/Article";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { toast } from "@/app/_hooks/use-toast";
export function useCreateArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (articleComment: CreateArticleCommentDto) =>
      articleGateway.createArticleComment(articleComment),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la création du commentaire",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["article-comments", variables.articleId],
        });
      }
    },
  });
}
