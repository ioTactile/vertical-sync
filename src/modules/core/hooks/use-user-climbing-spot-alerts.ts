import getClimbingSpotAlerts from '@/modules/core/queries/get-climbing-spot-alerts';
import { useQuery } from '@tanstack/react-query';

const useUserClimbingSpotAlerts = (userId: string | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ['climbing-spot-alerts', userId],
    queryFn: () => getClimbingSpotAlerts(userId!),
    enabled: enabled && !!userId,
  });
};

export default useUserClimbingSpotAlerts;
