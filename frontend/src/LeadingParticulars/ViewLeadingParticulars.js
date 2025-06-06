import React, {useState, useEffect} from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';
import {FaPlane, FaTools,FaAtlas, FaClock, FaFileAlt, FaChartBar,FaGlobeAsia,FaCalendar,FaWeight,FaCalculator, FaCogs} from 'react-icons/fa';

const ViewLeadingParticulars=() => {
 const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
 const [sidebarOpen, setSidebarOpen] = useState(true);

 const [aircrafts, setAircrafts] = useState([]);
 const [selectedAircraft, setSelectedAircraft] = useState('');
 const [aircraftDetails, setAircraftDetails] = useState(null);

//  False: To fetch side no until session work completed.
 useEffect(() => {
        axios.get('/api/aircraftSideNo')
            .then(response => {setAircrafts(response.data);})
            .catch(error => {console.error('Error aircraft types:' , error);});
 },[]);
//  False: To all the details of an aircraft from aircraft master table.
 useEffect(() => {
    if(selectedAircraft){
        axios.get(`/api/leadingParticularsOfAircraft/${selectedAircraft}`)
        .then(response => {setAircraftDetails(response.data); console.log('Aircraft data found :');console.log(response.data);})
        .catch(error => {console.error('Error aircraft Marks:' , error);});
    }
 },[selectedAircraft])

 return (
    <div >
        <div style={{background: 'linear-gradient(to right,#87CEEB, #FFE6CC )', height: '91vh', margin:'4px'}}>
            <div style={{padding: 12, position:'relative', display:'flex', height: '3vh', backgroundImage: 'linear-gradient(to right, #FFE6CC, #87CEEB,#FFD5E0 )'}}>
                <h2 style={{position: 'absolute', left:'50%',transform:'translateX(-50%)',fontSize:'20px',margin:0}}>Leading Particulars</h2>
                <h2 style={{marginLeft: '90%',fontWeight:'bold', fontSize: '15px', color:'crimson', margin:0}}>MOD Form 701</h2>
            </div>
            <div className="p-6"  style={{marginLeft: '40%', marginTop: '5px'}}>
                <select value={selectedAircraft} onChange={(e)=> setSelectedAircraft(e.target.value)}>
                    <option value="">--Select Aircraft--</option>
                    {aircrafts.map((aircraft)=>(
                        <option key= {aircraft.id} value={aircraft.id}>{aircraft.side_no}</option>
                    ))}
                </select>
            </div>

            {aircraftDetails && (
                <div style={{marginLeft:'7px', marginRight: '6px'}}>
                    <Grid container spacing= {2} sx={{fontSize:"14px"}}>
                        <Grid size={9}>
                            <Grid container spacing= {2} >
                                <Grid size={4} >
                                        <Typography ><FaPlane />&nbsp; Aircraft Type : <u style= {{color: 'green'}}>{aircraftDetails.ac_type||'NA'}</u></Typography>
                                        <Typography ><FaPlane />&nbsp; Mark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <u style= {{color: 'green'}}>{aircraftDetails.aircraft_mark||'NA'}</u></Typography>
                                        <Typography ><FaPlane />&nbsp; Serial No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <u style= {{color: 'green'}}><i>{aircraftDetails.side_no||'IN 224'}</i></u> </Typography>
                                </Grid>
                                <Grid  size={4}>
                                        <Typography  ><FaPlane /> Airframe Ser No : <u style= {{color: 'green'}}>{aircraftDetails.airframe_serial_no||'NA'}</u></Typography>
                                        <Typography ><FaGlobeAsia /> Aircraft Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <u style= {{color: 'green'}}>{aircraftDetails.roles||'NA'}</u></Typography>
                                        <Typography ><FaGlobeAsia /> Mark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <u style= {{color: 'green'}}>{aircraftDetails.id||'NA'}</u></Typography>
                                </Grid>
                                <Grid  size={4}>
                                        <Typography  ><FaPlane /> Airframe Ser No : <u style= {{color: 'green'}}>{aircraftDetails.airframe_serial_no||'NA'}</u></Typography>
                                        <Typography ><FaGlobeAsia /> Aircraft Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <u style= {{color: 'green'}}>{aircraftDetails.roles || 'NA'}</u></Typography>
                                        <Typography ><FaGlobeAsia /> Mark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <u style= {{color: 'green'}}>{aircraftDetails.id||'NA'}</u></Typography>
                                </Grid>
                                <Grid  size={8}>
                                    <table border="1" cellPadding="6" style={{width:'100%'}} >
                                    <thead>
                                        <tr>
                                            <th colspan={5} style={{background:'#FFD5E0'}}><FaCogs/> Engine Details </th>
                                        </tr>
                                        <tr >
                                           <th >Description</th>
                                           <th >Type</th>
                                           <th >Mark</th>
                                           <th >Serial Number</th>
                                           <th >Date of Fitment</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>Engine PORT</td>
                                            <td>Type 1</td>
                                            <td>Mark 1</td>
                                            <td>Serial Number 1</td>
                                            <td>06 Jun 2025</td>
                                        </tr>
                                        <tr >
                                            <td>Engine STBD</td>
                                            <td >Type 2</td>
                                            <td>Mark 2</td>
                                            <td>Serial Number 2</td>
                                            <td>06 Jun 2025</td>
                                        </tr>
                                    </tbody>
                                 </table>
                                </Grid>
                                <Grid  size={4}>
                                 <table border="1" cellPadding="4" style={{width:'100%'}} >
                                    <thead>
                                        <tr>
                                            <th colspan={4} style={{background:'#FFD5E0'}}><FaClock/> Aircraft Clock Details </th>
                                        </tr>
                                        <tr >
                                           <th >Position</th>
                                           <th >Ser.</th>
                                           <th >Date of Installation</th>
                                           <th >Date of Removal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td>P PORT</td>
                                            <td>Ser1</td>
                                            <td>01 Jun 2025</td>
                                            <td>06 Jun 2025</td>
                                        </tr>
                                        <tr >
                                            <td>P STBD</td>
                                            <td>Ser2</td>
                                            <td>01 Jun 2025</td>
                                            <td>06 Jun 2025</td>
                                        </tr>
                                    </tbody>
                                 </table>
                            </Grid>
                            </Grid>
                        </Grid>
                        <Grid size={3} >
                            <Grid  size={12} >
                                 <table border="1" cellPadding="2" style={{width:'100%'}} >
                                    <thead>
                                        <tr >
                                           <th colspan={2} style={{background:'#FFC5F0'}}>Basic Information</th>
                                        </tr>
                                        <tr >
                                           <th >Description</th>
                                           <th >Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr >
                                            <td> A/C Registration Ser No.</td>
                                            <td> Serial Number 125369</td>
                                        </tr>
                                        <tr >
                                            <td> Date of Acceptance</td>
                                            <td> {aircraftDetails.date_of_acceptance||'NA'}</td>
                                        </tr>
                                        <tr >
                                            <td> Date of Manufacture</td>
                                            <td> {aircraftDetails.date_of_manufacture||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Date of Expiry of TTL</td>
                                           <td> {aircraftDetails.expiry_of_ttl_cal||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Date of Expiry of Warranty</td>
                                           <td> {aircraftDetails.date_of_expiry_of_warranty||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Basic Weight</td>
                                           <td> {aircraftDetails.basic_weight||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max AUW</td>
                                           <td> {aircraftDetails.max_auw||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max Landing Weight </td>
                                           <td> {aircraftDetails.max_landing_weight||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max Combat Load </td>
                                           <td> {aircraftDetails.max_combat_load||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max Operating G Load </td>
                                           <td> {aircraftDetails.max_operating_g_load||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max Fuel Capacity </td>
                                           <td> {aircraftDetails.max_fuel_capacity||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Empty Weight </td>
                                           <td> Empty Weight</td>
                                        </tr>
                                        <tr >
                                           <td> Max Take off Speed </td>
                                           <td> {aircraftDetails.max_takeoff_speed||'NA'}</td>
                                        </tr>
                                        <tr >
                                           <td> Max Landing Speed </td>
                                           <td> {aircraftDetails.max_landing_speed||'NA'}</td>
                                        </tr>
                                    </tbody>
                                 </table>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    </div>
 );
};
 export default ViewLeadingParticulars;