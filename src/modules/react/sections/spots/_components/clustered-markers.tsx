import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import * as React from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface ClusteredMarkersProps {
  spots: ExtendedClimbingSpot[];
  onSpotSelect: (spot: ExtendedClimbingSpot) => void;
}

const ClusteredMarkers = ({ spots, onSpotSelect }: ClusteredMarkersProps) => {
  const map = useMap();
  const markerClusterRef = React.useRef<L.MarkerClusterGroup | null>(null);
  const isInitializedRef = React.useRef(false);

  // Création du groupe de clusters mémorisé
  const markerClusterGroup = React.useMemo(() => {
    return L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: (zoom) => {
        if (zoom <= 7) return 80;
        if (zoom <= 10) return 60;
        if (zoom <= 13) return 40;
        return 20;
      },
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      animate: true,
    });
  }, []);

  // Initialisation du cluster
  React.useEffect(() => {
    markerClusterRef.current = markerClusterGroup;
    map.addLayer(markerClusterGroup);

    return () => {
      if (markerClusterRef.current) {
        map.removeLayer(markerClusterRef.current);
      }
    };
  }, [map, markerClusterGroup]);

  // Mise à jour des markers
  React.useEffect(() => {
    // Attendre que la carte soit initialisée
    const updateMarkers = () => {
      if (!markerClusterRef.current || !map) return;

      markerClusterRef.current.clearLayers();

      spots.forEach((spot) => {
        const marker = L.marker([spot.latitude, spot.longitude], {
          icon: L.icon({
            iconUrl: "/assets/marker.png",
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          }),
        });

        marker.on("click", () => onSpotSelect(spot));

        const zoom = map.getZoom();
        if (zoom > 13) {
          marker.bindTooltip(spot.name, {
            permanent: true,
            direction: "right",
          });
        }

        markerClusterRef.current?.addLayer(marker);
      });
    };

    // S'assurer que la carte est prête
    if (!isInitializedRef.current) {
      map.once("load", () => {
        isInitializedRef.current = true;
        updateMarkers();
      });
    } else {
      updateMarkers();
    }
  }, [spots, map, onSpotSelect]);

  // Gestion du zoom pour les tooltips
  React.useEffect(() => {
    const handleZoomEnd = () => {
      if (!markerClusterRef.current) return;

      const zoom = map.getZoom();
      markerClusterRef.current.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          if (zoom > 13) {
            if (!layer.getTooltip()) {
              const spot = spots.find(
                (s) =>
                  s.latitude === layer.getLatLng().lat &&
                  s.longitude === layer.getLatLng().lng
              );
              if (spot) {
                layer.bindTooltip(spot.name, {
                  permanent: true,
                  direction: "right",
                });
              }
            }
          } else {
            if (layer.getTooltip()) {
              layer.unbindTooltip();
            }
          }
        }
      });
    };

    map.on("zoomend", handleZoomEnd);

    return () => {
      map.off("zoomend", handleZoomEnd);
    };
  }, [map, spots]);

  return null;
};

export default ClusteredMarkers;
