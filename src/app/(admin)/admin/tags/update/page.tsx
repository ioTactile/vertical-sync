import NotFoundPage from "@/app/not-found";
import getTag from "@/modules/core/queries/get-tag";
import AdminUpdateTagPage from "@/modules/react/pages/AdminUpdateTagPage";
import { PageProps } from "@/types/pages-props";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminUpdateTag({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tags", id],
    queryFn: () => getTag(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminUpdateTagPage />
    </HydrationBoundary>
  );
}
