
import React from 'react';
import {Box,Typography,Toolbar,AppBar,Grid,Paper,Stack} from '@mui/material';

const aircraftData = [
{label:'Aircraft state',value:'S'},
{label:'Aircraft Number',value:'IN 100'},
{label:'Aircraft accepted on',value:'15 June 2024'},
{label:'Next Major Inspection Due',value:'200Hourly'},
{label:'Airframe Number',value:'55555'},
{label:'Engine Number',value:'55555'},
{label:'Airframe Hours',value:'100 hrs'},
]

const colorPalette = [
{bg:'#e8f5e9',text:'#2e7d32'},
{bg:'#fff3e0',text:'#ef6c00'},
{bg:'#f3e5f5',text:'#6a1b9a'},
{bg:'#e1f5fe',text:'#0277bd'},
{bg:'#fbe9e7',text:'#d84315'},
{bg:'#f0f4c3',text:'#9e9d24'},
{bg:'#fce4ec',text:'#c2185b'},
];

function AircraftHeader() {
 return (
  <Box sx={{px:3,width:'100%',mt:2}}>
    <Paper elevation ={4} sx={{width:'95%',maxWidth:'1000px',minHeight:'250px',margin:'0 auto',ml:'5%',p:3,display:'grid',
        gridTemplateColumns:'repeat(3,1fr)',gap:2,backgroundColor:'#e1f5fe',borderRadius:3,}}>
        {aircraftData.map((item,index) => {const { bg,text } = colorPalette[index % colorPalette.length];
        return(
            <Paper key={index} elevation={2} sx={{p:2,borderRadius:2,bgcolor:bg,display:'flex',alignItems:'center',gap:1.5,}}>
                <Typography variant="subtitle2" sx={{fontWeight:600,color:text,fontSize:'1rem'}}>
                    {item.label}
                </Typography>
                <Typography variant="body1" sx={{fontWeight:500,color:text}}>{item.value}</Typography>
            </Paper>
        );
        })}
   </Paper>
  </Box>
 );
}

export default AircraftHeader;