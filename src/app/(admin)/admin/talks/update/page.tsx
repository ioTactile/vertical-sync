import NotFoundPage from '@/app/not-found';
import AdminUpdateTalkPage from '@/modules/react/pages/AdminUpdateTalkPage';
import { PageProps } from '@/types/pages-props';

export default async function AdminUpdateTalk({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  return <AdminUpdateTalkPage />;
}
