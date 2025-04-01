import { useMutation, useQueryClient } from "@tanstack/react-query";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { toast } from "@/app/_hooks/use-toast";

export function useDeleteTalkComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      talkId,
      talkCommentId,
    }: {
      talkId: string;
      talkCommentId: string;
    }) => talkGateway.deleteTalkComment(talkId, talkCommentId),
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
          queryKey: ["talks", variables.talkId],
        });
      }
    },
  });
}
