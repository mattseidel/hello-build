import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useApiData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<T>(url);
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchData();
  }, [url]);

  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, isLoading };
};

export default useApiData;
