"use client";

import dynamic from "next/dynamic";
import { SpotsFilters } from "@/modules/react/sections/spots/_components/climbing-spots-filters";
import * as React from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import ClimbingSpotSelected from "@/modules/react/sections/spots/_components/climbing-spot-selected";
import useClimbingSpotsByRadiusAndCoords from "@/modules/core/hooks/use-climbing-spots-by-radius-and-coors";
import {
  DEFAULT_LOCATION,
  DEFAULT_RADIUS,
  MAP_ZOOM_DEFAULT,
} from "@/app/_constants/app";
import useMapControls from "../_hooks/use-map-controls";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import useGeolocation from "@/modules/react/sections/spots/_hooks/use-geolocation";
import useSpotFilters from "@/modules/react/sections/spots/_hooks/use-spot-filters";
import SpotCounter from "@/modules/react/sections/spots/_components/climbing-spot-counter";

const Map = dynamic(() => import("./map"), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

const ClimbingSpotsMap = () => {
  const [selectedSpot, setSelectedSpot] =
    React.useState<ExtendedClimbingSpot | null>(null);

  const { userLocation, isLoadingLocation } = useGeolocation();

  const { data: climbingSpots } = useClimbingSpotsByRadiusAndCoords(
    DEFAULT_RADIUS,
    userLocation ?? DEFAULT_LOCATION,
    {
      enabled: !isLoadingLocation,
    }
  );

  const {
    zoom,
    center,
    shouldUpdateView,
    handleZoomChange,
    handleMapClick,
    updateMapView,
  } = useMapControls({
    defaultZoom: MAP_ZOOM_DEFAULT,
    defaultCenter: DEFAULT_LOCATION,
    onSpotSelect: setSelectedSpot,
    userLocation,
  });

  const {
    filteredSpots,
    handleFilterChange,
    addSearchSpots,
    clearSearchSpots,
  } = useSpotFilters(climbingSpots, selectedSpot);

  return (
    <div className="relative">
      <SpotsFilters
        userLocation={userLocation}
        isSpotSelected={!!selectedSpot}
        onFilterChange={handleFilterChange}
        onSpotSelect={setSelectedSpot}
        updateMapView={updateMapView}
        addSearchSpots={addSearchSpots}
        clearSearchSpots={clearSearchSpots}
      />
      {selectedSpot && <ClimbingSpotSelected spot={selectedSpot} />}
      <Map
        spots={filteredSpots}
        zoom={zoom}
        center={center}
        shouldUpdateView={shouldUpdateView}
        onSpotSelect={setSelectedSpot}
        handleZoomChange={handleZoomChange}
        handleMapClick={handleMapClick}
      />
      <SpotCounter count={filteredSpots.length} />
    </div>
  );
};

export default ClimbingSpotsMap;
