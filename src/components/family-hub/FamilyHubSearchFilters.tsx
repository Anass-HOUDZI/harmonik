
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
    <div className="mb-8 space-y-4">
      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Rechercher un outil..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-3 w-full border-2 border-blue-200 focus:border-blue-400 rounded-lg"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`${
              selectedCategory === category
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'border-blue-200 text-blue-700 hover:bg-blue-50'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
