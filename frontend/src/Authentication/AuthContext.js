// Purpose: Authentication Context with support for both session-based and JWT-based auth
// JWT tokens are stored in httpOnly cookies (XSS safe)
// User data is fetched from API, not stored in localStorage
// Updated: Added JWT authentication support with httpOnly cookies

import {createContext,useContext,useState,useEffect,useCallback} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Ensure credentials are sent with all requests
axios.defaults.withCredentials = true;

const AuthContext = createContext();

// API Base URL
const API_BASE_URL = 'http://localhost:8000';

// Auth mode: 'jwt' or 'session' - can be switched based on preference
const AUTH_MODE = 'jwt'; // Change to 'session' for backward compatibility

export const AuthProvider = ({children}) => {
    const [isAuthenticated,setIsAuthenticated] = useState(null);
    const[user,setUser] = useState(null);
    const[authChecked,setAuthChecked] = useState(false);
    const[authError,setAuthError] = useState(null);
    const[loading,setLoading] = useState(false);

    /**
     * Check authentication status
     * For JWT: Verifies token and fetches user data
     * For Session: Uses existing user-profile endpoint
     */
    const checkAuth = useCallback(async () => {
        try {
            setLoading(true);

            if (AUTH_MODE === 'jwt') {
                // JWT Mode: First verify token, then get user
                const verifyRes = await axios.get(`${API_BASE_URL}/api/auth/jwt/verify/`, {
                    withCredentials: true,
                });

                if (verifyRes?.data?.valid) {
                    // Token is valid, get user info
                    const userRes = await axios.get(`${API_BASE_URL}/api/auth/jwt/me/`, {
                        withCredentials: true,
                    });

                    if (userRes?.data?.success) {
                        setIsAuthenticated(true);
                        setUser(userRes.data.user);
                    } else {
                        setIsAuthenticated(false);
                        setUser(null);
                    }
                } else {
                    // No valid token - user is not authenticated
                    // Don't try to refresh if there's no token at all (first load)
                    setIsAuthenticated(false);
                    setUser(null);
                }
            } else {
                // Session Mode: Use existing endpoint (backward compatibility)
                const res = await axios.get(`${API_BASE_URL}/user-profile/`, {
                    withCredentials: true,
                });

                if (res?.data?.success) {
                    setIsAuthenticated(true);
                    setUser(res.data.user || null);
                } else {
                    setIsAuthenticated(false);
                    setUser(null);
                }
            }
        } catch(err)  {
            console.error('checkAuth error:', err);
            setIsAuthenticated(false);
            setUser(null);
            setAuthError(err);
        } finally {
            setAuthChecked(true);
            setLoading(false);
        }
    },[]);

    useEffect(() => {
        checkAuth();
    },[checkAuth]);

    /**
     * Login function
     * For JWT: Uses JWT login endpoint, tokens set as httpOnly cookies
     * For Session: Uses existing login endpoint
     */
    const login = async (pno, login_pwd) => {
        try {
            setLoading(true);
            setAuthError(null);

            console.log('[AuthContext] Login attempt:', { pno, AUTH_MODE });

            if (AUTH_MODE === 'jwt') {
                // JWT Mode
                console.log('[AuthContext] Making JWT login request...');
                const response = await axios.post(
                    `${API_BASE_URL}/api/auth/jwt/login/`,
                    { pno, login_pwd },
                    { withCredentials: true }
                );

                console.log('[AuthContext] Login response:', response.data);

                if (response.data.success) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                    console.log('[AuthContext] Login successful, user set');
                    return { success: true, user: response.data.user };
                } else {
                    console.log('[AuthContext] Login failed:', response.data.message);
                    setAuthError(response.data.message);
                    return { success: false, message: response.data.message };
                }
            } else {
                // Session Mode (backward compatibility)
                const csrfToken = Cookies.get('csrftoken');
                const response = await axios.post(
                    `${API_BASE_URL}/login/`,
                    { pno, login_pwd },
                    {
                        headers: {
                            'X-CSRFToken': csrfToken,
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );

                if (response.data.success) {
                    setUser(response.data.user);
                    setIsAuthenticated(true);
                    return { success: true, user: response.data.user };
                } else {
                    setAuthError(response.data.message);
                    return { success: false, message: response.data.message };
                }
            }
        } catch (err) {
            console.log('[AuthContext] Login error:', err);
            console.log('[AuthContext] Error response:', err.response);
            const message = err.response?.data?.message || 'Login failed';
            setAuthError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }
    };

    /**
     * Logout function
     * For JWT: Clears httpOnly cookies via API
     * For Session: Uses existing logout endpoint
     */
    const logout = async () => {
        try {
            setLoading(true);

            if (AUTH_MODE === 'jwt') {
                // JWT Mode
                await axios.post(
                    `${API_BASE_URL}/api/auth/jwt/logout/`,
                    {},
                    { withCredentials: true }
                );
            } else {
                // Session Mode (backward compatibility)
                const csrfToken = Cookies.get('csrftoken');
                await axios.post(`${API_BASE_URL}/logout/`, {},
                    {
                        withCredentials: true,
                        headers: {
                            'X-CSRFToken': csrfToken
                        }
                    }
                );
            }

            setIsAuthenticated(false);
            setUser(null);

            // Clear cookies for session mode
            if (AUTH_MODE === 'session') {
                Cookies.remove('csrftoken');
                Cookies.remove('sessionid');
            }

            // Set flag for cross-tab logout sync
            localStorage.setItem('manual-logout', Date.now().toString());

        } catch (err) {
            console.error("Logout failed", err);
            // Still clear local state even if API fails
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update user data locally
     */
    const updateUser = (updatedFields) => {
        setUser((prevUser) => {
            const newUser = {...prevUser, ...updatedFields};
            return newUser;
        });
    };

    /**
     * Listen for cross-tab logout and navigation events
     */
    useEffect(() => {
        const handleStorage = (event) => {
            if (event.key === 'manual-logout') {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorage);
        window.addEventListener('popstate', checkAuth);

        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('popstate', checkAuth);
        };
    },[checkAuth]);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            updateUser,
            login,
            logout,
            checkAuth,
            authChecked,
            authError,
            loading,
            authMode: AUTH_MODE,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);