import { extractCoords } from '@/lib/utils';
import {
  ExtendedClimbingSpot,
  ExtendedClimbingSpots,
  GetClimbingSpotsResponse,
} from '@/modules/core/model/ClimbingSpot';
import { ClimbingSpotDifficulty, ClimbingSpotType } from '@/modules/core/domain/enums';
import * as React from 'react';

interface SpotFilters {
  type: ClimbingSpotType[];
  difficulties: ClimbingSpotDifficulty[];
}

interface UseSpotFiltersReturn {
  filters: SpotFilters;
  handleFilterChange: (newFilters: SpotFilters) => void;
  filteredSpots: ExtendedClimbingSpots;
  addSearchSpots: (newSpots: ExtendedClimbingSpot[]) => void;
  clearSearchSpots: () => void;
}

const useSpotFilters = (spots: GetClimbingSpotsResponse | undefined): UseSpotFiltersReturn => {
  const [filters, setFilters] = React.useState<SpotFilters>({
    type: [ClimbingSpotType.ALL],
    difficulties: [],
  });
  const [searchSpots, setSearchSpots] = React.useState<ExtendedClimbingSpot[]>([]);

  const clearSearchSpots = React.useCallback(() => {
    setSearchSpots([]);
  }, []);

  const addSearchSpots = React.useCallback((newSpots: ExtendedClimbingSpot[]) => {
    setSearchSpots((prev) => {
      const uniqueSpots = newSpots.filter(
        (newSpot) => !prev.some((spot) => spot.id === newSpot.id),
      );
      return [...prev, ...uniqueSpots];
    });
  }, []);

  const handleFilterChange = React.useCallback((newFilters: SpotFilters) => {
    setFilters(newFilters);
  }, []);

  const filteredSpots = React.useMemo(() => {
    const apiSpots =
      spots?.map((spot) => {
        const { coords, ...rest } = spot;
        return {
          ...rest,
          ...extractCoords(coords),
          notation: rest.notation?.toString() ?? '0',
        };
      }) ?? [];

    const allSpots = [...apiSpots];
    for (const spot of searchSpots) {
      if (!allSpots.some((s) => s.id === spot.id)) {
        allSpots.push(spot);
      }
    }

    return allSpots.filter((spot) => {
      const matchesType =
        filters.type.includes(ClimbingSpotType.ALL) ||
        filters.type.some((type) => spot.types.includes(type));

      const matchesDifficulty =
        filters.difficulties.length === 0 ||
        filters.difficulties.some((difficulty) => spot.difficulties.includes(difficulty));

      return matchesType && matchesDifficulty;
    });
  }, [filters, spots, searchSpots]);

  return {
    filters,
    handleFilterChange,
    filteredSpots,
    addSearchSpots,
    clearSearchSpots,
  };
};

export default useSpotFilters;
