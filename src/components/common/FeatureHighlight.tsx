
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureHighlightProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export function FeatureHighlight({ icon, title, description, className }: FeatureHighlightProps) {
  return (
    <div className={cn(
      "text-center animate-fade-in transition-transform duration-200 hover:scale-105 active:scale-95",
      className
    )}>
      <div className="rounded-full bg-gradient-to-tr from-blue-200 via-pink-100 to-purple-100 shadow p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
        <span>{icon}</span>
      </div>
      <h3 className="font-semibold text-blue-900 mb-2 text-base md:text-lg">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
