import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tagGateway } from '@/modules/core/gateway-infra/api.tag-gateway';
import { CreateTagInputs } from '@/modules/core/schemas/tag/create-tag';
import { notify } from '@/modules/core/ports/notifier';

export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tag: CreateTagInputs) => tagGateway.createTag(tag),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: 'Erreur lors de la création du tag',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['tags'],
        });
      }
    },
  });
}
