import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const TalksHeader = () => {
  return (
    <Button variant="outline" size="sm" asChild className="rounded-full self-end">
      <Link href="/admin/talks/create">
        <Plus />
        Créer une discussion
      </Link>
    </Button>
  );
};

export default TalksHeader;
