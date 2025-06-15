
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

    const savedFamily = localStorage.getItem('current-family');
    if (savedFamily) {
      this.currentFamily = JSON.parse(savedFamily);
      return this.currentFamily;
    }

    return null;
  }

  static async createFamily(familyData: Partial<FamilyProfile>): Promise<FamilyProfile> {
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

    this.currentFamily = family;
    localStorage.setItem('current-family', JSON.stringify(family));
    return family;
  }

  static async updateFamily(updates: Partial<FamilyProfile>): Promise<FamilyProfile> {
    const current = await this.getCurrentFamily();
    if (!current) throw new Error('No current family found');

    const updated = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.currentFamily = updated;
    localStorage.setItem('current-family', JSON.stringify(updated));
    return updated;
  }

  static async addMember(member: Omit<FamilyMember, 'id'>): Promise<FamilyMember> {
    const family = await this.getCurrentFamily();
    if (!family) throw new Error('No current family found');

    const newMember: FamilyMember = {
      ...member,
      id: Date.now().toString()
    };

    family.members.push(newMember);
    await this.updateFamily(family);
    return newMember;
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

    family.members[memberIndex] = { ...family.members[memberIndex], ...updates };
    await this.updateFamily(family);
    return family.members[memberIndex];
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
