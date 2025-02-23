import { useMap, useMapEvents } from "react-leaflet";
import * as React from "react";

interface MapEventHandlerProps {
  onZoomChange: (zoom: number) => void;
  onMapClick: () => void;
  center: [number, number];
  zoom: number;
  shouldUpdateView: boolean;
}

const MapEventHandler = ({
  onZoomChange,
  onMapClick,
  center,
  zoom,
  shouldUpdateView,
}: MapEventHandlerProps) => {
  const map = useMap();

  React.useEffect(() => {
    if (shouldUpdateView) {
      map.setView(center, zoom);
    }
  }, [map, center, zoom, shouldUpdateView]);

  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
    click: () => {
      onMapClick();
    },
  });

  return null;
};

export default MapEventHandler;
