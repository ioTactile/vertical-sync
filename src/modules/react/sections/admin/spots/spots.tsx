"use client";

import useAdminClimbingSpots from "@/modules/core/hooks/use-public-climbing-spots";
import ClimbingSpotsHeader from "@/modules/react/sections/admin/spots/_components/spot-header";
import { DataTable } from "@/modules/react/sections/_components/data-table";
import { columns } from "@/modules/react/sections/admin/spots/_components/columns";
import { getFormatedDate } from "@/modules/core/utils/date";
import { extractCoords } from "@/lib/utils";

const ClimbingSpots = () => {
  const { data: spots } = useAdminClimbingSpots();

  const spotsFormated = spots?.map((spot) => {
    const { coords, ...rest } = spot;
    return {
      ...rest,
      ...extractCoords(coords),
      notation: rest.notation?.toString() ?? "0",
      createdAt: getFormatedDate(spot.createdAt),
      updatedAt: getFormatedDate(spot.updatedAt),
    };
  });

  if (!spotsFormated) return null;

  return (
    <div className="container flex flex-col space-y-2 mx-auto py-2">
      <ClimbingSpotsHeader />
      <DataTable columns={columns} data={spotsFormated} />
    </div>
  );
};

export default ClimbingSpots;
