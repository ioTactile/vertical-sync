import * as React from 'react';
import { ClimbingSpotType, ClimbingSpotDifficulty } from '@/modules/core/domain/enums';

interface UseSpotTypeAndDifficultyProps {
  onFilterChange: (filters: {
    type: ClimbingSpotType[];
    difficulties: ClimbingSpotDifficulty[];
  }) => void;
}

interface UseSpotTypeAndDifficultyReturn {
  selectedTypes: ClimbingSpotType[];
  selectedDifficulties: ClimbingSpotDifficulty[];
  handleTypeSelect: (type: ClimbingSpotType) => void;
  handleDifficultySelect: (difficulty: ClimbingSpotDifficulty) => void;
  resetFilters: () => void;
  isNotDefaultFilters: boolean;
}

export const useSpotTypeAndDifficulty = ({
  onFilterChange,
}: UseSpotTypeAndDifficultyProps): UseSpotTypeAndDifficultyReturn => {
  const [selectedTypes, setSelectedTypes] = React.useState<ClimbingSpotType[]>([
    ClimbingSpotType.ALL,
  ]);
  const [selectedDifficulties, setSelectedDifficulties] = React.useState<ClimbingSpotDifficulty[]>(
    [],
  );

  const handleTypeSelect = React.useCallback(
    (type: ClimbingSpotType) => {
      setSelectedTypes((prev) => {
        let newTypes: ClimbingSpotType[];

        if (type === ClimbingSpotType.ALL) {
          newTypes = [ClimbingSpotType.ALL];
        } else {
          const withoutAll = prev.filter((t) => t !== ClimbingSpotType.ALL);
          newTypes = prev.includes(type)
            ? withoutAll.filter((t) => t !== type)
            : [...withoutAll, type];

          if (newTypes.length === 0) newTypes = [ClimbingSpotType.ALL];
        }

        onFilterChange({
          type: newTypes,
          difficulties: selectedDifficulties,
        });
        return newTypes;
      });
    },
    [selectedDifficulties, onFilterChange],
  );

  const handleDifficultySelect = React.useCallback(
    (difficulty: ClimbingSpotDifficulty) => {
      setSelectedDifficulties((prev) => {
        const newDifficulties = prev.includes(difficulty)
          ? prev.filter((d) => d !== difficulty)
          : [...prev, difficulty];
        onFilterChange({
          type: selectedTypes,
          difficulties: newDifficulties,
        });
        return newDifficulties;
      });
    },
    [selectedTypes, onFilterChange],
  );

  const resetFilters = React.useCallback(() => {
    setSelectedTypes([ClimbingSpotType.ALL]);
    setSelectedDifficulties([]);
    onFilterChange({
      type: [ClimbingSpotType.ALL],
      difficulties: [],
    });
  }, [onFilterChange]);

  const isNotDefaultFilters = React.useMemo(() => {
    return (
      selectedTypes.length > 1 ||
      !selectedTypes.includes(ClimbingSpotType.ALL) ||
      selectedDifficulties.length > 0
    );
  }, [selectedTypes, selectedDifficulties]);

  return {
    selectedTypes,
    selectedDifficulties,
    handleTypeSelect,
    handleDifficultySelect,
    resetFilters,
    isNotDefaultFilters,
  };
};
