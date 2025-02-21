"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ClimbingSpot } from "@prisma/client";
import * as React from "react";
import { MAP_ZOOM_DEFAULT, MAP_ZOOM_TOOLTIP_MIN } from "@/app/_constants/app";

interface MapProps {
  spots: ClimbingSpot[];
  onSpotSelect: (spot: ClimbingSpot | null) => void;
}

const icon = L.icon({
  iconUrl: "/assets/marker.png",
  iconSize: [40, 40], // taille en pixels [largeur, hauteur]
  iconAnchor: [20, 20], // point d'ancrage de l'icône [x, y] par rapport au coin supérieur gauche
  popupAnchor: [0, -40], // point d'ancrage du popup par rapport au coin supérieur gauche
  tooltipAnchor: [10, 0], // point d'ancrage du tooltip par rapport au coin supérieur gauche
});

function ZoomHandler({
  setZoom,
  onSpotSelect,
}: {
  setZoom: (zoom: number) => void;
  onSpotSelect: (spot: ClimbingSpot | null) => void;
}) {
  const map = useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
    click: () => {
      onSpotSelect(null);
    },
  });
  return null;
}

const Map = ({ spots, onSpotSelect }: MapProps) => {
  const mapRef = React.useRef(null);
  const [zoom, setZoom] = React.useState(MAP_ZOOM_DEFAULT);

  return (
    <MapContainer
      ref={mapRef}
      center={[46.603354, 1.888334]} // Centre de la France
      zoom={zoom}
      zoomControl={false}
      className="h-[600px] w-full"
    >
      <ZoomHandler setZoom={setZoom} onSpotSelect={onSpotSelect} />
      <ZoomControl position="bottomright" />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {spots.length > 0 &&
        spots.map((spot) => (
          <Marker
            key={spot.id}
            position={[spot.latitude, spot.longitude]}
            eventHandlers={{
              click: () => onSpotSelect(spot),
            }}
            icon={icon}
          >
            {zoom > MAP_ZOOM_TOOLTIP_MIN && (
              <Tooltip direction="right" permanent={true}>
                {spot.name}
              </Tooltip>
            )}
          </Marker>
        ))}
    </MapContainer>
  );
};

export default Map;
