import React,{createContext,useContext,useState,useEffect} from 'react';
import axios from './axiosSetup';

const ParamsContext = createContext();

export const ParamsProvider = ({children}) => {
    const [params,setParamsState] = useState({});
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/params/get/')
        .then(res => {
            setParamsState(res.data.params || {});
        })
        .catch(err => {
            console.error("Error loading params:",err);
        })
        .finally(() => setLoading(false));
    },[]);

    //update Django session
    const syncWithSession = async (updatedParams) => {
        try {
            await axios.post('/api/params/set/',updatedParams);
        } catch (err){
            console.error("Error syncing params to session:",err);
        }
    };

    const setParam = (key,value) => {
        const updated = {...params,[key]:value};
        setParamsState(updated);
        syncWithSession(updated);
    };

    const setMultipleParams = (newParams) => {
        const updated = {...params,...newParams};
        setParamsState(updated);
        syncWithSession(updated);
    };

    const clearParams = () => {
        setParamsState({});
        syncWithSession({});
    };

    return (
        <ParamsContext.Provider value={{params,setParam,setMultipleParams,clearParams,loading}}>
            {children}
        </ParamsContext.Provider>
    );
};
export const useParams = () => useContext(ParamsContext);