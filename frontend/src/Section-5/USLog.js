import React,{useState,useEffect} from 'react';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,
    Dialog,DialogTitle,DialogContent,CircularProgress,Tooltip} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import dayjs from 'dayjs';
import useTableApi from '../Utils/CustomHooks/useTableApi';

const USLog = () => {
    const navigate = useNavigate();
//    const[entries,setEntries] = useState([]);
//    const {data,loading,update,create} = useTableApi('');
//    const [openDialog,setOpenDialog] = useState(false);
//    const [selectedRowId,setSelectedRowId] = useState(null);
//    const [rowDetails,setRowDetails] = useState(null);
//    const [loadingDetails,setLoadingDetails] = useState(true);
//
//    useEffect(() => {
//        (if !loading){
//            setEntries(data);
//        };
//    },[data,loading]);
//
//    const handleClick = (row) => {
//        if(!row.cleared_at){
//            navigate('/CompletionDetails',{state:{id:row.id}});
//        } else{
//            const fullData = entries.find((r) => r.id === row.id);
//            if(fullData){
//                setRowDetails(fullData);
//                setLoadingDetails(false);
//                setOpenDialog(true);
//            }
//        }
//    };
//
//    if(gridLoading) return <p>Loading...</p>

 return (
  <div style={{padding:20}}>
    <Paper elevation={4} sx={{p:2,mt:2,mb:4,borderRadius:4,border:'4px solid #64b5f6',background:'linear-gradient(to right,#e3f2fd,#bbdefb)',}}>
        <Typography variant="h4" align="center" gutterBottom sx={{fontWeight:'900',color:'#0d47a1',letterSpacing:3,}}>
           Change of Serviceability Log
        </Typography>
    </Paper>

    <Button variant="contained" color="primary" onClick={() => navigate('/userlist')}>
      New Entry
    </Button>

    <TableContainer component={Paper} style={{marginTop:20}}>
        <Table>
            <TableHead>
                <TableRow sx={{ backgroundColor:'#1976d2'}}>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Entry Opened/Closed</TableCell>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Date Opened/Closed</TableCell>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>SNOW</TableCell>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>A/F Hrs</TableCell>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Reason for Raising U/S</TableCell>
                    <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/*{entries.map((row) => {
                    const isClosed = !!row.status;
                    return (
                    <TableRow key={row.id}>
                        <TableCell>{isClosed ? 'Closed':'Open'}</TableCell>
                        <TableCell>{dayjs(isClosed ? row.closed_at:row.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                        <TableCell>{row.snow}</TableCell>
                        <TableCell>{row.afHours}</TableCell>
                        <TableCell>{row.reasonUS}</TableCell>
                        <TableCell>
                            <Tooltip title={isClosed ? 'View Details' : 'Clear U/S'}>
                                <Button variant="contained" size="small" onClick={() => handleClick(row)}>
                                    {isClosed ? 'View' : 'Continue'}
                                </Button>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                )})}*/}
            </TableBody>
        </Table>
    </TableContainer>

    {/*<Dialog open={openDialog} onClose={()=>setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>U/S Details</DialogTitle>
        <DialogContent>
            {loadingDetails ? (
                <div style={{textAlign:'center',padding:'2rem'}}>
                    <CircularProgress/>
                    <Typography variant="body2" sx={{mt:2}}>Loading...</Typography>
                </div>
            ) : rowDetails?.error ?(
                <Typography color="error">{rowDetails.error}</Typography>
            ) : (
                <>
                    <Typography><strong>ID:</strong>{rowDetails.id}</Typography>
                </>
            )}
        </DialogContent>
    </Dialog>*/}
  </div>
 );
};

export default USLog;