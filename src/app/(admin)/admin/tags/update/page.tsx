import NotFoundPage from "@/app/not-found";
import AdminUpdateTagPage from "@/modules/react/pages/AdminUpdateTagPage";
import { PageProps } from "@/types/pages-props";

export default async function AdminUpdateTag({ searchParams }: PageProps) {
  const id = (await searchParams).id as string;

  if (!id) {
    return <NotFoundPage />;
  }

  return <AdminUpdateTagPage />;
}
