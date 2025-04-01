import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
} from "@/modules/core/model/ClimbingSpot";
import getClimbingSpot from "@/modules/core/queries/get-climbing-spot";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["admin-climbing-spot", id],
    queryFn: () => getClimbingSpot(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le spot depuis la liste complète des spots
      const cachedClimbingSpots =
        queryClient.getQueryData<GetClimbingSpotsResponse>([
          "admin-climbing-spots",
        ]);
      if (cachedClimbingSpots) {
        console.log("cachedClimbingSpots", cachedClimbingSpots);
        return cachedClimbingSpots.find(
          (climbingSpot) => climbingSpot.id === id
        );
      }

      // Sinon, essayer de récupérer directement le spot individuel
      const cachedSpot = queryClient.getQueryData<GetClimbingSpotResponse>([
        "admin-climbing-spot",
        id,
      ]);
      return cachedSpot ?? undefined;
    },
  });
};
