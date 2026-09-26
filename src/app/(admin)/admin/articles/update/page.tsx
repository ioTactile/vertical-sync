import NotFoundPage from '@/app/not-found';
import AdminUpdateArticlePage from '@/modules/react/pages/AdminUpdateArticlePage';
import { PageProps } from '@/types/pages-props';

export default async function AdminUpdateArticle({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  return <AdminUpdateArticlePage />;
}
