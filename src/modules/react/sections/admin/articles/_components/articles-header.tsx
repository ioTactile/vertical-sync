import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const ArticlesHeader = () => {
  return (
    <Button variant="outline" size="sm" asChild className="rounded-full self-end">
      <Link href="/admin/articles/create">
        <Plus />
        Créer un article
      </Link>
    </Button>
  );
};

export default ArticlesHeader;
