"use client";

import dynamic from "next/dynamic";
import { SpotsFilters } from "@/modules/react/sections/spots/_components/climbing-spots-filters";
import * as React from "react";
import { Skeleton } from "@/app/_components/ui/skeleton";
import ClimbingSpotSelected from "@/modules/react/sections/spots/_components/climbing-spot-selected";
import { DEFAULT_LOCATION, MAP_ZOOM_DEFAULT } from "@/app/_constants/app";
import useMapControls from "@/modules/react/sections/spots/_hooks/use-map-controls";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import useGeolocation from "@/modules/react/sections/spots/_hooks/use-geolocation";
import useSpotFilters from "@/modules/react/sections/spots/_hooks/use-spot-filters";
// import SpotCounter from "@/modules/react/sections/spots/_components/climbing-spot-counter";
import useClimbingSpots from "@/modules/core/hooks/use-public-climbing-spots";

const Map = dynamic(() => import("./map"), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

const ClimbingSpotsMap = () => {
  const [selectedSpot, setSelectedSpot] =
    React.useState<ExtendedClimbingSpot | null>(null);

  const mapWrapperRef = React.useRef<HTMLDivElement>(null);
  const [, forceUpdate] = React.useReducer((n: number) => n + 1, 0);

  React.useEffect(() => {
    const el = mapWrapperRef.current;
    if (!el) return;
    const onFullscreenChange = () => forceUpdate();
    el.addEventListener("fullscreenchange", onFullscreenChange);
    return () => el.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const { userLocation } = useGeolocation();

  // const { data: climbingSpots } = useClimbingSpotsByRadiusAndCoords(
  //   DEFAULT_RADIUS,
  //   userLocation ?? DEFAULT_LOCATION,
  //   {
  //     enabled: !isLoadingLocation,
  //   }
  // );

  const { data: climbingSpots } = useClimbingSpots();

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
    <div ref={mapWrapperRef} className="spots-map-wrapper relative">
      <SpotsFilters
        userLocation={userLocation}
        isSpotSelected={!!selectedSpot}
        onFilterChange={handleFilterChange}
        onSpotSelect={setSelectedSpot}
        updateMapView={updateMapView}
        addSearchSpots={addSearchSpots}
        clearSearchSpots={clearSearchSpots}
        dropdownContainerRef={mapWrapperRef}
      />
      {selectedSpot && (
        <ClimbingSpotSelected
          spot={selectedSpot}
          onClose={() => setSelectedSpot(null)}
        />
      )}
      <Map
        spots={filteredSpots}
        zoom={zoom}
        center={center}
        shouldUpdateView={shouldUpdateView}
        onSpotSelect={setSelectedSpot}
        handleZoomChange={handleZoomChange}
        handleMapClick={handleMapClick}
        spotCount={filteredSpots.length}
        fullscreenWrapperRef={mapWrapperRef}
      />
      {/* {selectedSpot && <SpotCounter count={filteredSpots.length} />} */}
    </div>
  );
};

export default ClimbingSpotsMap;
