import { useState, useEffect } from 'react';
import { z } from 'zod';
import { validateLocalStorageData } from '@/schemas/validation';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { SecureStorage } from '@/utils/secureStorage';
import { SecurityUtils, SECURITY_EVENTS } from '@/utils/securityConfig';

export function useSecureLocalStorage<T>(
  key: string,
  initialValue: T,
  schema?: z.ZodSchema<T>
) {
  const { handleError } = useErrorHandler();
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.DATA_ACCESS, { key });
      
      // Check if this is sensitive data that should be encrypted
      const shouldEncrypt = SecurityUtils.shouldEncrypt(key);
      
      if (shouldEncrypt) {
        // Try secure storage first for sensitive data
        // Note: This is async, so we'll handle it in useEffect
        return initialValue;
      }
      
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
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.DATA_ACCESS, { 
        key, 
        error: (error as Error).message 
      });
      return initialValue;
    }
  });

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Validate with schema if provided
      if (schema) {
        const validated = validateLocalStorageData(valueToStore, schema);
        if (!validated) {
          throw new Error('Data validation failed');
        }
      }
      
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, { key });
      
      // Check if this is sensitive data that should be encrypted
      const shouldEncrypt = SecurityUtils.shouldEncrypt(key);
      
      if (shouldEncrypt) {
        await SecureStorage.setSecureItem(key, valueToStore);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
      
      setStoredValue(valueToStore);
    } catch (error) {
      handleError(error as Error, `Saving to localStorage key "${key}"`);
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, { 
        key, 
        error: (error as Error).message 
      });
    }
  };

  // Clear corrupted data if validation fails
  const clearCorruptedData = () => {
    try {
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, { 
        key, 
        action: 'clear_corrupted' 
      });
      
      SecureStorage.secureDelete(key);
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      handleError(error as Error, `Clearing corrupted localStorage key "${key}"`);
    }
  };

  // Load secure data on mount
  useEffect(() => {
    const loadSecureData = async () => {
      if (SecurityUtils.shouldEncrypt(key)) {
        try {
          const secureData = await SecureStorage.getSecureItem(key);
          if (secureData !== null) {
            // Validate with schema if provided
            if (schema) {
              const validated = validateLocalStorageData(secureData, schema);
              setStoredValue(validated || initialValue);
            } else {
              setStoredValue(secureData);
            }
          }
        } catch (error) {
          handleError(error as Error, `Loading secure data for key "${key}"`);
          SecurityUtils.logSecurityEvent(SECURITY_EVENTS.ENCRYPTION_ERROR, { 
            key, 
            error: (error as Error).message 
          });
        }
      }
    };

    loadSecureData();
  }, [key, schema, initialValue, handleError]);

  return [storedValue, setValue, clearCorruptedData] as const;
}