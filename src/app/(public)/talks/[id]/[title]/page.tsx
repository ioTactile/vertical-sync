import getTalkWithComments from "@/modules/core/queries/get-talk-with-comments";
import TalkPage from "@/modules/react/pages/TalkPage";
import { PageProps } from "@/types/pages-props";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Talk({ params }: PageProps) {
  const id = (await params).id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["talks", id],
    queryFn: () => getTalkWithComments(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TalkPage />
    </HydrationBoundary>
  );
}
