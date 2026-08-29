"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import {
  ExtendedClimbingSpot,
  ExtendedClimbingSpots,
} from "@/modules/core/model/ClimbingSpot";
import MapEventHandler from "@/modules/react/sections/spots/_components/map-event-handler";
import ClusteredMarkers from "@/modules/react/sections/spots/_components/clustered-markers";
import SpotPinLegend from "@/modules/react/sections/spots/_components/spot-pin-legend";
import MapFullscreenControl from "@/modules/react/sections/spots/_components/map-fullscreen-control";

interface MapProps {
  spots: ExtendedClimbingSpots;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
  zoom: number;
  center: [number, number];
  handleZoomChange: (zoom: number) => void;
  handleMapClick: () => void;
  shouldUpdateView: boolean;
  spotCount?: number;
  fullscreenWrapperRef?: React.RefObject<HTMLDivElement | null>;
}

const Map = ({
  spots,
  onSpotSelect,
  zoom,
  center,
  handleZoomChange,
  handleMapClick,
  shouldUpdateView,
  spotCount,
  fullscreenWrapperRef,
}: MapProps) => {
  return (
    <MapContainer
      zoomControl={false}
      className="w-full h-screen-minus-header sm:h-150"
      preferCanvas={true}
      center={center}
      zoom={zoom}
    >
      <MapEventHandler
        onZoomChange={handleZoomChange}
        onMapClick={handleMapClick}
        center={center}
        zoom={zoom}
        shouldUpdateView={shouldUpdateView}
      />
      <ZoomControl position="bottomright" />
      <MapFullscreenControl fullscreenWrapperRef={fullscreenWrapperRef} />
      <SpotPinLegend spotCount={spotCount} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        updateWhenIdle={true}
        updateWhenZooming={false}
      />
      <ClusteredMarkers spots={spots} onSpotSelect={onSpotSelect} />
    </MapContainer>
  );
};

export default Map;
