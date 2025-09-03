import React, {useState,useEffect} from 'react';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';
import axios from 'axios';
import useValidation from "../Utils/useValidation";

export default function LeadingParticularTab() {
 const [data, setData] = useState({ marks : '', SNs   : '', aircraft : '', date      : ''});
 const {formData: typeData, errors: typeErrors, handleChange: handleTypeChange, validate:validateType}= useValidation({types:''},{types:{ capsOnly: true, messages: {capsOnly:'Please  use uppercase only'}}});

 useEffect(() => {
 axios.get('http://localhost:8000/api/aircraft/764/')
    .then((res) => {
    const aircraft=res.data;

    setData({
        types:aircraft.date_of_manufacture||'',
        marks:aircraft.aircraft_mark||'',
        SNs:aircraft.airframe_serial_no||'',
        aircraft:aircraft.side_no||'',
        date:aircraft.date_of_acceptance||'',
    });
    })
    .catch((err) => {
        console.error('Error fetching aircraft data:',err);
    });
     },[]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
   ...prev,
   [name]: value
  }));
 };

 return (

   <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'40px'}}>
       <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'40px'}}>
       <Paper elevation={6} sx={{width:'290px',height:'400px',padding:2,marginTop:"20px"}} >
           <Typography variant="h6"  gutterBottom style={{marginLeft:'100px'}}><u>Aircraft</u></Typography>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField  fullwidth label="Type" name="types" value={typeData.types} onChange={handleTypeChange} variant="outlined" />
             {typeErrors.types && <span className="text-red-500">{typeErrors.types}</span>}
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField  fullwidth  label="Mark"  name="marks" value={data.marks}  onChange={handleChange}  variant="outlined"  />
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField fullwidth label="Sl No." name="SNs" value={data.SNs}  onChange={handleChange}  variant="outlined" />
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px'}}>
             <TextField  fullwidth  label="Airframe Hours." name="aircraft"  value={data.aircraft}   onChange={handleChange}   variant="outlined"  />
           </Grid>
           <Grid container spacing={4} style={{marginLeft:'20px',marginTop:'20px'}}>
           <TextField  fullwidth  label="Date of Fitment" name="date"  value={data.date}   onChange={handleChange}   variant="outlined"
               InputLabelProps={{shrink:true}}/>
           </Grid>
       </Paper>
   </Box>

     <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'80px'}}>
       <Paper elevation={6} sx={{width:'290px',height:'400px',padding:2,marginTop:"20px"}} >
           <Typography variant="h6"  gutterBottom style={{marginLeft:'100px'}}><u>Engine</u></Typography>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField  fullwidth label="Type" name="types" value={data.types} onChange={handleChange} variant="outlined" />
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField  fullwidth  label="Mark"  name="marks" value={data.marks}  onChange={handleChange}  variant="outlined"  />
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
             <TextField fullwidth label="Sl No." name="SNs" value={data.SNs}  onChange={handleChange}  variant="outlined" />
           </Grid>
           <Grid container spacing={2} style={{marginLeft:'20px'}}>
             <TextField  fullwidth  label="Engine Hours." name="aircraft"  value={data.aircraft}   onChange={handleChange}   variant="outlined"  />
           </Grid>
           <Grid container spacing={4} style={{marginLeft:'20px',marginTop:'20px'}}>
           <TextField  fullwidth  label="Date of Fitment" name="date"  value={data.date}   onChange={handleChange}   variant="outlined"
               InputLabelProps={{shrink:true}}/>
           </Grid>
       </Paper>
     </Box>


        <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'120px'}}>
            <Paper elevation={6} alignItems="center" sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >
                <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px',marginTop:'40px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                             <Link href="#details-of-fuel" underline="hover">
                                 Details of Fuel
                             </Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                             <Link href="#details-of-olg" underline="hover">
                                Details of OLG
                             </Link>
                        </Typography>
                     </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                             <Link href="#details-of-clock" underline="hover">
                                Details of Clock
                             </Link>
                        </Typography>
                      </Grid>
                </Grid>
                <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
                    <Grid item xs={12} sm={6}>
                        <Typography>
                             <Link href="#aircraft-basic-info" underline="hover">
                                Aircraft Basic Information
                             </Link>
                        </Typography>
                     </Grid>
                </Grid>
            </Paper>
        </Box>
   </Box>
 );
}