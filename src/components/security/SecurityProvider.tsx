import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSecureSession } from '@/hooks/useSecureSession';
import { SecurityUtils, SECURITY_EVENTS } from '@/utils/securityConfig';

interface SecurityContextType {
  isSecureSession: boolean;
  validateAction: (action: string) => boolean;
  logSecurityEvent: (event: string, details?: any) => void;
  csrfToken: string | null;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

interface SecurityProviderProps {
  children: React.ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const { isSessionValid, sessionData, createSession, checkRateLimit } = useSecureSession();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize session if needed
    if (!isSessionValid && !isInitialized) {
      createSession();
      setIsInitialized(true);
    }
  }, [isSessionValid, createSession, isInitialized]);

  const validateAction = (action: string): boolean => {
    // Check rate limiting
    if (!checkRateLimit(action)) {
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.LOGIN_FAILURE, { 
        reason: 'rate_limit_exceeded',
        action 
      });
      return false;
    }

    return true;
  };

  const logSecurityEvent = (event: string, details?: any) => {
    SecurityUtils.logSecurityEvent(event as any, details);
  };

  const value: SecurityContextType = {
    isSecureSession: isSessionValid,
    validateAction,
    logSecurityEvent,
    csrfToken: sessionData?.csrfToken || null
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}