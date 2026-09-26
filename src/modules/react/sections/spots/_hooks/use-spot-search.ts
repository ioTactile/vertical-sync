import { useQueryState } from 'nuqs';
import * as React from 'react';
import { ExtendedClimbingSpot } from '@/modules/core/model/ClimbingSpot';
import useClimbingSpotsSearch from '@/modules/core/hooks/use-climbing-spots-search';
import { extractCoords } from '@/lib/utils';

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
  const [searchQuery, setSearchQuery] = useQueryState('search', {
    defaultValue: '',
  });
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);

  const { data: searchResults, isLoading } = useClimbingSpotsSearch(searchQuery);

  const extendedSearchResults = React.useMemo(() => {
    return (
      searchResults?.map((spot) => {
        const { coords, ...rest } = spot;
        return {
          ...rest,
          ...extractCoords(coords),
          notation: rest.notation?.toString() ?? '0',
        };
      }) ?? []
    );
  }, [searchResults]);

  const handleSearch = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      if (value.length > 2 && !isSpotSelected) {
        setIsSearchOpen(true);
      }
    },
    [setSearchQuery, isSpotSelected],
  );

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
    [onSpotSelect, updateMapView, setSearchQuery],
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
