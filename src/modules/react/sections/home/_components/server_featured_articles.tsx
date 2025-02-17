import getArticles from "@/modules/core/queries/get-articles";
import FeaturedArticles from "@/modules/react/sections/home/_components/featured_articles";
import { currentUser } from "@clerk/nextjs/server";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const ServerFeaturedArticles = async () => {
  const queryClient = new QueryClient();
  const user = await currentUser();

  await queryClient.prefetchQuery({
    queryKey: ["articles", { page: 1 }],
    queryFn: () => getArticles(user?.id, 1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeaturedArticles />
    </HydrationBoundary>
  );
};

export default ServerFeaturedArticles;
