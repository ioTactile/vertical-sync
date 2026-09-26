import getTags from '@/modules/core/queries/get-tags';
import { useQuery } from '@tanstack/react-query';

const useTags = () => {
  return useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });
};

export default useTags;
