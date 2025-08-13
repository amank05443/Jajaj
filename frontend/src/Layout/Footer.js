import React from 'react';
import {Typography,AppBar, Toolbar} from '@mui/material';


const Footer=  () =>{
    return(
        <AppBar component = "footer" position="relative" sx={{top:'0', bottom: 0, backgroundColor: '#fff', boxShadow: 0, borderRadius : '5px', border: ' solid #003366'}}>
            <Toolbar sx={{flexWrap:'wrap', justifyContent: 'space-between', display: 'flex', paddinLeft: '56%'}}>
                <Typography variant="body2" sx = {{ flex: 1, textAlign : 'center', color : 'black'}}>
                    © {new Date().getFullYear()} All rights reserved.
                    Designed and Developed by <span style = {{fontweight:500, color : 'red'}}> CNAMS</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
export default Footer;