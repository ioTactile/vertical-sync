import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const TagsHeader = () => {
  return (
    <Button variant="outline" size="sm" asChild className="rounded-full self-end">
      <Link href="/admin/tags/create">
        <Plus />
        Créer un tag
      </Link>
    </Button>
  );
};

export default TagsHeader;
