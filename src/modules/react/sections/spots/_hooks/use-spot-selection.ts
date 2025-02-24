import * as React from "react";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";

interface UseSpotSelectionProps {
  userLocation: [number, number] | null;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
  updateMapView: (center: [number, number]) => void;
  setSearchQuery: (value: string) => void;
  setIsSearchOpen: (value: boolean) => void;
  addSearchSpots: (spots: ExtendedClimbingSpot[]) => void;
  clearSearchSpots: () => void;
}

interface UseSpotSelectionReturn {
  handleSpotSelect: (spot: ExtendedClimbingSpot) => void;
  handleEnterPress: (spots: ExtendedClimbingSpot[]) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchContainerRef: React.RefObject<HTMLDivElement | null>;
}

export const useSpotSelection = ({
  userLocation,
  onSpotSelect,
  updateMapView,
  setSearchQuery,
  setIsSearchOpen,
  addSearchSpots,
  clearSearchSpots,
}: UseSpotSelectionProps): UseSpotSelectionReturn => {
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const handleEnterPress = React.useCallback(
    (spots: ExtendedClimbingSpot[]) => {
      if (!spots.length) return;

      clearSearchSpots();
      addSearchSpots(spots);
      let selectedSpot = spots[0];

      if (userLocation) {
        selectedSpot = spots.reduce((closest, current) => {
          const distanceToCurrent = Math.sqrt(
            Math.pow(current.latitude - userLocation[0], 2) +
              Math.pow(current.longitude - userLocation[1], 2)
          );
          const distanceToClosest = Math.sqrt(
            Math.pow(closest.latitude - userLocation[0], 2) +
              Math.pow(closest.longitude - userLocation[1], 2)
          );
          return distanceToCurrent < distanceToClosest ? current : closest;
        }, spots[0]);
      }

      setSearchQuery(selectedSpot.name);
      onSpotSelect(selectedSpot);
      setIsSearchOpen(false);
      updateMapView([selectedSpot.latitude, selectedSpot.longitude]);
      searchInputRef.current?.blur();
    },
    [
      onSpotSelect,
      updateMapView,
      setSearchQuery,
      setIsSearchOpen,
      addSearchSpots,
      clearSearchSpots,
      userLocation,
    ]
  );

  const handleSpotSelect = React.useCallback(
    (spot: ExtendedClimbingSpot) => {
      setSearchQuery(spot.name);
      onSpotSelect(spot);
      setIsSearchOpen(false);
      updateMapView([spot.latitude, spot.longitude]);
      searchInputRef.current?.blur();
    },
    [onSpotSelect, updateMapView, setSearchQuery, setIsSearchOpen]
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearchOpen]);

  return {
    handleSpotSelect,
    handleEnterPress,
    searchInputRef,
    searchContainerRef,
  };
};
