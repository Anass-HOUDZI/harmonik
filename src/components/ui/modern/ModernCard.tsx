
import React from 'react';
import { cn } from '@/lib/utils';

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'glass' | 'solid' | 'gradient';
  hover?: boolean;
  shine?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function ModernCard({
  children,
  className,
  variant = 'glass',
  hover = true,
  shine = false,
  glow = false,
  onClick
}: ModernCardProps) {
  const baseClasses = "rounded-2xl transition-all duration-300 gpu-optimized";
  
  const variantClasses = {
    glass: "glass-card backdrop-blur-xl border border-white/20",
    solid: "bg-white shadow-xl border border-gray-100",
    gradient: "bg-gradient-to-br from-white via-blue-50/60 to-pink-50/60 shadow-xl border border-blue-100/50"
  };

  const hoverClasses = hover ? "hover:scale-[1.02] hover:shadow-2xl cursor-pointer" : "";
  const shineClasses = shine ? "shine-effect" : "";
  const glowClasses = glow ? "animate-pulse-glow" : "";

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        shineClasses,
        glowClasses,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
