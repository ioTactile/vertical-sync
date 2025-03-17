import TalksHeader from "@/modules/react/sections/talks/_components/talks-header";
import TalkCards from "@/modules/react/sections/talks/_components/talk-cards";
import * as React from "react";
import TalkCardsSkeleton from "@/modules/react/sections/talks/_components/talk-cards-skeleton";

const Talks = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 pt-2 pb-4 px-4 sm:px-0">
      <TalksHeader />
      <React.Suspense fallback={<TalkCardsSkeleton />}>
        <TalkCards />
      </React.Suspense>
    </div>
  );
};

export default Talks;
