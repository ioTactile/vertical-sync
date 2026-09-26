import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { CreateTalkCommentDto } from "@/modules/core/model/Talk";
import { notify } from "@/modules/core/ports/notifier";

export function useCreateTalkComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (talkComment: CreateTalkCommentDto) =>
      talkGateway.createTalkComment(talkComment),
    onSettled: async (_data, error, variables) => {
      if (error) {
        console.error(error);
        notify({
          title: "Erreur lors de la création du commentaire",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks", variables.talkId],
        });
      }
    },
  });
}
