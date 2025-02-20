"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { SpotsFilters } from "@/modules/react/sections/spots/_components/spots-filters";
import { useState, useCallback, useMemo } from "react";
import { ClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import { Skeleton } from "@/app/_components/ui/skeleton";

// Exemple de données
const spots: ClimbingSpot[] = [
  {
    id: "1",
    name: "Fontainebleau",
    latitude: 48.4,
    longitude: 2.7,
    type: "BOULDER",
    difficulty: "3a à 8c",
    description: "Le plus grand site de bloc au monde, situé en Île-de-France.",
  },
  {
    id: "2",
    name: "Verdon",
    latitude: 43.75,
    longitude: 6.35,
    type: "LEAD",
    difficulty: "5a à 8b+",
    description: "Les gorges du Verdon, site majeur de l'escalade en France.",
  },
  {
    id: "3",
    name: "Arkose Bordeaux",
    latitude: 44.863016,
    longitude: -0.5754953,
    type: "INDOOR",
    difficulty: "3a à 8c",
    description:
      "Installé dans un ancien chai centenaire, Arkose bordeaux est la 3ème salle de la franchise.",
  },
  {
    id: "4",
    name: "Block Out Reims",
    latitude: 49.2408702,
    longitude: 4.0834474,
    type: "INDOOR",
    difficulty: "3a à 8c",
    description: "Plus grande salle de Champagne-Ardennes",
  },
  // Ajoutez d'autres spots...
];

const Map = dynamic(() => import("./map"), {
  ssr: false, // Désactive le rendu côté serveur
  loading: () => <Skeleton className="h-[600px] w-full" />,
});

const ClimbingSpotsMap = () => {
  const [filters, setFilters] = useState({
    type: ["ALL"],
    search: "",
  });

  const handleFilterChange = useCallback(
    (newFilters: { type: string[]; search: string }) => {
      setFilters(newFilters);
    },
    []
  );

  const filteredSpots = useMemo(() => {
    return spots.filter((spot) => {
      const matchesType =
        filters.type.includes("ALL") || filters.type.includes(spot.type);

      const matchesSearch =
        spot.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        spot.description.toLowerCase().includes(filters.search.toLowerCase());

      return matchesType && matchesSearch;
    });
  }, [filters]);

  return (
    <div className="container mx-auto px-4 sm:px-0 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Spots d&apos;escalade en France
      </h1>

      <SpotsFilters onFilterChange={handleFilterChange} />

      <div className="relative">
        <Map spots={filteredSpots} />

        <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium">
            {filteredSpots.length} spot{filteredSpots.length > 1 ? "s" : ""}{" "}
            trouvé{filteredSpots.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClimbingSpotsMap;
