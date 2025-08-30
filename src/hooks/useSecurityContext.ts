import { createContext, useContext, useEffect, useState } from 'react';
import { generateSecureId } from '@/utils/security';

interface SecurityContextType {
  sessionId: string;
  isSecureContext: boolean;
  hasWebCrypto: boolean;
  lastSecurityCheck: number;
  performSecurityCheck: () => Promise<boolean>;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export function useSecurityContext() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurityContext must be used within SecurityProvider');
  }
  return context;
}

export function useSecurityProvider() {
  const [sessionId] = useState(() => generateSecureId());
  const [lastSecurityCheck, setLastSecurityCheck] = useState(Date.now());
  
  // Check if we're in a secure context (HTTPS or localhost)
  const isSecureContext = window.isSecureContext || 
    window.location.protocol === 'https:' || 
    window.location.hostname === 'localhost';
  
  // Check Web Crypto API availability
  const hasWebCrypto = !!(window.crypto && window.crypto.subtle);
  
  const performSecurityCheck = async (): Promise<boolean> => {
    try {
      // Verify crypto operations work
      if (hasWebCrypto) {
        const testKey = await crypto.subtle.generateKey(
          { name: 'AES-GCM', length: 256 },
          false,
          ['encrypt', 'decrypt']
        );
        
        const testData = new TextEncoder().encode('security-test');
        const iv = crypto.getRandomValues(new Uint8Array(12));
        
        const encrypted = await crypto.subtle.encrypt(
          { name: 'AES-GCM', iv },
          testKey,
          testData
        );
        
        const decrypted = await crypto.subtle.decrypt(
          { name: 'AES-GCM', iv },
          testKey,
          encrypted
        );
        
        const decryptedText = new TextDecoder().decode(decrypted);
        const isValid = decryptedText === 'security-test';
        
        setLastSecurityCheck(Date.now());
        return isValid;
      }
      
      return false;
    } catch (error) {
      console.error('Security check failed:', error);
      return false;
    }
  };
  
  useEffect(() => {
    // Perform initial security check
    performSecurityCheck();
    
    // Periodic security validation (every 30 minutes)
    const interval = setInterval(performSecurityCheck, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return {
    sessionId,
    isSecureContext,
    hasWebCrypto,
    lastSecurityCheck,
    performSecurityCheck
  };
}