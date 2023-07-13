import { useEffect, useState } from "react";
import { IFavorite } from "../api/v1/favorites";
import { Favorites } from "../interfaces/favorites";
import { Repository } from "../interfaces/repositories";

export const useFavorite = (favoriteMethod: IFavorite) => {
  const [favorites, setFavorites] = useState<Favorites>();

  useEffect(() => {
    void getFavorites();
  }, []);

  const addFavorite = (repository: Repository) => {
    favoriteMethod.addRepository(repository);
    if (favorites)
      setFavorites({
        id: favorites.id,
        repository: [...favorites.repository, repository],
      });
    else {
      setFavorites({
        id: repository.owner.login,
        repository: [repository],
      });
    }
  };

  const removeFavorite = (repository: Repository) => {
    favoriteMethod.removeRepository(repository);
    if (favorites)
      setFavorites({
        id: favorites.id,
        repository: favorites.repository.filter(
          (favorite) => favorite.id !== repository.id
        ),
      });
    else {
      setFavorites(undefined);
    }
  };

  const getFavorites = async () => {
    const currFavorites = (await favoriteMethod.getFavorites()) as Favorites;
    if (currFavorites) {
      setFavorites(currFavorites);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    getFavorites,
  };
};
