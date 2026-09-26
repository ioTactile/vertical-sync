'use client';

import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ArticleCommentsHeader = () => {
  const { id } = useParams();

  return (
    <Button variant="outline" size="sm" asChild className="rounded-full self-end">
      <Link href={`/admin/articles/${id as string}/comments/create`}>
        <Plus />
        Créer un commentaire
      </Link>
    </Button>
  );
};

export default ArticleCommentsHeader;
