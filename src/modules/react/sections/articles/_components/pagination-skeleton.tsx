import { Skeleton } from "@/app/_components/ui/skeleton";

const PaginationSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      <Skeleton className="w-28 h-9" />
      <Skeleton className="w-10 h-9" />
      <Skeleton className="w-28 h-9" />
    </div>
  );
};

export default PaginationSkeleton;
