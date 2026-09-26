import getPublicArticles from '@/modules/core/queries/get-public-articles';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

const useArticlesPagination = (userId?: string, page: number = 1) => {
  return useQuery({
    queryKey: ['articles', { page }],
    queryFn: () => getPublicArticles(userId, page),
    placeholderData: keepPreviousData,
  });
};

export default useArticlesPagination;
