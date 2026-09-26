import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";
import { notify } from "@/modules/core/ports/notifier";

export function useDeleteArticleLike() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      userId,
    }: {
      articleId: string;
      userId: string;
    }) => articleGateway.deleteArticleLike(articleId, userId),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la suppression du like",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ["articles", variables.articleId],
          }),
          queryClient.invalidateQueries({
            queryKey: ["articles"],
          }),
        ]);
      }
    },
  });
}
