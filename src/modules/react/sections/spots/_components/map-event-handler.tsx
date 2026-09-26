import { useMap, useMapEvents } from 'react-leaflet';
import * as React from 'react';
import debounce from 'lodash.debounce';

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

  const debouncedViewUpdate = React.useMemo(
    () =>
      debounce((center: [number, number], zoom: number) => {
        map.setView(center, zoom, {
          animate: true,
          duration: 0.5,
        });
      }, 100),
    [map],
  );

  React.useEffect(() => {
    if (shouldUpdateView) {
      debouncedViewUpdate(center, zoom);
    }
  }, [center, zoom, shouldUpdateView, debouncedViewUpdate]);

  useMapEvents({
    zoomend: () => {
      onZoomChange(map.getZoom());
    },
    moveend: () => {},
    click: () => {
      onMapClick();
    },
  });

  return null;
};

export default MapEventHandler;
