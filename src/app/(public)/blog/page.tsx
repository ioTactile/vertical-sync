import { SITE_NAME } from '@/app/_constants/seo';
import ArticlesPage from '@/modules/react/pages/ArticlesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Blog`,
  description: "Découvrez les dernières actualités et conseils pour l'escalade",
};

export default async function Articles() {
  return <ArticlesPage />;
}
