import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagGateway } from '@/modules/core/gateway-infra/api.tag-gateway';
import { notify } from '@/modules/core/ports/notifier';

export function useDeleteTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => tagGateway.deleteTag(id),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: 'Erreur lors de la suppression du tag',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['tags'],
        });
        notify({
          title: 'Tag supprimé avec succès',
          description: 'Le tag a été supprimé avec succès',
        });
      }
    },
  });
}
