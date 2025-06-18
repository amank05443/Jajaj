import React, {useState} from "react";
import {Box, Tabs, Tab, Paper, Typography, useTheme, FormControlLabel, Checkbox, FormGroup} from '@mui/material';
import {motion,AnimatePresence} from "framer-motion";
import Header from './Header';
import Footer from './Footer';
import DescriptionIcon from "@mui/icons-material/Description";
import './css/ViewE700.css';

import {FaChartBar, FaClock, FaEye, FaFileAlt, FaPlane, FaTools} from "react-icons/fa";
import App from "./App";

const Section1 = () => <Typography>This is Section 1 content
<button>print</button>
</Typography>
const Section2 = () => <Typography>This is Section 2 content</Typography>
const Section3 = () => <Typography>This is Section 3 content</Typography>
const Section4 = () => <Typography>This is Section 4 content</Typography>

const tabData = [
 { label:"Section 1",content:<Section1 />},
 { label:"Section 2",content:<Section2 />},
 { label:"Section 3",content:<Section3 />},
 { label:"Section 4",content:<Section4 />},
 ];

 const ViewE700 = () => {
  const [selectedTab,setSelectedTab] = useState(0);
  const theme = useTheme();
  console.log(selectedTab);

  return (
      <>
          
  <Box sx={{minHeight:"100vh",backgroundColor:"#f8f9fd",p:4,fontFamily:"Roboto,sans-serif",}}>
   <Typography  align = "center" fontWeight="bold" fontSize="40px" color="blue">
   View E-700 Forms
   </Typography>

   <Paper elevation = {3} sx={{borderRadius:3,p:2}}>
   <Tabs value={selectedTab} onChange={(e,newValue) => setSelectedTab(newValue)}
         variant="fullWidth" textColor="primary" indicatorColor="primary" aria-label="E700 Form Tabs"
         sx={{mb:2,"& .MuiTab-root":{
         fontWeight:"bold", fontSize: "1rem", textTransform: "none",
         },
         }}>
         {tabData.map((tab,index) => (
          <Tab key={index} label = { <Box display="flex" alignItems="center" gap={1}>
          <DescriptionIcon />
          {tab.label} </Box>
          }
          id={` tab-${index}`} aria-controls={`tabpanel-${index}`}/>
         ))}
         </Tabs>

         <AnimatePresence mode="wait">
          <motion.div key={selectedTab} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
            exit={{opacity:0,y: -20}} transition={{duration:0.4}}>
               <div className={`Section_${selectedTab}`} style={{height:"100vh"}}>{tabData[selectedTab].content}</div>
          </motion.div>

   </AnimatePresence>
   </Paper>
    <Footer/>
   </Box>
       </>
   );
   };
 export default ViewE700;


