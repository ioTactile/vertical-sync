import { useMutation, useQueryClient } from '@tanstack/react-query';
import { talkGateway } from '@/modules/core/gateway-infra/api.talk-gateway';
import { CreateTalkDto } from '@/modules/core/model/Talk';
import { notify } from '@/modules/core/ports/notifier';

export function useCreateTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (talk: CreateTalkDto) => talkGateway.createTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        notify({
          title: 'Erreur lors de la création du talk',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['talks'] });
      }
    },
  });
}
