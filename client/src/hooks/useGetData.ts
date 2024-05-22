import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useGetData = (endpoint: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);

    fetch(endpoint, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        if (res.status === 401) {
          console.log("unauthorized. reirect to home");
          navigate("/");
        }

        return { data: [] };
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
