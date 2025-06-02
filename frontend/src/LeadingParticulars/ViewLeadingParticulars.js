import React, {useState} from 'react';
import Header from '../Header';
import Sidebar from '../Sidebar';
import {Grid, TextField, Typography, Paper,Box,Link} from '@mui/material';
//import DescriptionIcon from "@mui/icons-material/Description";

export default function ViewLeadingParticulars() {
 const [sidebarOpen, setSidebarOpen] = useState(true);
 const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

// const handleChange = (e) => {
// const { name, value } = e.target;
// setData((prev) => ({
//    ...prev,
//    [name]: value
//    }));
//  };

 return (
    <div >
        <Header/>
        <div style={{background: 'linear-gradient(to right,#87CEEB, #FFE6CC )', height: '100vh'}}>
            <div className="p-6" style={{display: 'flex', justifyContent: 'center'}}>
                <h2 className="font-bold mb-6">Leading Particulars</h2>
            </div>
            <Box sx= {{p: 2}}>
                <Grid container spacing={2}>
                    <Grid item md={12}>
                        <Paper elevation= {3}>item11</Paper>
                    </Grid>

                </Grid>
                <Grid container spacing={2} sx={{mt: 2}}>
                    <Grid item md={4}>
                        <Paper elevation= {3}>item11</Paper>
                    </Grid>
                    <Grid item md={4}>
                        <Paper elevation= {3}>item11</Paper>
                    </Grid>
                    <Grid item md={4}>
                        <Paper elevation= {3}>item11</Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    </div>
 );
};
// export default ViewLeadingParticulars;