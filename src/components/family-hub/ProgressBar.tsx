
import React from "react";
import { Progress } from "@/components/ui/progress";

export default function ProgressBar({ available, total }: { available: number, total: number }) {
  const percent = total === 0 ? 0 : Math.round((available / total) * 100);
  return (
    <div className="mb-4 md:mb-8 flex flex-col md:flex-row items-center gap-2">
      <span className="font-medium text-blue-900 text-sm md:text-base">
        {available} / {total} outils disponibles
      </span>
      <div className="w-full max-w-lg flex-1 ml-0 md:ml-3">
        <Progress value={percent} className="bg-blue-100 h-3 rounded-xl">
          <span className="sr-only">{percent}%</span>
        </Progress>
      </div>
    </div>
  );
}
