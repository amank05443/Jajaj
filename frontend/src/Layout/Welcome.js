
import React from 'react';
import {Paper, Box, Button, Typography, AppBar, Toolbar} from '@mui/material';
import {useNavigate} from 'react-router-dom';


const Welcome = () => {
     const navigate = useNavigate();

     return (
//         <div className="dashboard-container" >
//            {/* Top App Bar */}
//      <AppBar position="fixed" sx={{ background: '#1565c0' }}>
//        <Toolbar>
//          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>e-700</Typography>
//          <Typography variant="subtitle1">CNAMS</Typography>
//        </Toolbar>
//      </AppBar>

             <div className="dashboard-body" style={{display:"flex",justifyContent:"center", alignItems: "center", height: '100vh' }}>
                 <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="40vh" >
                      <Paper elevation={3} sx={{p:6, background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: 'white' , minHeight:'110px'}}>
                         <Typography variant="h4" align="center"> <animate> <b>Welcome to Seven Hundred !!</b></animate></Typography>
                         <Box mt={4} align="center">
                             <Button style={{boxShadow: '0 4px 8px rgba(0,0,0,0.2)', background:'#53BE80FF', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px'}} onClick={() => navigate('/login')} >Update E700 Application</Button>
                         </Box>
                     </Paper>
                 </Box>
             </div>
//            {/* Footer */}
//                 <AppBar
//                position="fixed"
//             component="footer"
//                sx={{ backgroundColor: '#1565c0', top: 'auto', bottom: 0 }}
//                >
//                <Toolbar sx={{ justifyContent: 'center' }}>
//                    <Typography variant="body2" color="inherit">
//                      © {new Date().getFullYear()}
//                  </Typography>
//                  </Toolbar>
//             </AppBar>
//                </div>
     );
};

export default Welcome;