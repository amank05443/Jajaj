import React,{useState} from 'react';
import {Typography,Box,Button,Grid,Container,Card,CardContent,TextField,FormGroup,FormControlLabel,Checkbox,Tooltip,MenuItem,Divider,Paper} from "@mui/material";
import {
    AccessTime, Flight,Person,Build,Code,ReportProblem,Warning,HourglassEmpty,Home,Gavel,VpnKey,Search
} from '@mui/icons-material';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import CompletionDetails from "./CompletionDetails";


const dropdownStyle = {
    backgroundColor: 'white',
    borderRadius:1,
};

const sectionHeader = (icon,text) => (
    <Typography variant="h6" sx={{display:'flex',alignItems:'center',color:'#0d47a1',fontWeight:600,mt:4,mb:2,}}>
        {icon}
        <span style={{marginLeft:8}}>{text}</span>
    </Typography>
);

const NewEntry = () => {
    const [showNext, setShowNext] = useState(false);
    const [formData, setFormData] = useState({
        time_date:'',
        af_hours:'',
        how_found:'',
        snow:'',
        defect_code:'',
        reason_us:'',

        limitation: false,
        deferred_defect:false,
        husbandry: false,
        concession: false,
        discovered_by:'',
        auth_code:'',
          classification:[],
            });

    const handleCheckboxChange = (field) => {
     setFormData({
      ...formData,
      classification:{
       ...formData.classification,[field]:!formData.classification[field]
      }
     });
    };

    const handleSubmit = async () => {
     try{
      const response = await
      fetch('http://localhost:8000/api/uns/',{
       method:'POST',
       headers:{
        'Content-Type':'application/json',
       },
       body:JSON.stringify(formData)
      });

      if (!response.ok) {
      const errorData=await response.json();
       console.error('Error:',errorData);
       alert('Submission failed:' + JSON.stringify(errorData))
       setShowNext(true);
      }else{
       const errorData = await response.json();
       console.error('Error saving data:',errorData);
      }
      } catch (error) {
       console.error('Network error:',error);
     }
     };

if (showNext) return<CompletionDetails show={true} />
    return (
        <>

            <Box sx={{background:'linear-gradient(to right,#bbdefb,#e3f2fd)',py:5,}}>
            <Container maxWidth='95%' style={{minHeight:'100vh'}}>

                <Box sx={{p:2,mt:2, mb:4, borderRadius:4, border:'4px solid #64b5f6', background:'linear-gradient(to right,#e3f2fd,#bbdefb)',}}>
                    <Typography variant="h4" align="center" gutterBottom fontWeight={600} color='#8d47a1' letterSpacing={3}>Unserviceability Log</Typography>
                </Box>
                <div style={{marginLeft:'3%'}}>
                   {sectionHeader(<AccessTime sx={{color: '#3f51b5'}}/>,'Basic Information')}
                <Grid container spacing={3}>
                 <Grid item xs={12} sm={6} md={4}>
                         <TextField fullWidth label="Time& Date" variant="outlined" value={formData.time_date} onChange={(e) =>
                         setFormData({...formData,time_date:e.target.value})}
                         InputProps={{startAdornment:<AccessTime sx={{color:"#3f51b5",mr:1}}/>}}/>
                 </Grid>
                 <Grid item xs={12} sm={6} md={4}>
                         <TextField fullWidth label="A/F HRS" variant="outlined" value={formData.af_hours} onChange={(e) =>
                         setFormData({...formData,af_hours:e.target.value})}
                         InputProps={{startAdornment:<Flight sx={{color:"#3f51b5",mr:1}}/>}}/>
                 </Grid>
                 <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth label="HOW FOUND" variant="outlined" value={formData.how_found} onChange={(e) =>
                         setFormData({...formData,how_found:e.target.value})}
                         InputProps={{startAdornment:<Person sx={{color:"#3f51b5",mr:1}}/>}}/>
                 </Grid>
                 <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth label="SNOW" variant="outlined" value={formData.snow} onChange={(e) =>
                         setFormData({...formData,snow:e.target.value})}
                         InputProps={{startAdornment:<Build sx={{color:"#3f51b5",mr:1}}/>}}/>
                 </Grid>
                 <Grid item xs={12} sm={6} md={4}>
                        <TextField fullWidth label="Defect COde" variant="outlined" value={formData.defect_code} onChange={(e) =>
                         setFormData({...formData,defect_code:e.target.value})}
                         InputProps={{startAdornment:<Code sx={{color:"#3f51b5",mr:1}}/>}}>
                             <MenuItem value="D001">D001-Hydraulic</MenuItem>
                             <MenuItem value="D002">D002-Electrical</MenuItem>
                             <MenuItem value="D003">D003-Avionics</MenuItem>
                         </TextField>
                 </Grid>
                 </Grid>

                        {sectionHeader(<ReportProblem sx={{color: '#ef6c00'}}/>,'Reason for Placing U/S')}

                    <TextField fullWidth multiline rows={4} variant="outlined" value={formData.reason_us} onChange={(e) =>
                         setFormData({...formData,reason_us:e.target.value})}
                         placeholder="Enter reason here..."/>

                     {sectionHeader(<Warning sx={{color: '#e53935'}}/>,'Defect Classification')}
                <FormGroup row sx={{gap:3,mt:2}}>
                    <FormControlLabel control={<Checkbox checked={formData.classification.limitation}
                     onChange={() => handleCheckboxChange('limitation')}/>} label="Limitation" />

                    <FormControlLabel control={<Checkbox checked={formData.classification.deferred}
                     onChange={() => handleCheckboxChange('deferred')}/>} label="Deferred Defect" />

                    <FormControlLabel control={<Checkbox checked={formData.classification.husbandry}
                     onChange={() => handleCheckboxChange('husbandry')}/>} label="Husbandry" />

                    <FormControlLabel control={<Checkbox checked={formData.classification.concession}
                     onChange={() => handleCheckboxChange('concession')}/>} label="Concession" />


                </FormGroup>

                        {sectionHeader(<Search sx={{color: '#000838f'}}/>,'Discovery & Authentication')}
                        <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} >
                         <TextField fullWidth label="By Whom" variant="outlined" value={formData.discovered_by}
                         onChange={(e) => setFormData({...formData,discovered_by:e.target.value})}
                         InputProps={{startAdornment:<Search sx={{color:'#3f51b5',mr:1}}/>}}>
                             <MenuItem value="Routine">Routine Inspection</MenuItem>
                             <MenuItem value="Pilot Report">Pilot Report</MenuItem>
                             <MenuItem value="Fault Warning">Fault Warning System</MenuItem>
                         </TextField>
                    </Grid>
                          <Grid item xs={12} sm={6} >
                           <TextField fullWidth label="Authentication Code" variant="outlined"  value={formData.uth_code}
                           onChange={(e) => setFormData({...formData,auth_code:e.target.value})}
                           InputProps={{startAdornment:<VpnKey sx={{color:'#3f51b5',mr:1}}/>}}/>
                          </Grid>
                        </Grid>

                        <Divider sx={{my:4}} />
                        <Box sx={{textAlign:'center'}}>
                            <Button variant="contained" size="large" sx={{bgcolor:'#1e88e5',':hover': {bgcolor:'#1565c0'}, fontWeight: 'bold', px:1.5}}
                            onClick={handleSubmit}>
                                Next
                            </Button>
                        </Box>
                    </div>

            </Container>
            </Box>
            </>
    );
};

export default NewEntry;

