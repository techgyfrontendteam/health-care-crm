import React from 'react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { Search, X } from 'lucide-react';
import { DatePicker } from '../DateTimePicker';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchInput = ({ value, onChange, placeholder = 'Search...', className }: SearchInputProps) => {
  return (
    <div className={className || "relative w-full max-w-[360px]"}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#00000033] bg-white py-3 pl-12 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
      />

      {/* Search Icon */}
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

interface DateRangeFilterProps {
  fromDate: string;
  toDate: string;
  onFromChange: (value: string) => void;
  onToChange: (value: string) => void;
}

export const DateRangeFilter = ({ fromDate, toDate, onFromChange, onToChange }: DateRangeFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-40">
        <DatePicker
          value={fromDate}
          onChange={(val) => onFromChange(val)}
          placeholder="From Date"
          className="h-9 text-xs"
        />
      </div>
      <span className="text-zinc-400 text-xs font-semibold">–</span>
      <div className="w-40">
        <DatePicker
          value={toDate}
          onChange={(val) => onToChange(val)}
          placeholder="To Date"
          className="h-9 text-xs"
        />
      </div>
    </div>
  );
};

interface FilterBarProps {
  children: React.ReactNode;
  onReset?: () => void;
}

export const FilterBar = ({ children, onReset }: FilterBarProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 py-3">
      {children}
      {onReset && (
        <Button variant="ghost" size="sm" onClick={onReset} className="text-zinc-500 hover:text-zinc-800">
          <X className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
      )}
    </div>
  );
};
