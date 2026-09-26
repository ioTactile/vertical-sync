import { Check, X } from 'lucide-react';
import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/app/_components/ui/command';
import { FormControl, FormField, FormItem, FormMessage } from '@/app/_components/ui/form';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/_components/ui/popover';
import { cn } from '@/lib/utils';
import { Control } from 'react-hook-form';
import useTags from '@/modules/core/hooks/use-tags';
import { CreateArticleInputs } from '@/modules/react/sections/admin/articles/_schemas/create-article';
import { UpdateArticleInputs } from '@/modules/react/sections/admin/articles/_schemas/update-article';

interface MultiSelectTagsProps {
  control: Control<CreateArticleInputs | UpdateArticleInputs>;
}

const MultiSelectTags = ({ control }: MultiSelectTagsProps) => {
  const { data: tags, isLoading } = useTags();

  return (
    <FormField
      control={control}
      name="articleTags"
      render={({ field }) => (
        <FormItem>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={isLoading}
                  className={cn(
                    'w-full justify-between',
                    !field.value?.length && 'text-muted-foreground',
                  )}
                >
                  {field.value?.length > 0
                    ? `${field.value.length} tag(s) sélectionné(s)`
                    : 'Sélectionner des tags'}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Rechercher un tag..." />
                <CommandList>
                  <CommandEmpty>Aucun tag trouvé.</CommandEmpty>
                  <CommandGroup className="max-h-64 overflow-auto">
                    {tags?.map((tag) => {
                      const isSelected = field.value?.some(
                        (selectedTag) => selectedTag.id === tag.id,
                      );

                      return (
                        <CommandItem
                          key={tag.id}
                          value={tag.name}
                          onSelect={() => {
                            if (isSelected) {
                              field.onChange(
                                field.value.filter((selectedTag) => selectedTag.id !== tag.id),
                              );
                            } else {
                              field.onChange([
                                ...(field.value || []),
                                { id: tag.id, name: tag.name },
                              ]);
                            }
                          }}
                        >
                          <Check
                            className={cn('mr-2 h-4 w-4', isSelected ? 'opacity-100' : 'opacity-0')}
                          />
                          {tag.name}
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
              {field.value.map((tag) => (
                <Badge key={tag.id} variant="secondary" className="flex items-center gap-1">
                  {tag.name}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-3 w-3 p-0 hover:bg-transparent"
                    onClick={() => {
                      field.onChange(
                        field.value.filter((selectedTag) => selectedTag.id !== tag.id),
                      );
                    }}
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Retirer {tag.name}</span>
                  </Button>
                </Badge>
              ))}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectTags;
