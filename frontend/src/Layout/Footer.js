import React from 'react';
import {Typography,AppBar, Toolbar} from '@mui/material';


const Footer=  () =>{
    return(
        <AppBar component = "footer" position="relative" sx={{top:'auto', bottom: 0, backgroundColor: '#fff', boxShadow: 5, borderRadius : '12px', border: '2px solid #003366'}}>
            <Toolbar sx={{flexWrap:'wrap', justifyContent: 'space-between', display: 'flex',}}>
                {/*    <Typography variant="body2" sx = {{ flex: 1, color : 'black', textAlign : {xs:'left', md : 'left'}}}>*/}
                {/*          © {new Date().getFullYear()} All rights reserved*/}
                {/*</Typography>*/}
                <Typography variant="body2" sx = {{ flex: 1, textAlign : 'center', color : 'black'}}>
                    Designed and Developed by <span style = {{fontweight:500, color : 'red'}}> CNAMS</span>
                </Typography>
                {/*<Typography variant="body2" sx = {{ flex: 1, color : 'black', textAlign : {xs:'center', md : 'right'}}}>
                    © {new Date().getFullYear()} All rights reserved
                </Typography>*/}
            </Toolbar>
        </AppBar>
    );
};
export default Footer;