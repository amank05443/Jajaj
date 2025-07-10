import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useParams} from '../Utils/useParams';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Box, Typography, IconButton, Tooltip,Avatar,Menu,MenuItem,Divider,ListItemIcon} from '@mui/material';
import { Home, Menu as MenuIcon, ContactMail, Info, Logout ,Settings,AccountCircle,HelpOutline,FileCopy} from '@mui/icons-material';
import {useAuth} from '../Authentication/AuthContext';


const Header = () => {
    const {user,isAuthenticated,logout} = useAuth();
    const {clearParams} = useParams();
    const navigate = useNavigate();
    const [anchorEl,setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleLogout= () => {
        clearParams();

        logout();
        handleMenuClose();
        navigate('/login');
    };
  return (
    <AppBar position="static"
            // sx={{ backgroundColor: '#FOF8FF',boxShadow:'0px 2px 4px rgba(0,0,0,0.1)'}}>
            sx={{backgroundImage:'linear-gradient(170deg, #0f2027 0%, #2c5364 40%, #00ffe7 180%)',
                backdropFilter:'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left icons */}
          <Typography variant ="h6" sx={{color:'#D3D3D3',fontWeight:600}}>
        E 700
      </Typography>
            <Box sx={{ display: 'flex',  alignItems: 'center',gap:2 }}>
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

                {isAuthenticated && user ? (
                    <>
                        <Tooltip title="Account Settings">
                            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml:1 }}>
                                <Avatar src = {user.avatarUrl} alt={user.name}>
                                    {user.name?.[0]}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={anchorEl}
                              open={open}
                              onClose={handleMenuClose}
                              onClick={handleMenuClose}
                              transformOrigin={{horizintal:'right',vertical:'top'}}
                              anchorOrigin={{horizintal:'right',vertical:'bottom'}}>
                            <Box sx={{px:2,py:1.5}}>
                                <Typography variant="subtitle1" sx={{fontWeight:600}}>{user.name}</Typography>
                                <Typography variant="body2" sx={{color:'text.secondary'}}>{user.rank}</Typography>
                            </Box>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon><AccountCircle /></ListItemIcon>Profile
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><FileCopy /></ListItemIcon>Integrations
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon><Settings /></ListItemIcon>Settings
                            </MenuItem>
                            <Divider />
                            <MenuItem>
                                <ListItemIcon><HelpOutline /></ListItemIcon>Help Center
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon><Logout /> </ListItemIcon>logout
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Tooltip title ="Login">
                        <IconButton onClick={() => navigate('/login')} sx={{color:'#D3D3D3'}}>
                            <AccountCircle />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
      </Toolbar>
    </AppBar>
            );
            };


export default Header;