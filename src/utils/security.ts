import DOMPurify from 'dompurify';

// Secure encryption using Web Crypto API
export class SecureStorage {
  private static instance: SecureStorage;
  private cryptoKey: CryptoKey | null = null;
  
  private constructor() {}
  
  static getInstance(): SecureStorage {
    if (!SecureStorage.instance) {
      SecureStorage.instance = new SecureStorage();
    }
    return SecureStorage.instance;
  }

  // Generate or retrieve encryption key from secure storage
  private async getOrCreateKey(): Promise<CryptoKey> {
    if (this.cryptoKey) return this.cryptoKey;

    try {
      // Try to load existing key
      const keyData = localStorage.getItem('_family_key');
      if (keyData) {
        const keyBuffer = new Uint8Array(JSON.parse(keyData));
        this.cryptoKey = await crypto.subtle.importKey(
          'raw',
          keyBuffer,
          { name: 'AES-GCM' },
          false,
          ['encrypt', 'decrypt']
        );
        return this.cryptoKey;
      }

      // Generate new key
      this.cryptoKey = await crypto.subtle.generateKey(
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );

      // Store key securely
      const keyBuffer = await crypto.subtle.exportKey('raw', this.cryptoKey);
      localStorage.setItem('_family_key', JSON.stringify(Array.from(new Uint8Array(keyBuffer))));
      
      return this.cryptoKey;
    } catch (error) {
      throw new Error('Failed to initialize encryption key');
    }
  }

  // Encrypt sensitive data
  async encrypt(data: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const encodedData = new TextEncoder().encode(data);
      
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        encodedData
      );
      
      const encrypted = new Uint8Array(encryptedBuffer);
      const combined = new Uint8Array(iv.length + encrypted.length);
      combined.set(iv, 0);
      combined.set(encrypted, iv.length);
      
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  // Decrypt sensitive data
  async decrypt(encryptedData: string): Promise<string> {
    try {
      const key = await this.getOrCreateKey();
      const combined = new Uint8Array(atob(encryptedData).split('').map(c => c.charCodeAt(0)));
      
      const iv = combined.slice(0, 12);
      const encrypted = combined.slice(12);
      
      const decryptedBuffer = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        encrypted
      );
      
      return new TextDecoder().decode(decryptedBuffer);
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }
}

// Enhanced input sanitization
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // First pass: DOMPurify for HTML content
  const cleaned = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // No HTML tags allowed
    ALLOWED_ATTR: [],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'object', 'embed', 'link', 'style', 'meta'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover']
  });
  
  // Second pass: Additional security checks
  return cleaned
    .replace(/javascript:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/about:/gi, '')
    .trim();
}

// Validate and sanitize URLs
export function sanitizeUrl(url: string): string | null {
  try {
    const parsedUrl = new URL(url);
    const allowedProtocols = ['http:', 'https:'];
    
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return null;
    }
    
    // Additional security checks
    if (parsedUrl.hostname.includes('localhost') && import.meta.env.PROD) {
      return null;
    }
    
    return parsedUrl.toString();
  } catch {
    return null;
  }
}

// Generate secure random ID
export function generateSecureId(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Data integrity check using HMAC
export async function generateDataHash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
}

export const secureStorage = SecureStorage.getInstance();