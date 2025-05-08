import type { User } from "../entity/user";
import { AuthRepository } from "../repository/AuthRepository";

export class AuthUsecase {

  static login(user:User) {
    return AuthRepository.login(user);
  }
  static currentUser() {
    return AuthRepository.currentUser()
  }

  static logout() {
    return AuthRepository.logout()
  }
}