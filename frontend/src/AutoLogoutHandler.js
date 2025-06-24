//import {useEffect,useRef} from 'react';
//import axios from 'axios';
//import Cookies from'js-cookie';
//import {useNavigate} from 'react-router-dom';
//import {useAuth} from './AuthContext';
//
//const AutoLogoutHandler = () => {
//    const navigate = useNavigate();
//    const {setUser,setIsAuthenticated} = useAuth();
//    const logoutTimerRef = useRef(null);
//
//    const logout = async () => {
//        try {
//            const csrfToken = Cookies.get('csrftoken');
//            await axios.post('http://localhost:8000/logout/',{},{
//                withCredentials:true,
//                headers: {
//                    'X-CSRFToken':csrfToken,
//                },
//            });
//            } catch (err) {
//                console.error('Auto logout error:',err)
//            } finally {
//            setUser(null);
//            setIsAuthenticated(false);
//            localStorage.removeItem('lastActivity');
//            navigate('/login');
//        }
//    };
//
//    const updateActivity = () => {
//        localStorage.setItem('lastActivity',Date.now());
//    };
//
//    const checkInactivity = () => {
//        const lastActivity =  parseInt(localStorage.getItem('lastActivity'),1);
//        const now = Date.now();
//        const diffInMinutes = (now-lastActivity) / (1000*60);
//
//        if (diffInMinutes > 1) {
//            logout();
//        }
//    };
//
//    useEffect(() => {
//        updateActivity();
//        const events = ['mousemove','keydown','scroll','touchstart'];
//
//        events.forEach((event) =>
//            window.addEventListener('event',updateActivity));
//
//            logoutTimerRef.current = setInterval(checkInactivity,15000);
//
//            return () => {
//
//            events.forEach((event) =>
//                window.removeEventListener(event,updateActivity));
//                clearInterval(logoutTimerRef.current);
//
//        };
//    },[]);
//
//    return null;
//};
//
//export default AutoLogoutHandler;
//


import {useEffect,useRef,useState,useCallback} from 'react';
import axios from 'axios';
import Cookies from'js-cookie';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthContext';
import {Dialog,DialogTitle,DialogContent,DialogActions,Button} from '@mui/material';

const AutoLogoutHandler = () => {
    const navigate = useNavigate();
    const {setUser,setIsAuthenticated,isAuthenticated} = useAuth();

    const [showWarning,setShowWarning] = useState(false);
    const [countdown,setCountDown] = useState(30);
    const countdownRef = useRef(null);
    const hasLoggedOutRef = useRef(false);
    const logoutTimerRef = useRef(null);
    const lastActivityRef = useRef(Date.now());

     const resetActivity = useCallback(() => {
       lastActivityRef.current = Date.now();
        setShowWarning(false);
        setCountDown(30);
        clearInterval(countdownRef.current);
    },[]);

    const fetchCsrfToken = async () => {
        try {
           await axios.get('http://localhost:8000/csrf/',{withCredentials:true});
           return Cookies.get('csrftoken');
        } catch (err) {
        console.error('Error fetching CSRF:',err);
        return null;
        }
    };

    const logout = async () => {
        if(hasLoggedOutRef.current) return;
        hasLoggedOutRef.current = true;

        try {
                const csrfToken = await fetchCsrfToken();
                 if (!csrfToken) return;
            await axios.post('http://localhost:8000/logout/',{},{
                withCredentials:true,
                headers: {
                    'X-CSRFToken':csrfToken,
                },
            });
            setUser(null);
            setIsAuthenticated(false);
            Cookies.remove('csrftoken');
            Cookies.remove('sessionid');
            navigate('/login');
            } catch (err) {
                console.error('Logout failed:',err);
            } finally {
                clearInterval(logoutTimerRef.current);
                clearInterval(countdownRef.current);
                hasLoggedOutRef.current = false;
            }
        };

    const checkInactivity = () => {
        const now = Date.now();
        const diffInSeconds = (now-lastActivityRef.current) / 1000;
        console.log('Inactivity:',diffInSeconds.toFixed(1),'seconds');

        if (diffInSeconds >= 30 && diffInSeconds < 60 && !showWarning) {
            setShowWarning(true);
            setCountDown(30);
            } else if (diffInSeconds >=90) {
            logout();
        }
        };
            useEffect(() => {
            if (!showWarning) return;
            countdownRef.current = setInterval(() => {
                setCountDown(prev => {
                if (prev <= 1) {
                clearInterval(countdownRef.current);
                logout();
                return 0;
                }
                return prev - 1;
                });
            },1000);
            return () =>
            clearInterval(countdownRef.current);
            },[showWarning]);

     useEffect(() => {
        if (!isAuthenticated) {
            setShowWarning(false);
            clearInterval(countdownRef.current);
            clearInterval(logoutTimerRef.current);
            hasLoggedOutRef.current = false;
            lastActivityRef.current = Date.now();
        }
     } ,[isAuthenticated]);


    useEffect(() => {
    if(!isAuthenticated) return;

        lastActivityRef.current = Date.now();
        hasLoggedOutRef.current = false;

        const activityEvents = ['mousemove','mousedown','keydown','scroll','touchstart','click','wheel','keypress'];
        const handleActivity = () => {
          resetActivity();
        };

        activityEvents.forEach((event) =>
            window.addEventListener(event,handleActivity));

            logoutTimerRef.current = setInterval(checkInactivity,10000);

            return () => {
                clearInterval(logoutTimerRef.current);
                clearInterval(countdownRef.current);
                activityEvents.forEach(event => window.removeEventListener(event,handleActivity));
                };
        },[isAuthenticated,resetActivity,showWarning]);

        if(!isAuthenticated || !showWarning) return null;
            return (
                <Dialog open = {true}>
                    <DialogTitle>Inactivity Warning </DialogTitle>
                    <DialogContent>
                    You will be logged out in {countdown} seconds due to inactivity.
                    </DialogContent>
                    <DialogActions>
                    <Button onClick = { () =>  {
                      clearInterval(countdownRef.current);
                      resetActivity();
                    }}
                    variant="contained"
                    color="primary"
                    >
                        Stay Logged In
                    </Button>
                    </DialogActions>
                </Dialog>
              );

        };


export default AutoLogoutHandler;