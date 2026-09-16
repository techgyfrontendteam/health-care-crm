import * as React from "react";
import { X, Check, ChevronsUpDown } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../utils";

export interface Option {
  label: string;
  value: string;
}

interface MultiSelectProps {
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between min-h-[42px] h-auto px-3.5 py-2 gap-2.5", className)}
        >
          <div className="flex gap-1.5 flex-wrap items-center">
            {selected.length > 0 ? (
              selected.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="mr-1 mb-1 px-2.5 py-0.5 text-xs inline-flex items-center gap-1.5 font-medium"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    handleUnselect(s);
                  }}
                >
                  <span>{options.find((o) => o.value === s)?.label || s}</span>
                  <X className="h-3 w-3 hover:text-destructive cursor-pointer shrink-0" />
                </Badge>
              ))
            ) : (
              <span className="text-zinc-500 text-sm">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2.5 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto p-1.5">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                className="gap-2.5 px-3 py-2 text-sm cursor-pointer rounded-md"
                onSelect={() => {
                  onChange(
                    selected.includes(option.value)
                      ? selected.filter((item) => item !== option.value)
                      : [...selected, option.value]
                  );
                  setOpen(true);
                }}
              >
                <Check
                  className={cn(
                    "h-4 w-4 shrink-0",
                    selected.includes(option.value) ? "opacity-100" : "opacity-0"
                  )}
                />
                <span>{option.label}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
