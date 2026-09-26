import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetTagResponse, GetTagsResponse } from '@/modules/core/model/Tag';
import getTag from '@/modules/core/queries/get-tag';

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['tags', id],
    queryFn: () => getTag(id!),
    enabled: !!id,
    initialData: () => {
      // Try the full tags list first
      const cachedTags = queryClient.getQueryData<GetTagsResponse>(['tags']);
      if (cachedTags) {
        return cachedTags.find((tag) => tag.id === id);
      }

      // Otherwise fetch the individual tag
      const cachedTag = queryClient.getQueryData<GetTagResponse>(['tags', id]);
      return cachedTag ?? undefined;
    },
  });
};
