import React, { useState, useCallback, FormEvent } from 'react';
import { useSecurity } from './SecurityProvider';
import { validateFormSubmission } from '@/utils/inputValidation';
import { SecurityUtils, SECURITY_EVENTS } from '@/utils/securityConfig';
import { z } from 'zod';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface SecureFormWrapperProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void | Promise<void>;
  validationSchema: z.ZodSchema;
  actionName: string;
  className?: string;
  enableRateLimit?: boolean;
}

export function SecureFormWrapper({
  children,
  onSubmit,
  validationSchema,
  actionName,
  className = '',
  enableRateLimit = true
}: SecureFormWrapperProps) {
  const { validateAction, logSecurityEvent, csrfToken } = useSecurity();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (isSubmitting || isBlocked) return;
    
    setErrors([]);
    
    // Rate limiting check
    if (enableRateLimit && !validateAction(actionName)) {
      setIsBlocked(true);
      setErrors(['Too many attempts. Please wait before trying again.']);
      
      // Unblock after 1 minute
      setTimeout(() => {
        setIsBlocked(false);
        setErrors([]);
      }, 60000);
      
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get form data
      const formData = new FormData(event.currentTarget);
      const data: Record<string, any> = {};
      
      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
      
      // Add CSRF token
      if (csrfToken) {
        data._csrf = csrfToken;
      }
      
      // Validate form data
      const validation = validateFormSubmission(data, validationSchema);
      
      if (!validation.success) {
        setErrors(validation.errors || ['Validation failed']);
        logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, {
          action: actionName,
          status: 'validation_failed',
          errors: validation.errors
        });
        return;
      }
      
      logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, {
        action: actionName,
        status: 'submitted'
      });
      
      // Call the actual submit handler
      await onSubmit(validation.data);
      
    } catch (error) {
      const errorMessage = (error as Error).message;
      setErrors([errorMessage]);
      
      logSecurityEvent(SECURITY_EVENTS.DATA_MODIFICATION, {
        action: actionName,
        status: 'error',
        error: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [
    isSubmitting,
    isBlocked,
    enableRateLimit,
    validateAction,
    actionName,
    csrfToken,
    validationSchema,
    onSubmit,
    logSecurityEvent
  ]);

  return (
    <form onSubmit={handleSubmit} className={className}>
      {/* CSRF Token */}
      {csrfToken && (
        <input type="hidden" name="_csrf" value={csrfToken} />
      )}
      
      {/* Error Display */}
      {errors.length > 0 && (
        <Alert className="mb-4 border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      
      {/* Form Content */}
      <fieldset disabled={isSubmitting || isBlocked}>
        {children}
      </fieldset>
    </form>
  );
}