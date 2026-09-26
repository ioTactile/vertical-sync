import getArticleComments from '@/modules/core/queries/get-article-comments';
import { useQuery } from '@tanstack/react-query';

const useArticleComments = (id: string) => {
  return useQuery({
    queryKey: ['article-comments', id],
    queryFn: () => getArticleComments(id),
  });
};

export default useArticleComments;
