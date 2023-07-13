import { Repository } from "../../../interfaces/repositories";
import { IRepositories } from "../../v1/repositories";
import { FavoriteManager } from "./jsonServerManager";

export class getFavorites extends IRepositories<Repository[]> {
  favoritesManager: FavoriteManager;

  constructor(id: string) {
    super();
    this.favoritesManager = new FavoriteManager(id);
  }

  async getRepositories() {
    const favorites = await this.favoritesManager.getFavorites();
    return favorites?.repository;
  }
}
