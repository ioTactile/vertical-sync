import { SITE_NAME } from "@/app/_constants/seo";
import SpotsPage from "@/modules/react/pages/SpotsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Spots`,
  description: "Découvrez les meilleurs spots d'escalade",
};

export default function Spots() {
  return <SpotsPage />;
}
