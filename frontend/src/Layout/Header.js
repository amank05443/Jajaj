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
    const {isAuthenticated,setIsAuthenticated,user,setUser} = useAuth();
//    const [user,setUser] = useState(null);
    const {params,setParam,setMultipleParams,loading,clearParams} = useParams();
  const navigate = useNavigate();

  const handleLogout = async () => {
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
        clearParams();
      setUser(null);
      setIsAuthenticated(false);
      Cookies.remove('csrftoken')
      Cookies.remove('sessionid')
      navigate('/login');
      } catch (err) {
        console.error('Logout failed:',err);
      }
      };

  useEffect(() => {
    const fetchUser = async () => {
  try {
        const res = await
            axios.get('http://localhost:8000/user-profile/',{
            withCredentials:true
  });

    if (res.data.success) {
        const{name,rank,pno,session_id,id}=res.data.user;
        if(!loading){
            await setParam('user_id',id);
        }
        setUser(res.data.user);
       setIsAuthenticated(true);
    } else {
        setIsAuthenticated(false);
        setUser(null);
        }
    } catch (err) {
        console.error('Error fetching user data:',err);
          setIsAuthenticated(false);
           setUser(null);
    }
  };

    fetchUser();
  }, [setUser,setIsAuthenticated,loading]);



  return (
    <AppBar position="static" sx={{ display:'flex',backgroundColor: '#FOF8FF',width:'100%',margin:0,padding:0}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left icons */}
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

        {/* Right: Username and Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {/* Display username if logged in */}
          {isAuthenticated && user ? (
            <>
              <Typography variant="body1" sx={{ color: '#D3D3D3' }}>
                {user.name}({user.rank})
              </Typography>

              <Tooltip title="Logout">
                <IconButton onClick={handleLogout} sx={{ color: '#D3D3D3' }} aria-label="Logout">
                  <Logout />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>

              <Tooltip title="Login">
                <IconButton onClick={() => navigate('/login')} sx={{ color: '#D3D3D3' }} aria-label="Login">
                  <Logout /> {/* Change this to a Login icon if needed */}
                </IconButton>
              </Tooltip>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
