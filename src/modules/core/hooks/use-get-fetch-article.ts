import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  GetArticleWithRelationsResponse,
  GetArticlesResponse,
} from "@/modules/core/model/Article";
import getArticleById from "@/modules/core/queries/get-article-by-id-with-relations";

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticleById(id!),
    enabled: !!id,
    initialData: () => {
      // Essayer de récupérer le tag depuis la liste complète des tags
      const cachedArticles = queryClient.getQueryData<GetArticlesResponse>([
        "articles",
      ]);
      if (cachedArticles?.articles) {
        return cachedArticles.articles.find((article) => article.id === id);
      }

      // Sinon, essayer de récupérer directement le tag individuel
      const cachedArticle =
        queryClient.getQueryData<GetArticleWithRelationsResponse>([
          "articles",
          id,
        ]);
      return cachedArticle ?? undefined;
    },
  });
};
