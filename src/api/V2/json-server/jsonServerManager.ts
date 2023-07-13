import { Favorites } from "../../../interfaces/favorites";
import { Repository } from "../../../interfaces/repositories";
import { IFavorite } from "../../v1/favorites";
import { Base } from "./Base";

export class FavoriteManager implements IFavorite {
  baseClass: Base;
  constructor(private id: string) {
    this.baseClass = new Base("favorites");
  }

  async addRepository(repository: Repository) {
    const favorite = await this.getFavorites();
    if (favorite) {
      favorite.repository.find((repo) => repo.id === repository.id)
        ? favorite.repository
        : favorite.repository.push(repository);
      return await this.baseClass.put<Favorites>(this.id, favorite);
    }
    const newFavorite: Favorites = {
      id: this.id,
      repository: [repository],
    };
    await this.baseClass.post<Favorites>(newFavorite);
    return repository;
  }

  async removeRepository(repository: Repository) {
    const favorite = await this.getFavorites();
    console.log(favorite);

    if (favorite) {
      favorite.repository = favorite.repository.filter(
        (repo) => repo.id !== repository.id
      );
      return await this.baseClass.put<Favorites>(this.id, favorite);
    }
    return repository;
  }
  async getFavorites() {
    const res = await this.baseClass.getOne<Favorites>(this.id);
    return res;
  }
  async createDefaultFavorites() {
    try {
      await this.getFavorites();
    } catch (error) {
      const favorites: Favorites = {
        id: this.id,
        repository: [],
      };
      await this.baseClass.post<Favorites>(favorites);
    }
  }
}
