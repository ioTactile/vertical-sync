import getPublicArticles from "@/modules/core/queries/get-public-articles";
import ArticlesPage from "@/modules/react/pages/ArticlesPage";
import { PageProps } from "@/types/pages-props";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Articles({ searchParams }: PageProps) {
  const queryClient = new QueryClient();
  const user = await currentUser();

  const page = parseInt((await searchParams).page as string) || 1;

  await queryClient.prefetchQuery({
    queryKey: ["articles", { page }],
    queryFn: () => getPublicArticles(user?.id, page),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesPage />
    </HydrationBoundary>
  );
}
