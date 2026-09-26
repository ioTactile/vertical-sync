import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetClimbingSpotResponse,
  GetClimbingSpotsResponse,
} from '@/modules/core/model/ClimbingSpot';
import getClimbingSpot from '@/modules/core/queries/get-climbing-spot';

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['admin-climbing-spot', id],
    queryFn: () => getClimbingSpot(id!),
    enabled: !!id,
    initialData: () => {
      // Try the full spots list first
      const cachedClimbingSpots = queryClient.getQueryData<GetClimbingSpotsResponse>([
        'admin-climbing-spots',
      ]);
      if (cachedClimbingSpots) {
        return cachedClimbingSpots.find((climbingSpot) => climbingSpot.id === id);
      }

      // Otherwise fetch the individual spot
      const cachedSpot = queryClient.getQueryData<GetClimbingSpotResponse>([
        'admin-climbing-spot',
        id,
      ]);
      return cachedSpot ?? undefined;
    },
  });
};
