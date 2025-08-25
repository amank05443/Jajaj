//Purpose :- For keeping important ids and data saved using react context
//   and sessionStorage.So that these can be accessed directly on any page throughout the frontend
//Syntax for using this :-

//added by :- Abhishek Singh,LAM


import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../../Authentication/axiosSetup";

const ParamsContext = createContext();

export const ParamsProvider = ({ children }) => {
  const [params, setParamsState] = useState(() => {
    const stored = sessionStorage.getItem("params");
    return stored ? JSON.parse(stored) : {};
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchParams = async () => {
      try {
        const res = await axios.get("/api/params/get/");
        if (isMounted && res?.data?.params) {
          setParamsState(res.data.params);
          sessionStorage.setItem("params", JSON.stringify(res.data.params));
        }
      } catch (err) {
        console.error("Error loading params:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchParams();
    return () => {
      isMounted = false;
    };
  }, []);

  //update Django session
  const syncWithSession = async (updatedParams) => {
    await axios.post("/api/params/set/", updatedParams);
  };

  const setParam = async (key, value) => {
    const updated = { ...params, [key]: value };
    setParamsState(updated);
    try {
      await syncWithSession(updated);
    } catch (e) {
      console.error("Failed to sync param:", e);
      setError(e);
    }
  };

  const setMultipleParams = async (newParams) => {
    const updated = { ...params, ...newParams };
    setParamsState(updated);
    try {
      await syncWithSession(updated);
    } catch (e) {
      console.error("Failed to sync multiple params:", e);
      setError(e);
    }
  };

  const clearParams = async () => {
    setParamsState({});
    sessionStorage.removeItem("params");
    try {
      await syncWithSession({});
    } catch (e) {
      console.error("Failed to clear params:", e);
      setError(e);
    }
  };

  return (
    <ParamsContext.Provider
      value={{
        params,
        setParam,
        setMultipleParams,
        clearParams,
        loading,
        error,
      }}
    >
      {children}
    </ParamsContext.Provider>
  );
};
export const useParams = () => useContext(ParamsContext);
