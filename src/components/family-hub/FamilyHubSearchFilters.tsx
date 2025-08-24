
import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FamilyHubSearchFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export default memo(function FamilyHubSearchFilters({
  selectedCategory,
  setSelectedCategory,
  categories
}: FamilyHubSearchFiltersProps) {
  return (
    <div className="w-full max-w-5xl mx-auto mb-4 sm:mb-6">
      {/* Filtres par catégorie - responsive */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "transition-all duration-300 touch-active text-xs sm:text-sm",
              "min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-2 rounded-full",
              selectedCategory === category
                ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white shadow-lg hover:shadow-xl border-0"
                : "hover:bg-accent hover:scale-105 border border-gray-200 bg-white"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
});
