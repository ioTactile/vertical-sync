import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articleGateway } from "@/modules/core/gateway-infra/api.article-gateway";

export function useUpdateArticlePublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      articleGateway.updateArticlePublishStatus(id, published),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["articles"],
        });
      }
    },
  });
}
