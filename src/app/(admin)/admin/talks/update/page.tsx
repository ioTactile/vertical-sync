import NotFoundPage from "@/app/not-found";
import getTalkWithComments from "@/modules/core/queries/get-talk-with-comments";
import AdminUpdateTalkPage from "@/modules/react/pages/AdminUpdateTalkPage";
import { PageProps } from "@/types/pages-props";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function AdminUpdateTalk({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["talks", id],
    queryFn: () => getTalkWithComments(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AdminUpdateTalkPage />
    </HydrationBoundary>
  );
}
