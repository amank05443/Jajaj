
import React,{useState,useEffect} from 'react';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
 import Header from './Header';
 import Footer from './Footer';
 import axios from 'axios';


const USLog = () => {
const navigate = useNavigate();
const[entries,setEntries] = useState([]);

useEffect(() => {
 axios.get('http://localhost:8000/api/uns/list/').then(res => {
  const formatted = res.data.map((entry,idx) => ({
   status: 'OPENED',serialNO:entry.id,afHours:entry.af_hours,defectCode:entry.defect_code,reason:entry.reason_us,remarks:'N/A',
  }));
   setEntries(formatted);
 })
  .catch(err => {
   console.error("Error fetching entries:",err);
  });
},[]);

 return (
  <div style={{padding:20}}>
   <Header/>
  <Paper
                elevation={4}
                sx={{
                    p:2,mt:2,
                    mb:4,
                    borderRadius:4,
                    border:'4px solid #64b5f6',
                    background:'linear-gradient(to right,#e3f2fd,#bbdefb)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight:'900',
                        color:'#0d47a1',
                        letterSpacing:3,
                    }}
                >
                   Change of Serviceability Log
                </Typography>
            </Paper>

    <Button variant="contained" color="primary" onClick={() => navigate('/newEntry')}>
      New Entry
    </Button>

    <TableContainer component={Paper} style={{marginTop:20}}>
     <Table>
      <TableHead>
      <TableRow sx={{ backgroundColor:'#1976d2'}}>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Entry Opened/Closed</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>S No.</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>A/F Hrs</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Defect Code</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Reason for Raising U/S</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Remarks</TableCell>
       <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Action</TableCell>
      </TableRow>
      </TableHead>
     <TableBody>
     {entries.map((entry,index) => (
      <TableRow key={index}>
       <TableCell>{entry.status}</TableCell>
       <TableCell>{entry.serialNo}</TableCell>
       <TableCell>{entry.afHours}</TableCell>
       <TableCell>{entry.defectCode}</TableCell>
       <TableCell>{entry.reason}</TableCell>
       <TableCell>{entry.remarks}</TableCell>
       <TableCell> <Button variant="outlined" onClick={() => alert(`Clicked on${entry.status} row`)}>
        Click Here
       </Button>
      </TableCell>
     </TableRow>
     ))}
    </TableBody>
   </Table>
   </TableContainer>
   <Footer/>
   </div>
 );
};

export default USLog;