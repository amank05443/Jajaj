
import React, {useState,useContext,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {Tabs,Tab,Box,Typography,Paper,Button,Grid,Divider} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ScaleIcon from '@mui/icons-material/Scale';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ExploreIcon from '@mui/icons-material/Explore';
import {motion} from 'framer-motion';
import LimitationTab from './LimitationTab';
import LeadingParticularTab from './LeadingParticularTab';
import WeightAndBalanceTab from './WeightAndBalanceTab';
import RoutineServicingTab from '../Section-7/RoutineServicingTab';
import CompassDataTab from './CompassDataTab';
import InspectionTab from './InspectionTab';
import { E700DataContext } from './E700DataContext';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export default function Modify () {
 const { formData, setFormData } = useContext(E700DataContext);
 const [tabIndex, setTabIndex] = useState(0);
 const navigate = useNavigate();

 const [leadingParticulars,setLeadingParticulars] = useState({});
 const [weightBalance,setWeightBalance] = useState({});
 const [limitations,setLimitations] = useState({});
 const [inspectionForecast,setInspectionForecast] = useState({});
 const [RoutineServicing,setRoutineServicing] = useState({});
 const [compassData,setCompassData] = useState({});

 useEffect(() => {
  if (formData) {
   setLeadingParticulars(formData.leadingParticulars || {});
   setWeightBalance(formData.weightBalance || {});
   setLimitations(formData.limitations || {});
   setInspectionForecast(formData.inspectionForecast || {});
   setRoutineServicing(formData.RoutineServicing || {});
   setCompassData(formData.compassData || {});
  }
 }, [formData]);

 const handleTabChange = (event, newValue) => {
  setTabIndex(newValue);
 };

 const goToNextTab = () => {
  if (tabIndex < 5) {
   setTabIndex (tabIndex + 1);
  }
 };

 const handleSave = () => {
  const updatedData = {
   leadingParticulars,
   weightBalance,
   limitations,
   inspectionForecast,
   compassData
  };
  setFormData(updatedData);
  alert('Modified data saved successfully!');
 };

 const renderNextButton = () => (
  <Box mt={2} textAlign="center">
   <Button
    variant="contained" onClick={goToNextTab} disabled={tabIndex === 4}>
     Next
   </Button>
  </Box>
  );
   const renderSectionTitle = (icon,title) => (
    <Box display="flex" alignItems="center" mb={2}>
     {icon}
     <Typography variant="h6" ml={1}>
     {title}
     </Typography>
    </Box>
   );

   const renderInfoCard = (title,description) => (
    <Paper elevation={2} sx={{p:2,backgroundColor:'#e3f2fd'}}>
     <Typography variant="subtitle1" gutterBottom>
      {title}
     </Typography>
    <Typography variant="body2">{description}</Typography>
    </Paper>
   );

     const goToDashboard = ()=> {
    navigate('/dashboard')
   }

  return (
   <div className="dashboard-container">
      <div className="dashboard-body" style={{padding:'2',paddingBottom:'40%',overflowY:'auto',maxHeight:'calc(200vh-250px)', width: '100%'}}>
           <Box p={3}>
               <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="E700 Tabs" sx={{ borderBottom: 1,borderColor:'divider', mb:2}}>
                   <Tab label ="Leading Particulars (701)" style={{backgroundColor:'azure',width: '17%'}}/>
                   <Tab label ="Weight and Balance (702/702A)" style={{backgroundColor:'aqua',width: '16%'}}/>
                   <Tab label ="Limitations/ Deferred/ Husbandry/ Concession" style={{backgroundColor:'aquamarine',width: '19%'}}/>
                   <Tab label ="Inspection Forecast (721B/721C/721D/722)" style={{backgroundColor:'olive',width: '17%'}}/>
                   <Tab label =" Routine Servicing Certificate" style={{backgroundColor:'peru',width: '15%'}}/>
                   <Tab label ="Compass Data (712/OPF/S/w Log (703B)" style={{backgroundColor:'mediumpurple',width: '15%'}} />
               </Tabs>
               <Box sx={{maxHeight:'70vh',overflowY:'auto',pr:1,}}>
                   <Paper elevation={4} sx={{p:4,borderRadius:4,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',backgroundColor:'linear-gradient(to bottom right,#ffffff,#f3f6f9)',minHeight:'10%'}}>
                       <motion.div key={tabIndex} initial={{ opacity:0, y:20}} animate={{ opacity: 1, y:0}} transition={{ duration:0.5}}>
                           {tabIndex === 0 && (
                               <>
                                   <LeadingParticularTab data={leadingParticulars} setData={setLeadingParticulars}/>{renderNextButton()}
                               </>
                           )}
                           {tabIndex === 1 && (
                                <>
                                    <WeightAndBalanceTab data={weightBalance} setData={setWeightBalance}/>{renderNextButton()}
                                </>
                           )}
                           {tabIndex === 2 && (
                                <>
                                    <LimitationTab data={limitations} setData={setLimitations}/>{renderNextButton()}
                                </>
                           )}
                           {tabIndex === 3 && (
                                <>
                                    <Typography>Inspection Forecast Content goes here...</Typography >{renderNextButton()}
                                </>
                           )}
                           {tabIndex === 4 && (
                                <>
                                    <RoutineServicingTab data={RoutineServicing} setData={setRoutineServicing}/>{renderNextButton()}
                                </>
                           )}
                           {tabIndex === 5 && (
                                <>
                                    <CompassDataTab data={compassData} setData={setCompassData}/>
                                    <Box mt={3} display="flex" justifyContent="center" gap={2}>
                                        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
                                        <Button variant="outlined" color="Secondary" onClick={goToDashboard}>Dashboard</Button>
                                    </Box>
                                </>
                           )}
                       </motion.div>
                   </Paper>
               </Box>
           </Box>
      </div>
   </div>
  );
}