import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GetTalkResponse, GetTalksResponse } from "@/modules/core/model/Talk";
import getTalkWithComments from "@/modules/core/queries/get-talk-with-comments";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["talks", id],
    queryFn: () => getTalkWithComments(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le talk depuis la liste complète des talks
      const cachedTalks = queryClient.getQueryData<GetTalksResponse>(["talks"]);
      if (cachedTalks) {
        return cachedTalks.find((talk) => talk.id === id);
      }

      // Sinon, essayer de récupérer directement le talk individuel
      const cachedTalk = queryClient.getQueryData<GetTalkResponse>([
        "talks",
        id,
      ]);
      return cachedTalk ?? undefined;
    },
  });
};
