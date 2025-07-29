import React, {useState} from "react";
import {Box, Tabs, Tab, Paper, Typography, useTheme, FormControlLabel, Checkbox, FormGroup} from '@mui/material';
import {motion,AnimatePresence} from "framer-motion";
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import DescriptionIcon from "@mui/icons-material/Description";
import {FaChartBar, FaClock, FaEye, FaFileAlt, FaPlane, FaTools} from "react-icons/fa";


const UserList = () => {
  const [selectedTab,setSelectedTab] = useState(0);
  const theme = useTheme();
  console.log(selectedTab);
  return (
      <>

  <Box sx={{minHeight:"100vh",backgroundColor:"#f8f9fd",p:4,fontFamily:"Roboto,sans-serif",}}>
   <Typography  align = "center" fontWeight="bold" fontSize="40px" color="blue">
   Download User List
   </Typography>

   </Box>



       </>
   );
   };
 export default UserList;


