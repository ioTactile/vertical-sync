import { SITE_NAME } from "@/app/_constants/seo";
import RedactorUpdateArticlePage from "@/modules/react/pages/RedactorUpdateArticlePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SITE_NAME} - Mettre à jour un article`,
  description:
    "Mettez à jour un article pour partager vos idées et vos expériences",
};

export default function RedactorUpdateArticle() {
  return <RedactorUpdateArticlePage />;
}
