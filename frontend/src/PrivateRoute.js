//import React,{useEffect,useState} from 'react';
import {Navigate,Outlet} from 'react-router-dom';
import {useAuth} from './AuthContext';


const PrivateRoute = () => {
    const {isAuthenticated} = useAuth();
    if(isAuthenticated === null){
    return
    <div>Loading...</div>;

    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;