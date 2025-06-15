
import React from "react";
import { Button } from "@/components/ui/button";
// plus besoin du composant Input/search
// import { Input } from "@/components/ui/input";
// import { Search } from "lucide-react";

interface Props {
  // searchTerm?: string;
  // setSearchTerm?: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: string[];
}

// Centrage + style mis en valeur pour catégories
export default function FamilyHubSearchFilters({
  selectedCategory,
  setSelectedCategory,
  categories
}: Props) {
  return (
    <div className="mb-7 flex flex-col items-center w-full">
      {/* Nouvelle grille de filtres, centrée */}
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={`
              text-xs md:text-base min-w-[90px] px-4 py-2 rounded-2xl shadow-sm font-bold transition-all
              border-2
              ${
                selectedCategory === category
                  ? "bg-gradient-to-tr from-blue-500 via-pink-400 to-purple-500 text-white border-pink-400 scale-[1.09] ring-2 ring-pink-200"
                  : "border-blue-200 text-blue-700 bg-white hover:bg-pink-50 hover:scale-105"
              }
            `}
            style={{
              boxShadow: selectedCategory === category
                ? "0 2px 10px 0 rgba(240, 106, 184, 0.13)"
                : "0 1px 4px 0 rgba(60,100,200,0.04)"
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
