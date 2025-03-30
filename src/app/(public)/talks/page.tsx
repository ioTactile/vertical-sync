import { SITE_NAME } from "@/app/_constants/seo";
import getTalks from "@/modules/core/queries/get-talks";
import TalksPage from "@/modules/react/pages/TalksPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Discussions`,
  description: "Découvrez les dernières discussions et échanges sur l'escalade",
};

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
