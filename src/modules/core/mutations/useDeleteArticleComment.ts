import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { toast } from "@/app/_hooks/use-toast";

export function useDeleteArticleComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      articleCommentId,
    }: {
      articleId: string;
      articleCommentId: string;
    }) => articleGateway.deleteArticleComment(articleId, articleCommentId),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la suppression du commentaire",
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
