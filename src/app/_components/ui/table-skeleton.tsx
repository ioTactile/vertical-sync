import { Skeleton } from '@/app/_components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="flex flex-col gap-1">
      <Skeleton className="w-full h-12" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
      <Skeleton className="w-full h-16" />
    </div>
  );
};

export default TableSkeleton;
