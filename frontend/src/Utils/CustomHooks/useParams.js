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

//
//import { useDispatch, useSelector } from 'react-redux';
//import {
//  fetchParams,
//  syncParams,
//  setParam,
//  setMultipleParams,
//  clearParams,
//} from './store/aircraftSlice';
//
//export const useParams = () => {
//  const dispatch = useDispatch();
//  const { params, loading, error } = useSelector((state) => state.params);
//
//  const updateParam = async (key, value) => {
//    const updated = { ...params, [key]: value };
//    dispatch(setParam({ key, value }));
//    try {
//      await dispatch(syncParams(updated)).unwrap();
//    } catch (err) {
//      console.error("Error syncing param:", err);
//    }
//  };
//
//  const updateMultipleParams = async (newParams) => {
//    const updated = { ...params, ...newParams };
//    dispatch(setMultipleParams(newParams));
//    try {
//      await dispatch(syncParams(updated)).unwrap();
//    } catch (err) {
//      console.error("Error syncing multiple params:", err);
//    }
//  };
//
//  const clearAllParams = async () => {
//    dispatch(clearParams());
//    try {
//      await dispatch(syncParams({})).unwrap();
//    } catch (err) {
//      console.error("Error clearing params:", err);
//    }
//  };
//
//  return {
//    params,
//    loading,
//    error,
//    fetchParams: () => dispatch(fetchParams()),
//    setParam: updateParam,
//    setMultipleParams: updateMultipleParams,
//    clearParams: clearAllParams,
//  };
//};
