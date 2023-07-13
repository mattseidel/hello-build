import { OAuthCredential, User } from "firebase/auth";
import { Octokit } from "octokit";

export class githubQueries {
  token: OAuthCredential;
  url = "https://api.github.com/";

  constructor(token: OAuthCredential | null) {
    if (token === null) throw new Error("Token is required");
    this.token = token;
  }

  async getRepositories(): Promise<any> {
    
    const octokit = new Octokit({ auth: this.token.accessToken });
    return await octokit.request("GET /user/repos");
  }
}
