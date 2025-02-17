import getTalks from "@/modules/core/queries/get-talks";
import TalksPage from "@/modules/react/pages/TalksPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Talks() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["talks"],
    queryFn: () => getTalks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TalksPage />
    </HydrationBoundary>
  );
}
