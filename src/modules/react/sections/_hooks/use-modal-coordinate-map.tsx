import * as React from "react";

export const useModalCoordinateMap = () => {
  const [isMapOpen, setIsMapOpen] = React.useState(false);
  const [selectedCoordinates, setSelectedCoordinates] = React.useState<
    [number, number] | null
  >(null);

  const handleCoordinateSelection = (coords: [number, number]) => {
    setSelectedCoordinates(coords);
    setIsMapOpen(false);
  };

  return {
    isMapOpen,
    selectedCoordinates,
    setIsMapOpen,
    setSelectedCoordinates,
    handleCoordinateSelection,
  };
};
