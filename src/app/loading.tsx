import { Skeleton } from '@/app/_components/ui/skeleton';

export default function GlobalLoading() {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <div className="flex flex-col gap-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
