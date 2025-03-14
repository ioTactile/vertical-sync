import { MAP_ZOOM_RADIUS } from "@/app/_constants/app";
import throttle from "lodash.throttle";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import * as React from "react";

interface MapControlsState {
  zoom: number;
  center: [number, number];
  shouldUpdateView: boolean;
}

interface UseMapControlsProps {
  defaultZoom: number;
  defaultCenter: [number, number];
  userLocation: [number, number] | null;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
}

interface UseMapControlsReturn {
  zoom: number;
  center: [number, number];
  shouldUpdateView: boolean;
  handleZoomChange: (newZoom: number) => void;
  handleMapClick: () => void;
  updateMapView: (newCenter: [number, number], zoom?: number) => void;
}

const useMapControls = ({
  defaultZoom,
  defaultCenter,
  userLocation,
  onSpotSelect,
}: UseMapControlsProps): UseMapControlsReturn => {
  const [state, setState] = React.useState<MapControlsState>({
    zoom: defaultZoom,
    center: defaultCenter,
    shouldUpdateView: true,
  });

  const handleZoomChange = React.useCallback(
    (newZoom: number) => {
      setState((prev) => ({ ...prev, zoom: newZoom }));
    },
    [setState]
  );

  const throttledZoomChange = React.useCallback(
    () => throttle(handleZoomChange, 100),
    [handleZoomChange]
  );

  const handleMapClick = React.useCallback(() => {
    onSpotSelect(null);
  }, [onSpotSelect]);

  const updateMapView = React.useCallback(
    (newCenter: [number, number], zoom?: number) => {
      setState({
        zoom: zoom ?? MAP_ZOOM_RADIUS,
        center: newCenter,
        shouldUpdateView: true,
      });
    },
    [setState]
  );

  React.useEffect(() => {
    if (userLocation) {
      updateMapView(userLocation);
    }
  }, [userLocation, updateMapView]);

  React.useEffect(() => {
    if (state.shouldUpdateView) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, shouldUpdateView: false }));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [state.shouldUpdateView]);

  return {
    zoom: state.zoom,
    center: state.center,
    shouldUpdateView: state.shouldUpdateView,
    handleZoomChange: throttledZoomChange,
    handleMapClick,
    updateMapView,
  };
};

export default useMapControls;
