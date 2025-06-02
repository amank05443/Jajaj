
import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Tabs,Tab,Box,Typography,Paper,Button,Grid,Divider} from '@mui/material';
import {motion} from 'framer-motion';
import PrepareAircraft from './FlyingOperations/PrepareAircraft';
import PilotAcceptance from './FlyingOperations/PilotAcceptance';
import PostFlying from './FlyingOperations/PostFlying';
import { E700DataContext } from './E700DataContext';
import Header from './Header';
import Footer from './Footer';

export default function Prepare () {
 const [tabIndex, setTabIndex] = useState(0);
 const navigate = useNavigate();

 const { formData, setFormData } = useContext(E700DataContext);

 const handleTabChange = (event, newValue) => {
  setTabIndex(newValue);
 };

     const goToDashboard = ()=> {
    navigate('/dashboard')
   }

  return (
   <div className="dashboard-container">
      <Header />
      <div className="dashboard-body"
      style={{padding:'2',paddingBottom:'1000px',overflowY:'auto',maxHeight:'calc(200vh-250px)', }}>

   <Box p={3}>

    <Tabs
     value={tabIndex}
     onChange={handleTabChange}
     variant="scrollable"
     scrollButtons="auto"
     aria-label="E700 Tabs"
     sx={{ borderBottom: 1,borderColor:'divider', mb:2,
     }}
     >
      <Tab label ="Prepare Aircraft"sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', marginRight:'10px'}}/>
      <Tab label ="Pilot Acceptance" sx={{bgcolor:'#e8f5e9',color:'#1b5e20',fontWeight:'bold', marginRight:'10px'}}/>
      <Tab label ="Post Flying" sx={{bgcolor:'#fff3e0',color:'#e65100',fontWeight:'bold', marginRight:'720px'}} />

        <Box sx={{bgcolor:'#fff3e0',color:'#e65100',fontWeight:'bold', marginRight:'10px', maxHeight:'100px'}}>
       <Typography sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'left', marginRight:'10px'}}>A/C Type - Dornier  </Typography>
       <Typography sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'left', marginRight:'10px'}}>Mark - DO228  </Typography>
       <Typography sx={{bgcolor:'#e8f2fd',color:'#0d47a1',fontWeight:'bold', textAlign:'left', marginRight:'10px'}}>Serial No. - IN 345 </Typography>

        </Box>

      </Tabs>

      <Box sx={{maxHeight:'70vh',overflowY:'auto',pr:1,}}>

      <motion.div
       key={tabIndex}
       initial={{ opacity:0, y:20}}
       animate={{ opacity: 1, y:0}}
       transition={{ duration:0.5}}
       >
       {tabIndex === 0 && (
        <>
        <PrepareAircraft />
        </>
       )}
       {tabIndex === 1 && (
        <>
        <PilotAcceptance />
         </>
       )}
       {tabIndex === 2 && (
        <>
         <PostFlying />
         </>
       )}

       </motion.div>

      </Box>
     </Box>
      </div>
      <Footer />
    </div>

  );
}