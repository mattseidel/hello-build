import { useGithubRepositories } from "../../hooks/useGithubRepositories";
import { Grid } from "@mui/material";
import { Repository } from "../../interfaces/repositories";
import { ShowReposCard } from "../card/showReposCard";
import { RepositoriesGridItem } from "../../styles/Grid/GridRepositories";
import { RepositoryType } from "../../interfaces/repositoryFactory";
import { useLocation } from "react-router-dom";
import { FavoriteManager } from "../../api/V2/json-server/jsonServerManager";
import { useAuth } from "../../context/AuthContext";
import { useFavorite } from "../../hooks/useFavorite";
import { useEffect, useState } from "react";
import { SearchText } from "../form/SearchText";

export interface RepositoryIsFavorite extends Repository {
  isFavorite: boolean;
}

const RepositoriesGrid = () => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const favoriteRepository = new FavoriteManager(user!.uid);
  const { favorites, addFavorite, removeFavorite, getFavorites } =
    useFavorite(favoriteRepository);

  useEffect(() => {
    void getFavorites();
  }, [pathname]);

  const convertToFavorites = (repository: Repository) => {
    if (!favorites) return { ...repository, isFavorite: false };
    const isFavorite = favorites.repository.some(
      (favorite) => favorite.id === repository.id
    );

    if (isFavorite) console.log(repository.name);

    return {
      ...repository,
      isFavorite,
    };
  };

  const { data, isLoading,performSearch } = useGithubRepositories({
    type: pathname as RepositoryType,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <>
      <SearchText searchAction={performSearch} />
      <Grid container spacing={2}>
        {data.map((repository) => (
          <RepositoriesGridItem
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={repository.id}
          >
            <ShowReposCard
              repository={convertToFavorites(repository)}
              addFavorite={addFavorite}
              removeFavorite={removeFavorite}
            />
          </RepositoriesGridItem>
        ))}
      </Grid>
    </>
  );
};

export default RepositoriesGrid;
