import React from 'react';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileNavigation({ children, className }: MobileNavigationProps) {
  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200",
        "safe-area-pb backdrop-blur-md bg-white/95",
        "md:hidden", // Masquer sur desktop
        className
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {children}
      </div>
    </nav>
  );
}

interface MobileNavItemProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function MobileNavItem({ 
  children, 
  active = false, 
  onClick, 
  className 
}: MobileNavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center",
        "min-h-[48px] min-w-[48px] px-3 py-2 rounded-lg",
        "transition-all duration-200 touch-active",
        "text-xs font-medium",
        active 
          ? "bg-gradient-to-r from-gradient-start to-gradient-end text-white" 
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
        className
      )}
    >
      {children}
    </button>
  );
}