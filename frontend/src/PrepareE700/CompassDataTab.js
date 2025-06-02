import React, {useState} from 'react';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';

export default function CompassDataTab() {
 const [data, setData] = useState({
  type : '',
  mark : '',
  SN   : '',
  aircraft : '',
  types     : '',
  marks     : '',
  SNs       : '',
  date      : '',
 });

 const handleChange = (e) => {
  const { name, value } = e.target;
  setData((prev) => ({
   ...prev,
   [name]: value
  }));
 };

 return (
  <Paper elevation={6} sx={{width:'1250px',height:'400px',padding:2,borderLeft:'10px solid #ede7f6',}} >
   <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'40px'}}>

   <Paper elevation={6} sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >


    </Paper>



    <Box display="flex" flexDirection="row" alignItems="center" style={{ marginLeft:'100px'}}>
    <Paper elevation={6} alignItems="center" sx={{width:'290px',height:'320px',padding:2,marginTop:"20px"}} >

    </Paper>
    </Box>
    </Box>
   </Paper>
 );
}