
// Utilitaires pour la gestion du stockage local sécurisé
export class FamilyStorage {
  private static instance: FamilyStorage;
  private dbName = 'FamilySuiteDB';
  private version = 1;
  private db: IDBDatabase | null = null;

  private constructor() {}

  static getInstance(): FamilyStorage {
    if (!FamilyStorage.instance) {
      FamilyStorage.instance = new FamilyStorage();
    }
    return FamilyStorage.instance;
  }

  async initDB(): Promise<IDBDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Store famille
        if (!db.objectStoreNames.contains('family')) {
          const familyStore = db.createObjectStore('family', { keyPath: 'id' });
          familyStore.createIndex('name', 'name', { unique: false });
        }

        // Store des données des outils
        if (!db.objectStoreNames.contains('toolsData')) {
          const toolsStore = db.createObjectStore('toolsData', { keyPath: 'toolId' });
          toolsStore.createIndex('familyId', 'familyId', { unique: false });
        }

        // Store des paramètres
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async saveData(storeName: string, data: any): Promise<void> {
    const db = await this.initDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getData(storeName: string, key: string): Promise<any> {
    const db = await this.initDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async getAllData(storeName: string): Promise<any[]> {
    const db = await this.initDB();
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async deleteData(storeName: string, key: string): Promise<void> {
    const db = await this.initDB();
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(key);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  // DEPRECATED: Removed insecure encryption methods
  // Use SecureStorage class instead for proper encryption

  // Export des données familiales
  async exportFamilyData(): Promise<string> {
    const familyData = await this.getAllData('family');
    const toolsData = await this.getAllData('toolsData');
    const settings = await this.getAllData('settings');

    const exportData = {
      version: this.version,
      timestamp: new Date().toISOString(),
      family: familyData,
      tools: toolsData,
      settings: settings
    };

    return JSON.stringify(exportData, null, 2);
  }

  // Import des données familiales
  async importFamilyData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.family) {
        for (const item of data.family) {
          await this.saveData('family', item);
        }
      }
      
      if (data.tools) {
        for (const item of data.tools) {
          await this.saveData('toolsData', item);
        }
      }
      
      if (data.settings) {
        for (const item of data.settings) {
          await this.saveData('settings', item);
        }
      }
    } catch (error) {
      throw new Error('Import failed: Invalid data format');
    }
  }
}

export const familyStorage = FamilyStorage.getInstance();
