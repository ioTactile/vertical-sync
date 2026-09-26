import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { ClimbingSpotType, ClimbingSpotDifficulty } from "@/modules/core/domain/enums";
import {
  CLIMBING_SPOT_TYPE_LABELS,
  CLIMBING_SPOT_DIFFICULTY_LABELS,
} from "@/types/enum";
import { Check } from "lucide-react";
import * as React from "react";

interface MobileFiltersDialogProps {
  selectedTypes: ClimbingSpotType[];
  selectedDifficulties: ClimbingSpotDifficulty[];
  handleTypeSelect: (type: ClimbingSpotType) => void;
  handleDifficultySelect: (difficulty: ClimbingSpotDifficulty) => void;
  resetFilters: () => void;
  isNotDefaultFilters: boolean;
}

export const MobileFiltersDialog = ({
  selectedTypes,
  selectedDifficulties,
  handleTypeSelect,
  handleDifficultySelect,
  resetFilters,
  isNotDefaultFilters,
}: MobileFiltersDialogProps) => {
  const [search, setSearch] = React.useState<string>("");

  const filteredTypes = Object.entries(CLIMBING_SPOT_TYPE_LABELS).filter(
    ([, label]) => label.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDifficulties = Object.entries(
    CLIMBING_SPOT_DIFFICULTY_LABELS
  ).filter(([, label]) => label.toLowerCase().includes(search.toLowerCase()));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full  md:hidden">
          <SlidersHorizontal className="h-4 w-4 mr-2 text-muted-foreground" />
          Filtres
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-full sm:h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filtres</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {isNotDefaultFilters && (
            <Button
              variant="secondary"
              className="rounded-xl"
              onClick={resetFilters}
            >
              Réinitialiser
            </Button>
          )}

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Rechercher un filtre..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Types</h3>
              <div className="space-y-2">
                {filteredTypes.map(([type, label]) => (
                  <div
                    key={type}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() => handleTypeSelect(type as ClimbingSpotType)}
                  >
                    <Check
                      className={`h-4 w-4 ${
                        selectedTypes.includes(type as ClimbingSpotType)
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">Difficultés</h3>
              <div className="space-y-2">
                {filteredDifficulties.map(([difficulty, label]) => (
                  <div
                    key={difficulty}
                    className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg cursor-pointer"
                    onClick={() =>
                      handleDifficultySelect(
                        difficulty as ClimbingSpotDifficulty
                      )
                    }
                  >
                    <Check
                      className={`h-4 w-4 ${
                        selectedDifficulties.includes(
                          difficulty as ClimbingSpotDifficulty
                        )
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
