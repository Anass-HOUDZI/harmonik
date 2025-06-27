
import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  action, 
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      "text-center py-8 md:py-12 animate-fade-in",
      className
    )}>
      {icon && (
        <div className="mb-4 flex justify-center text-gray-400">
          {icon}
        </div>
      )}
      <div className="text-gray-400 text-lg md:text-xl mb-2 font-medium">
        {title}
      </div>
      {description && (
        <p className="text-gray-500 text-sm md:text-base mb-4">
          {description}
        </p>
      )}
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}
