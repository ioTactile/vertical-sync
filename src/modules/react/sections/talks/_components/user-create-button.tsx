'use client';

import { Button } from '@/app/_components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useUserStore } from '@/modules/core/store/store';

const RedactorCreateButton = () => {
  const { user } = useUserStore();

  if (!user) return null;

  return (
    <Button variant="outline" size="sm" asChild className="rounded-full">
      <Link href="/talks/create">
        <Plus />
        Créer une discussion
      </Link>
    </Button>
  );
};

export default RedactorCreateButton;
