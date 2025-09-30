import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
const AuthContext = createContext();
export const AuthProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const[user,setUser] = useState(null);
    const[authChecked,setAuthChecked] = useState(false);
    const[authError,setAuthError] = useState(null);
    const checkAuth = useCallback(async () => {
        try {
            const res =  await axios.get('http://localhost:8000/user-profile/',{
                withCredentials:true,
            });
            if (res?.data?.success) {
                setIsAuthenticated(true);
                setUser(res.data.user || null);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch(err)  {
        console.error('checkAuth error:',err);
          setIsAuthenticated(false);
          setUser(null);
          setAuthError(err);
        } finally {
        setAuthChecked(true);
        console.log('checkAuth finished -> isAuthenticated:',isAuthenticated);
        }
    },[]);

    useEffect(() => {
        checkAuth();
    },[checkAuth]);

    const logout = async () => {
        try {
            const csrfToken = Cookies.get('csrftoken');
            await axios.post('http://localhost:8000/logout/',{},
                {
                    withCredentials:true,
                    headers:{
                        'X-CSRFToken':csrfToken
                    }
                }
            );
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove('csrftoken')
            Cookies.remove('sessionid')
            localStorage.setItem('manual-logout',Date.now());
        } catch (err) {
            console.error("Logout failed",err);
        }
    };
    const updateUser = (updatedFields) => {
        setUser((prevUser) => {
            const newUser = {...prevUser, ...updatedFields};
            return newUser;
        });
        console.log(user);
    };

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
        <AuthContext.Provider value={{isAuthenticated,setIsAuthenticated,user,setUser,updateUser,logout,checkAuth,authChecked,authError}}>
        {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () =>
useContext(AuthContext);