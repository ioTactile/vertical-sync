import getClimbingSpotConditions from '@/modules/core/queries/get-climbing-spot-conditions';
import { useQuery } from '@tanstack/react-query';

const useClimbingSpotConditions = (climbingSpotId: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['climbing-spot-conditions', climbingSpotId],
    queryFn: () => getClimbingSpotConditions(climbingSpotId),
    enabled: enabled && !!climbingSpotId,
  });
};

export default useClimbingSpotConditions;
