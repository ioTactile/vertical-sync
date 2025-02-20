"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Search } from "lucide-react";
import * as React from "react";

interface SpotsFiltersProps {
  onFilterChange: (filters: { type: string[]; search: string }) => void;
}

const spotTypes = ["ALL", "BOULDER", "LEAD", "INDOOR"];

export const SpotsFilters = ({ onFilterChange }: SpotsFiltersProps) => {
  const [selectedTypes, setSelectedTypes] = React.useState<string[]>(["ALL"]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleTypeClick = React.useCallback(
    (type: string) => {
      setSelectedTypes((prev) => {
        let newTypes: string[];

        if (type === "ALL") {
          newTypes = ["ALL"];
        } else {
          const withoutAll = prev.filter((t) => t !== "ALL");

          if (prev.includes(type)) {
            newTypes = withoutAll.filter((t) => t !== type);
            if (newTypes.length === 0) newTypes = ["ALL"];
          } else {
            newTypes = [...withoutAll, type];
          }
        }

        onFilterChange({ type: newTypes, search: searchQuery });
        return newTypes;
      });
    },
    [searchQuery, onFilterChange]
  );

  const handleSearch = React.useCallback(
    (value: string) => {
      setSearchQuery(value);
      onFilterChange({ type: selectedTypes, search: value });
    },
    [selectedTypes, onFilterChange]
  );

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Rechercher un spot..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {spotTypes.map((type) => (
          <Button
            key={type}
            variant={selectedTypes.includes(type) ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => handleTypeClick(type)}
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
};
