
import { familyProfileSchema, familyMemberSchema, validateLocalStorageData } from '@/schemas/validation';
import { z } from 'zod';

// Types et utilitaires pour la gestion des données familiales
export interface FamilyMember {
  id: string;
  name: string;
  birthDate: string;
  role: 'parent' | 'child' | 'guardian';
  avatar?: string;
  preferences: {
    color: string;
    notifications: boolean;
    privacy: 'open' | 'restricted' | 'private';
  };
  restrictions?: {
    tools: string[]; // Liste des outils autorisés
    timeRestrictions: {
      weekdays: { start: string; end: string };
      weekends: { start: string; end: string };
    };
  };
}

export interface FamilyProfile {
  id: string;
  name: string;
  members: FamilyMember[];
  settings: {
    language: 'fr' | 'en';
    theme: 'light' | 'dark' | 'auto';
    timezone: string;
    currency: string;
    notifications: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export class FamilyManager {
  private static currentFamily: FamilyProfile | null = null;

  static async getCurrentFamily(): Promise<FamilyProfile | null> {
    if (this.currentFamily) return this.currentFamily;

    try {
      const savedFamily = localStorage.getItem('current-family');
      if (savedFamily) {
        const parsed = JSON.parse(savedFamily);
        const validated = validateLocalStorageData(parsed, familyProfileSchema);
        if (validated) {
          this.currentFamily = validated as FamilyProfile;
          return this.currentFamily;
        } else {
          // Clear corrupted data
          localStorage.removeItem('current-family');
          console.warn('Corrupted family data found and removed');
        }
      }
    } catch (error) {
      console.error('Error loading family data:', error);
      localStorage.removeItem('current-family');
    }

    return null;
  }

  static async createFamily(familyData: Partial<FamilyProfile>): Promise<FamilyProfile> {
    // Validate input data
    if (familyData.name && (familyData.name.length < 1 || familyData.name.length > 100)) {
      throw new Error('Invalid family name length');
    }

    const family: FamilyProfile = {
      id: Date.now().toString(),
      name: familyData.name || 'Ma Famille',
      members: familyData.members || [],
      settings: {
        language: 'fr',
        theme: 'light',
        timezone: 'Europe/Paris',
        currency: 'EUR',
        notifications: true,
        ...familyData.settings
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Validate complete family data
    const validated = validateLocalStorageData(family, familyProfileSchema);
    if (!validated) {
      throw new Error('Invalid family data');
    }

    this.currentFamily = validated as FamilyProfile;
    localStorage.setItem('current-family', JSON.stringify(validated));
    return validated as FamilyProfile;
  }

  static async updateFamily(updates: Partial<FamilyProfile>): Promise<FamilyProfile> {
    const current = await this.getCurrentFamily();
    if (!current) throw new Error('No current family found');

    const updated: FamilyProfile = {
      ...current,
      ...updates,
      id: current.id, // Ensure required fields are present
      name: updates.name || current.name,
      members: updates.members || current.members,
      settings: { ...current.settings, ...updates.settings },
      createdAt: current.createdAt,
      updatedAt: new Date().toISOString()
    };

    // Validate updated family data
    const validated = validateLocalStorageData(updated, familyProfileSchema);
    if (!validated) {
      throw new Error('Invalid updated family data');
    }

    this.currentFamily = validated as FamilyProfile;
    localStorage.setItem('current-family', JSON.stringify(validated));
    return validated as FamilyProfile;
  }

  static async addMember(member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    const family = await this.getCurrentFamily();
    if (!family) throw new Error('No current family found');

    const newMember: FamilyMember = {
      ...member,
      id: Date.now().toString()
    };

    // Validate member data
    const validated = validateLocalStorageData(newMember, familyMemberSchema);
    if (!validated) {
      throw new Error('Invalid member data');
    }

    family.members.push(validated as FamilyMember);
    await this.updateFamily(family);
    return validated as FamilyMember;
  }

  static async removeMember(memberId: string): Promise<void> {
    const family = await this.getCurrentFamily();
    if (!family) throw new Error('No current family found');

    family.members = family.members.filter(m => m.id !== memberId);
    await this.updateFamily(family);
  }

  static async updateMember(memberId: string, updates: Partial<FamilyMember>): Promise<FamilyMember> {
    const family = await this.getCurrentFamily();
    if (!family) throw new Error('No current family found');

    const memberIndex = family.members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) throw new Error('Member not found');

    const updatedMember: FamilyMember = { 
      ...family.members[memberIndex], 
      ...updates,
      id: family.members[memberIndex].id // Ensure ID is preserved
    };

    // Validate updated member data
    const validated = validateLocalStorageData(updatedMember, familyMemberSchema);
    if (!validated) {
      throw new Error('Invalid updated member data');
    }

    family.members[memberIndex] = validated as FamilyMember;
    await this.updateFamily(family);
    return validated as FamilyMember;
  }

  static getAgeFromBirthDate(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  static getChildrenByAge(): { young: FamilyMember[]; school: FamilyMember[]; teen: FamilyMember[] } {
    const family = this.currentFamily;
    if (!family) return { young: [], school: [], teen: [] };

    const children = family.members.filter(m => m.role === 'child');
    
    return {
      young: children.filter(c => this.getAgeFromBirthDate(c.birthDate) < 6),
      school: children.filter(c => {
        const age = this.getAgeFromBirthDate(c.birthDate);
        return age >= 6 && age < 13;
      }),
      teen: children.filter(c => {
        const age = this.getAgeFromBirthDate(c.birthDate);
        return age >= 13 && age < 18;
      })
    };
  }

  static canAccessTool(memberId: string, toolId: string): boolean {
    const family = this.currentFamily;
    if (!family) return false;

    const member = family.members.find(m => m.id === memberId);
    if (!member) return false;

    // Les parents ont accès à tout
    if (member.role === 'parent' || member.role === 'guardian') return true;

    // Vérification des restrictions pour les enfants
    if (member.restrictions && member.restrictions.tools) {
      return member.restrictions.tools.includes(toolId);
    }

    // Par défaut, les enfants ont accès aux outils adaptés à leur âge
    const age = this.getAgeFromBirthDate(member.birthDate);
    const childFriendlyTools = [
      'family-calendar', 'chores-manager', 'homework-planner', 
      'reading-tracker', 'activity-organizer', 'creative-tracker'
    ];

    return age >= 8 && childFriendlyTools.includes(toolId);
  }

  static isInAllowedTimeRange(memberId: string): boolean {
    const family = this.currentFamily;
    if (!family) return true;

    const member = family.members.find(m => m.id === memberId);
    if (!member || member.role !== 'child') return true;

    if (!member.restrictions?.timeRestrictions) return true;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const isWeekend = now.getDay() === 0 || now.getDay() === 6;
    
    const restrictions = isWeekend 
      ? member.restrictions.timeRestrictions.weekends
      : member.restrictions.timeRestrictions.weekdays;

    const [startHour, startMin] = restrictions.start.split(':').map(Number);
    const [endHour, endMin] = restrictions.end.split(':').map(Number);
    
    const startTime = startHour * 60 + startMin;
    const endTime = endHour * 60 + endMin;

    return currentTime >= startTime && currentTime <= endTime;
  }
}
