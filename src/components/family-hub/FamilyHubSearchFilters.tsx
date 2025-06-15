
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface Props {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: string[];
}

export default function FamilyHubSearchFilters({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, categories }: Props) {
  return (
    <div className="mb-3 md:mb-6 space-y-3 md:space-y-0 flex flex-col md:flex-row md:items-center justify-between gap-3">
      <div className="relative flex-1 max-w-lg">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 h-[22px] w-[22px]" />
        <Input
          type="text"
          placeholder="Rechercher un outil, une fonction..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-11 pr-4 py-2.5 w-full border border-blue-200 rounded-xl shadow-sm bg-white/90 text-base focus:border-blue-400"
        />
      </div>
      <div className="flex flex-wrap gap-2 md:ml-3">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`
              text-xs md:text-sm min-w-[80px] rounded-xl shadow-sm
              ${selectedCategory === category 
                  ? 'bg-gradient-to-r from-blue-600 via-fuchsia-500 to-violet-500 text-white font-semibold'
                  : 'border-blue-200 text-blue-700 hover:bg-blue-50 bg-white'}
              transition-all
            `}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

