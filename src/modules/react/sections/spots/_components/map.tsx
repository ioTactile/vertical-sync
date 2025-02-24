"use client";

import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import { MAP_ZOOM_TOOLTIP_MIN } from "@/app/_constants/app";
import {
  ExtendedClimbingSpot,
  ExtendedClimbingSpots,
} from "@/modules/core/model/ClimbingSpot";
import MapMarkers from "@/modules/react/sections/spots/_components/map-markers";
import MapEventHandler from "@/modules/react/sections/spots/_components/map-event-handler";

interface MapProps {
  spots: ExtendedClimbingSpots;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
  zoom: number;
  center: [number, number];
  handleZoomChange: (zoom: number) => void;
  handleMapClick: () => void;
  shouldUpdateView: boolean;
}

const Map = ({
  spots,
  onSpotSelect,
  zoom,
  center,
  handleZoomChange,
  handleMapClick,
  shouldUpdateView,
}: MapProps) => {
  return (
    <MapContainer
      zoomControl={false}
      className="w-full h-screen-minus-header sm:h-[600px]"
    >
      <MapEventHandler
        onZoomChange={handleZoomChange}
        onMapClick={handleMapClick}
        center={center}
        zoom={zoom}
        shouldUpdateView={shouldUpdateView}
      />
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers
        spots={spots}
        onSpotSelect={onSpotSelect}
        showTooltips={zoom > MAP_ZOOM_TOOLTIP_MIN}
      />
    </MapContainer>
  );
};

export default Map;
