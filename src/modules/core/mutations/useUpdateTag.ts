import { useMutation, useQueryClient } from "@tanstack/react-query";
import { tagGateway } from "@/modules/core/gateway-infra/api.tag-gateway";
import { UpdateTagDto } from "@/modules/core/model/Tag";
import { toast } from "@/app/_hooks/use-toast";

export function useUpdateTag() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tag: UpdateTagDto) => tagGateway.updateTag(tag),
    onSettled: async (_data, error) => {
      if (error) {
        console.error(error);
        toast({
          title: "Erreur lors de la mise à jour du tag",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["tags"],
        });
      }
    },
  });
}
