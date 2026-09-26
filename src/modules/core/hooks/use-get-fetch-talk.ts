import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetTalksResponse, GetTalkWithCommentsResponse } from '@/modules/core/model/Talk';
import getTalkWithComments from '@/modules/core/queries/get-talk-with-comments';

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['talks', id],
    queryFn: () => getTalkWithComments(id!),
    enabled: !!id,
    initialData: () => {
      // Try the full talks list first
      const cachedTalks = queryClient.getQueryData<GetTalksResponse>(['talks']);
      if (cachedTalks) {
        return cachedTalks.find((talk) => talk.id === id);
      }

      // Otherwise fetch the individual talk
      const cachedTalk = queryClient.getQueryData<GetTalkWithCommentsResponse>(['talks', id]);
      return cachedTalk ?? undefined;
    },
  });
};
