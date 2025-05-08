import { type User } from "../entity/user";

export class AuthRepository {
  static async login(user:User) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  static currentUser(): User | null {
    const userData = localStorage.getItem("currentUser");
    if (!userData) return null;

    try {
      const user: User = JSON.parse(userData);
      return user;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return null;
    }
  }

  static async logout() {
    localStorage.clear();
  
  }
}
