import { useState, useEffect, useCallback } from 'react';
import { SECURITY_CONFIG, SecurityUtils, SECURITY_EVENTS } from '@/utils/securityConfig';

interface SessionData {
  token: string;
  lastActivity: number;
  csrfToken: string;
}

export function useSecureSession() {
  const [isSessionValid, setIsSessionValid] = useState(false);
  const [sessionData, setSessionData] = useState<SessionData | null>(null);

  // Initialize or validate session
  const initializeSession = useCallback(() => {
    try {
      const stored = localStorage.getItem('session_data');
      if (stored) {
        const parsed: SessionData = JSON.parse(stored);
        const now = Date.now();
        
        // Check if session is expired
        if (now - parsed.lastActivity > SECURITY_CONFIG.SESSION_TIMEOUT) {
          SecurityUtils.logSecurityEvent(SECURITY_EVENTS.SESSION_TIMEOUT);
          clearSession();
          return;
        }
        
        // Update last activity
        parsed.lastActivity = now;
        localStorage.setItem('session_data', JSON.stringify(parsed));
        setSessionData(parsed);
        setIsSessionValid(true);
      }
    } catch (error) {
      SecurityUtils.logSecurityEvent(SECURITY_EVENTS.ENCRYPTION_ERROR, { error: (error as Error).message });
      clearSession();
    }
  }, []);

  // Create new session
  const createSession = useCallback(() => {
    const sessionData: SessionData = {
      token: SecurityUtils.generateCSRFToken(),
      lastActivity: Date.now(),
      csrfToken: SecurityUtils.generateCSRFToken()
    };
    
    localStorage.setItem('session_data', JSON.stringify(sessionData));
    setSessionData(sessionData);
    setIsSessionValid(true);
    
    SecurityUtils.logSecurityEvent(SECURITY_EVENTS.LOGIN_SUCCESS);
  }, []);

  // Clear session
  const clearSession = useCallback(() => {
    localStorage.removeItem('session_data');
    setSessionData(null);
    setIsSessionValid(false);
  }, []);

  // Update session activity
  const updateActivity = useCallback(() => {
    if (sessionData) {
      const updated = { ...sessionData, lastActivity: Date.now() };
      localStorage.setItem('session_data', JSON.stringify(updated));
      setSessionData(updated);
    }
  }, [sessionData]);

  // Validate CSRF token
  const validateCSRFToken = useCallback((token: string): boolean => {
    if (!sessionData) return false;
    return SecurityUtils.validateCSRFToken(token, sessionData.csrfToken);
  }, [sessionData]);

  // Check rate limiting
  const checkRateLimit = useCallback((action: string): boolean => {
    return SecurityUtils.checkRateLimit(
      action,
      SECURITY_CONFIG.RATE_LIMIT_SUBMISSIONS,
      60000 // 1 minute window
    );
  }, []);

  useEffect(() => {
    initializeSession();
    
    // Set up activity tracking
    const handleActivity = () => updateActivity();
    
    window.addEventListener('mousedown', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('scroll', handleActivity);
    
    // Set up session timeout check
    const timeoutCheck = setInterval(() => {
      if (sessionData) {
        const now = Date.now();
        if (now - sessionData.lastActivity > SECURITY_CONFIG.SESSION_TIMEOUT) {
          clearSession();
        }
      }
    }, 60000); // Check every minute
    
    return () => {
      window.removeEventListener('mousedown', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(timeoutCheck);
    };
  }, [initializeSession, updateActivity, sessionData, clearSession]);

  return {
    isSessionValid,
    sessionData,
    createSession,
    clearSession,
    updateActivity,
    validateCSRFToken,
    checkRateLimit
  };
}