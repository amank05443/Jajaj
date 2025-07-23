import React from 'react';
import {Typography,AppBar, Toolbar} from '@mui/material';


const Footer=  () =>{
    return(
        <AppBar component = "footer" position="fixed" sx={{top:'auto', bottom: 0, backgroundColor: '#fff', boxShadow: 5, borderRadius : '12px', border: '2px solid #003366'}}>
            <Toolbar sx={{flexWrap:'wrap', justifyContent: 'space-between', display: 'flex',}}>
                <Typography variant="body2" sx = {{ flex: 1, textAlign : 'center', color : 'black'}}>
                    © {new Date().getFullYear()} All rights reserved.
                    Designed and Developed by <span style = {{fontweight:500, color : 'red'}}> CNAMS</span>
                </Typography>
            </Toolbar>
        </AppBar>
    );
};
export default Footer;