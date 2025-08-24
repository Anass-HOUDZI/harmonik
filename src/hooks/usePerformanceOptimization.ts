import { useCallback, useEffect, useRef } from 'react';

export function usePerformanceOptimization() {
  const mountTimeRef = useRef<number>(Date.now());

  // Optimisation des événements avec debounce
  const useDebounce = useCallback(<T extends (...args: any[]) => void>(
    callback: T,
    delay: number
  ): T => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    
    return useCallback((...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callback(...args), delay);
    }, [callback, delay]) as T;
  }, []);

  // Optimisation des scroll events
  const useThrottledScroll = useCallback((
    callback: () => void,
    delay: number = 16
  ) => {
    const timeoutRef = useRef<NodeJS.Timeout>();
    const lastRunRef = useRef<number>(0);

    return useCallback(() => {
      const now = Date.now();
      if (now - lastRunRef.current >= delay) {
        callback();
        lastRunRef.current = now;
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          callback();
          lastRunRef.current = Date.now();
        }, delay - (now - lastRunRef.current));
      }
    }, [callback, delay]);
  }, []);

  // Mesurer les performances de montage
  useEffect(() => {
    const mountTime = Date.now() - mountTimeRef.current;
    if (import.meta.env.DEV) {
      console.log(`Component mount time: ${mountTime}ms`);
    }
  }, []);

  return {
    useDebounce,
    useThrottledScroll,
    mountTime: Date.now() - mountTimeRef.current
  };
}

// Hook pour la virtualisation de listes longues
export function useVirtualization(itemCount: number, itemHeight: number, containerHeight: number) {
  const getVisibleRange = useCallback((scrollTop: number) => {
    const start = Math.floor(scrollTop / itemHeight);
    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const end = Math.min(start + visibleCount + 1, itemCount);
    
    return { start: Math.max(0, start - 1), end };
  }, [itemCount, itemHeight, containerHeight]);

  return { getVisibleRange };
}