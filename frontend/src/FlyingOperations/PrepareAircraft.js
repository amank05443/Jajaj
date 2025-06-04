
import React, {useState} from "react";
import { Radio,RadioGroup,Box,Tabs,Tab,Paper,Typography,useTheme,TextField,FormControlLabel,Checkbox,Grid,Container,FormGroup,FormControl,Button,Select,MenuItem,InputLabel} from '@mui/material';

const servicingOptions = ["BFS",'TRS','ARDS'];
const operationTypes = ['Routine Flying','NFT','CTF','MTF','GroundRun'];
const tradesmen = ['AE','AL','AR','AO'];
const fsi = ['SSS'];

const PrepareAircraft = () => {
    const[selectedServicing,setSelectedServicing] = useState('');
 return(
  <Container >
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


    <Box mt={4} sx={{width:'100%',maxWidth:400,ml:45}}>
        <FormControl fullWidth >
            <InputLabel id="servicing-label" sx={{color:'#ffffff'}}>Select Servicing </InputLabel>
                <Select
                    labelled="servicing-label"
                    id="servicing-select"
                    value={selectedServicing}
                    label="Select Servicing"
                    onChange={(e) =>
                    setSelectedServicing(e.target.value)}
                    sx={{
                        bgColor:'linear-gradient(to right,#4e54c8,#8f94fb)',
                        color:'white',
                        borderRadius:2,
                        '.MuiSvgIcon-root':{color:'white'},
                    }}
                    MenuProps={{
                        PaperProps:{
                            sx:{
                                bgColor:'#1e1e2f',
                                color:'#f0f0f0',
                                borderRadius:2,
                                boxShadow:5,
                                },
                            },
                    }}
                    >
                    {servicingOptions.map((option) => (
                        <MenuItem key={option} value={option}
                        sx={{
                            '&:hover':{
                                bgColor:'#303050',
                                color:'#ffffff',
                            },
                            '&.Mui-selected':{
                            bgColor:'#5050a2',
                            color:'#ffffff',
                            },
                            '&.Mui-selected:hover':{
                            bgColor:'#7070c5',
                            },
                        }}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
         </FormControl>
    </Box>

  <Paper elevation={3} sx={{p:4,borderRadius:'20px',maxWidth:'1000px',mx:'auto',mt:4}}>

    <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'white',px:16,py:2,borderRadius:3,borderShadow:3,
        display:'inline-block',mt:2,ml:32}}>
        <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
            Prepare Aircraft
        </Typography>
    </Box>

    <Box mt={3}>
      <Typography fontWeight="bold">Type of Operation:</Typography>
        <RadioGroup row name="operationType">
            {operationTypes.map((type) => (
                <FormControlLabel key={type} value={type} control={<Radio color="primary"/>}
                     label={type} sx={{mr:8,mb:1}}/>
            ))}
        </RadioGroup>
    </Box>

    <Box mt={4}>
        <Typography fontWeight="bold" mb={1}>Assign Tradesmen:</Typography>
            <Grid container spacing={2}>
                {tradesmen.map((trade) => (
                <React.Fragment key={trade}>
                    <Grid item xs={8} sm={1}>
                        <TextField fullwidth label="Trade" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField fullwidth label="Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField fullWidth label="Auth Code" variant="outlined" />
                    </Grid>

                </React.Fragment>
                ))}
            </Grid>
    </Box>


        <Box mt={4}>
       <Typography fontWeight="bold" mb={1}>FSI:</Typography>
       <Grid container spacing={2}>
        {fsi.map((trade) => (
         <React.Fragment key={fsi}>
         <Grid item xs={8} sm={1}>
           <TextField fullwidth label="Trade" variant="outlined" />
            </Grid>
          <Grid item xs={12} sm={2}>
           <TextField fullwidth label="Name" variant="outlined" />
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
         </Container>

 );
};
 export default PrepareAircraft;





