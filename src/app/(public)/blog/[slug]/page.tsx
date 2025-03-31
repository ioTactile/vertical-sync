import { SITE_NAME } from "@/app/_constants/seo";
import getArticleBySlug from "@/modules/core/queries/get-article-by-slug";
import ArticlePage from "@/modules/react/pages/ArticlePage";
import { PageProps } from "@/types/pages-props";

export async function generateMetadata({ params }: PageProps) {
  const slug = (await params).slug;

  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: `${SITE_NAME} - Article non trouvé`,
      description: "L'article demandé n'existe pas",
    };
  }

  return {
    title: `${SITE_NAME} - ${article?.title}`,
    description:
      article?.content?.slice(0, 155) ??
      "Découvrez l'article et les commentaires",
  };
}
export default async function Article() {
  return <ArticlePage />;
}
