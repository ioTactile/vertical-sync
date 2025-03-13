"use client";

import { useGetFetchQuery } from "@/modules/core/hooks/use-get-fetch-climbing-spot";
import { GetClimbingSpotResponse } from "@/modules/core/model/ClimbingSpot";
import SpotForm from "@/modules/react/sections/admin/spots/_components/spot-form";
import { redirect, useSearchParams } from "next/navigation";

const UpdateSpot = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: spot } = useGetFetchQuery(id as string);

  if (!spot) {
    redirect("/admin/spots");
  }

  return (
    <div className="container mx-auto flex flex-col gap-6 mt-2 px-4 sm:px-0">
      <h1 className="text-2xl lg:text-3xl font-bold">
        Mettre à jour : {spot.name}
      </h1>

      <SpotForm mode="update" initialData={spot as GetClimbingSpotResponse} />
    </div>
  );
};

export default UpdateSpot;
