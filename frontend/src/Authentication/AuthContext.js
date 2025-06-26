//import {createContext,useContext,useState,useEffect,useCallback} from 'react';
//import axios from 'axios';
//const AuthContext = createContext();
//export const AuthProvider = ({children}) => {
//    const [isAuthenticated,setIsAuthenticated] = useState(null);
//    const[user,setUser] = useState(null);
//    const checkAuth = useCallback(async () => {
//        try {
//            const res =  await axios.get('http://localhost:8000/user-profile/',{
//                withCredentials:true,
//            });
//            if (res.data.success) {
//                setIsAuthenticated(true);
//                setUser(res.data.user);
//            } else {
//                setIsAuthenticated(false);
//                setUser(null);
//            }
//        } catch {
//          setIsAuthenticated(false);
//          setUser(null);
//        }
//    },[]);
//    const logout = async () => {
//    try {
//        await axios.post('http://localhost:8000/logout/',{},
//        {withCredentials:true});
//            setIsAuthenticated(false);
//            setUser(null);
//    } catch (err) {
//        console.error("Logout failed",err);
//    }};
//    useEffect(() => {
//        checkAuth();
//        window.addEventListener('popstate',checkAuth);
//
//        return () => {
//            window.removeEventListener('popstate',checkAuth);
//        };
//    },[checkAuth]);
//    return (
//        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,logout,checkAuth}}>
//        {children}
//        </AuthContext.Provider>
//    );
//};
//export const useAuth = () =>
//useContext(AuthContext);

import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import axios from 'axios';
const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const[user,setUser] = useState(null);
    const checkAuth = useCallback(async () => {
        try {
            const res =  await axios.get('http://localhost:8000/user-profile/',{
                withCredentials:true,
            });
            if (res.data.success) {
                setIsAuthenticated(true);
                setUser(res.data.user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch {
          setIsAuthenticated(false);
          setUser(null);
        }
    },[]);

    const logout = async () => {
    try {
        await axios.post('http://localhost:8000/logout/',{},
        {withCredentials:true});
            setIsAuthenticated(false);
            setUser(null);

     localStorage.setItem('manual-logout',Date.now());

     } catch (err) {
        console.error("Logout failed",err);
    }};
    useEffect(() => {
        checkAuth();

        const handleStorage = (event) => {
            if (event.key === 'manual-logout') {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        window.addEventListener('storage',handleStorage);
        window.addEventListener('popstate',checkAuth);

        return () => {
            window.removeEventListener('storage',handleStorage);
            window.removeEventListener('popstate',checkAuth);
        };
    },[checkAuth]);
    return (
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,logout,checkAuth}}>
        {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () =>
useContext(AuthContext);