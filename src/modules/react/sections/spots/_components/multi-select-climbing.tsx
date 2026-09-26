"use client";

import { Check, X } from "lucide-react";
import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/app/_components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/lib/utils";
import { Control } from "react-hook-form";
import { CreateClimbingSpotInputs } from "@/modules/react/sections/spots/_schemas/create-climbing-spot";
import { ClimbingSpotDifficulty, ClimbingSpotType } from "@/modules/core/domain/enums";

interface MultiSelectClimbingProps {
  control: Control<CreateClimbingSpotInputs>;
  name: "types" | "difficulties";
  placeholder: string;
  options: {
    label: string;
    value: ClimbingSpotType | ClimbingSpotDifficulty;
  }[];
}

const MultiSelectClimbing = ({
  control,
  name,
  placeholder,
  options,
}: MultiSelectClimbingProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full justify-between",
                    !field.value?.length && "text-muted-foreground"
                  )}
                >
                  {field.value?.length > 0
                    ? `${field.value.length} option(s) sélectionnée(s)`
                    : placeholder}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput
                  placeholder={`Rechercher ${placeholder.toLowerCase()}...`}
                />
                <CommandList>
                  <CommandEmpty>Aucune option trouvée.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {options.map((option) => {
                      const isSelected = field.value?.some(
                        (value) => value === option.value
                      );

                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onSelect={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter(
                                  (value) => value !== option.value
                                )
                              );
                            } else {
                              field.onChange([
                                ...(field.value || []),
                                option.value,
                              ]);
                            }
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              isSelected ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {field.value?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {field.value.map((value) => {
                const option = options.find((opt) => opt.value === value);
                return (
                  <Badge
                    key={value}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {option?.label}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-3 w-3 p-0 hover:bg-transparent"
                      onClick={() => {
                        field.onChange(field.value.filter((v) => v !== value));
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Retirer {option?.label}</span>
                    </Button>
                  </Badge>
                );
              })}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectClimbing;
