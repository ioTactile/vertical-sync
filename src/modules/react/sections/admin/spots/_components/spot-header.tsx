import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

const ClimbingSpotsHeader = () => {
  return (
    <Button variant="outline" size="sm" asChild className="rounded-full self-end">
      <Link href="/admin/spots/create">
        <Plus />
        Créer un spot
      </Link>
    </Button>
  );
};

export default ClimbingSpotsHeader;
