import { IRepositories } from "../repositories";
import { FavoriteManager } from "./favoriteRepositories";
import { Repository } from "../../../interfaces/repositories";

export class getFavorites
  extends
    IRepositories<Repository[]>
{
  favorites: FavoriteManager;
  constructor() {
    super()
    this.favorites = new FavoriteManager();
  }

  async getRepositories() {
    const favorites = await this.favorites.getFavorites();
    return favorites.docs.map((doc) => doc.data()) as Repository[];
  }
}
