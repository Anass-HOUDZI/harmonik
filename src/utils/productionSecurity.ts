// Production security hardening utilities

// Remove console statements in production
export function hardening() {
  if (!import.meta.env.DEV) {
    // Override console methods in production
    const noop = () => {};
    console.log = noop;
    console.warn = noop;
    console.info = noop;
    console.debug = noop;
    // Keep console.error for critical issues
  }
}

// Security headers for development server
export const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'"
  ].join('; ')
};

// Secure error messages
export function getSecureErrorMessage(error: Error, isDev: boolean): string {
  if (isDev) {
    return error.message;
  }
  
  // Generic error messages for production
  const secureMessages: Record<string, string> = {
    'validation': 'Invalid input provided',
    'authentication': 'Authentication required',
    'authorization': 'Access denied',
    'network': 'Service temporarily unavailable',
    'storage': 'Data operation failed',
    'encryption': 'Security operation failed'
  };
  
  // Try to categorize the error
  const errorType = error.message.toLowerCase();
  for (const [key, message] of Object.entries(secureMessages)) {
    if (errorType.includes(key)) {
      return message;
    }
  }
  
  return 'An unexpected error occurred';
}

// Initialize production security
export function initProductionSecurity() {
  hardening();
  
  // Disable right-click context menu in production
  if (!import.meta.env.DEV) {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
    
    // Disable developer tools shortcuts
    document.addEventListener('keydown', (e) => {
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    });
  }
}
