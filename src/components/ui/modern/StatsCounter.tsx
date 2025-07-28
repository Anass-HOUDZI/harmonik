
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
  delay?: number;
}

export function StatsCounter({ 
  value, 
  label, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  className,
  delay = 0
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      let startTime: number;
      const startValue = 0;
      const endValue = value;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Fonction d'easing pour une animation plus fluide
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(startValue + (endValue - startValue) * easeOutCubic);
        
        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, value, duration, delay]);

  return (
    <div 
      ref={counterRef}
      className={cn(
        "text-center transform transition-all duration-500",
        isVisible && "animate-counter",
        className
      )}
    >
      <div className="text-3xl md:text-4xl font-bold font-space bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm md:text-base text-muted-foreground mt-1 font-medium">
        {label}
      </div>
    </div>
  );
}
