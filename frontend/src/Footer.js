import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  TextField, Button, Container, Box, Typography,
  Grid, Alert, AppBar, Toolbar,Drawer,List,ListItem,ListItemText
} from '@mui/material';


function Footer () {
return(
     <Box sx={{ flexShrink:0}}>

     <AppBar position="fixed" sx={{
     top:'auto',
     bottom: 0,
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     padding: '5px 5px',
     backgroundColor: '#FOF8FF',
     color: 'white',
     }}>
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="body1">
            © {new Date().getFullYear()} Department: CNAMS
          </Typography>
        </Toolbar>
      </AppBar>
     </Box>
);
};


export default Footer;
//
//import React from 'react';
//import { Box,Typography,Container,Divider } from '@mui/material';
//
//function Footer () {
// return (
//  <Box component="footer"
//   sx={{
//    backgroundColor:"#0d47a1",
//    color:'white',
//    mt:'auto',
//    py:3,
//    px:2,
//    }}
//    >
//     <Container maxWidth="lg">
//      <Divider sx={{borderColor: 'rgba(255,255,255,0.2)',mb:2}} />
//       <Typography variant ="body2" align="center">
//        © {new Date().getFullYear ()} E700 System -All Rights Reserved.
//       </Typography>
//       <Typography variant="caption" align="center" display="block" sx={{mt:1,opacity: 0.8}}>
//       Developed by Indian Navy (Local CNAMS Cell)
//      </Typography>
//      </Container>
//  </Box>
// );
//}
//
//export default Footer;
