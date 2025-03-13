import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";
import getClimbingSpot from "@/modules/core/queries/get-climbing-spot";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["climbing-spot", id],
    queryFn: () => getClimbingSpot(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le spot depuis la liste complète des spots
      const cachedClimbingSpots =
        queryClient.getQueryData<GetClimbingSpotsResponse>(["climbing-spots"]);
      if (cachedClimbingSpots) {
        return cachedClimbingSpots.find(
          (climbingSpot) => climbingSpot.id === id
        );
      }

      // Sinon, essayer de récupérer directement le spot individuel
      return queryClient.getQueryData<GetClimbingSpotResponse>([
        "climbing-spot",
        id,
      ]);
    },
  });
};
