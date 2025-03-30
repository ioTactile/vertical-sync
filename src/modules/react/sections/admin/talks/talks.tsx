"use client";

import useTalks from "@/modules/core/hooks/use-talks";
import TalksHeader from "@/modules/react/sections/admin/talks/_components/talks-header";
import { DataTable } from "@/modules/react/sections/_components/data-table";
import { columns } from "@/modules/react/sections/admin/talks/_components/columns";
import { getFormatedDate } from "@/modules/core/utils/date";
import TableSkeleton from "@/app/_components/ui/table-skeleton";

const Talks = () => {
  const { data: talks, isPending } = useTalks();

  const talksFormated = talks?.map((talk) => ({
    ...talk,
    createdAt: getFormatedDate(talk.createdAt),
    updatedAt: getFormatedDate(talk.updatedAt),
  }));

  console.log(talksFormated);

  if (!talksFormated) return null;

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <TalksHeader />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <DataTable columns={columns} data={talksFormated} />
      )}
    </div>
  );
};

export default Talks;
