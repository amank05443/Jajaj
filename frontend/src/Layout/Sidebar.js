import React, {useRef, useState, useEffect} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Divider, Collapse } from '@mui/material';
import {SportsSoccer, ChevronLeft, ChevronRightRounded, Edit, ExpandLess, ExpandMore, SafetyCheck, AddAlarm,ViewListTwoTone,CalendarTodayTwoTone,CompassCalibrationTwoTone ,AlarmOn,
    DisabledByDefault, Discount, HomeWork, Timer3Select, BalanceTwoTone,LineWeightTwoTone, MonitorWeightTwoTone, Outbound, AvTimerSharp, CalendarMonthTwoTone} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
const  drawerWidth= 200;


export default function Sidebar() {
    const [open, setOpen]= useState(false);
    const navigate=useNavigate();
    const [isLimitationOpen,setIsLimitationOpen] = useState(false);
    const [isForecastOpen,setIsForecastOpen] = useState(false);
    const [isWeightBalanceData,setIsWeightBalanceData] = useState(false);
    const sidebarRef = useRef(null);

    const openDrawer =()=> setOpen(true);
    const closeDrawer =()=> setOpen(false);
    const toggleDrawer=()=>{
        setOpen((prev) => !prev);
    };
    const handleNavigation = (path) =>{
        navigate(path);
    };
    const handleLDHC=()=>{
        setIsLimitationOpen(!isLimitationOpen);
        setIsForecastOpen(false);
        setIsWeightBalanceData(false);
    }
    const handleForecast=()=>{
        setIsLimitationOpen(false);
        setIsForecastOpen(!isForecastOpen);
        setIsWeightBalanceData(false);
    }
    const handleWeightBalanceData=()=>{
        setIsLimitationOpen(false);
        setIsForecastOpen(false);
        setIsWeightBalanceData(!isWeightBalanceData);
    }

    useEffect(()=> {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)){
                if (open){
                    closeDrawer();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown',handleClickOutside);
        };
    },[open]);

    return(
        <Drawer
            variant={"permanent"}
            ref={sidebarRef}
            sx={{width:open ? drawerWidth: 60, flexShrink:0,
            '& .MuiDrawer-paper': {
                position:'relative', height:'100%',
                width: open? drawerWidth:60,  overflow:'hidden', transition: 'width 0.3s ease',
                // background:'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))',
                // WebkitBackdropFilter: 'blur(20px)',
                background:'linear-gradient(120deg, #0f2027 0%, #2c5364 50%, #00ffe7 120%)',
                backdropFilter:'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                color: '#ffffff',
            },
            }} onClick={()=>{
                if (!open){
                    openDrawer();
                }
            }} >
            <div style={{display:'flex', justifyContent: open ? 'flex-end': 'center', padding: 8}}>
                <IconButton onClick={toggleDrawer} style={{color: '#fff'}}>
                    {open ? <ChevronLeft/> : <ChevronRightRounded/>}
                </IconButton>
            </div>
            <Divider sx={{borderColor: '#333'}}/>
            <List>
                <Tooltip title={!open ? 'Modify E700': ''} placement={'right'}>
                    <ListItem button onClick={()=>handleNavigation('/modify')}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><Edit/></ListItemIcon>
                        {open && <ListItemText primary="Modify E700"/>}
                    </ListItem>
                </Tooltip>

                <Tooltip title={!open ? 'Leading Particulars': ''} placement={'right'}>
                    <ListItem button onClick={()=>handleNavigation('./ViewLeadingParticulars')}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><ViewListTwoTone/></ListItemIcon>
                        {open && <ListItemText primary="Leading Particulars"/>}
                    </ListItem>
                </Tooltip>

                <Tooltip title={!open ? 'LDHC': ''} placement={'right'}>
                    <ListItem button onClick={handleLDHC}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><AddAlarm/></ListItemIcon>
                        {open && <ListItemText primary="LDHC"/>}
                        {open && (isLimitationOpen ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isLimitationOpen && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><DisabledByDefault/></ListItemIcon>
                            <ListItemText primary={'Limitations'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><AlarmOn/></ListItemIcon>
                            <ListItemText primary={'Deferred Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><HomeWork/></ListItemIcon>
                            <ListItemText primary={'Husbandry Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><Discount/></ListItemIcon>
                            <ListItemText primary={'Concessions'}/>
                        </ListItem>
                    </List>
                </Collapse>

                <Tooltip title={!open ? 'Forecast': ''} placement={'right'}>
                    <ListItem button onClick={handleForecast}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><CalendarTodayTwoTone/></ListItemIcon>
                        {open && <ListItemText primary="Forecast"/>}
                        {open && (isForecastOpen ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isForecastOpen && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><AvTimerSharp/></ListItemIcon>
                            <ListItemText primary={'Hourly'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><CalendarMonthTwoTone/></ListItemIcon>
                            <ListItemText primary={'Calendar'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><Outbound/></ListItemIcon>
                            <ListItemText primary={'Out of Phase'}/>
                        </ListItem>
                    </List>
                </Collapse>

                <Tooltip title={!open ? 'Weight & Balance Data': ''} placement={'right'}>
                    <ListItem button onClick={handleWeightBalanceData}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><BalanceTwoTone/></ListItemIcon>
                        {open && <ListItemText primary="Weight & Balance Data"/>}
                        {open && (isWeightBalanceData ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isWeightBalanceData && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><LineWeightTwoTone/></ListItemIcon>
                            <ListItemText primary={'Basic Weight and Moments'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/WeightAndBalanceData/VariableExpandableLoadItemsForm')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><MonitorWeightTwoTone/></ListItemIcon>
                            <ListItemText primary={'Variable / Expendable Load Items'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('./ViewCurrentOperatingData')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Current Operating Data(WEIGHT AND BALANCE DATA)'}/>
                        </ListItem>
                    </List>
                </Collapse>
                <Tooltip title={!open ? 'Modify E700': ''} placement={'right'}>
                    <ListItem button onClick={()=>handleNavigation('./Sidebar_Components/CompassDataTab')}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><CompassCalibrationTwoTone/></ListItemIcon>
                        {open && <ListItemText primary="Compass Log"/>}
                    </ListItem>
                </Tooltip>
            </List>
        </Drawer>
    );
}