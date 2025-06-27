import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useParams} from '../Utils/useParams';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Tooltip
} from '@mui/material';
import { Home, Menu as MenuIcon, ContactMail, Info, Logout } from '@mui/icons-material';
import {useAuth} from '../Authentication/AuthContext';


const Header = () => {
    const {user,isAuthenticated,logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout= () => {
        logout();
        navigate('/login');
    };
  return (
    <AppBar position="static" sx={{ display:'flex',backgroundColor: '#FOF8FF',width:'100%',margin:0,padding:0}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left icons */}

        {isAuthenticated && user ? (
            <>
            <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <IconButton component={RouterLink} to="/dashboard" sx={{ color: '#D3D3D3' }} aria-label="Home">
                    <Home />
                </IconButton>
                <IconButton component={RouterLink} to="/menu" sx={{ color: '#D3D3D3' }} aria-label="Menu">
                    <MenuIcon />
                </IconButton>
                <IconButton component={RouterLink} to="/contact" sx={{ color: '#D3D3D3' }} aria-label="Contact Us">
                    <ContactMail />
                </IconButton>
                <IconButton component={RouterLink} to="/about" sx={{ color: '#D3D3D3' }} aria-label="About Us">
                    <Info />
                </IconButton>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {/* Display username if logged in */}
                <Typography variant="body1" sx={{ color: '#D3D3D3' }}>{user.name}({user.rank})</Typography>
                <Tooltip title="Logout">
                    <IconButton onClick={handleLogout} sx={{ color: '#D3D3D3' }} aria-label="Logout">
                        <Logout />
                    </IconButton>
                </Tooltip>
            </Box>
            </>
        ) : (
            <Box>
                <Tooltip title="Login">
                    <IconButton onClick={() => navigate('/login')} sx={{ color: '#D3D3D3' }} aria-label="Login">
                        <Logout /> {/* Change this to a Login icon if needed */}
                    </IconButton>
                </Tooltip>
            </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
