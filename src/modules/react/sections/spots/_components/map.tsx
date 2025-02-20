"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { ClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";

interface MapProps {
  spots: ClimbingSpot[];
}

const Map = ({ spots }: MapProps) => {
  return (
    <MapContainer
      center={[46.603354, 1.888334]} // Centre de la France
      zoom={6}
      className="h-[600px] w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {spots.map((spot) => (
        <Marker key={spot.id} position={[spot.latitude, spot.longitude]}>
          <Popup>
            <div className="p-2">
              <h3 className="text-lg font-bold">{spot.name}</h3>
              <p className="text-sm text-muted-foreground">Type: {spot.type}</p>
              <p className="text-sm text-muted-foreground">
                Difficulté: {spot.difficulty}
              </p>
              <p className="mt-2">{spot.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
