// Security configuration and constants

export const SECURITY_CONFIG = {
  // Session timeout in milliseconds (30 minutes)
  SESSION_TIMEOUT: 30 * 60 * 1000,
  
  // Maximum failed attempts before lockout
  MAX_FAILED_ATTEMPTS: 5,
  
  // Lockout duration in milliseconds (15 minutes)
  LOCKOUT_DURATION: 15 * 60 * 1000,
  
  // Rate limiting for form submissions (per minute)
  RATE_LIMIT_SUBMISSIONS: 10,
  
  // Sensitive data keys that should be encrypted
  SENSITIVE_KEYS: [
    'current-family',
    'family-members',
    'medical-records',
    'financial-data'
  ],
  
  // Tools that require additional security for children
  RESTRICTED_TOOLS: [
    'budget-calculator',
    'medical-scheduler',
    'family-goals',
    'communication-assistant'
  ]
} as const;

// Security event types for audit logging
export const SECURITY_EVENTS = {
  LOGIN_ATTEMPT: 'login_attempt',
  LOGIN_SUCCESS: 'login_success',
  LOGIN_FAILURE: 'login_failure',
  DATA_ACCESS: 'data_access',
  DATA_MODIFICATION: 'data_modification',
  ENCRYPTION_ERROR: 'encryption_error',
  INTEGRITY_VIOLATION: 'integrity_violation',
  SESSION_TIMEOUT: 'session_timeout'
} as const;

export type SecurityEvent = typeof SECURITY_EVENTS[keyof typeof SECURITY_EVENTS];

// Security utility functions
export class SecurityUtils {
  // Check if data should be encrypted
  static shouldEncrypt(key: string): boolean {
    return SECURITY_CONFIG.SENSITIVE_KEYS.some(sensitiveKey => 
      key.includes(sensitiveKey)
    );
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    const tokenBytes = crypto.getRandomValues(new Uint8Array(32));
    return btoa(String.fromCharCode(...tokenBytes));
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    // In a real application, you'd have a more sophisticated validation
    return token === sessionToken;
  }

  // Check rate limiting
  static checkRateLimit(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const rateLimitKey = `rate_limit_${key}`;
    
    try {
      const stored = localStorage.getItem(rateLimitKey);
      const attempts = stored ? JSON.parse(stored) : [];
      
      // Filter attempts within the time window
      const recentAttempts = attempts.filter((timestamp: number) => 
        now - timestamp < windowMs
      );
      
      if (recentAttempts.length >= limit) {
        return false;
      }
      
      // Add current attempt
      recentAttempts.push(now);
      localStorage.setItem(rateLimitKey, JSON.stringify(recentAttempts));
      
      return true;
    } catch {
      return true; // Allow on error to avoid blocking legitimate users
    }
  }

  // Sanitize input for XSS prevention
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .trim();
  }

  // Log security events
  static logSecurityEvent(event: SecurityEvent, details?: any): void {
    const logEntry = {
      event,
      timestamp: new Date().toISOString(),
      details: details || {},
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // In development, log to console
    if (import.meta.env.DEV) {
      console.log('Security Event:', logEntry);
    }
    
    // In production, this would send to a security monitoring service
    // For now, store locally for basic audit trail
    try {
      const auditLog = JSON.parse(localStorage.getItem('security_audit') || '[]');
      auditLog.push(logEntry);
      
      // Keep only last 100 entries to avoid storage bloat
      if (auditLog.length > 100) {
        auditLog.splice(0, auditLog.length - 100);
      }
      
      localStorage.setItem('security_audit', JSON.stringify(auditLog));
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  }
}
