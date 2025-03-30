import getArticleBySlugWithRelations from "@/modules/core/queries/get-article-by-slug-with-relations";
import { useQuery } from "@tanstack/react-query";

const useArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["articles", slug],
    queryFn: () => getArticleBySlugWithRelations(slug),
  });
};

export default useArticleBySlug;
