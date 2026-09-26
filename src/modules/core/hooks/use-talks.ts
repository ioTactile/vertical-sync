import getTalks from '@/modules/core/queries/get-talks';
import { useQuery } from '@tanstack/react-query';

const useTalks = () => {
  return useQuery({
    queryKey: ['talks'],
    queryFn: () => getTalks(),
  });
};

export default useTalks;
