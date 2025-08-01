import React,{useEffect,useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useParams} from '../Utils/useParams';
import useTableApi from '../Utils/useTableApi';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {AppBar, Toolbar, Box, Typography, IconButton, Tooltip,Avatar,Menu,MenuItem,Divider,ListItemIcon,Paper} from '@mui/material';
import { Home, Menu as MenuIcon, ContactMail, Info, Logout ,Settings,AccountCircle,HelpOutline,FileCopy} from '@mui/icons-material';
import {Contact,GaugeCircle,Plane} from 'lucide-react';
import {motion,AnimatePresence} from 'framer-motion';
import {useAuth} from '../Authentication/AuthContext';

const Header = () => {
    const {user,isAuthenticated,logout} = useAuth();
    const navigate = useNavigate();
    const {params} = useParams();
    const {clearParams} = useParams();

    const [showCanvasMenu,setShowCanvasMenu] = useState(false);
    const[accountAnchor,setAccountAnchor] = useState(null);

    const toggleCanvasMenu = () => setShowCanvasMenu(prev => !prev);
    const handleAccountClick = (e) => setAccountAnchor(e.currentTarget);
    const handleAccountClose = () => setAccountAnchor(null);

    const{data,loading} = useTableApi('aircraft_masters',{id:params.aircraft_master_id,related:['aircraft_type']});

    const handleLogout= () => {
        clearParams();
        logout();
        handleAccountClose();
        navigate('/login');
    };

    const navItems = [
        {label:'Key sections',icon:<Info size={18} />,path:'/sections'},
        {label:'Aircraft Info',icon:<Contact size={28} />,path:'/aircraft-info'},
        {label:'Flight Dashboard',icon:<GaugeCircle size={28} />,path:'/flight-dashboard'},
    ];

  return (
    <AppBar position="relative"
            // sx={{ backgroundColor: '#FOF8FF',boxShadow:'0px 2px 4px rgba(0,0,0,0.1)'}}>
            sx={{backgroundImage:'linear-gradient(170deg, #0f2027 0%, #2c5364 40%, #00ffe7 180%)',
                backdropFilter:'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',zindex:9999}}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between',ml:'4%' }}>
          {/* Left icons */}

            <Box sx={{ display: 'flex',  alignItems: 'center',gap:2 ,position:'relative'}}>
                <IconButton component={RouterLink} to="/dashboard" sx={{ color: '#D3D3D3' }} aria-label="Home">
                    <Home />
                </IconButton>
                <IconButton onClick={toggleCanvasMenu} sx={{color:'white'}}>
                <MenuIcon />
                </IconButton>
            </Box>

            <AnimatePresence>
                {showCanvasMenu && (
                    <motion.div
                        initial={{opacity:0,y:-10}}
                        animate={{opacity:1,y:0}}
                        exit={{opacity:0,y:-10}}
                        transition={{duration:0.25}}
                        style={{
                            position:'relative',top:65,left:70,width:260,background:'#698',borderRadius:12,
                            boxShadow:'0px 8px 20px rgba(0,0,0,0.15)',padding:'16px',zindex:9999,
                        }}>

                        <Typography variant = "h5" sx={{fontWeight:600,mb:1,color:'black'}}>
                            Navigate
                        </Typography>
                        <Divider sx={{mb:1}} />
                        {navItems.map((item,index) => (
                                <Box key={index} onClick={() => {
                                    setShowCanvasMenu(false);
                                    navigate(item.path);
                                }}
                                sx={{
                                    display:'flex',
                                    alignItems:'center',
                                    p:1,borderRadius:2,cursor:'pointer',
                                    '&:hover' :{
                                        backgroundColor:"#555"
                                    }
                                }}>
                                    <Box sx={{mr:1.5,color:'#333'}}>{item.icon}</Box>
                                        <Typography variant="body1" fontWeight={500}>
                                            {item.label}
                                        </Typography>
                                </Box>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {!loading && data && data.aircraft_type && (
                <motion.div
                    initial={{opacity:0,y:-10}}
                    animate={{opacity:1,y:0}}
                    transition={{duration:0.6,ease:'easeOut'}}>
                    <Box sx={{display:'flex',alignItems:'right',backgroundColor:'#198',padding:'10px 16px',gap:2}}>
                        <Plane color='white' size={32} />
                        <Box>
                            <Typography variant="h6" fontWeight={600} color="white">{data.aircraft_type.aircraft_name}</Typography>
                            <Typography variant="subtitle4" color="white">Side No.{data.side_no}</Typography>
                        </Box>
                    </Box>
                </motion.div>
            )}

                {isAuthenticated && user  ?  (
                    <>

                        <Tooltip title="Account Settings" >
                            <IconButton onClick={handleAccountClick} size="small" sx={{ mr:'2%'}}>
                                <Avatar src = {user.avatarUrl} alt={user.name}>
                                    {user.name?.[0]}
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu anchorEl={accountAnchor}
                              open={Boolean(accountAnchor)}
                              onClose={handleAccountClose}

                              transformOrigin={{horizontal:'right',vertical:'top'}}
                              anchorOrigin={{horizontal:'right',vertical:'bottom'}}>
                            <Box sx={{px:2,py:1.5}}>
                                <Typography variant="subtitle1" sx={{fontWeight:500}}>{user.name}</Typography>
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
      </Toolbar>
    </AppBar>
            );
            };


export default Header;