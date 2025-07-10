
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  onSearch?: (value: string) => void;
}

export function SearchBar({
  placeholder = "Rechercher un outil...",
  value = "",
  onChange,
  className,
  onSearch
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleClear = () => {
    setSearchValue("");
    onChange?.("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("relative group", className)}>
      <div className={cn(
        "relative glass-card transition-all duration-300",
        isFocused && "ring-2 ring-blue-500/50 shadow-lg shadow-blue-500/25"
      )}>
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className={cn(
            "h-5 w-5 transition-colors duration-200",
            isFocused ? "text-blue-500" : "text-gray-400"
          )} />
        </div>
        
        <input
          type="text"
          value={searchValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            "w-full py-3 pl-12 pr-12 bg-transparent border-0 outline-none",
            "text-gray-700 placeholder-gray-400",
            "font-medium text-base"
          )}
        />
        
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Effet de brillance au focus */}
      <div className={cn(
        "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none",
        "bg-gradient-to-r from-transparent via-white/20 to-transparent",
        isFocused && "opacity-100 animate-shine"
      )} />
    </form>
  );
}
