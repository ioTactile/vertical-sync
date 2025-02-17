import TalkCardsSkeleton from "@/modules/react/sections/talks/_components/talk-cards-skeleton";

export default function BlogLoading() {
  return (
    <div className="container mx-auto pt-2 pb-4 px-4 sm:px-0">
      <TalkCardsSkeleton />;
    </div>
  );
}
