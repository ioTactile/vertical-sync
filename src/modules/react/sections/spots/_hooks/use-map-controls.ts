import { MAP_ZOOM_RADIUS } from "@/app/_constants/app";
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
  updateMapView: (newCenter: [number, number]) => void;
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

  const handleZoomChange = (newZoom: number) => {
    console.log("newZoom", newZoom);
    setState((prev) => ({ ...prev, zoom: newZoom }));
  };

  const handleMapClick = () => {
    onSpotSelect(null);
  };

  const updateMapView = (newCenter: [number, number]) => {
    setState({
      zoom: MAP_ZOOM_RADIUS,
      center: newCenter,
      shouldUpdateView: true,
    });
  };

  React.useEffect(() => {
    if (userLocation) {
      console.log("userLocation", userLocation);
      updateMapView(userLocation);
    }
  }, [userLocation]);

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
    handleZoomChange,
    handleMapClick,
    updateMapView,
  };
};

export default useMapControls;
