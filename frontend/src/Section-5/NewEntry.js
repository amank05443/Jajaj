import React,{useState,useEffect} from 'react';
import {Typography,Box,Button,Grid,Container,Card,CardContent,TextField,FormGroup,FormControlLabel,Checkbox,
    Tooltip,MenuItem,Divider,Paper,IconButton,Snackbar,Alert} from "@mui/material";
import {
    AccessTime, Flight,Person,Build,Code,ReportProblem,Warning,HourglassEmpty,Home,Gavel,VpnKey,Search,Comment,
} from '@mui/icons-material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import CompletionDetails from "./CompletionDetails";
import useTableApi from '../Utils/useTableApi';
import {useNavigate} from 'react-router-dom';

const dropdownStyle = {
    backgroundColor: 'white',
    borderRadius:1,
};

const sectionHeader = (icon,text) => (
    <Typography variant="h6" sx={{display:'flex',alignItems:'center',color:'#0d47a1',fontWeight:600,mt:4,}}>
        {icon}
        <span style={{marginLeft:8}}>{text}</span>
    </Typography>
);

const NewEntry = () => {
    const [successSnackbar,setSuccessSnackbar] = useState(false);
    const navigate = useNavigate();
    const [showNext, setShowNext] = useState(false);
    const {data,loading,create} = useTableApi('dummy_log');
    const [formData, setFormData] = useState({
        time_date:'',af_hours:'',how_found:'',snow:'',reason_us:'',
        discovered_by:'',auth_code:'',classification:'',
    });

    const handleCheckboxChange = (value) => {
        setFormData((prev) => ({
            ...prev,
            classification:prev.classification === value ? "" : value
        }));
    };

    useEffect(() => {
        console.log(formData);
    },[formData]);

    const handleSubmit = async () => {
     try{
        const newData = {"created_at":formData.time_date ? new Date(formData.time_date).toISOString():null,
            "afHours":formData.af_hours,"snow":formData.snow,"howFound":formData.how_found,
            "reasonUS":formData.reason_us,"defectClass":formData.classification,"foundBy":formData.discovered_by,
        };
        await create(newData);
        setSuccessSnackbar(true);
        setTimeout(()=> {
            navigate(-1);
        },2500);
//        if(!loading){create(formData)};
//        setShowNext(true);
      } catch (error) {
       console.error('Error submitting form:',error);
        }
    };

    if (showNext) return<CompletionDetails show={true} />
    return (
        <>
            <Box sx={{height:"100vh",backgroundImage:'url("/background.jpg")',backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}>
                <Box sx={{p:1.5}}>
                    <Typography variant="h3" fontFamily="Roboto" align="center" gutterBottom fontWeight={600} color='#f50057' letterSpacing={4}
                    sx={{background:"linear-gradient(45deg,#FE6B8B,#FF8E53)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                        textShadow:"2px 2px 4px rgba(0,0,0,0.4)"}}
                    >
                        Details For Placing Unserviceable
                    </Typography>
                </Box>
                <Container maxWidth='100%' sx={{display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap",}}>
                    <Paper elevation={3} sx={{p:4,borderRadius:3,backgroundColor:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",
                        WebkitBackdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.3)",boxShadow:"0 8px 32px 0 rgba(31,38,135,0.37)",
                        width:"50%",mt:5}}
                    >
                        {sectionHeader(<AccessTime sx={{color: '#3f51b5'}}/>,'Basic Information')}
                        <Grid container spacing={3} sx={{border:"2.5px solid rgba(0,0,0,0.2)",borderRadius:2,p:2,}}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  fullWidth label="Time & Date" type="datetime-local" variant="outlined" value={formData.time_date} onChange={(e) =>
                                    setFormData({...formData,time_date:e.target.value})}
                                    InputProps={{step:60,startAdornment:<AccessTime sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  label="A/F HRS" type="number" variant="outlined" value={formData.af_hours} onChange={(e) =>
                                    setFormData({...formData,af_hours:e.target.value})} InputProps={{step:"0.01",startAdornment:<Flight sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  label="HOW FOUND" variant="outlined" value={formData.how_found} onChange={(e) =>
                                    setFormData({...formData,how_found:e.target.value})} InputProps={{startAdornment:<Search sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  label="SNOW" type="number" variant="outlined" value={formData.snow} onChange={(e) =>
                                    setFormData({...formData,snow:e.target.value})} InputProps={{startAdornment:<Build sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                        </Grid>
                        {sectionHeader(<ReportProblem sx={{color: '#ef6c00'}}/>,'Reason for Placing U/S')}
                        <Box sx={{border:"2.5px solid rgba(0,0,0,0.2)",borderRadius:2,p:2,}}>
                            <TextField fullWidth multiline minRows={4} variant="outlined" value={formData.reason_us} onChange={(e) =>
                                setFormData({...formData,reason_us:e.target.value})} label="Enter reason here..." InputProps={{startAdornment:<Comment sx={{color:'#3f51b5',mr:1}}/>}}
                            />
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{p:4,borderRadius:3,backgroundColor:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",
                        WebkitBackdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.3)",boxShadow:"0 8px 32px 0 rgba(31,38,135,0.37)",
                        width:"35%",mt:5,}}
                    >
                        {sectionHeader(<Warning sx={{color: '#e53935'}}/>,'Defect Classification')}
                        <Box sx={{border:"2.5px solid rgba(0,0,0,0.2)",borderRadius:2,p:2,mb:6,}}>
                            <FormGroup row sx={{gap:3,mt:2}}>
                                <FormControlLabel control={<Checkbox checked={formData.classification==='limitation'} onChange={() => handleCheckboxChange('limitation')}/>} label="Limitation" />
                                <FormControlLabel control={<Checkbox checked={formData.classification==='deferred'} onChange={() => handleCheckboxChange('deferred')}/>} label="Deferred Defect" />
                                <FormControlLabel control={<Checkbox checked={formData.classification==='husbandry'} onChange={() => handleCheckboxChange('husbandry')}/>} label="Husbandry" />
                                <FormControlLabel control={<Checkbox checked={formData.classification==='concession'} onChange={() => handleCheckboxChange('concession')}/>} label="Concession" />
                            </FormGroup>
                        </Box>
                        {sectionHeader(<Search sx={{color: '#000838f'}}/>,'Discovery & Authentication')}
                        <Box sx={{border:"2.5px solid rgba(0,0,0,0.2)",borderRadius:2,p:2,}}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6} >
                                    <TextField fullWidth label="By Whom" variant="outlined" value={formData.discovered_by} onChange={(e) => setFormData({...formData,discovered_by:e.target.value})}
                                        InputProps={{startAdornment:<Person sx={{color:'#3f51b5',mr:1}}/>}}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} >
                                <TextField fullWidth label="Authentication Code" variant="outlined"  value={formData.uth_code} onChange={(e) => setFormData({...formData,auth_code:e.target.value})}
                                     InputProps={{startAdornment:<VpnKey sx={{color:'#3f51b5',mr:1}}/>}}
                                />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Container>
                <Box sx={{textAlign:'end',mt:"10px",mb:"5px"}}>
                    <Button variant="contained" sx={{bgcolor:'#1e88e5',':hover': {bgcolor:'#1565c0'}, fontWeight: 'bold', px:5,borderRadius:"48%",}} onClick={handleSubmit}>
                        <ArrowForwardIcon />Next
                    </Button>
                </Box>
            </Box>
            <Snackbar open={successSnackbar} autoHideDuration={2000} onClose={()=>setSuccessSnackbar(false)}
                anchorOrigin={{vertical:'top',horizontal:'center'}}
            >
                <Alert onClose={()=>setSuccessSnackbar(false)} severity="success" sx={{width:'100%'}}>
                    Saved Successfully !
                </Alert>
            </Snackbar>
        </>
    );
};

export default NewEntry;