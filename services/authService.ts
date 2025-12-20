
import { User } from '../types';

const AUTH_STORAGE_KEY = 'openlearn_auth_user';

export const authService = {
  getUser(): User | null {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  login(email: string): User {
    const mockUser: User = {
      id: 'user_1',
      name: 'Jane Doe',
      email: email,
      role: 'Contributor',
      joinedDate: 'January 2024',
      reputation: 1240,
      badges: ['Pathfinder', 'Top Educator', 'Early Adopter'],
      avatar: 'JD'
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    window.dispatchEvent(new Event('auth-change'));
    return mockUser;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    window.dispatchEvent(new Event('auth-change'));
  },

  updateProfile(updates: Partial<User>) {
    const current = this.getUser();
    if (current) {
      const updated = { ...current, ...updates };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event('auth-change'));
      return updated;
    }
    return null;
  }
};
