import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RepositoryType } from "../interfaces/repositoryFactory";
import { getFavorites } from "../api/v2/json-server/getFavorites";
import { getRepositories } from "../api/v1/github/getRepositories";

interface useGithubRepositoriesProps {
  type: RepositoryType;
}

export const useGithubRepositories = <T>({
  type,
}: useGithubRepositoriesProps) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { user, credentials } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const repo = getFactory();
        console.log(repo);

        const response = (await repo?.getRepositories()) as T;
        setData(response);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    const getFactory = () => {
      switch (type) {
        case RepositoryType.Github:
          return new getRepositories(credentials);
        case RepositoryType.Favorite:
          return new getFavorites(user?.uid as string);
      }
    };
    void fetchData();
  }, [type]);

  const memoizedData = useMemo(() => data, [data]);
  return { data: memoizedData, isLoading };
};
