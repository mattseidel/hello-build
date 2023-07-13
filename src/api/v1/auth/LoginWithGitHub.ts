import { Auth } from "../../base";
import {
  GithubAuthProvider,
  signInWithPopup,
  getAuth,
  signOut,
} from "firebase/auth";
import { FavoriteManager } from "../../V2/json-server/jsonServerManager";

export class LoginWithGitHub implements Auth {
  async signIn(): Promise<any> {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(getAuth(), provider);
    const favoriteManager = new FavoriteManager(userCredential.user.uid);
    await favoriteManager.createDefaultFavorites();
    return userCredential;
  }

  async signOut(): Promise<void> {
    const credentials = await signOut(getAuth());
    return credentials;
  }
}
