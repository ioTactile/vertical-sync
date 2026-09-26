import { Skeleton } from '@/app/_components/ui/skeleton';

const TalkCardsSkeleton = () => {
  return (
    <div className="flex flex-col">
      <Skeleton className="w-full h-32 my-1" />
      <Skeleton className="w-full h-32 my-1" />
      <Skeleton className="w-full h-32 my-1" />
    </div>
  );
};

export default TalkCardsSkeleton;
