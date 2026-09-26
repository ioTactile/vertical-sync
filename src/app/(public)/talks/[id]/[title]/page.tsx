import { SITE_NAME } from '@/app/_constants/seo';
import getTalk from '@/modules/core/queries/get-talk';
import TalkPage from '@/modules/react/pages/TalkPage';
import { PageProps } from '@/types/pages-props';

export async function generateMetadata({ params }: PageProps) {
  const id = (await params).id;

  const talk = await getTalk(id);

  if (!talk) {
    return {
      title: `${SITE_NAME} - Discussion non trouvée`,
      description: "La discussion demandée n'existe pas",
    };
  }

  return {
    title: `${SITE_NAME} - ${talk.title}`,
    description: talk.content?.slice(0, 155) ?? 'Découvrez la discussion et les commentaires',
  };
}

export default async function Talk() {
  return <TalkPage />;
}
