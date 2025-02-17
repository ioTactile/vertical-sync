import getArticleBySlug from "@/modules/core/queries/get-article-by-slug";
import ArticlePage from "@/modules/react/pages/ArticlePage";
import { PageProps } from "@/types/pages-props";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Article({ params }: PageProps) {
  const slug = (await params).slug;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", slug],
    queryFn: () => getArticleBySlug(slug),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlePage />
    </HydrationBoundary>
  );
}
