import { Skeleton } from "@/app/_components/ui/skeleton";

const ArticleCardsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
      <Skeleton className="w-full h-96" />
    </div>
  );
};

export default ArticleCardsSkeleton;
