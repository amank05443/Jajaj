import React,{useState,useEffect} from 'react';
import {Typography,Box,Button,Grid,Container,Card,CardContent,TextField,FormGroup,FormControlLabel,Checkbox,Select,InputLabel,
    Tooltip,MenuItem,Divider,Paper,IconButton} from "@mui/material";
import {
    AccessTime, Flight,Person,Build,Code,ReportProblem,Warning,HourglassEmpty,Home,Gavel,VpnKey,Search,Comment,
} from '@mui/icons-material';
import {
    Comment as CommentIcon,
    HourglassBottom as HourglassBottomIcon,
    Work as WorkIcon,
    VpnKey as KeyIcon,
    SupervisorAccount as SupervisorAccountIcon,
    Save as SaveIcon,
    Add as AddIcon
} from '@mui/icons-material';
import {motion} from 'framer-motion';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import AircraftHeader from '../Layout/AircraftHeader';

const sectionHeader = (icon,text) => (
    <Typography variant="h6" sx={{display:'flex',alignItems:'center',color:'#0d47a1',fontWeight:600,mt:4,}}>
        {icon}
        <span style={{marginLeft:8}}>{text}</span>
    </Typography>
);
const trades = ['AE Tradesman','AL Tradesman','AR Tradesman','AO Tradesman'];
const supervisors = ['AE Supervisor','AL Supervisor','AR Supervisor','AO Supervisor'];


