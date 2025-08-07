import React,{useState,useEffect} from 'react';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,
    Dialog,DialogTitle,DialogContent,CircularProgress,Tooltip} from "@mui/material";
import {useNavigate} from 'react-router-dom';
//import useTableApi from '.../Utils/useTableApi';
import axios from 'axios';
import dayjs from 'dayjs';

const Concessions = () => {

    const navigate = useNavigate();
    const[entries,setEntries] = useState([]);
//    const {data,loading,update,create} = useTableApi('');
    const [openDialog,setOpenDialog] = useState(false);
    const [selectedRowId,setSelectedRowId] = useState(null);
    const [rowDetails,setRowDetails] = useState(null);
    const [loadingDetails,setLoadingDetails] = useState(true);



    return (
        <div style={{padding:20}}>
            <Paper elevation={4} sx={{p:2,mt:2,mb:4,borderRadius:4,border:'4px solid #64b5f6',background:'linear-gradient(to right,#e3f2fd,#bbdefb)',}}>
                <Typography variant="h4" align="center" gutterBottom sx={{fontWeight:'900',color:'#0d47a1',letterSpacing:3,}}>
                    Production Concessions Affecting Maintainability
                </Typography>
                <Typography sx={{textAlign:'right'}}>
                    <sub style={{fontSize:'1rem'}}><u>MOD Form 704B</u></sub>
                </Typography>
            </Paper>
            <Button variant="contained" color="primary" onClick={() => navigate('/newEntryForConcessions')}>
                New Entry
            </Button>
            <TableContainer component={Paper} style={{marginTop:20}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor:'#1976d2'}}>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Entry Status</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Concession No</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Concession Date</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Valid Upto</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Trade/System/Location</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>SNOW (Date)</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Brief Description/ Effect</TableCell>
                            <TableCell sx={{color:'#fff',fontWeight:'bold'}}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    {/*<TableBody>
                        {entries.map((row) => {const isClosed = !!row.status; return (
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
                        )})}
                    </TableBody>*/}
                    <TableBody>
                            <TableRow>
                                <TableCell>Open</TableCell>
                                <TableCell>1015</TableCell>
                                <TableCell>2022-10-12 15:17</TableCell>
                                <TableCell>2022-10-25 </TableCell>
                                <TableCell>AR</TableCell>
                                <TableCell>1225 (2022-10-08 09:22)</TableCell>
                                <TableCell>Minor crack detected</TableCell>
                                <TableCell>
                                    <Tooltip title='Clear U/S'>
                                        <Button variant="contained" size="small">
                                           Continue
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Open</TableCell>
                                <TableCell>1015</TableCell>
                                <TableCell>2022-10-12 15:17</TableCell>
                                <TableCell>2022-10-25 </TableCell>
                                <TableCell>AR</TableCell>
                                <TableCell>1225 (2022-10-08 09:22)</TableCell>
                                <TableCell>Minor crack detected</TableCell>
                                <TableCell>
                                    <Tooltip title='Clear U/S'>
                                        <Button variant="contained" size="small">
                                           Continue
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

};
export default Concessions;