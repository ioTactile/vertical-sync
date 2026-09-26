import { useQuery } from '@tanstack/react-query';
import getAdminArticles from '@/modules/core/queries/get-admin-articles';

const useAdminArticles = () => {
  return useQuery({
    queryKey: ['admin-articles'],
    queryFn: () => getAdminArticles(),
  });
};

export default useAdminArticles;
