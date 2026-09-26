import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import { getSpotPinColor } from "@/modules/react/sections/spots/_components/spot-pin-color";
import { useEffect, useMemo, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

interface ClusteredMarkersProps {
  spots: ExtendedClimbingSpot[];
  onSpotSelect: (spot: ExtendedClimbingSpot) => void;
}

const ClusteredMarkers = ({ spots, onSpotSelect }: ClusteredMarkersProps) => {
  const map = useMap();
  const markerClusterRef = useRef<L.MarkerClusterGroup | null>(null);

  const markerClusterGroup = useMemo(() => {
    // leaflet.markercluster patche l'instance globale (window.L), pas le namespace ESM Turbopack
    const leaflet = (window as typeof globalThis & { L: typeof L }).L;
    return leaflet.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: (zoom: number) => {
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
  useEffect(() => {
    markerClusterRef.current = markerClusterGroup;
    map.addLayer(markerClusterGroup);

    return () => {
      if (markerClusterRef.current) {
        map.removeLayer(markerClusterRef.current);
      }
    };
  }, [map, markerClusterGroup]);

  // Mise à jour des markers
  useEffect(() => {
    const updateMarkers = () => {
      if (!markerClusterRef.current || !map) return;

      markerClusterRef.current.clearLayers();

      spots.forEach((spot) => {
        const color = getSpotPinColor(spot);
        const marker = L.marker([spot.latitude, spot.longitude], {
          icon: L.divIcon({
            className: "spot-pin-marker",
            html: `<span style="background-color:${color};border:2px solid #1e293b;width:20px;height:20px;border-radius:50%;display:block;box-sizing:border-box;"></span>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10],
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

    // whenReady s'exécute tout de suite si la map est déjà chargée
    // (contrairement à once("load") qui rate l'événement déjà émis)
    map.whenReady(updateMarkers);
  }, [spots, map, onSpotSelect]);

  // Gestion du zoom pour les tooltips
  useEffect(() => {
    const handleZoomEnd = () => {
      if (!markerClusterRef.current) return;

      const zoom = map.getZoom();
      markerClusterRef.current.eachLayer((layer: L.Layer) => {
        if (!(layer instanceof L.Marker)) return;
        const latLng = layer.getLatLng();
        const spot = spots.find(
          (s) => s.latitude === latLng.lat && s.longitude === latLng.lng,
        );
        if (!spot) return;

        if (zoom > 13) {
          if (!layer.getTooltip()) {
            layer.bindTooltip(spot.name, {
              permanent: true,
              direction: "right",
            });
          }
        } else {
          if (layer.getTooltip()) {
            layer.unbindTooltip();
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
