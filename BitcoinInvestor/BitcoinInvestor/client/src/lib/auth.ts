import { User } from "@shared/schema";

interface AuthUser extends Omit<User, 'password'> {
  isAdmin?: boolean;
}

export class AuthManager {
  private currentUser: AuthUser | null = null;

  setUser(user: AuthUser) {
    this.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getUser(): AuthUser | null {
    if (this.currentUser) return this.currentUser;
    
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      this.currentUser = JSON.parse(stored);
      return this.currentUser;
    }
    
    return null;
  }

  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    const user = this.getUser();
    return user?.isAdmin === true;
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }
}

export const authManager = new AuthManager();
