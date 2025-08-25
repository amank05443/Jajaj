
import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Tabs,Tab,Box,Typography,Paper,Button,Grid,Divider} from '@mui/material';
import {motion} from 'framer-motion';
import LimitationTab from './LimitationTab';
import LeadingParticularTab from './LeadingParticularTab';
import WeightAndBalanceTab from './WeightAndBalanceTab';
import CompassDataTab from './CompassDataTab';
import InspectionTab from './InspectionTab';
import '../css/Prepare.css';
import { E700DataContext } from './E700DataContext';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

export default function Prepare () {
 const [tabIndex, setTabIndex] = useState(0);
 const navigate = useNavigate();

 const { formData, setFormData } = useContext(E700DataContext);

 const [leadingParticulars,setLeadingParticulars] = useState(formData.leadingParticulars || {});
 const [weightBalance,setWeightBalance] = useState(formData.weightBalance || {});
 const [limitations,setLimitations] = useState(formData.limitations || {});
 const [inspectionForecast,setInspectionForecast] = useState(formData.inspectioForecast || {});
 const [compassData,setCompassData] = useState(formData.compassData || {});

 const handleTabChange = (event, newValue) => {
  setTabIndex(newValue);
 };

 const goToBackTab = () => {
  if (tabIndex > 0) {
   setTabIndex (tabIndex - 1);
  }
 };

 const goToNextTab = () => {
  if (tabIndex < 4) {
   setTabIndex (tabIndex + 1);
  }
 };

 const renderNextButton = () => (
  <Box mt={2} textAlign="center">
   <Button
    variant="contained" onClick={goToNextTab} disabled={tabIndex === 4}>
     Next
   </Button>
  </Box>
  );

  const renderBackButton = () => (
  <Box mt={2} textAlign="center" display="flex" flexDirection="row">
   <Button
    variant="contained" onClick={goToBackTab} disabled={tabIndex === 0}>
     Back
   </Button>
  </Box>
  );

  const renderNavigationButtons = () => (
  <Box mt={2} justifyContent="center" gap={2} display="flex" >
   <Button
    variant="contained" onClick={goToBackTab} disabled={tabIndex === 0}>
     Back
   </Button>

   <Button
    variant="contained" onClick={goToNextTab} disabled={tabIndex === 4}>
     Next
   </Button>
  </Box>
  );

const handleSave = () => {
  const finalData = {
   leadingParticulars,
   weightBalance,
   limitations,
   inspectionForecast,
   compassData
  };
  console.log('Saving Data:', finalData);
  alert('All data saved successfully!')
 };

     const goToDashboard = ()=> {
    navigate('/dashboard')
   }

  return (
   <div className="dashboard-container">

       <div className="dashboard-body" style={{padding:'2',paddingBottom:'1000px',overflowY:'auto',maxHeight:'calc(200vh-250px)',}}>
           <Box p={3}>
               <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" aria-label="E700 Tabs" sx={{ borderBottom: 1,borderColor:'divider', mb:2,}}>
                   <Tab label ="Leading Particulars (701)" className="leadingParticulars" sx={{width: '230px' , bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold'}}/>
                   <Tab label ="Weight and Balance  (702/702A)" className="weightAndBalance" sx={{width: '250px' , bgcolor:'#e8f5e9',color:'#1b5e20',fontWeight:'bold'}}/>
                   <Tab label ="Limitations/Deferred/Husbandry/Concession" className="limitationsDeferred" sx={{width: '305px' ,bgcolor:'#fff3e0',color:'#e65100',fontWeight:'bold'}}/>
                   <Tab label ="Inspection Forecast (721B/721C/721D/722)" className="inspectionForecast" sx={{width: '250px' ,bgcolor:'#f3e5f5',color:'#6a1b9a',fontWeight:'bold'}}/>
                   <Tab label ="Compass Data (712/OPF/S/w Log (703B)" className="compassData" sx={{width: '310px' ,bgcolor:'#ede7f6',color:'#311b92',fontWeight:'bold'}}/>
               </Tabs>
               <Box className="boxMain" >
                   {/*<Paper elevation={4} sx={{p:4,borderRadius:4,boxShadow:'0 4px 20px rgba(0,0,0,0.1)',backgroundColor:'linear-gradient(to bottom right,#ffffff,#f3f6f9)',minHeight:'450px'}}>*/}
                   <motion.div key={tabIndex} initial={{ opacity:0, y:20}} animate={{ opacity: 1, y:0}} transition={{ duration:0.5}}>
                       {tabIndex === 0 && (<> <LeadingParticularTab /> {renderNextButton()}  </> )}
                       {tabIndex === 1 && (<> <WeightAndBalanceTab /> {renderNavigationButtons()} </> )}
                       {tabIndex === 2 && (<> <LimitationTab /> {renderNavigationButtons()} </> )}
                       {tabIndex === 3 && (<> <InspectionTab /> {renderNavigationButtons()} </> )}
                       {tabIndex === 4 && (<> <CompassDataTab />
                               <Box mt={3} display="flex" justifyContent="center" gap={2}>
                                   <Button variant="contained" color="primary" size="small" onClick={handleSave}>Save</Button>
                                   <Button variant="contained" color="primary" size="small" onClick={goToDashboard}>Dashboard</Button>
                                   {renderBackButton()}
                               </Box> </>
                       )}
                   </motion.div>
                   {/*</Paper>*/}
               </Box>
           </Box>
       </div>
      <Footer />
   </div>
  );
}