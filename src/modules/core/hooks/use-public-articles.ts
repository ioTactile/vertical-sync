import getPublicArticles from '@/modules/core/queries/get-public-articles';
import { useQuery } from '@tanstack/react-query';

const useArticles = (userId?: string) => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => getPublicArticles(userId),
  });
};

export default useArticles;
