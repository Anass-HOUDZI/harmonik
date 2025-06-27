
import { useCallback } from 'react';

export function useErrorHandler() {
  const handleError = useCallback((error: Error, context?: string) => {
    console.error(`Erreur${context ? ` dans ${context}` : ''}:`, error);
    
    // En développement, afficher plus de détails
    if (import.meta.env.DEV) {
      console.trace('Stack trace:', error.stack);
    }
    
    // Ici on pourrait intégrer un service de monitoring d'erreurs
    // comme Sentry en production
  }, []);

  const handleAsyncError = useCallback(async <T>(
    asyncFn: () => Promise<T>,
    context?: string
  ): Promise<T | null> => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error, context);
      return null;
    }
  }, [handleError]);

  return { handleError, handleAsyncError };
}
