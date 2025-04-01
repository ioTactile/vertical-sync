import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTalkDto } from "@/modules/core/model/Talk";
import { talkGateway } from "@/modules/core/gateway-infra/api.talk-gateway";
import { toast } from "@/app/_hooks/use-toast";

export function useUpdateTalk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (talk: UpdateTalkDto) => talkGateway.updateTalk(talk),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la mise à jour de la discussion",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["talks"],
        });
      }
    },
  });
}
