import { SITE_NAME } from '@/app/_constants/seo';
import TalksPage from '@/modules/react/pages/TalksPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Discussions`,
  description: "Découvrez les dernières discussions et échanges sur l'escalade",
};

export default async function Talks() {
  return <TalksPage />;
}
