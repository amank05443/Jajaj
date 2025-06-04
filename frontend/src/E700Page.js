
import React from 'react';
import { Paper, Box,Button,Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const E700Page = () => {
     const navigate = useNavigate();

     return (
         <div className="dashboard-container" >
             <div className="dashboard-body">
                 <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="40vh" marginLeft="33%" mb="300px" mt="100px">
                     {/*<Paper elevation={3} sx={{p:5,borderRadius:4,boxShadow:'10px 4px 20px rgba(0,0,0,0.1)',minHeight:'200px'}}>*/}
                     <Paper elevation={3} sx={{p:6, background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: 'white' , minHeight:'110px'}}>
                         <Typography variant="h4" align="center"> <animate> <b>Welcome to Seven Hundred !!</b></animate></Typography>
                         <Box mt={4} align="center">
                             <Button style={{boxShadow: '0 4px 8px rgba(0,0,0,0.2)', background:'rgb(44,210,113)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px'}} onClick={() => navigate('/prepare')} >Prepare/ Verify E 700 Details</Button>
                             {/*<Button variant="contained"  color="primary" onClick={() => navigate('/prepare')} >Prepare/ Verify E 700 Details</Button>*/}
                             {/*<Button variant="contained" color="secondary" onClick={() => navigate('/modify')}  >Modify E700</Button>*/}
                         </Box>
                     </Paper>
                 </Box>
             </div>
             <Footer />
         </div>
     );
};

export default E700Page;