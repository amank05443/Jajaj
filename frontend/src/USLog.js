//import React from 'react';
//import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material';
//import {useNavigate} from 'react-router-dom';
// import Header from './Header';
// import Footer from './Footer';
//
//const USLog = () => {
//const navigate = useNavigate();
//
//const openedEntries = [
//{
// serialNo:'172', afHours:'200hrs',defectCode:'1111',reason:'3 Monthly Inspection', remarks:'Calender Basis Inspection'
//}
//];
//
//const closedEntries = [
//{
// serialNo:'173', afHours:'300hrs',defectCode:'5555',reason:'Hydraulic Leak', remarks:'Repaired and Tested'
//}
//];
//
//const onNewEntryClick = () => {
// alert('New Entry Clicked');
//};
//
// const combinedEntries = [
//   ...openedEntries.map(entry => ({ ...entry,status:'Opened'})),
//   ...closedEntries.map(entry => ({ ...entry,status:'Closed'})),
// ];
//
// return (
//
//  <div style={{padding:20}}>
//   <Header/>
//  <Paper
//                elevation={4}
//                sx={{
//                    p:2,mt:2,
//                    mb:4,
//                    borderRadius:4,
//                    border:'4px solid #64b5f6',
//                    background:'linear-gradient(to right,#e3f2fd,#bbdefb)',
//                }}
//            >
//                <Typography
//                    variant="h4"
//                    align="center"
//                    gutterBottom
//                    sx={{
//                        fontWeight:'900',
//                        color:'#0d47a1',
//                        letterSpacing:1,
//                    }}
//                >
//                   Change of Serviceability Log
//                </Typography>
//            </Paper>
//
//    <Button variant="contained" color="primary" onClick={() => navigate('/newEntry')}>
//      New Entry
//    </Button>
//
//    <TableContainer component={Paper} style={{marginTop:20}}>
//     <Table>
//      <TableHead>
//      <TableRow>
//       <TableCell>Entry Opened/Closed</TableCell>
//       <TableCell>S No.</TableCell>
//       <TableCell>A/F Hrs</TableCell>
//       <TableCell>Defect Code</TableCell>
//       <TableCell>Reason for Raising U/S</TableCell>
//       <TableCell>Remarks</TableCell>
//       <TableCell>Action</TableCell>
//      </TableRow>
//      </TableHead>
//     <TableBody>
//     {combinedEntries.map((entry,index) => (
//      <TableRow key={index}>
//       <TableCell>{entry.status}</TableCell>
//       <TableCell>{entry.serialNo}</TableCell>
//       <TableCell>{entry.afHours}</TableCell>
//       <TableCell>{entry.defectCode}</TableCell>
//       <TableCell>{entry.reason}</TableCell>
//       <TableCell>{entry.remarks}</TableCell>
//       <TableCell> <Button variant="outlined" onClick={() => alert(`Clicked on${entry.status} row`)}>
//        Click Here
//       </Button>
//      </TableCell>
//     </TableRow>
//     ))}
//    </TableBody>
//   </Table>
//   </TableContainer>
//   <Footer/>
//   </div>
// );
//};
//
//export default USLog;


import React from 'react';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
 import Header from './Header';
 import Footer from './Footer';


const USLog = () => {
const navigate = useNavigate();

const openedEntries = [
{
 serialNo:'172', afHours:'200hrs',defectCode:'1111',reason:'3 Monthly Inspection', remarks:'NA'
}
];

//const closedEntries = [
//{
// serialNo:'173', afHours:'300hrs',defectCode:'5555',reason:'NA', remarks:'Repaired and Tested'
//}
//];

const onNewEntryClick = () => {
 alert('New Entry Clicked');
};

 const combinedEntries = [
   ...openedEntries.map(entry => ({ ...entry,status:'Opened'})),
//   ...closedEntries.map(entry => ({ ...entry,status:'Closed'})),
 ];

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
     {combinedEntries.map((entry,index) => (
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