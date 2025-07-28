
import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: string[];
}

export default function FamilyHubSearchFilters({
  selectedCategory,
  setSelectedCategory,
  categories
}: Props) {
  return (
    <div className="mb-7 flex flex-col items-center w-full">
      <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            onClick={() => setSelectedCategory(category)}
            className={`
              !rounded-full !shadow-none !transition-all font-bold min-w-[90px] px-5 py-2
              ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white'
                  : 'bg-white text-gradient-start hover:bg-gradient-to-r hover:from-gradient-start hover:to-gradient-end hover:text-white'
              }
              ${selectedCategory === category ? '' : 'hover:scale-[1.06]'}
            `}
            style={{
              border: 'none',
              boxShadow: 'none'
            }}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
