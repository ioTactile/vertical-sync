import { useQueryState } from "nuqs";
import { useDebounce } from "@/app/_hooks/use-debounce";
import * as React from "react";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import useClimbingSpotsSearch from "@/modules/core/hooks/use-climbing-spots-search";
import { extractCoords } from "@/lib/utils";

interface UseSpotSearchProps {
  isSpotSelected: boolean;
  onSpotSelect: (spot: ExtendedClimbingSpot) => void;
  updateMapView: (center: [number, number], zoom: number) => void;
}
interface UseSpotSearchReturn {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (value: boolean) => void;
  searchResults: ExtendedClimbingSpot[];
  isLoading: boolean;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleEnterPress: () => void;
  handleSpotSelect: (spot: ExtendedClimbingSpot) => void;
}

export const useSpotSearch = ({
  isSpotSelected,
  onSpotSelect,
  updateMapView,
}: UseSpotSearchProps): UseSpotSearchReturn => {
  const [searchQuery, setSearchQuery] = useQueryState("search", {
    defaultValue: "",
  });
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: searchResults, isLoading } =
    useClimbingSpotsSearch(searchQuery);

  const extendedSearchResults = React.useMemo(() => {
    return (
      searchResults?.map((spot) => {
        const { coords, ...rest } = spot;
        return {
          ...rest,
          ...extractCoords(coords),
          notation: rest.notation?.toString() ?? "0",
        };
      }) ?? []
    );
  }, [searchResults]);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    [setSearchQuery]
  );

  React.useEffect(() => {
    const shouldOpen = debouncedSearch.length > 2 && !isSpotSelected;

    if (shouldOpen && debouncedSearch !== searchQuery) {
      setIsSearchOpen(true);
    }
  }, [debouncedSearch, isSpotSelected, searchQuery]);

  const handleEnterPress = React.useCallback(() => {
    if (searchResults && searchResults.length > 0) {
      setIsSearchOpen(false);
    }
  }, [searchResults]);

  const handleSpotSelect = React.useCallback(
    (spot: ExtendedClimbingSpot) => {
      onSpotSelect(spot);
      updateMapView([spot.latitude, spot.longitude], 15);
      setSearchQuery(spot.name);
    },
    [onSpotSelect, updateMapView, setSearchQuery]
  );

  return {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    searchResults: extendedSearchResults,
    isLoading,
    handleSearch,
    handleEnterPress,
    handleSpotSelect,
  };
};
