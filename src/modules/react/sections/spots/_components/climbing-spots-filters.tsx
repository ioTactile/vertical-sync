"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import {
  CLIMBING_SPOT_TYPE_LABELS,
  CLIMBING_SPOT_DIFFICULTY_LABELS,
} from "@/types/enum";
import { ClimbingSpotType, ClimbingSpotDifficulty } from "@prisma/client";
import { Search } from "lucide-react";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { ExtendedClimbingSpot } from "@/modules/core/model/ClimbingSpot";
import { useSpotSearch } from "@/modules/react/sections/spots/_hooks/use-spot-search";
import { useSpotTypeAndDifficulty } from "@/modules/react/sections/spots/_hooks/use-spot-type-and-difficulty";
import { useSpotSelection } from "@/modules/react/sections/spots/_hooks/use-spot-selection";
import { MobileFiltersDialog } from "@/modules/react/sections/spots/_components/mobile-filters-dialog";

interface SpotsFiltersProps {
  userLocation: [number, number] | null;
  isSpotSelected: boolean;
  onFilterChange: (filters: {
    type: ClimbingSpotType[];
    difficulties: ClimbingSpotDifficulty[];
  }) => void;
  onSpotSelect: (spot: ExtendedClimbingSpot | null) => void;
  updateMapView: (center: [number, number]) => void;
  addSearchSpots: (spots: ExtendedClimbingSpot[]) => void;
  clearSearchSpots: () => void;
}

const spotTypes = Object.values(ClimbingSpotType);
const spotDifficulties = Object.values(ClimbingSpotDifficulty);

export const SpotsFilters = ({
  userLocation,
  isSpotSelected,
  onFilterChange,
  onSpotSelect,
  updateMapView,
  addSearchSpots,
  clearSearchSpots,
}: SpotsFiltersProps) => {
  const {
    searchQuery,
    setSearchQuery,
    isSearchOpen,
    setIsSearchOpen,
    searchResults: extendedSearchResults,
    isLoading,
    handleSearch,
  } = useSpotSearch(isSpotSelected);

  const {
    selectedTypes,
    selectedDifficulties,
    handleTypeSelect,
    handleDifficultySelect,
  } = useSpotTypeAndDifficulty({ onFilterChange });

  const {
    handleSpotSelect,
    handleEnterPress,
    searchInputRef,
    searchContainerRef,
  } = useSpotSelection({
    userLocation,
    onSpotSelect,
    updateMapView,
    setSearchQuery,
    setIsSearchOpen,
    addSearchSpots,
    clearSearchSpots,
  });

  return (
    <div className="absolute left-4 top-4 flex gap-2 w-[calc(100%-2rem)] max-w-[800px] z-1000">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <div className="relative" ref={searchContainerRef}>
          <Input
            ref={searchInputRef}
            placeholder="Rechercher un spot..."
            className="mr-4 pl-10 bg-background rounded-full text-sm sm:text-base h-10 w-full sm:w-[270px]"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEnterPress(extendedSearchResults || []);
              }
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          {isSearchOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-background rounded-lg shadow-lg">
              {isLoading ? (
                <div className="p-2">Recherche en cours...</div>
              ) : (
                extendedSearchResults?.map((spot) => (
                  <div
                    key={spot.id}
                    className="p-2 hover:bg-accent cursor-pointer"
                    onClick={() => handleSpotSelect(spot)}
                  >
                    <div className="font-medium">{spot.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {spot.types
                        .map((type) => CLIMBING_SPOT_TYPE_LABELS[type])
                        .join(", ")}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      <MobileFiltersDialog
        selectedTypes={selectedTypes}
        selectedDifficulties={selectedDifficulties}
        handleTypeSelect={handleTypeSelect}
        handleDifficultySelect={handleDifficultySelect}
      />

      <div className="hidden md:flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full shadow-sm">
              Types
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-1000 bg-background overflow-y-scroll h-40"
          >
            {spotTypes.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => handleTypeSelect(type)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedTypes.includes(type) ? "opacity-100" : "opacity-0"
                  }`}
                />
                {CLIMBING_SPOT_TYPE_LABELS[type]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-full shadow-sm">
              Difficultés
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-1000 bg-background overflow-y-scroll h-40"
          >
            {spotDifficulties.map((difficulty) => (
              <DropdownMenuItem
                key={difficulty}
                onClick={() => handleDifficultySelect(difficulty)}
              >
                <Check
                  className={`mr-2 h-4 w-4 ${
                    selectedDifficulties.includes(difficulty)
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                />
                {CLIMBING_SPOT_DIFFICULTY_LABELS[difficulty]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
