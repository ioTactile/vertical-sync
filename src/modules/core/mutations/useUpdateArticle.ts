import { useMutation, useQueryClient } from '@tanstack/react-query';
import { articleGateway } from '@/modules/core/gateway-infra/api.article-gateway';
import { UpdateArticleDto } from '@/modules/core/model/Article';
import { notify } from '@/modules/core/ports/notifier';

export function useUpdateArticle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (article: UpdateArticleDto) => articleGateway.updateArticle(article),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la mise à jour de l'article",
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: ['admin-articles'],
          }),
          queryClient.invalidateQueries({
            queryKey: ['articles'],
          }),
        ]);
      }
    },
  });
}
