import { useQuery } from '@tanstack/react-query';
import getClimbingSpotsSearch from '@/modules/core/queries/get-climbing-spots-search';

const useClimbingSpotsSearch = (debouncedSearch: string) => {
  return useQuery({
    queryKey: ['climbing-spots-search', debouncedSearch],
    queryFn: () => getClimbingSpotsSearch(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  });
};

export default useClimbingSpotsSearch;
