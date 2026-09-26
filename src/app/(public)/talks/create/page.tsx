import { SITE_NAME } from '@/app/_constants/seo';
import CreateTalkPage from '@/modules/react/pages/CreateTalkPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${SITE_NAME} - Créer une discussion`,
  description: 'Créez une discussion pour partager vos idées et vos expériences',
};

export default function CreateTalk() {
  return <CreateTalkPage />;
}