export default function CompletionDetails(){
    const [rows,setRows] = useState([
        {trade:"",authCode:"",supervisor:"",supervisorCode:""}
    ]);
    const [formData, setFormData] = useState({
        cleared_at:"",manHours:"",
    });

    const handleSelect = (event) =>{
        if(event.target.value=='true'){
            console.log(true)
        };
    };

    const handleChange = (index,field,value)=>{
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const handleAddRow = () => {
        setRows([...rows,{trade:"",authCode:"",supervisor:"",supervisorCode: ""}]);
    };
    return(
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.5}}>
            {/*<Paper elevation={4} sx={{p:2,mt:2,mb:4, borderRadius:4,
                    border:'4px solid #64b5f6',background:'linear-gradient(to right,#e3f2fd,#bbdefb)',}}
            >
                <Typography variant="h4" align="center" gutterBottom sx={{fontWeight:'900',
                    color:'#0d47a1',letterSpacing:1,}}
                >
                    Clear/Close Unserviceability Log
                </Typography>
            </Paper>*/}

            <Box sx={{height:"100vh",backgroundImage:'url("/background.jpg")',backgroundSize:"cover",backgroundRepeat:"no-repeat",backgroundPosition:"center"}}>
                <Box sx={{p:1.5}}>
                    <Typography variant="h3" fontFamily="Roboto" align="center" gutterBottom fontWeight={600} color='#f50057' letterSpacing={4}
                    sx={{background:"linear-gradient(45deg,#FE6B8B,#FF8E53)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",
                        textShadow:"2px 2px 4px rgba(0,255,0,0.4)"}}
                    >
                        Close U/S Log
                    </Typography>
                </Box>
                <Container maxWidth='100%' sx={{display:"flex",gap:3,justifyContent:"center",flexWrap:"wrap",}}>
                    <Paper elevation={3} sx={{p:4,borderRadius:3,backgroundColor:"rgba(255,255,255,0.1)",backdropFilter:"blur(10px)",
                        WebkitBackdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.3)",boxShadow:"0 8px 32px 0 rgba(31,38,135,0.37)",
                        width:"50%",mt:5}}
                    >
                        <Grid container spacing={3} sx={{border:"2.5px solid rgba(0,0,0,0.2)",borderRadius:2,p:2,}}>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  fullWidth label="Completion Time & Date" type="datetime-local" variant="outlined" value={formData.cleared_at} onChange={(e) =>
                                    setFormData({...formData,cleared_at:e.target.value})}
                                    InputProps={{step:60,startAdornment:<AccessTime sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  label="Man Hours" type="number" variant="outlined" value={formData.af_hours} onChange={(e) =>
                                    setFormData({...formData,af_hours:e.target.value})} InputProps={{startAdornment:<Person sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <TextField  label="Job Card No." type="text" variant="outlined" value={formData.af_hours} onChange={(e) =>
                                    setFormData({...formData,af_hours:e.target.value})} InputProps={{startAdornment:<Person sx={{color:"#3f51b5",mr:1}}/>}}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <InputLabel id="componentChange-label">Any Component Replaced ?</InputLabel>
                                <Select fullWidth labelId="componentChange-label" id="componentChange-select" value="componentChange-select" label="Any Component Changed ?" onChange={handleSelect}>
                                    <MenuItem value=''><em>None</em></MenuItem>
                                    <MenuItem value='true'>YES</MenuItem>
                                    <MenuItem value='false'>NO</MenuItem>
                                </Select>
                            </Grid>

                        </Grid>
                    </Paper>

                </Container>



            {/*<Box px={{xs:2,md:4}}>
                <Grid container spacing={3}>
                    {/* Left Form Section
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderLeft:'6px solid #4dd0e1',
                                backgroundColor:'#e0f7fa',
                                borderRadius: 4,
                                width:"130%"
                            }}
                        >
                            <CardContent>
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="subtitle1" color="#00796b" sx={{mb:1}}>
                                        Man Hours
                                    </Typography>
                                    <TextField
                                        label="Man Hours"
                                        variant="outlined"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <HourglassBottomIcon sx={{color:'#0097a7'}} />
                                                </InputAdornment>
                                            ),
                                            }}
                                            sx={{my:2}}
                                    />

                                    {rows.map((row,index) => (
                                        <Box key={index} display="flex" flexDirection="column">
                                            <TextField
                                                select
                                                label="Trade"
                                                fullWidth
                                                variant="outlined"
                                                value={row.trade}
                                                onChange={(e) => handleChange(index,"trade",e.target.value)}
                                                InputProps={{
                                                    startAdornment:(
                                                        <InputAdornment position="start">
                                                            <WorkIcon sx={{color:'#42a5f5'}} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ my :2 }}
                                            >
                                                {trades.map((trade)=>(
                                                    <MenuItem key={trade} value={trade}>
                                                        {trade}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                label={`${row.trade || 'Trade'} Auth Code`}
                                                fullWidth
                                                variant="outlined"
                                                value={row.authCode}
                                                onChange={(e) => handleChange(index,"authcode",e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <KeyIcon sx={{color:'#ef5350'}} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ my: 2 }}
                                            />
                                            <TextField
                                                select
                                                label="Supervisor"
                                                fullWidth
                                                variant="outlined"
                                                value={row.supervisor}
                                                onChange={(e) => handleChange(index,"supervisor",e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <SupervisorAccountIcon sx={{color:'#ab47bc'}} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ my: 2 }}
                                            >
                                                {supervisors.map((sup)=>(
                                                    <MenuItem key={sup} value={sup}>
                                                        {sup}
                                                    </MenuItem>
                                                ))}
                                            </TextField>

                                            <TextField
                                                label={`${row.supervisor || 'Supervisor'} Auth Code`}
                                                fullWidth
                                                variant="outlined"
                                                value={row.supervisorCode}
                                                onChange={(e) => handleChange(index,"supervisorCode",e.target.value)}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <KeyIcon sx={{color:'#ef5350'}} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ my: 2 }}
                                            />
                                            <Divider sx={{my:1}} />
                                        </Box>
                                    ))}

                                    <Box textAlign="left" my={2}>
                                        <Button
                                            variant="outlined"
                                            startIcon={<AddIcon />}
                                            onClick={handleAddRow}
                                            sx={{
                                                borderColor: '#26c6da',
                                                color: '#0097a7',
                                                '&:hover':{
                                                backgroundColor: '#b2ebf2',
                                                borderColor: '#00acc1',
                                                }
                                            }}
                                        >
                                            Add Row
                                        </Button>

                                        <Typography variant="subtitle1" color="#00796b" sx={{ mt:2 }}>
                                            Final Auth Code:
                                        </Typography>

                                        <TextField
                                            placeholder="Main Signature"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <KeyIcon sx={{color:'#fbc02d'}} />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                sx={{ my: 2 }}
                                        />
                                        <Divider sx={{ my:2,bgcolor:'b2ebf2'}} />

                                        <Typography variant="caption" color="#616161">
                                            *Main signature is required for transferring to a different MOD (Supervisor)
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right Remarks Section
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                borderLeft:'6px solid #ffb74d',
                                backgroundColor:'#fff3e0',
                                borderRadius:4,
                                height:'50%',
                                width:"150%",
                                marginLeft:"150px"

                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom color="#ef6c00">
                                    Remarks:
                                </Typography>

                                <TextField
                                    multiline
                                    rows={12}
                                    fullWidth
                                    placeholder="Enter remarks here..."
                                    variant="outlined"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CommentIcon sx={{color:'#ef6c00'}} />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Save Button
                    <Grid item xs={12} md={6} mdOffset={6}>
                        <Box textAlign="right">
                            <Button
                                variant="contained"
                                startIcon={<SaveIcon />}
                                sx={{
                                    mt: 50,
                                    px:6,
                                    py:1.5,
                                    fontWeight:'bold',
                                    fontSize:'1rem',
                                    borderRadius:2,
                                    backgroundColor:'#4dd0e1',
                                    color:'#000',
                                    '&:hover':{backgroundColor:'#00acc1'}
                                }}
                            >
                                Save
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box> */}
            </Box>
        </motion.div>

    );
}