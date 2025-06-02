//import React, {useState} from 'react';
//import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';
//
//export default function LeadingParticularTab() {
// const [data, setData] = useState({
//  type : '',
//  mark : '',
//  SN   : '',
//  aircraft : '',
//  types     : '',
//  marks     : '',
//  SNs       : '',
//  date      : '',
// });
//
// const handleChange = (e) => {
//  const { name, value } = e.target;
//  setData((prev) => ({
//   ...prev,
//   [name]: value
//  }));
// };
//
// return (
//  <Paper elevation={6} sx={{width:'1250px',height:'400px',padding:2,borderLeft:'10px solid #e8f2fd',}} >
//   <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'40px'}}>
//
//   <Paper elevation={6} sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >
//
//   <Typography variant="h6"  gutterBottom style={{marginLeft:'100px'}}><u>Aircraft</u></Typography>
//
//   <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//
//    <Grid item xs={12} sm={6}>
//     <TextField  fullwidth label="Type" name="type" value={data.type} onChange={handleChange} variant="outlined" />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField  fullwidth  label="Mark"  name="mark" value={data.mark}  onChange={handleChange}  variant="outlined"  />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField fullwidth label="Sl No." name="SN" value={data.SN}  onChange={handleChange}  variant="outlined" />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField  fullwidth  label="Aircraft Sl No." name="aircraft"  value={data.aircraft}   onChange={handleChange}   variant="outlined"  />
//     </Grid>
//    </Grid>
//    </Paper>
//
//    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'100px'}}>
//    <Paper elevation={6} sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >
//
//    <Typography variant="h6"  gutterBottom style={{marginLeft:'100px'}}>
//    <u>Engine</u>
//   </Typography>
//    <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField   fullwidth  label="Type" name="types" value={data.types} onChange={handleChange} variant="outlined" />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField fullwidth  label="Mark" name="marks" value={data.marks} onChange={handleChange} variant="outlined" />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField fullwidth label="Sl No."  name="SNs" value={data.SNs} onChange={handleChange} variant="outlined"  />
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
//    <Grid item xs={12} sm={6}>
//     <TextField fullWidth name="data" type="date" value={data.date} onChange={handleChange} InputLabelProps={{ shrink:true,}}
//     label="Date of Fitment" variant="outlined"/>
//     </Grid>
//    </Grid>
//    </Paper>
//    </Box>
//
//    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'100px'}}>
//    <Paper elevation={6} alignItems="center" sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >
//
//    <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px',marginTop:'40px'}}>
//    <Grid item xs={12} sm={6}>
//    <Typography>
//     <Link href="#details-of-fuel" underline="hover">
//      Details of Fuel
//     </Link>
//    </Typography>
//    </Grid>
//    </Grid>
//
//    <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
//    <Grid item xs={12} sm={6}>
//    <Typography>
//     <Link href="#details-of-olg" underline="hover">
//      Details of OLG
//     </Link>
//    </Typography>
//     </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
//    <Grid item xs={12} sm={6}>
//    <Typography>
//     <Link href="#details-of-clock" underline="hover">
//      Details of Clock
//     </Link>
//    </Typography>
//      </Grid>
//    </Grid>
//
//     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'50px'}}>
//    <Grid item xs={12} sm={6}>
//    <Typography>
//     <Link href="#aircraft-basic-info" underline="hover">
//      Aircraft Basic Information
//     </Link>
//    </Typography>
//     </Grid>
//    </Grid>
//
//
//    </Paper>
//    </Box>
//    </Box>
//   </Paper>
// );
//}

import React, {useState,useEffect} from 'react';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';
import axios from 'axios';

export default function LeadingParticularTab() {
 const [data, setData] = useState({
  types : '',
  marks : '',
  SNs   : '',
  aircraft : '',
  date      : '',
 });

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

   <Paper elevation={6} sx={{width:'290px',height:'400px',padding:2,marginTop:"20px"}} >

   <Typography variant="h6"  gutterBottom style={{marginLeft:'100px'}}><u>Aircraft</u></Typography>

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
     <TextField  fullwidth  label="Aircraft SL No." name="aircraft"  value={data.aircraft}   onChange={handleChange}   variant="outlined"  />
   </Grid>

   <Grid container spacing={4} style={{marginLeft:'20px',marginTop:'20px'}}>
   <TextField  fullwidth  label="Date of Fitment" name="date"  value={data.date}   onChange={handleChange}   variant="outlined"
       InputLabelProps={{shrink:true}}/>
   </Grid>

    </Paper>


    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'100px'}}>
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