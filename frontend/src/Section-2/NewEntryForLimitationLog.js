import React,{useState,useEffect} from 'react';
import {Paper,Box,TextField,Typography,Select,Button,Grid,Container,Card,CardContent,FormControlLabel} from "@mui/material";

const NewEntryForLimitationLog = () => {



    return (
        <div style={{padding:20}}>
            <Paper elevation={4} sx={{p:2,mt:2,mb:4,borderRadius:4,border:'4px solid #64b5f6',background:'linear-gradient(to right,#e3f2fd,#bbdefb)',}}>
                <Typography variant="h4" align="center" gutterBottom sx={{fontWeight:'900',color:'#0d47a1',letterSpacing:3,}}>
                    New Entry For Limitation Log
                </Typography>
            </Paper>
        </div>
    );

};
export default NewEntryForLimitationLog;