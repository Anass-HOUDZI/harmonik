import { z } from 'zod';

// Input validation schemas
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Le nom ne peut contenir que des lettres, espaces, tirets et apostrophes'),
  email: z.string()
    .email('Format d\'email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  subject: z.string()
    .min(5, 'Le sujet doit contenir au moins 5 caractères')
    .max(200, 'Le sujet ne peut pas dépasser 200 caractères'),
  message: z.string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères')
});

export const familyMemberSchema = z.object({
  id: z.string(),
  name: z.string()
    .min(1, 'Le nom est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères')
    .regex(/^[a-zA-ZÀ-ÿ\s\-']+$/, 'Nom invalide'),
  birthDate: z.string().datetime('Date de naissance invalide'),
  role: z.enum(['parent', 'child', 'guardian']),
  avatar: z.string().url().optional(),
  preferences: z.object({
    color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Couleur invalide'),
    notifications: z.boolean(),
    privacy: z.enum(['open', 'restricted', 'private'])
  }),
  restrictions: z.object({
    tools: z.array(z.string()),
    timeRestrictions: z.object({
      weekdays: z.object({
        start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide'),
        end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide')
      }),
      weekends: z.object({
        start: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide'),
        end: z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Format d\'heure invalide')
      })
    })
  }).optional()
});

export const familyProfileSchema = z.object({
  id: z.string(),
  name: z.string()
    .min(1, 'Le nom de famille est requis')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  members: z.array(familyMemberSchema),
  settings: z.object({
    language: z.enum(['fr', 'en']),
    theme: z.enum(['light', 'dark', 'auto']),
    timezone: z.string(),
    currency: z.string().length(3, 'Code de devise invalide'),
    notifications: z.boolean()
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Utility function to sanitize HTML content
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

// Validate localStorage data
export function validateLocalStorageData<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): T | null {
  try {
    return schema.parse(data);
  } catch (error) {
    console.warn('Invalid localStorage data:', error);
    return null;
  }
}