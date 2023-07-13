import { Auth } from "../../base";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
  signOut,
} from "firebase/auth";

export class LoginWithEmailAndPAssword implements Auth {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async register(): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(
      getAuth(),
      this.email,
      this.password
    );

    return userCredential;
  }

  async signIn(): Promise<any> {
    const credentials = await signInWithEmailAndPassword(
      getAuth(),
      this.email,
      this.password
    );

    return credentials;
  }
  async signOut(): Promise<void> {
    const credentials = await signOut(getAuth());

    return credentials;
  }
}
