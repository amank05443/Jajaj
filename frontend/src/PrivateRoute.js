import React,{useEffect,useState} from 'react';
import {Navigate,Outlet} from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = () => {
    const [isAuthenticated,setAuthenticated] = useState(null);

    useEffect (() => {
        axios.get('http://localhost:8000/user-profile/',{withCredentials:true})
            .then (res => {
                if(res.data.success) {
                    setAuthenticated(true);
                } else {
                    setAuthenticated(false);
                }
            })
                .catch(() => setAuthenticated(false));
    },[]);

    if(isAuthenticated === null) return
    <div>Loading...</div>;

    return isAuthenticated?<Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;