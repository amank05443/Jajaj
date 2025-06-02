import React, {useState} from 'react';
import {Grid, TextField, Typography, Paper} from '@mui/material';

export default function LimitationTab() {
 const [data, setData] = useState({
  airSpeedLimit : '',

 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
   ...prev,
   [name]: value
  }));
 };

 return (
  <Paper elevation={0}>
   <Paper elevation={6} sx={{width:'1250px',height:'185px',padding:2,marginTop:"20px",borderLeft:'10px solid #fff3e0',}} >
   <Typography variant="h6"  gutterBottom style={{marginLeft:'300px'}}><u>Details of Outstanding Limitations/Deferred Defect/Husbandry</u></Typography>
   <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth label="Type" name="type" value={data.type} onChange={handleChange} variant="outlined" />
     </Grid>
    </Grid>
     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Mark"  name="mark" value={data.mark}  onChange={handleChange}  variant="outlined"  />
     </Grid>
    </Grid>
    </Paper>

    <Paper elevation={6} sx={{width:'1250px',height:'185px',padding:2,marginTop:"20px",borderLeft:'10px solid #fff3e0',}} >
   <Typography variant="h6"  gutterBottom style={{marginLeft:'400px'}}><u>Details of Outstanding Concessions</u></Typography>
   <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth label="Type" name="type" value={data.type} onChange={handleChange} variant="outlined" />
     </Grid>
    </Grid>
     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Mark"  name="mark" value={data.mark}  onChange={handleChange}  variant="outlined"  />
     </Grid>
    </Grid>
    </Paper>
   </Paper>
 );
}