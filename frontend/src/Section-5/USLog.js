import React,{useState,useEffect} from 'react';
import {
  Container,
  IconButton,
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Dialog,
  MenuItem,
  DialogTitle,
  Autocomplete,
} from "@mui/material";
import useTableApi from "../Utils/useTableApi";
import CustomGrid from "../Utils/CustomGrid";
import {useNavigate} from 'react-router-dom';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import axios from 'axios';
import dayjs from 'dayjs';

import useTableApi from '../Utils/CustomHooks/useTableApi';

const USLog = () => {
    const navigate = useNavigate();
    const [wbData, setWbData] = useState({});
  const columns = [
    {
      field: "snow",
      headerName: "SNOW",
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      field: "entry",
      headerName: "status",
      width: 50,
    },
    {
      field: "user_time_date",
      headerName: "Date Opened/ Closed",
    },
    {
      field: "airframe_hrs",
      headerName: "A/F Hrs",
    },
    {
      field: "reason_for_placing_unserviceable",
      headerName: "Reason for Raising U/S",
    },
    {
      field: "status",
      headerName: "Action",
    },
    ];
    const { data, loading } = useTableApi("change_of_serviceability_logs");
    console.log(data);
    if (loading) {
    <p>Loading...</p>;
  }

 return (
  <div style={{padding:20}}>
    <Typography
        variant="h6"
        align="center"
        gutterBottom
        sx={{ fontWeight: "100", color: "green", letterSpacing: 1 }}
      >
        <u>CHANGE OF SERVICEABILITY LOG</u>
      </Typography>

    <Button variant="contained" color="primary" onClick={() => navigate('/userlist')}>
      New Entry
    </Button>

     {wbData && (
        <div>

          <CustomGrid
            data={wbData}
            theme="Forest_Fog"
            columns={columns}
            heading=""
          />
        </div>
      )}


  </div>
 );
};

export default USLog;