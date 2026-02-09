import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateClimbingSpotConditionReportDto } from "@/modules/core/model/ClimbingSpotConditions";
import { climbingSpotGateway } from "@/modules/core/gateway-infra/api.climbing-spot-gateway";

export function useCreateClimbingSpotConditionReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClimbingSpotConditionReportDto) =>
      climbingSpotGateway.createClimbingSpotConditionReport(data),
    onSettled: async (_data, error, variables) => {
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["climbing-spot-conditions", variables.climbingSpotId],
        });
      }
    },
  });
}
