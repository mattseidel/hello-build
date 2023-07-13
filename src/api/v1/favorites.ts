import { Repository } from "../../interfaces/repositories";
import firestore from "firebase/firestore";
import { Favorites } from "../../interfaces/favorites";

export interface IFavorite {
  addRepository: (repository: Repository) => void;
  removeRepository: (repository: Repository) => void;
  getFavorites: () => Promise<
    firestore.QuerySnapshot<firestore.DocumentData, firestore.DocumentData> | Favorites | Repository[]
  >;
  createDefaultFavorites: () => Promise<void>;
}
