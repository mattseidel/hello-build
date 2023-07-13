import { IFavorite } from "../favorites";
import { Repository } from "../../../interfaces/repositories";
import { firebaseCrud } from "./firebaseCrud";
import { DocumentData } from "firebase/firestore";

/**
 * @depreacted use FavoriteManager in V2 folder instead
 */
export class FavoriteManager implements IFavorite {
  firebaseCrud: firebaseCrud<Repository>;
  constructor() {
    this.firebaseCrud = new firebaseCrud<Repository>("favorites");
  }
  async addOrUpdate(id: string, data: Repository): Promise<void> {
    return this.firebaseCrud.addOrUpdate(id, data);
  }
  async findOne(id: string): Promise<DocumentData | undefined> {
    return this.firebaseCrud.getOne(id);
  }

  async addRepository(repository: Repository) {
    return this.firebaseCrud.add(repository);
  }
  async removeRepository(repository: Repository) {
    await this.firebaseCrud.removeRepository(repository.id);
  }
  async getFavorites() {
    return await this.firebaseCrud.getAll();
  }
}
