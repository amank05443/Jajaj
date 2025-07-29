import React, { useState, useEffect } from 'react';
import useTableApi from '../Utils/useTableApi';
import CustomGrid from '../Utils/CustomGrid';
import {Container,IconButton,Button,Select,Table,TableBody,TableCell,TextField,
TableContainer,TableHead,TableRow,Paper,Box,Typography,Dialog,MenuItem,DialogTitle,Autocomplete} from '@mui/material';

const BasicWeightAndMoments=() => {

    const columns = [
    {field:'side_no',headerName:'DATE SNOW',sortable:true,filterable:true, width: 50},
    {field:'aircraft_mark',headerName:'WEIGHING, CHANGE OR MODIFICATION',sortable:true,filterable:true},
    {group:'DETAILS OF CHANGE',children:[

            {field:'max_auw',headerName:'Weight(Kg)'},

        {group:'Moment',children:[
            {field:'max_auw',headerName:'Long'},
            {field:'max_auw',headerName:'Lat/Vert'},
        ]},
    ]},

    {group:'CORRECTED BASIC DATA',children:[

            {field:'max_auw',headerName:'Weight(Kg)'},

        {group:'LONGITUDINAL',children:[
            {field:'max_auw',headerName:'CG POSITION'},
            {field:'max_auw',headerName:'MOMENT'},
        ]},
        {group:'LATERAL % MAC ABOUT X ORIGIN',children:[
            {field:'max_auw',headerName:'CG POSITION'},
            {field:'max_auw',headerName:'MOMENT'},
        ]},
    ]},

    {field:'max_fuel_capacity',headerName:'AUTH CODE'},
    ];

    const {data,loading} = useTableApi('aircraft_masters');
    if(loading){<p>Loading...</p>};
    return (
    <div style={{padding:15}}>
        <Typography sx={{bgColor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'right', margin:'relative'}}><u>MOD Form 702A</u></Typography>
        <Typography variant="h6"align="center"gutterBottom sx={{fontWeight:'100',color:'green', letterSpacing:1,}}>
            <u>WEIGHT AND BALANCE DATA-BASIC WEIGHT AND MOMENT</u>
        </Typography>
        {data && (<div>
        <CustomGrid data={data} theme='Forest_Fog' columns={columns} heading= ''/>
        </div> )}
    </div>
    );
};
export default BasicWeightAndMoments;