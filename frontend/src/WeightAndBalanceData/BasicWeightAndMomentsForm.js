import React, { useState, useEffect } from 'react';
import '../css/BasicWeightAndMoment.css';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import {useParams} from '../Utils/useParams';
import useTableApi from '../Utils/useTableApi';
import {useAuth} from '../Authentication/AuthContext';

import {Container,IconButton,Button,Select,Table,TableBody,TableCell,TextField,TableContainer,TableHead,TableRow,Paper,Box,Typography,Dialog,MenuItem,DialogTitle,Autocomplete} from '@mui/material';
import {FaPlane, FaTools,FaAtlas, FaClock, FaFileAlt, FaChartBar,FaGlobeAsia,FaCalendar,FaWeight,FaCalculator, FaCogs} from 'react-icons/fa';
import {Add, Delete, Save} from '@mui/icons-material';
 const initialRow = {
    id: '',
    date: '',
    modification: '',
    weightSign: '',
    weightUnit: '',
    longSign: '',
    longUnit: '',
    latSign: '',
    latUnit: '',
    correctedWeight: '',
    cgPosition: '',
    longMoment: '',
    percentMAC: '',
    latMoment: ''
    };
const BasicWeightAndMoments =() => {
 const [rows, setRows] = useState ([{ ...initialRow, id: Date.now() }]);
 const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [editRows, setEditRows] = useState([]);
 const [globalUnit, setGlobalUnit] = useState('kg');

 const handleOpenDialog = () => {
 setEditRows([...rows]);
 setIsDialogOpen(true);
 };

 const handleCloseDialog = () => setIsDialogOpen(false);

 const handleDialogChange = (index, field, value) => {
 const updated = [...editRows];
 updated[index][field] = value;
 setEditRows(updated);
};
 const handleSave = () => {
 setRows(editRows);
 setIsDialogOpen(false);
 };
 const addRow = () => {
 setRows([...rows, { ...initialRow, id: Date.now() }]);
 };
 const deleteRow = (id) => {
 setRows(rows.filter(row => row.id !== id));
 };
 return (

            <div style={{padding: '20px', fontFamily: 'Arial'}}>
                <Typography sx={{bgcolor:'#e8f2fd',color:'red',fontWeight:'bold', textAlign:'left', marginLeft:'1150px'}}>MOD Form 702</Typography>
                <TableContainer component={Paper} elevation={3}>
                    <Typography variant="h5"align="center"gutterBottom sx={{fontWeight:'bold',color:'blue', letterSpacing:1,}}>
                    <u>WEIGHT AND BALANCE DATA - BASIC WEIGHT AND MOMENTS</u>
                </Typography>
                </TableContainer>
        <div className="page">

                <div className="unit-selector">
                    <label>Select unit:</label>
                    <select value={globalUnit} onChange={(e) => setGlobalUnit(e.target.value)}>
                         <option value="kg">kg</option>
                         <option value="lb">lb</option>
                    </select>
                </div>
<TableContainer component={Paper} elevation={4}>
                <table className="custom-table">
                    <thead>

                        <tr>
                            <th rowSpan="4">Date / SNOW</th>
                            <th rowSpan="4">Change/ Modification</th>
                            <th colSpan="6">Details Of Change</th>
                            <th colSpan="5">Corrected Basic Data</th>
                            <th colSpan="4">Delete</th>

                        </tr>
                        <tr>
                                <th colSpan="2">Weight</th>
                                <th colSpan="4">Moment</th>
                                <th rowSpan="2" colSpan="1">Weight</th>
                                <th colSpan="2">Longitudinal</th>
                                <th colSpan="2">Lateral</th>
                            </tr>
                                <tr>
                                    <th rowSpan="2">+ / -</th>
                                    <th rowSpan="2">Units</th>
                                    <th colSpan="2">Long</th>
                                    <th colSpan="2">Lat</th>
                                    <th rowSpan="2">CG Position</th>
                                    <th rowSpan="2">Long Moment</th>
                                    <th rowSpan="2">Percent MAC</th>
                                    <th rowSpan="2">Lat Moment</th>
                                </tr>
                                 <tr>
                                        <th>+ / -</th>
                                        <th>Units</th>
                                        <th>+ / -</th>
                                        <th>Units</th>
                                        <th colSpan="1">Units</th>
                                 </tr>
                    </thead>
                <tbody>
                     {rows.map((row, idx) => (
                        <tr key={row.id} style={{ backgroundColor: idx % 2 === 0? '#f7f7f7' : '#e0f0ff' }}>
                            <td>{row.date}</td>
                            <td>{row.modification}</td>
                            <td>{row.weightSign}</td>
                            <td>{row.weightUnit}</td>
                            <td>{row.longSign}</td>
                            <td>{row.longUnit}</td>
                            <td>{row.latSign}</td>
                            <td>{row.latUnit}</td>
                            <td>{row.correctedWeight}</td>
                            <td>{row.cgPosition}</td>
                            <td>{row.longMoment}</td>
                            <td>{row.percentMAC}</td>
                            <td>{row.latMoment}</td>
                            <td><button onClick={() => deleteRow(row.id)}>Del</button></td>
                        </tr>
                     ))}
                     </tbody>
                     </table>
                     <div className="actions">
                        <button onClick={addRow}>Add Row</button>
                        <button onClick={handleOpenDialog}>Edit</button>
                     </div>
                     {isDialogOpen && (
                        <div className="dialog-overlay">
                            <div className="dialog-box">
                            <h3>Edit Data</h3>
                               {editRows.map((row, idx) => (
                                    <div key={row.id} className="dialog-row">
                                    <input placeholder="Date"value={row.date} onChange={e => handleDialogChange(idx, 'date', e.target.value)} />
                                    <input placeholder="Modification"value={row.modification} onChange={e => handleDialogChange(idx, 'modification', e.target.value)} />
                                    <select value={row.weightSign} onChange={e => handleDialogChange(idx, 'weightSign', e.target.value)}>
                                    <option value ="">Sign</option>
                                    <option value ="+">+</option>
                                    <option value ="-">-</option>
                                            </select>
                                            <input value={row.weightUnit} onChange={e => handleDialogChange(idx, 'weightUnit', e.target.value)} placeholder="Unit" />
                                            <select value={row.longSign} onChange={e => handleDialogChange(idx, 'longSign', e.target.value)}>
                                            <option value ="">Sign</option>
                                        <option value ="+">+</option>
                                        <option value ="-">-</option>
                                        </select>
                                        <select value={row.latSign} onChange={e => handleDialogChange(idx, 'latSign', e.target.value)}>
                                            <option value ="">Sign</option>
                                        <option value ="+">+</option>
                                        <option value ="-">-</option>
                                        </select>
                                        <input placeholder="Weight"value={row.correctedWeight} onChange={e => handleDialogChange(idx, 'correctedWeight', e.target.value)} />
                                         <input placeholder="CG Pos."value={row.cgPosition} onChange={e => handleDialogChange(idx, 'cgPosition', e.target.value)} />
                                         <input placeholder="Long Moment"value={row.longMoment} onChange={e => handleDialogChange(idx, 'longMoment', e.target.value)} />
                                         <input placeholder="% MAC"value={row.percentMAC} onChange={e => handleDialogChange(idx, 'percentMAC', e.target.value)} />
                                         <input placeholder="Lat Moment"value={row.latMoment} onChange={e => handleDialogChange(idx, 'latMoment', e.target.value)} />
                                         </div>
                                    ))}

                                    <button onClick={handleSave}>Save</button>
                                    <button onClick={handleCloseDialog}>Cancel</button>

                                    </div>
                                    </div>
                                    )}
                                    </TableContainer>
                                    </div>
                                    </div>

                     );
                }
export default BasicWeightAndMoments;








