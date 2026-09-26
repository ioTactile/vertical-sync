import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';
import { notify } from '@/modules/core/ports/notifier';

export function useUpdateArticlePublish() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, published }: { id: string; published: boolean }) =>
      articleGateway.updateArticlePublishStatus(id, published),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la publication de l'article",
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['admin-articles', 'articles'],
        });
      }
    },
  });
}
