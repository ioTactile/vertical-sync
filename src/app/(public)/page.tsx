import HomePage from "@/modules/react/pages/HomePage";
import { Metadata } from "next";
import { SITE_NAME } from "@/app/_constants/seo";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Accueil`,
  description: "Accueil du site",
};

export default function Home() {
  return <HomePage />;
}
