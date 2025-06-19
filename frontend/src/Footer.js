import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography,AppBar, Toolbar
  } from '@mui/material';


const Footer=  () =>{
return(
<AppBar component = "footer" position="fixed" sx={{
     top:'auto',
     bottom: 0,
     backgroundColor: '#FOF8FF',
     }}>
     <Toolbar sx={{
     flexWrap:'wrap',
     justifyContent: 'space-between',
     display: 'flex',
     }}>

     <Typography variant="body2" sx = {{ flex: 1, textAlign : {xs:'left', md : 'left'}}}>
           © {new Date().getFullYear()} All rights reserved
 </Typography>
<Typography variant="body2" sx = {{ flex: 1, textAlign : 'center'}}>
           Designed and Developed by <span style = {{fontweight:500, color : '#90caf9'}}> Indian Navy</span>
           </Typography>
 <Typography variant="body2" sx = {{ flex: 1, textAlign : {xs:'center', md : 'right'}}}>
           v0.0.1
 </Typography>

 </Toolbar>
 </AppBar>
);
};
export default Footer;
