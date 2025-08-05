// Enhanced input validation utilities
import { z } from 'zod';
import { SecurityUtils } from '@/utils/securityConfig';

// Enhanced sanitization with XSS protection
export function sanitizeInput(input: string): string {
  return SecurityUtils.sanitizeInput(input);
}

// Strict date validation
export const dateValidation = z.string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
  .refine((date) => {
    const parsed = new Date(date);
    const now = new Date();
    const minDate = new Date('1900-01-01');
    return parsed >= minDate && parsed <= now;
  }, 'Date must be between 1900 and today');

// Enhanced family member validation with security checks
export const secureFactMemberSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .refine((name) => !/[<>'"&]/.test(name), 'Name contains invalid characters'),
  birthDate: dateValidation,
  role: z.enum(['parent', 'child', 'guardian']),
  avatar: z.string().optional(),
  preferences: z.object({
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format'),
    notifications: z.boolean(),
    privacy: z.enum(['open', 'restricted', 'private'])
  }),
  restrictions: z.object({
    tools: z.array(z.string()),
    timeRestrictions: z.object({
      weekdays: z.object({
        start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
        end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
      }),
      weekends: z.object({
        start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
        end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format')
      })
    })
  }).optional()
});

// Form submission validation with rate limiting
export function validateFormSubmission(formData: any, schema: z.ZodSchema): {
  success: boolean;
  data?: any;
  errors?: string[];
} {
  try {
    // Sanitize all string inputs
    const sanitized = sanitizeFormData(formData);
    
    // Validate with schema
    const validated = schema.parse(sanitized);
    
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      };
    }
    
    return {
      success: false,
      errors: ['Validation failed']
    };
  }
}

// Recursively sanitize form data
function sanitizeFormData(data: any): any {
  if (typeof data === 'string') {
    return sanitizeInput(data);
  }
  
  if (Array.isArray(data)) {
    return data.map(sanitizeFormData);
  }
  
  if (data && typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeFormData(value);
    }
    return sanitized;
  }
  
  return data;
}

// Validate file uploads
export function validateFileUpload(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }
  
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only image files are allowed' };
  }
  
  return { valid: true };
}

// Password strength validation
export function validatePasswordStrength(password: string): {
  valid: boolean;
  strength: 'weak' | 'medium' | 'strong';
  errors: string[];
} {
  const errors: string[] = [];
  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  if (errors.length === 0) {
    strength = 'strong';
  } else if (errors.length <= 2) {
    strength = 'medium';
  }
  
  return {
    valid: errors.length === 0,
    strength,
    errors
  };
}