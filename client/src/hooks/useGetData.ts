import { useEffect, useState } from "react";

export const useGetData = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetch(endpoint)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return { data: [] };
        }
      })
      .then((jsonResponse) => {
        setData(jsonResponse.data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return {
    isLoading,
    data,
  };
};
