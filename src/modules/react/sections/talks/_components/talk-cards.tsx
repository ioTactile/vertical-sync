"use client";

import * as React from "react";
import useTalks from "@/modules/core/hooks/use-talks";
import TalkCard from "@/modules/react/sections/talks/_components/talk-card";
import { Separator } from "@/app/_components/ui/separator";
import TalkCardsSkeleton from "@/modules/react/sections/talks/_components/talk-cards-skeleton";

const TalkCards = () => {
  const { data: talks, isPending } = useTalks();

  if (isPending) {
    return <TalkCardsSkeleton />;
  }

  return (
    <div className="flex flex-col">
      {talks?.map((talk, index) => (
        <React.Fragment key={talk.id}>
          <TalkCard talk={talk} />
          {index < talks.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default TalkCards;
