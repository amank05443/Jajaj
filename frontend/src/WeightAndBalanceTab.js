import React, {useState} from 'react';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';

export default function WeightAndBalanceTab() {
 const [data, setData] = useState({
  weight : '',
  CG     : '',
  LM     : '',
  LCG    : '',
  LAM    : '',

 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
   ...prev,
   [name]: value
  }));
 };

 return (
  <Paper elevation={6} sx={{width:'1250px',height:'425px',padding:2,borderLeft:'10px solid #e8f5e9',}} >
   <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'40px'}}>

   <Paper elevation={6} sx={{width:'350px',height:'400px',padding:2}} >

   <Typography variant="h6"  gutterBottom style={{marginLeft:'20px'}}><u>Basic Weight and Balance Data</u></Typography>

   <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>

    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Weight" name="weight" value={data.weight} onChange={handleChange} variant="outlined" />
     </Grid>
    </Grid>

     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Long CG Position"  name="CG" value={data.CG}  onChange={handleChange}  variant="outlined"  />
     </Grid>
    </Grid>

     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField fullwidth label="Long Moment" name="LM" value={data.LM}  onChange={handleChange}  variant="outlined" />
     </Grid>
    </Grid>

     <Grid container spacing={2} style={{marginLeft:'20px',marginBottom:'15px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Lat CG Position" name="LCG"  value={data.LCG}   onChange={handleChange}   variant="outlined"  />
     </Grid>
    </Grid>

    <Grid container spacing={2} style={{marginLeft:'20px'}}>
    <Grid item xs={12} sm={6}>
     <TextField  fullwidth  label="Lat Moment" name="LAM"  value={data.LAM}   onChange={handleChange}   variant="outlined"  />
     </Grid>
    </Grid>
    </Paper>

    <Paper elevation={6} sx={{width:'760px',height:'400px',padding:2}} >

   <Typography variant="h6"  gutterBottom style={{marginLeft:'200px'}}><u>Details of Removable Items</u></Typography>

    </Paper>

    </Box>
   </Paper>
 );
}