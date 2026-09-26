import getClimbingSpotComments from '@/modules/core/queries/get-climbing-spot-comments';
import { useQuery } from '@tanstack/react-query';

const useClimbingSpotComments = (id: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['climbing-spot-comments', id],
    queryFn: () => getClimbingSpotComments(id),
    enabled: enabled,
  });
};

export default useClimbingSpotComments;
