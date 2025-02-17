import NotFoundPage from "@/app/not-found";
import getArticle from "@/modules/core/queries/get-article-by-slug";
import AdminUpdateArticlePage from "@/modules/react/sections/admin/articles/update-article";
import { PageProps } from "@/types/pages-props";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminUpdateArticle({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["articles", id],
    queryFn: () => getArticle(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminUpdateArticlePage />
    </HydrationBoundary>
  );
}
