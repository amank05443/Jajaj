import React, {useRef, useState, useEffect} from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Divider, Collapse } from '@mui/material';
import {SportsSoccer, ChevronLeft, ChevronRightRounded, Edit, ExpandLess, ExpandMore, SafetyCheck,} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import './css/Sidebar.css';
const  drawerWidth= 200;


export default function Sidebar() {
    const [open, setOpen]= useState(true);
    const sidebarRef = useRef(null);
    const navigate=useNavigate();
    const [isLimitationOpen,setIsLimitationOpen] = useState(false);
    const [isForecastOpen,setIsForecastOpen] = useState(false);
    const [isWeightBalanceData,setIsWeightBalanceData] = useState(false);

    const handleMouseEnter =()=> setOpen(true);
    const handleMouseLeave =()=> setOpen(false);
    const toggleDrawer=()=>{
        setOpen((prev) => !prev);
    };
    useEffect(()=> {
        const handledocumentMouseMove = (e) => {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)){
                setOpen(false);
                setIsLimitationOpen(false);
                setIsForecastOpen(false);
                setIsWeightBalanceData(false);
            }
        };
        document.addEventListener('mousemove', handledocumentMouseMove);
        return () => {
            document.removeEventListener('mousemove',handledocumentMouseMove);
        };
    },[]);
    const handleNavigation = (path) =>{
        navigate(path);
    };
    return(
        <Drawer
            variant={"permanent"}
            ref={sidebarRef}
            className={'sidebar1'}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{width:open ? drawerWidth: 60, flexShrink:0,
            '& .MuiDrawer-paper': {
                width: open? drawerWidth:60,  overflowX:'hidden', transition: 'transform 0.3s ease',marginTop: 'auto' ,
                background:'linear-gradient(120deg, #0f2027 0%, #2c5364 50%, #00ffe7 100%)',
                backdropFilter:'blur(20px)',
                boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                color: '#ffffff',
            },
        }}>
            <div style={{display:'flex', justifyContent: open ? 'flex-end': 'center', padding: 8}}>
                <IconButton onClick={toggleDrawer} style={{color: '#fff'}}>
                    {open ? <ChevronLeft/> : <ChevronRightRounded/>}
                </IconButton>
            </div>
            {/*<Divider sx={{borderColor: '#333'}}/>*/}
            <List>
                <Tooltip title={!open ? 'Modify E700': ''} placement={'right'}>
                    <ListItem button onClick={()=>handleNavigation('/modify')}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><Edit/></ListItemIcon>
                        {open && <ListItemText primary="Modify E700"/>}
                    </ListItem>
                </Tooltip>

                <Tooltip title={!open ? 'Leading Particulars': ''} placement={'right'}>
                    <ListItem button onClick={()=>handleNavigation('./ViewLeadingParticulars')}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><SportsSoccer/></ListItemIcon>
                        {open && <ListItemText primary="Leading Particulars"/>}
                    </ListItem>
                </Tooltip>

                <Tooltip title={!open ? 'LDHC': ''} placement={'right'}>
                    <ListItem button onClick={()=>setIsLimitationOpen(!isLimitationOpen)}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><SportsSoccer/></ListItemIcon>
                        {open && <ListItemText primary="LDHC"/>}
                        {open && (isLimitationOpen ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isLimitationOpen && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Limitations'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Deferred Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Husbandry Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Concessions'}/>
                        </ListItem>
                    </List>
                </Collapse>

                <Tooltip title={!open ? 'Forecast': ''} placement={'right'}>
                    <ListItem button onClick={()=>setIsForecastOpen(!isForecastOpen)}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><SportsSoccer/></ListItemIcon>
                        {open && <ListItemText primary="Forecast"/>}
                        {open && (isForecastOpen ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isForecastOpen && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Limitations'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Deferred Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Husbandry Defects'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Concessions'}/>
                        </ListItem>
                    </List>
                </Collapse>

                <Tooltip title={!open ? 'Weight & Balance Data': ''} placement={'right'}>
                    <ListItem button onClick={()=>setIsWeightBalanceData(!isWeightBalanceData)}>
                        <ListItemIcon sx={{color: '#fff', minWidth: 40}}><SportsSoccer/></ListItemIcon>
                        {open && <ListItemText primary="Weight & Balance Data"/>}
                        {open && (isWeightBalanceData ? <ExpandLess/>: <ExpandMore/>)}
                    </ListItem>
                </Tooltip>
                <Collapse in={isWeightBalanceData && open} timeout={'auto'} unmountOnExit>
                    <List component={'div'} disablePadding>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Basic Weight and Moments'}/>
                        </ListItem>
                        <ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>
                            <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>
                            <ListItemText primary={'Variable / Expendable Load Items'}/>
                        </ListItem>
                        {/*<ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>*/}
                        {/*    <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>*/}
                        {/*    <ListItemText primary={'Husbandry Defects'}/>*/}
                        {/*</ListItem>*/}
                        {/*<ListItem button={{pl:4}} onClick={()=> handleNavigation('/')}>*/}
                        {/*    <ListItemIcon sx={{color: '#fff', minWidth: 40, marginLeft: '10px'}}><SafetyCheck/></ListItemIcon>*/}
                        {/*    <ListItemText primary={'Concessions'}/>*/}
                        {/*</ListItem>*/}
                    </List>
                </Collapse>
            </List>
        </Drawer>
    );
}