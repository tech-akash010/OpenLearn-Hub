
import { User, UserRole, VerificationStatus, VerificationData } from '../types';
import { emailValidator } from '../utils/emailValidator';

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
      role: 'student',
      verificationStatus: 'verified',
      verificationLevel: 'strong',
      joinedDate: 'January 2024',
      reputation: 1240,
      badges: ['Pathfinder', 'Top Educator', 'Early Adopter'],
      avatar: 'JD',
      legacyRole: 'Contributor'
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    window.dispatchEvent(new Event('auth-change'));
    return mockUser;
  },

  /**
   * Register a new user with role-based verification
   */
  register(email: string, password: string, name: string, role: UserRole): User {
    const isInstitutional = emailValidator.isInstitutionalEmail(email);
    const verificationLevel = emailValidator.getVerificationLevel(email);

    // Auto-verify institutional emails
    const verificationStatus: VerificationStatus = isInstitutional ? 'verified' : 'unverified';

    const newUser: User = {
      id: `user_${Date.now()}`,
      name: name,
      email: email,
      role: role,
      verificationStatus: verificationStatus,
      verificationLevel: verificationLevel,
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      reputation: 0,
      badges: [],
      avatar: name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    window.dispatchEvent(new Event('auth-change'));
    return newUser;
  },

  /**
   * Submit verification data for review
   */
  submitVerification(verificationData: VerificationData): void {
    const user = this.getUser();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      verificationData: {
        ...verificationData,
        submittedAt: new Date().toISOString()
      },
      verificationStatus: 'pending',
      verificationLevel: 'medium'
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('auth-change'));
  },

  /**
   * Update verification status (mock admin action)
   */
  updateVerificationStatus(status: VerificationStatus, notes?: string): void {
    const user = this.getUser();
    if (!user) return;

    const updatedUser: User = {
      ...user,
      verificationStatus: status,
      verificationLevel: status === 'verified' ? 'strong' : user.verificationLevel,
      verificationData: user.verificationData ? {
        ...user.verificationData,
        reviewedAt: new Date().toISOString(),
        reviewNotes: notes
      } : undefined
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedUser));
    window.dispatchEvent(new Event('auth-change'));
  },

  /**
   * Check if user can upload/publish notes
   * All verified users (students, teachers, educators) can upload notes
   */
  canUploadNotes(user: User | null): boolean {
    if (!user) return false;

    // All verified users can upload notes
    return user.verificationStatus === 'verified';
  },

  /**
   * Check if user can take quizzes
   * All users can take quizzes
   */
  canTakeQuizzes(user: User | null): boolean {
    // All users can take quizzes
    return user !== null;
  },

  /**
   * Check if user can create quizzes
   * DEPRECATED: Quizzes are created by chatbot only
   * Kept for backward compatibility but always returns false
   */
  canCreateQuizzes(user: User | null): boolean {
    // Quizzes are created by chatbot only
    return false;
  },

  /**
   * Get verification badge label for display
   */
  getVerificationBadge(user: User): string {
    if (user.verificationStatus !== 'verified') {
      return 'Unverified';
    }

    switch (user.role) {
      case 'student':
        return 'Student Verified';
      case 'teacher':
        return 'Teacher Verified';
      case 'online_educator':
        return 'Educator Verified';
      default:
        return 'Verified';
    }
  },

  /**
   * Legacy method - kept for backward compatibility
   * @deprecated Use canUploadNotes instead
   */
  canPublishContent(user: User | null): boolean {
    return this.canUploadNotes(user);
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
