"use client";

import dynamic from "next/dynamic";
import { SpotsFilters } from "@/modules/react/sections/spots/_components/climbing-spots-filters";
import * as React from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import {
  ClimbingSpot,
  ClimbingSpotType,
  ClimbingSpotDifficulty,
} from "@prisma/client";
import ClimbingSpotSelected from "./climbing-spot-selected";
import useClimbingSpotsByRadiusAndCoords from "@/modules/core/hooks/use-climbing-spots-by-radius-and-coors";
import { DEFAULT_LOCATION, DEFAULT_RADIUS } from "@/app/_constants/app";

const Map = dynamic(() => import("./map"), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

const ClimbingSpotsMap = () => {
  const [selectedSpot, setSelectedSpot] = React.useState<ClimbingSpot | null>(
    null
  );
  const [userLocation, setUserLocation] = React.useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(true);

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Erreur de géolocalisation:", error);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  const { data: climbingSpotsByRadiusAndCoords } =
    useClimbingSpotsByRadiusAndCoords(
      DEFAULT_RADIUS,
      userLocation ?? DEFAULT_LOCATION,
      {
        enabled: !isLoadingLocation,
      }
    );

  const [filters, setFilters] = React.useState<{
    type: ClimbingSpotType[];
    difficulties: ClimbingSpotDifficulty[];
    search: string;
  }>({
    type: [ClimbingSpotType.ALL],
    difficulties: [],
    search: "",
  });

  const handleFilterChange = React.useCallback(
    (newFilters: {
      type: ClimbingSpotType[];
      difficulties: ClimbingSpotDifficulty[];
      search: string;
    }) => {
      setFilters(newFilters);
    },
    []
  );

  const filteredSpots = React.useMemo(() => {
    return (
      climbingSpotsByRadiusAndCoords?.filter((spot) => {
        const matchesType =
          filters.type.includes(ClimbingSpotType.ALL) ||
          filters.type.some((type) =>
            spot.types.includes(type as ClimbingSpotType)
          );

        const matchesDifficulty =
          filters.difficulties.length === 0 ||
          filters.difficulties.some((difficulty) =>
            spot.difficulties.includes(difficulty)
          );

        const matchesSearch =
          spot.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          spot.description
            ?.toLowerCase()
            .includes(filters.search.toLowerCase());

        return matchesType && matchesDifficulty && matchesSearch;
      }) ?? []
    );
  }, [filters, climbingSpotsByRadiusAndCoords]);

  return (
    <div className="relative min-h-screen-minus-header">
      <SpotsFilters onFilterChange={handleFilterChange} />

      {selectedSpot && <ClimbingSpotSelected spot={selectedSpot} />}

      <Map spots={filteredSpots} onSpotSelect={setSelectedSpot} />

      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
        <p className="text-sm font-medium">
          {filteredSpots.length} spot{filteredSpots.length > 1 ? "s" : ""}{" "}
          trouvé{filteredSpots.length > 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
};

export default ClimbingSpotsMap;
