import React, { useState, useEffect } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import {useParams} from '../Utils/useParams';
import useTableApi from '../Utils/useTableApi';
import {useAuth} from '../Authentication/AuthContext';

import {Container,IconButton,Button,Select,Table,TableBody,TableCell,TextField,TableContainer,TableHead,TableRow,Paper,Box,Typography,Dialog,MenuItem,DialogTitle,Autocomplete} from '@mui/material';
import {FaPlane, FaTools,FaAtlas, FaClock, FaFileAlt, FaChartBar,FaGlobeAsia,FaCalendar,FaWeight,FaCalculator, FaCogs} from 'react-icons/fa';
import {Add, Delete, Save} from '@mui/icons-material';

const roleOptions = ['Training', 'Combat', 'SAR'];
const stationOptions = ['Station 1','Station 2','Station 3', 'Station 4', 'Station 5', 'Station 6'];

const VariableExpandableLoadItems=() => {
    const [tableData, setTableData] = useState ([{ role: '', partNo: '',description: '',station: '',weight: '',moment: '',remarks: ''}]);
    const [aircraftData,setAircraftData] = useState({});
    const [selectedAircraft, setSelectedAircraft] = useState('');
    const [aircraft_master_id, set_aircraft_master_id] = useState('');
    const [aircraftDetails, setAircraftDetails] = useState({});
    const {params, loading} = useParams();
useEffect(() => {
     if(!loading){
         const aircraft_master_id= params.aircraft_master_id;
         setSelectedAircraft(aircraft_master_id);
                 if(aircraft_master_id) {
                axios.get(`/api/VariableExpandableLoadItemsOfAircraft/${aircraft_master_id}`)
                .then(response => {
                    setAircraftDetails(response.data);
                    })
                .catch(error => {
                    console.error('Error aircraft Marks:', error);
                });
        }
    }
 },[params,loading]);

    const handleChange = (index, field, value) => {
        const updatedData = [...tableData];
        updatedData[index][field] = value;
        setTableData(updatedData);
    };
    const handleAddRow = () => {
        setTableData([...tableData, {role: '', partNo: '',description: '',station: '',weight: '',moment: '',remarks: ''}]);
    };
    const handleDeleteRow = (index) => {
        const updatedData = tableData.filter((_, i) => i !== index);
        setTableData(updatedData);
    };
    const handleSave = () => {
        console.log('Saved Data:', tableData);
        alert('Data saved successfully!');
    };
    return (
    <div style={{padding:10}}>
        <Typography sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'left', marginLeft:'1150px'}}>MOD Form 702A</Typography>
        <Paper>
            <Typography variant="h5"align="center"gutterBottom sx={{fontWeight:'100',color:'#0d47a1', letterSpacing:1,}}>
                <u>WEIGHT AND BALANCE DATA - TABLE OF EQUIPMENT</u>
            </Typography>
                <Paper elevation={3} sx={{p:2, mt:1}}>
                    <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:1}}>
                        <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                            display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'><FaPlane/> &nbsp;Aircraft Type : <b
                                            style={{color: 'white'}}>{aircraftDetails.ac_type || 'NA'}</b>
                    </Typography>
                </Box>
                        <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                            display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'><FaPlane/> &nbsp;Mark : <b
                                                style={{color: 'white'}}> {aircraftDetails.aircraft_mark || 'NA'} </b>
                            </Typography>
                        </Box>
                <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                        display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'>Serial No. : <b
                                                style={{color: 'white'}}> {aircraftDetails.airframe_serial_no || 'NA'} </b>
                            </Typography>
                </Box>
                        <TextField label ="Page:" variant="outlined" size="small" sx={{flex:0.5,minwidth:'100px'}}/>
                </Box>
            </Paper>
        </Paper>
        <Container maxWidth="" sx={{ mt: 4}}>
            <Button variant="contained" startIcon={<Add />} onClick={handleAddRow} sx={{ mb: 2 }} color="success">
               Add Row
            </Button>
            <TableContainer component={Paper} elevation={4}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: '#cc0000'}}>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Role</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Part No.</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Description</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Station</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Weight (Kg)</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Moment</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Remarks</TableCell>
                            <TableCell sx={{ color: 'yellow', fontWeight: 'bold'}}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData.map((row, index) => (
                            <TableRow key={index} sx={{ bgcolor: index % 5 === 0 ? '#e3f2fd' : '#bbdefb' }}>
                                <TableCell>
                                    <Select value={row.role} onChange={(e) => handleChange(index, 'role', e.target.value)}
                                        displayEmpty fullWidth size="small"
                                    >
                                        <MenuItem value="">-- Select Role --</MenuItem>
                                        {roleOptions.map((option) => (
                                            <MenuItem key={option} value={option}>{option}</MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField value={row.PartNo} onChange={(e) => handleChange(index, 'partNo', e.target.value)}
                                        fullWidth size="small" placeholder="Enter Part Number"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField value={row.description} onChange={(e) => handleChange(index, 'description', e.target.value)}
                                        fullWidth size="small" placeholder="Description"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select value={row.station} onChange={(e) => handleChange(index, 'station', e.target.value)}
                                        displayEmpty fullWidth size="small"
                                    >
                                        <MenuItem value="">-- Select Station --</MenuItem>
                                            {stationOptions.map((option) => (
                                                <MenuItem key={option} value={option}>{option}</MenuItem>
                                            ))}
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <TextField value={row.weight} onChange={(e) => handleChange(index, 'weight', e.target.value)}
                                        fullWidth size="small" placeholder="Enter Weight"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField value={row.moment} onChange={(e) => handleChange(index, 'moment', e.target.value)}
                                        fullWidth size="small" placeholder="Enter moment"
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField value={row.remarks} onChange={(e) => handleChange(index, 'remarks', e.target.value)}
                                        fullWidth size="small" placeholder="Remarks"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton color="error" onClick={() => handleDeleteRow(index)} disabled={tableData.length === 1}>
                                        <Delete />
                                        <Container maxWidth="" sx={{ mt: 1}}>
                                            <Button variant="contained" startIcon={<Save />} onClick={handleSave} sx={{ mb: 2 }} color="primary">
                                                Save
                                            </Button>
                                        </Container>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    </div>
);
}
export default VariableExpandableLoadItems;


