import { SITE_NAME } from "@/app/_constants/seo";
import RedactorCreateArticlePage from "@/modules/react/pages/RedactorCreateArticlePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Créer un article`,
  description: "Créez un article pour partager vos idées et vos expériences",
};

export default function RedactorCreateArticle() {
  return <RedactorCreateArticlePage />;
}
