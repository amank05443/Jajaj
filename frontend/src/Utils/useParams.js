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

    const setParam = async (key,value) => {
        const updated = {...params,[key]:value};
        setParamsState(updated);
        try {
            await syncWithSession(updated);
        } catch(e) {
            console.error('Failed to sync param:',e);
        }
    };

    const setMultipleParams = async (newParams) => {
        const updated = {...params,...newParams};
        setParamsState(updated);
        try {
            await syncWithSession(updated);
        } catch(e) {
            console.error('Failed to sync multiple params:',e);
        }
    };

    const clearParams = async () => {
        setParamsState({});
        try {
            await syncWithSession({});
        } catch(e) {
            console.error('Failed to clear params:',e);
        }
    };

    return (
        <ParamsContext.Provider value={{params,setParam,setMultipleParams,clearParams,loading}}>
            {children}
        </ParamsContext.Provider>
    );
};
export const useParams = () => useContext(ParamsContext);