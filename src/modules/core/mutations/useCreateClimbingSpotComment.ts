import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateClimbingSpotCommentDto } from '@/modules/core/model/ClimbingSpot';
import { climbingSpotGateway } from '@/modules/core/gateway-infra/api.climbing-spot-gateway';
import { notify } from '@/modules/core/ports/notifier';

export function useCreateClimbingSpotComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (climbingSpotComment: CreateClimbingSpotCommentDto) =>
      climbingSpotGateway.createClimbingSpotComment(climbingSpotComment),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
        notify({
          title: 'Erreur lors de la création du commentaire',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ['climbing-spot-comments', variables.climbingSpotId],
        });
      }
    },
  });
}
