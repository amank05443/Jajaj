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

const tableHeaderStyle = {
backgroundColor: '#d3d3d3',
textAlign: 'center',
fontWeight: 'bold',
border: '1px solid black',
padding: '4px',
};
const cellStyle = {
border: '1px solid black',
padding: '4px',
};
 const createEmptyRow = () => ({
    modification: '',
    weightSign: '+',
    weightUnits: '',
    longSign: '+',
    longUnits: '',
    latSign: '+',
    latUnits: '',
    correctedWeight: '',
    cgPosition: '',
    cgMoment: '',
    mac: '',
    macMoment: ''
    });

const BasicWeightAndMoments=() => {
const [rows, setRows] = useState ([createEmptyRow()]);

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
        };


    const AddRow = () =>
        setRows([...rows, createEmptyRow()]);

    const deleteRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);
    };


    return (
    <div style={{padding: '20px', fontFamily: 'Arial'}}>
    <Typography sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'left', marginLeft:'1150px'}}>MOD Form 702</Typography>
        <Paper>
            <Typography variant="h5"align="center"gutterBottom sx={{fontWeight:'100',color:'#0d47a1', letterSpacing:1,}}>
                <u>WEIGHT AND BALANCE DATA - BASIC WEIGHT AND MOMENTS</u>
            </Typography>
                <Paper elevation={3} sx={{p:2, mt:1}}>
                    <Box sx={{display:'flex', flexDirection:'row',justifyContent:'space-between',alignItems:'center',gap:1}}>
                        <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                            display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'><FaPlane/> &nbsp;Aircraft Type :
                    </Typography>
                </Box>
                        <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                            display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'><FaPlane/> &nbsp;Mark :
                            </Typography>
                        </Box>
                <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'yellow',px:6,py:1,borderRadius:2,borderShadow:3,
                        display:'left',mt:1,ml:5}}><Typography variant="h6" fontWeight="bold" fontSize='medium'>Serial No. :
                            </Typography>
                </Box>
                        <TextField label ="Page:" variant="outlined" size="small" sx={{flex:0.5,minwidth:'100px'}}/>
                </Box>
            </Paper>
        </Paper>

    <Container maxWidth="" sx={{ mt: 4}}>
            <Button variant="contained" startIcon={<Add />} onClick={AddRow} sx={{ mb: 2 }} color="success">
               Add Row
            </Button>
                <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '10px' }}>
                    <thead>
                    <tr>

                            <th style={tableHeaderStyle}rowSpan="5">1<br />Date / SNOW</th>
                            <th style={tableHeaderStyle}rowSpan="5">2<br />Change/ Modification</th>
                            <th style={tableHeaderStyle}colSpan="6">3 - 6<br />Details Of Change</th>
                            <th style={tableHeaderStyle}colSpan="5" rowSpan="2">7 - 10<br />Corrected Basic Data</th>
                            <th style={tableHeaderStyle}rowSpan="2">11<br />AEO/ALO Sign</th>
                        </tr>
                        <tr>
                        <th colSpan="2">Weight</th>
                        <th colSpan="4">Moment</th>

                        <th rowSpan="3">Weight<br />Units</th>
                        <th colSpan="2">Longitudinal</th>
                        <th colSpan="2">Lateral</th>
                        </tr>
                        <tr>

                        <th style={tableHeaderStyle}rowSpan="2">+ / -</th>
                        <th style={tableHeaderStyle}rowSpan="2">Units</th>
                        <th style={tableHeaderStyle}colSpan="2">Longitudinal Moment</th>
                        <th style={tableHeaderStyle}colSpan="2">Lateral Moment</th>

                        <th style={tableHeaderStyle}rowSpan="2">CG Position</th>
                        <th style={tableHeaderStyle}rowSpan="2">Moment</th>
                        <th style={tableHeaderStyle}rowSpan="2">% MAC</th>
                        <th style={tableHeaderStyle}rowSpan="2">Moment</th>
                        </tr>
                        <tr>
                        <th>+ / -</th>
                        <th>Units</th>
                        <th>+ / -</th>
                        <th>Units</th>
                        </tr>
                       </thead>
                    <tbody>
                        {rows.map((row, idx) => (
                            <tr key={idx}>
                            <td>{new Date().toLocaleDateString()}</td>
                            <td>
                                <input
                                type="text"
                                value={row.modification}
                                    onChange={(e) => handleChange(idx, 'modification', e.target.value)}

                                        />
                                        </td>

                                        <td>
                                        <select value={row.weightSign} onChange={(e) => handleChange(idx, 'weightSign', e.target.value)}>
                                        <option value ="+">+</option>
                                        <option value ="-">-</option>
                                        </select>
                                </td>
                                <td>
                                   <input
                                   type="number"
                                   value={row.weightUnits}
                                   onChange={(e) => handleChange(idx,'weightUnits', e.target.value)}
                                   />
                                   </td>


                                   <td>
                                        <select value={row.longSign} onChange={(e) => handleChange(idx, 'longSign', e.target.value)}>
                                        <option value ="+">+</option>
                                        <option value ="-">-</option>
                                        </select>
                                </td>
                                   <td>
                                   <input type="number" value={row.longUnits} onChange={(e) => handleChange(idx, 'longUnits', e.target.value)}
                                   />
                                   </td>

                                   <td>
                                   <select value={row.latSign} onChange={(e) => handleChange(idx, 'latSign', e.target.value)}>
                                        <option value ="+">+</option>
                                        <option value ="-">-</option>
                                        </select>
                                </td>

                                   <td>
                                   <input
                                   type="number"
                                   value={row.latUnits} onChange={(e) => handleChange(idx, 'latUnits', e.target.value)}
                                   />
                                   </td>
                                   <td>
                                   <input
                                   type="number"
                                   value={row.correctedWeight} onChange={(e) => handleChange(idx, 'correctedWeight', e.target.value)}
                                   />
                                   </td>
                                    <td><input type="text" value={row.cgPosition} readOnly /></td>
                                    <td><input type="text" value={row.cgMoment} readOnly /></td>
                                    <td><input type="text" value={row.mac} readOnly /></td>
                                    <td><input type="text" value={row.macMoment} readOnly /></td>
                                    <td>
                                   <button onClick={() => deleteRow(idx)}>Delete</button>
                                   </td>

                                   </tr>
                                    ))}
                                    </tbody>
                                    </table>

                                      </Container>
                                    </div>



);
};
export default BasicWeightAndMoments;




