import { useQuery, useQueryClient } from '@tanstack/react-query';
import { GetArticleWithRelationsResponse, GetArticlesResponse } from '@/modules/core/model/Article';
import getArticleByIdWithRelations from '@/modules/core/queries/get-article-by-id-with-relations';

export const useGetFetchQuery = (id?: string) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['articles', id],
    queryFn: () => getArticleByIdWithRelations(id!),
    enabled: !!id,
    initialData: () => {
      // Try the full tags list first
      const cachedArticles = queryClient.getQueryData<GetArticlesResponse>(['articles']);
      if (cachedArticles?.articles) {
        return cachedArticles.articles.find((article) => article.id === id);
      }

      // Otherwise fetch the individual tag
      const cachedArticle = queryClient.getQueryData<GetArticleWithRelationsResponse>([
        'articles',
        id,
      ]);
      return cachedArticle ?? undefined;
    },
  });
};
