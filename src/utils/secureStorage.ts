// Secure storage utilities with proper encryption
import { useErrorHandler } from '@/hooks/useErrorHandler';

export interface SecureStorageConfig {
  keyDerivationIterations: number;
  saltLength: number;
  ivLength: number;
}

export class SecureStorage {
  private static config: SecureStorageConfig = {
    keyDerivationIterations: 100000,
    saltLength: 16,
    ivLength: 12
  };

  // Generate cryptographically secure random bytes
  private static generateRandomBytes(length: number): Uint8Array {
    return crypto.getRandomValues(new Uint8Array(length));
  }

  // Derive encryption key from password using PBKDF2
  private static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const encoder = new TextEncoder();
    const passwordKey = await crypto.subtle.importKey(
      'raw',
      encoder.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: this.config.keyDerivationIterations,
        hash: 'SHA-256'
      },
      passwordKey,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }

  // Encrypt data using AES-GCM
  static async encrypt(data: string, password: string): Promise<string> {
    try {
      const encoder = new TextEncoder();
      const salt = this.generateRandomBytes(this.config.saltLength);
      const iv = this.generateRandomBytes(this.config.ivLength);
      
      const key = await this.deriveKey(password, salt);
      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encoder.encode(data)
      );

      // Combine salt + iv + encrypted data
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      // Return base64 encoded result
      return btoa(String.fromCharCode(...combined));
    } catch (error) {
      throw new Error('Encryption failed: ' + (error as Error).message);
    }
  }

  // Decrypt data using AES-GCM
  static async decrypt(encryptedData: string, password: string): Promise<string> {
    try {
      const combined = new Uint8Array(
        atob(encryptedData).split('').map(char => char.charCodeAt(0))
      );

      const salt = combined.slice(0, this.config.saltLength);
      const iv = combined.slice(this.config.saltLength, this.config.saltLength + this.config.ivLength);
      const encrypted = combined.slice(this.config.saltLength + this.config.ivLength);

      const key = await this.deriveKey(password, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        encrypted
      );

      const decoder = new TextDecoder();
      return decoder.decode(decrypted);
    } catch (error) {
      throw new Error('Decryption failed: Invalid password or corrupted data');
    }
  }

  // Generate secure session token
  static generateSessionToken(): string {
    const tokenBytes = this.generateRandomBytes(32);
    return btoa(String.fromCharCode(...tokenBytes));
  }

  // Hash data for integrity checking
  static async hashData(data: string): Promise<string> {
    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', encoder.encode(data));
    const hashArray = new Uint8Array(hashBuffer);
    return btoa(String.fromCharCode(...hashArray));
  }

  // Verify data integrity
  static async verifyIntegrity(data: string, expectedHash: string): Promise<boolean> {
    try {
      const actualHash = await this.hashData(data);
      return actualHash === expectedHash;
    } catch {
      return false;
    }
  }

  // Secure localStorage wrapper
  static async setSecureItem(key: string, value: any, password?: string): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      const hash = await this.hashData(serialized);
      
      const dataToStore = {
        data: serialized,
        hash: hash,
        timestamp: Date.now()
      };

      let finalData = JSON.stringify(dataToStore);
      
      if (password) {
        finalData = await this.encrypt(finalData, password);
      }

      localStorage.setItem(key, finalData);
    } catch (error) {
      throw new Error(`Failed to store secure item: ${(error as Error).message}`);
    }
  }

  // Secure localStorage retrieval
  static async getSecureItem(key: string, password?: string): Promise<any> {
    try {
      let item = localStorage.getItem(key);
      if (!item) return null;

      if (password) {
        item = await this.decrypt(item, password);
      }

      const parsed = JSON.parse(item);
      
      // Verify data integrity
      const isValid = await this.verifyIntegrity(parsed.data, parsed.hash);
      if (!isValid) {
        throw new Error('Data integrity check failed');
      }

      return JSON.parse(parsed.data);
    } catch (error) {
      throw new Error(`Failed to retrieve secure item: ${(error as Error).message}`);
    }
  }

  // Clear sensitive data securely
  static secureDelete(key: string): void {
    try {
      localStorage.removeItem(key);
      // In a real application, you might want to overwrite memory
      // This is a limitation of JavaScript in browsers
    } catch (error) {
      console.error('Failed to securely delete item:', error);
    }
  }
}