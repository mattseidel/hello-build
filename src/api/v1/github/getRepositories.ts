import { OAuthCredential } from "firebase/auth";
import { Repository } from "../../../interfaces/repositories";
import { IRepositories } from "../repositories";
import { githubQueries } from "./index";
export class getRepositories extends IRepositories<Repository[]> {
  GithubQueries: githubQueries;

  constructor(token: OAuthCredential | null) {
    super();
    if (token === null) throw new Error("Token is required");
    this.GithubQueries = new githubQueries(token);
  }

  async getRepositories(): Promise<Repository[]> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const res = await this.GithubQueries.getRepositories();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return res.data as Repository[];
  }
}
