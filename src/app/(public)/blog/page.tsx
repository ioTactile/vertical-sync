import getArticles from "@/modules/core/queries/get-articles";
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
  const page = ((await searchParams).page as string) ?? "1";

  await queryClient.prefetchQuery({
    queryKey: ["articles", { page: page }],
    queryFn: () => getArticles(user?.id, parseInt(page)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ArticlesPage />
    </HydrationBoundary>
  );
}
