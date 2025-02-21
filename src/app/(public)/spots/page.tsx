import SpotsPage from "@/modules/react/pages/SpotsPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import getClimbingSpots from "@/modules/core/queries/get-climbing-spots";

export default async function Spots() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["climbing-spots"],
    queryFn: () => getClimbingSpots(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SpotsPage />
    </HydrationBoundary>
  );
}
