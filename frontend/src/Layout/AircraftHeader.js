import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  IconButton,
  AccordionDetails,
  Box,
  Card,
  CardContent,
  Typography,
  Toolbar,
  AppBar,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useParams } from "../Utils/useParams";
import useTableApi from "../Utils/useTableApi";
import { useAuth } from "../Authentication/AuthContext";

const slideVariants = {
  collapsed: { width: 0, opacity: 0, transition: { duration: 0.3 } },
  expanded: {
    width: "100%",
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0 },
};

const AnimatedSectionHorizontal = ({ title, icon, children }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        backgroundColor: "#fff0f4",
        borderRadius: 3,
        boxShadow: 3,
        mt: 2,
        overflow: "hidden",
        width: 350,
      }}
    >
      <Box
        onClick={() => setExpanded(!expanded)}
        sx={{
          backgroundColor: "#FFD5E0",
          px: 3,
          py: 2,
          width: 300,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
          color="#4a148c"
          textAlign="center"
        >
          {icon}
          <br /> {title}
        </Typography>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0, scale: expanded ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <ExpandMoreIcon sx={{ color: "#4a148c" }} />
        </motion.div>
      </Box>

      <AnimatePresence>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CardContent>
              <motion.div
                variants={slideVariants}
                initial="hidden"
                animate="show"
              >
                {React.Children.map(children, (child, index) => (
                  <motion.div key={index} variants={itemVariants}>
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

const AircraftHeader = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { params } = useParams();
  const { data, loading } = useTableApi("aircraft_masters", {
    id: params.aircraft_master_id,
    related: ["aircraft_type"],
  });
  const { data: ecu_data, loading: ecu_loading } = useTableApi("ecu_masters", {
    query: { aircraft_master_id: params.aircraft_master_id },
  });

  if (!isAuthenticated || !user || loading || ecu_loading) return null;

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        flexWrap="wrap"
      >
        <AnimatedSectionHorizontal title="Aircraft Information">
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Basic Weight</Typography>
            <Typography fontWeight={500} color="text.primary">
              {data.basic_weight}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography color="text.secondary">Date of Acceptance</Typography>
            <Typography fontWeight={500} color="text.primary">
              {data.date_of_acceptance}
            </Typography>
          </Stack>
        </AnimatedSectionHorizontal>

        <AnimatedSectionHorizontal title="Next Inspection Due on">
          <Stack spacing={2}>
            {["01", "03", "06"].map((month, index) => (
              <Stack direction="row" justifyContent="space-between" key={index}>
                <Typography color="text.secondary">{month}Monthly</Typography>
                <Typography fontWeight={500} color="text.primary">
                  20 Aug 25
                </Typography>
              </Stack>
            ))}
          </Stack>
        </AnimatedSectionHorizontal>

        <AnimatedSectionHorizontal title="Engine Details">
          <Stack spacing={2}>
            {ecu_data.map((ecu, index) => (
              <Box key={index}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Serial No</Typography>
                  <Typography fontWeight={500} color="text.primary">
                    {ecu.serial_no}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">
                    Date of Fitment
                  </Typography>
                  <Typography fontWeight={500} color="text.primary">
                    {ecu.date_of_fitment}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Stack>
        </AnimatedSectionHorizontal>
      </Stack>
    </Box>
  );
};

export default AircraftHeader;

//--------------------------------------------------------------------- Commented by Aman POELA----------------------------------------------------------------------------------------------------------
//import React from 'react';
//import {Box,Card,CardContent,Typography,Toolbar,AppBar,Grid,Paper,Stack} from '@mui/material';
//import {useParams} from '../Utils/useParams';
//import useTableApi from '../Utils/useTableApi';
//import {useAuth} from '../Authentication/AuthContext';
//
//const AircraftHeader = () => {
//        const {user,isAuthenticated,logout} = useAuth();
//        const {params} = useParams();
//        const {data,loading} = useTableApi('aircraft_masters',{id:params.aircraft_master_id,related:['aircraft_type']});
//        const {data:ecu_data,loading:ecu_loading} = useTableApi('ecu_masters',{query:{aircraft_master_id:params.aircraft_master_id}});
//
//
//        if(!ecu_loading){console.log(ecu_data)};
//        if(!loading){console.log(data)};
//
//        return (
//
//          isAuthenticated && user && !loading && !ecu_loading && (
//                    <Box sx={{display:'flex',justifyContent:'center',mt:3,}}>
//                    <Card sx={{width:'100%',maxWidth:300,height:'100%',maxHeight:200,backgroundColor:'#fff0f4',
//                    boxShadow:3,borderRadius:3,px:3,py:2}}>
//                             <Box sx={{backgroundColor:'#FFD5E0',px:2,py:1.5,}}>
//                    <Typography variant="h6" fontWeight={600} sx={{ color :"FFD5E0",mb:2}}><u>
//                           Aircraft Information
//                            </u></Typography>
//                            </Box>
//                    <CardContent>
//                        <Stack spacing={2}>
//                            <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">Date of Acceptance</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                         {data?.date_of_acceptance}
//                                    </Typography>
//                            </Stack>
//
//                             <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">Basic Weight</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                         {data?.basic_weight}
//                                    </Typography>
//                            </Stack>
//                            </Stack>
//                         </CardContent>
//                         </Card>
//
//                          <Card sx={{width:'100%',maxWidth:300,height:'100%',maxHeight:250,backgroundColor:'#fff0f4',
//                          boxShadow:3,borderRadius:3,px:3,py:2,ml:'1%'}}>
//                                   <Box sx={{backgroundColor:'#FFD5E0',px:3,py:1.5,}}>
//                    <Typography variant="h6" fontWeight={600} sx={{ color :"FFD5E0",mb:2}}><u>
//                            Next Inspection Due on
//                            </u></Typography>
//                            </Box>
//                    <CardContent>
//                        <Stack spacing={2}>
//
//                            <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">01Monthly</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                         20 Aug 25
//                                    </Typography>
//                            </Stack>
//
//                             <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">03 Monthly</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                       20 Nov 25
//                                    </Typography>
//                            </Stack>
//
//                            <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">06 Montly</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                       20 Nov 25
//                                    </Typography>
//                            </Stack>
//                            </Stack>
//                         </CardContent>
//                         </Card>
//
//                          <Card sx={{width:'100%',maxWidth:300,height:'100%',maxHeight:300,backgroundColor:'#fff0f4',boxShadow:3,
//                          borderRadius:3,overflow:'hidden',px:3,py:2,ml:'1%'}}>
//                            <Box sx={{backgroundColor:'#FFD5E0',px:3,py:1.5,}}>
//                    <Typography variant="h6" fontWeight={600} sx={{ color :"FFD5E0",mb:2}}><u>
//                            Engine Details
//                            </u></Typography>
//                            </Box>
//                    <CardContent>
//
//                        <Stack spacing={2}>
//
//                            {ecu_data.map((ecu) =>
//                            <>
//                            <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">Serial No</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                    {ecu.serial_no}
//                                    </Typography>
//                            </Stack>
//
//                            <Stack direction ="row" justifyContent="space-between">
//                                <Typography color="text-secondary">Date of Fitment</Typography>
//                                    <Typography fontWeight={500} color="text.primary">
//                                    {ecu.date_of_fitment}
//                                    </Typography>
//                            </Stack>
//                            </>
//                             )}
//                            </Stack>
//
//                         </CardContent>
//                         </Card>
//                   </Box>
//                   )
//      );
//      };
//export default AircraftHeader;

//-------------------------------------------------------------------------------- Before 10 jul by Lt cdr mishra sir ---------------------------------------------------------------------------------------
//import React from 'react';
//import {Box,Typography,Toolbar,AppBar,Grid,Paper,Stack} from '@mui/material';
//
//const aircraftData = [
//    // {label:'Aircraft state',value:'S'},
//    // {label:'Aircraft Number',value:'IN 100'},
//    // {label:'Aircraft accepted on',value:'15 June 2024'},
//    // {label:'Engine Number',value:'55555'},
//    {label:'Airframe Number',value:'IN 224'},
//    {label:'Airframe Hours',value:'1000:25 hrs'},
//    {label:'Current Status',value:'BFS Completed'},
//    {label:'Next Inspection Due',value:'200Hourly'},
//]
//
//const colorPalette = [
//{bg:'#e8f5e9',text:'#2e7d32'},
//{bg:'#fff3e0',text:'#ef6c00'},
//{bg:'#f3e5f5',text:'#6a1b9a'},
//{bg:'#e1f5fe',text:'#0277bd'},
//{bg:'#fbe9e7',text:'#d84315'},
//{bg:'#f0f4c3',text:'#9e9d24'},
//{bg:'#fce4ec',text:'#c2185b'},
//];
//
//function AircraftHeader() {
// return (
//  <Box sx={{px:3,width:'100%',mt:2}}>
//    <Paper elevation ={4} sx={{width:'95%',maxWidth:'90%',minHeight:'10%',ml:'3%', mt:'6%',p:3,display:'grid',
//        gridTemplateColumns:'repeat(2,1fr)',gap:3,backgroundColor:'#e1f5fe',borderRadius:3,}}>
//        {aircraftData.map((item,index) => {const { bg,text } = colorPalette[index % colorPalette.length];
//        return(
//            <Paper key={index} elevation={2} sx={{p:2,borderRadius:2,bgcolor:bg,display:'flex',alignItems:'center',gap:1.5,}}>
//                <Typography variant="subtitle2" sx={{fontWeight:600,color:text,fontSize:'1rem'}}>
//                    {item.label}
//                </Typography>
//                <Typography variant="body1" sx={{fontWeight:500,color:text}}>{item.value}</Typography>
//            </Paper>
//        );
//        })}
//   </Paper>
//  </Box>
// );
//}
//
//export default AircraftHeader;
