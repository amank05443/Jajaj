import React, { useState, useEffect } from 'react';
import useTableApi from '../Utils/CustomHooks/useTableApi';
import CustomGrid from '../Utils/CustomComponents/CustomGrid';
import {Container,IconButton,Button,Select,Table,TableBody,TableCell,TextField,TableContainer,TableHead,TableRow,Paper,Box,Typography,Dialog,MenuItem,DialogTitle,Autocomplete} from '@mui/material';

const VariableExpandableLoadItems=() => {

    const columns = [
    {field:'side_no',headerName:'Role',sortable:true,filterable:true},
    {field:'aircraft_mark',headerName:'Part No.',sortable:true,filterable:true},
    {field:'airframe_serial_no',headerName:'Description',sortable:true,filterable:true},
    {field:'basic_weight',headerName:'Station',sortable:true,filterable:true},
    {field:'date_of_acceptance',headerName:'Weight',sortable:true,filterable:true},
    {field:'max_auw',headerName:'Moment',sortable:true,filterable:true},
    {field:'max_fuel_capacity',headerName:'Remarks',sortable:true,filterable:true},
    ];

    const {data,loading} = useTableApi('aircraft_masters');
    if(loading){<p>Loading...</p>};
    return (
    <div style={{padding:15}}>
    <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-14 mt-1 mb-1">
        <h4
          className="absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "30px",
            margin: 6,
            fontFamily: "Algerian",
          }}
        >
          VARIABLE/EXPANDABLE LOAD ITEMS
        </h4>
      </div>

        {data && (<div>
            <CustomGrid data={data} theme='Electric_Lime' columns={columns} heading= ''/>
        </div> )}
    </div>
    );
};
export default VariableExpandableLoadItems;