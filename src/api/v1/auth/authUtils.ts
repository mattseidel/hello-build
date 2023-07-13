import { getAuth } from "firebase/auth";

export class authUtils {
  static async isLogged(): Promise<boolean> {
    return new Promise((resolve) => {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
