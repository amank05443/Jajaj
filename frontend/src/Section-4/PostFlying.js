
import React, {useState} from "react";
import { Radio,RadioGroup,Box,Tabs,Tab,Paper,Typography,useTheme,TextField,FormControlLabel,Checkbox,Grid,Container,FormGroup,Button} from '@mui/material';

const servicingOptions = ["Flying Completed",'Flying Terminated with Defect',];

const FSI = () => {
 return(
  <Container maxWidth="lg">
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
        Post Flying
        </Typography>
        </Box>

    <Box mt={4}>
     <Typography fontWeight="bold">Select Servicing:</Typography>
      <RadioGroup row name="servicing">
       {servicingOptions.map((option) => (
        <FormControlLabel key={option} value={option} control={<Radio color color="primary"/>}
        label={option} sx={{mr:3,mb:1}}/>
        ))}
      </RadioGroup>
     </Box>

        <Box mt={4} display="flex" justifyContent="flex-end">
         <Button variant="contained" color="primary" size="large" sx={{borderRadius:2,px:4}}>
         Next
         </Button>
         </Box>
         </Paper>
         </Container>

 );
};
 export default FSI;
