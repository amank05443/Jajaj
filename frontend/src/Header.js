import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Typography, IconButton, Tooltip
} from '@mui/material';
import { Home, Menu as MenuIcon, ContactMail, Info, Logout } from '@mui/icons-material';


const Header = ({ onLogout }) => {
    const [user,setUser] = useState(null);

  const navigate = useNavigate();

  function getCookie  (name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '')
    {
        const cookies = document.cookie.split(';');
        for(let i = 0;i<cookies.length;i++) {
            const cookie=cookies[i].trim();
            if (cookie.substring(0,name.length + 1) === (name + '=')) {
            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
            break;
            }
        }
    }
    return cookieValue;
    }

  const handleLogout = async () => {
    try {
    await axios.get('http://localhost:8000/csrf/',
    {withCredentials:true});
    const csrfToken = getCookie('csrftoken');
        await axios.post('http://localhost:8000/logout/',{},
        {
        withCredentials:true,
        headers:{
            'X-CSRFToken':csrfToken
        }
        });
            localStorage.removeItem('user');
            localStorage.removeItem('session_id');
            localStorage.removeItem('user_id');
            setUser(null);
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
        localStorage.setItem('session_id',session_id);
        localStorage.setItem('user_id',id);

        setUser({name,rank,pno});
    } else {
        console.warn('User not logged in');
        }
    } catch (err) {
        console.error('Error fetching user data:',err);
    }
  };
    fetchUser();
  },[]);

  return (
    <AppBar position="static" sx={{ display:'flex',backgroundColor: '#FOF8FF',width:'100%',margin:0,padding:0,}}>
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
          {user ? (
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
                <IconButton onClick={() => navigate('/')} sx={{ color: '#D3D3D3' }} aria-label="Login">
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
