import getArticles from "@/modules/core/queries/get-articles";
import HomePage from "@/modules/react/pages/HomePage";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();
  const user = await currentUser();

  await queryClient.prefetchQuery({
    queryKey: ["articles"],
    queryFn: () => getArticles(user?.id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage />
    </HydrationBoundary>
  );
}
