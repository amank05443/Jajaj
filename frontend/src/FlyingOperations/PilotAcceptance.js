import React, {useState}from 'react';
import { Radio,RadioGroup,Box,Tabs,Tab,Grid,Paper,MenuItem,FormControl,InputLabel,Select,Typography,useTheme,TextField,FormControlLabel,
Checkbox,Container,FormGroup,Button} from '@mui/material';
const PilotAcceptance = () => {
const [operation,setOperation]=useState('');
const[servicing,setServicing]=useState('');

const pilot = ['QFI'];

return(
<Box p={3} >
 <Paper elevation={3} sx={{p:2,borderRadius:'20px',maxWidth:'1020px',mx:'auto',mt:4,py:2}}>
 <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
 display:'inline-block',mt:1,ml:26,}}>
   <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold" fontSize='medium'>
    Next Immediate Scheduled/Phase/Non Phase Inspection Due on/at </Typography>
    </Box>
  <Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
  display:'inline-block',mt:2,ml:6}}>
     <Typography variant="h6" fontWeight="bold" fontSize='medium'>
    Airframe Hours Basis : 100Hrs
    </Typography>
    </Box>
    <Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
    display:'inline-block',mt:2,ml:15}}>
     <Typography variant="h6" fontWeight="bold" fontSize='medium'>
    Calender Basis : 01 Jun 25
    </Typography>
    </Box>
    <Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
    display:'inline-block',mt:2,ml:15}}>
    <Typography variant="h6" fontWeight="bold" fontSize='medium'>
    Out of Phase : 01 Jun 25
    </Typography>
    </Box>

 </Paper>

<Paper elevation={3} sx={{p:4,borderRadius:'20px',maxWidth:'1000px',mx:'auto',mt:4}}>
 <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'white',px:16,py:2,borderRadius:3,borderShadow:3,
    display:'inline-block',mt:2,ml:32}}>
    <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
        Pilot Acceptance Aircraft
        </Typography>
        </Box>
<Box display="flex" gap={2} mb={3} mt={1} flexWrap="wrap" mt={3}>

<Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
  display:'inline-block',mt:2,ml:6}}>
     <Typography variant="h6" fontWeight="bold" fontSize='medium'>
    Fuel Qty : 500Ltrs
    </Typography>
    </Box>
    <Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
    display:'inline-block',mt:2,ml:10}}>
     <Typography variant="h6" fontWeight="bold" fontSize='medium'>
    Landing Gear Pressure : 300 PSI
    </Typography>
    </Box>
    <Box sx={{background:'linear-gradient(13deg,#42a5f5,#478ed1)',color:'white',px:2,py:1,borderRadius:3,borderShadow:3,
    display:'inline-block',mt:2,ml:9}}>
    <Typography variant="h6" fontWeight="bold" fontSize='medium'>
   Type Of Operation : Routine Flying
    </Typography>
    </Box>

</Box>

 <Box mt={4}>
       <Typography fontWeight="bold" mb={1}>Pilot:</Typography>
       <Grid container spacing={2}>
        {pilot.map((trade) => (
         <React.Fragment key={pilot}>
         <Grid item xs={8} sm={1}>
           <TextField fullwidth label="Name" variant="outlined" />
            </Grid>
          <Grid item xs={12} sm={2}>
           <TextField fullwidth label="Rank" variant="outlined" />
            </Grid>

             <Grid item xs={12} sm={5}>
              <TextField fullWidth label="Auth Code" variant="outlined" />
              </Grid>

              </React.Fragment>
        ))}
        </Grid>
        </Box>
<Box mt={4} display="flex" justifyContent="flex-end">
         <Button variant="contained" color="primary" size="large" sx={{borderRadius:2,px:4}}>
         Next
         </Button>
         </Box>
      </Paper>
    </Box>
   );
  };
  export default PilotAcceptance;






