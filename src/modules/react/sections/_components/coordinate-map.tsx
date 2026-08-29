"use client";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as React from "react";
import L from "leaflet";
import { DEFAULT_LOCATION, MAP_ZOOM_DEFAULT } from "@/app/_constants/app";

const icon = L.icon({
  iconUrl: "/assets/marker.png",
  iconSize: [40, 40], // taille en pixels [largeur, hauteur]
  iconAnchor: [20, 20], // point d'ancrage de l'icône [x, y] par rapport au coin supérieur gauche
  popupAnchor: [0, -40], // point d'ancrage du popup par rapport au coin supérieur gauche
  tooltipAnchor: [10, 0], // point d'ancrage du tooltip par rapport au coin supérieur gauche
});

interface MarkerSelectorProps {
  onSelectPosition: (position: [number, number]) => void;
  initialPosition: [number, number];
}

const MarkerSelector: React.FC<MarkerSelectorProps> = ({
  onSelectPosition,
  initialPosition,
}) => {
  const [position, setPosition] =
    React.useState<[number, number]>(initialPosition);

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      const newPosition: [number, number] = [lat, lng];
      setPosition(newPosition);
      onSelectPosition(newPosition);
    },
  });

  React.useEffect(() => {
    map.flyTo(initialPosition, map.getZoom());
  }, [initialPosition, map]);

  return <Marker position={position} icon={icon} />;
};

interface CoordinateMapProps {
  initialCoords: [number, number];
  onSelectCoords: (coords: [number, number]) => void;
}

const CoordinateMap = ({
  initialCoords = DEFAULT_LOCATION,
  onSelectCoords,
}: CoordinateMapProps) => {
  const [selectedPosition, setSelectedPosition] =
    React.useState<[number, number]>(initialCoords);

  const handlePositionSelect = (position: [number, number]) => {
    setSelectedPosition(position);
    onSelectCoords(position);
  };

  return (
    <div className="w-full h-[400px] relative">
      <div className="absolute bottom-4 left-4 z-1000 bg-background text-foreground p-2 rounded-md shadow-md text-xs">
        <p>Latitude: {selectedPosition[0].toFixed(6)}</p>
        <p>Longitude: {selectedPosition[1].toFixed(6)}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Cliquez sur la carte pour sélectionner un point
        </p>
      </div>
      <MapContainer
        zoomControl={false}
        center={initialCoords}
        zoom={MAP_ZOOM_DEFAULT}
        className="w-full h-full"
      >
        <ZoomControl position="bottomright" />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          updateWhenIdle={true}
          updateWhenZooming={false}
        />
        <MarkerSelector
          onSelectPosition={handlePositionSelect}
          initialPosition={initialCoords}
        />
      </MapContainer>
    </div>
  );
};

export default CoordinateMap;
