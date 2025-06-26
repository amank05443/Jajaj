
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {useParams} from './Utils/useParams';
import {
  TextField, Button, Container, Box, Typography,Grid, Alert, AppBar,CircularProgress,
  Toolbar, CssBaseline, Paper,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
import { motion } from 'framer-motion';
import Footer from './Layout/Footer';

const E700Page = () => {
     const navigate = useNavigate();

     //params context
    const {params,setParam,setMultipleParams,loading} = useParams();

     const [aircraftTypes,setAircraftTypes] = useState([]);
     const [aircraftDetails,setAircraftDetails] = useState([]);

     const [selectedAircraftType,setSelectedAircraftType] = useState('');
     const [selectedAircraftDetail,setSelectedAircraftDetail] = useState('');

     const [status, setStatus] = useState('');

     useEffect(() => {
        axios.get('http://localhost:8000/api/aircraft-type-details')
        .then(response => {
            setAircraftTypes(response.data);
        })
        .catch(error => {
             console.error('Error fetching Aircraft Types', error);
        });
     },[]);

     useEffect(() => {
        if(selectedAircraftType) {
             axios.get(`/api/aircraft-details/${selectedAircraftType}`)
            .then(response => setAircraftDetails(response.data));
        } else {
            setAircraftDetails([]);
        }
     },[selectedAircraftType]);

     const handleChange =(event) => {
        setSelectedAircraftType(event.target.value);
     };
     const handleChange1 =(e) => {
        setSelectedAircraftDetail(e.target.value);
     };

     //to save a/c type and master id into local storage
     const handleSelection=async ()=>{
        if(!selectedAircraftDetail){
            setStatus("Please select A/C Side No.");
            console.log(status);
            return;
        };
//        localStorage.setItem('aircraft_type_id',selectedAircraftType);
//        localStorage.setItem('aircraft_master_id',selectedAircraftDetail);
         if(!loading){
           await setMultipleParams({
            'aircraft_type_id':selectedAircraftType,
            'aircraft_master_id':selectedAircraftDetail});
         } else {
             console.warn('Params not loaded yet.Skipping update.');
         }
        console.log("Current Params:", params);
        navigate('/dashboard');
     };

     return (
         <div className="dashboard-container" >
             <div className="dashboard-body">
                 <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="60vh" marginLeft="33%" mb="300px" mt="100px">
                      <Paper elevation={3} sx={{p:6, background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)', color: 'white' , minHeight:'100px'}}>
                         <Typography variant="h4" gutterbottom align="center"> <animate> <b> <u>Welcome to Seven Hundred !! </u></b> </animate></Typography>
                            <Grid container direction="column" spacing={2} xs={6}>
                                 <Grid item sm={6}>
                                 <Box align="center">
                                 <FormControl fullWidth margin = "normal">
                                                                  <Typography id="aircraft-type-label" sx={{color: 'red'}} fontWeight="bold" mb={1}>Aircraft Type</Typography>
                                    <Select labelId="aircraft-type-label" id="aircraft-type-select" value={selectedAircraftType} label="Aircraft Type" sx={{backgroundColor: 'white'}} onChange={handleChange}>
                                        <option value="">--Select Aircraft--</option>
                                        {aircraftTypes.map((aircraftType) => (
                                            <MenuItem key={aircraftType.id} value={aircraftType.id}>
                                                {aircraftType.aircraft_name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                                    </Box>
                                 </Grid>
                                <Grid item sm={6} >
                                <Box align="center">
                                   <FormControl fullWidth size="medium">
                                    <Typography id="aircraft-side-no-label" sx={{color: 'red'}} fontWeight="bold">Aircraft Side No. </Typography>
                                    <Select labelId="aircraft-side-no-label" id="aircraft-side-no-select"  value={selectedAircraftDetail} label="Aircraft Side No" sx={{backgroundColor: 'white'}} onChange={handleChange1}>
                                        {aircraftDetails.map((aircraft) => (
                                            <MenuItem key={aircraft.id} value={aircraft.id}>
                                                {aircraft.side_no}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <p>{aircraftDetails.id}</p>
                                     </FormControl>
                                    </Box>
                                </Grid>
                                <Box align="center">
                                <FormControl>
                                    <Button style={{boxShadow: '0 4px 8px rgba(0,0,0,0.2)', background:'rgb(44,210,113)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px'}} onClick={handleSelection} ><b>Prepare/ Verify E 700 Details</b></Button>
                                 </FormControl>
                                </Box>
                            </Grid>
                            </Paper>

                 </Box>
             </div>
         </div>
     );
};

export default E700Page;
