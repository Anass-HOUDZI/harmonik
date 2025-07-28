import { useState, useEffect } from 'react';
import { z } from 'zod';
import { validateLocalStorageData } from '@/schemas/validation';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export function useSecureLocalStorage<T>(
  key: string,
  initialValue: T,
  schema?: z.ZodSchema<T>
) {
  const { handleError } = useErrorHandler();
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      
      const parsed = JSON.parse(item);
      
      // Validate with schema if provided
      if (schema) {
        const validated = validateLocalStorageData(parsed, schema);
        return validated || initialValue;
      }
      
      return parsed;
    } catch (error) {
      handleError(error as Error, `Loading localStorage key "${key}"`);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate with schema if provided
      if (schema) {
        const validated = validateLocalStorageData(valueToStore, schema);
        if (!validated) {
          throw new Error('Data validation failed');
        }
      }
      
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      handleError(error as Error, `Saving to localStorage key "${key}"`);
    }
  };

  // Clear corrupted data if validation fails
  const clearCorruptedData = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      handleError(error as Error, `Clearing corrupted localStorage key "${key}"`);
    }
  };

  return [storedValue, setValue, clearCorruptedData] as const;
}