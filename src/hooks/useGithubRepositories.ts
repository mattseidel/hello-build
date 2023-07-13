import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { RepositoryType } from "../interfaces/repositoryFactory";
import { getFavorites } from "../api/v2/json-server/getFavorites";
import { getRepositories } from "../api/v1/github/getRepositories";
import { Repository } from "../interfaces/repositories";

interface useGithubRepositoriesProps {
  type: RepositoryType;
}

export const useGithubRepositories = ({ type }: useGithubRepositoriesProps) => {
  const [data, setData] = useState<Repository[]>();
  const [defaultData, setDefaultData] = useState<Repository[]>();
  const [isLoading, setIsLoading] = useState(false);
  const { user, credentials } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const repo = getFactory();
        const response = await repo?.getRepositories();
        setData(response);
        setDefaultData(response);
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

  const performSearch = (search: string) => {
    if (!search) {
      setData(defaultData);
      return;
    }
    const myData = data;
    if (!myData) return;
    const newData = myData.filter((item) => item.name.includes(search));
    setData(newData);
  };

  const memoizedData = useMemo(() => data, [data]);
  return { data: memoizedData, isLoading, performSearch };
};
