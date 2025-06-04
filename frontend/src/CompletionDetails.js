
import React,{useState} from 'react';
import {
    Paper,Typography,Box,Card,CardContent,TextField,InputAdornment,MenuItem,Divider,Button,Grid
} from "@mui/material";
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
 import Header from './Header';
 import Footer from './Footer';
  import AircraftHeader from './AircraftHeader';

const trades = ['AE Tradesman','AL Tradesman','AR Tradesman','AO Tradesman'];
const supervisors = ['AE Supervisor','AL Supervisor','AR Supervisor','AO Supervisor'];

export default function ModifyE700(){
    const [rows,setRows] = useState([
        {trade:"",authCode:"",supervisor:"",supervisorCode:""}
    ]);

    const handleChange = (index,field,value)=>{
        const updated = [...rows];
        updated[index][field] = value;
        setRows(updated);
    };

    const handleAddRow = () => {
        setRows([...rows,{trade:"",authCode:"",supervisor:"",supervisorCode: ""}]);
    };
    return(
        <motion.div
            initial={{opacity:0,y:20}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.5}}
        >

                <AircraftHeader/>
            <Paper
                elevation={4}
                sx={{
                    p:2,mt:2,
                    mb:4,
                    borderRadius:4,
                    border:'4px solid #64b5f6',
                    background:'linear-gradient(to right,#e3f2fd,#bbdefb)',
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{
                        fontWeight:'900',
                        color:'#0d47a1',
                        letterSpacing:1,
                    }}
                >
                    Clear/Close Unserviceability Log
                </Typography>
            </Paper>

            <Box px={{xs:2,md:4}}>
                <Grid container spacing={3}>
                    {/* Left Form Section */}
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

                    {/* Right Remarks Section */}
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

                    {/* Save Button*/}
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
            </Box>
                <Footer/>
        </motion.div>

    );
}


//
//
//import React,{useState} from 'react';
//import {
//    Paper,Typography,Box,Card,CardContent,TextField,InputAdornment,MenuItem,Divider,Button,Grid,IconButton
//} from "@mui/material";
//import {
//    Comment as CommentIcon,
//    HourglassBottom as HourglassBottomIcon,
//    Work as WorkIcon,
//    VpnKey as KeyIcon,
//    SupervisorAccount as SupervisorAccountIcon,
//    Save as SaveIcon,
//    Add as AddIcon,RemoveCircleIcon
//} from '@mui/icons-material';
//import {motion} from 'framer-motion';
// import Header from './Header';
// import Footer from './Footer';
//  import AircraftHeader from './AircraftHeader';
//
//const trades = ['AE Tradesman','AL Tradesman','AR Tradesman','AO Tradesman'];
//const supervisors = ['AE Supervisor','AL Supervisor','AR Supervisor','AO Supervisor'];
//
//export default function CompletionDetails (){
//    const [tradeRows,setTradeRows] = useState([
//        {trade:"",nameRank:"",authCode:""}
//    ]);
//
//     const [supervisorRows,setSupervisorRows] = useState([
//        {supervisor:"",nameRank:"",authCode:""}
//    ]);
//
//    const handleTradeChange = (index,field,value) => {
//     const updated = [...tradeRows];
//     updated[index][field] = value;
//     setTradeRows(updated);
//        };
//
//    const handleSupervisorChange = (index,field,value) => {
//     const updated = [...supervisorRows];
//     updated[index][field] = value;
//     setSupervisorRows(updated);
//        };
//
//     const addTradeRow = () => {
//      setTradeRows([...tradeRows, {trade:"",nameRank:"",authCode:""}]);
//     }
//
//     const removeTradeRow = (index) => {
//      const updated = [...tradeRows];
//      updated.splice(index,1);
//      setTradeRows(updated);
//     }
//
//     const addSupervisorRow = () => {
//      setSupervisorRows([...supervisorRows, {supervisor:"",nameRank:"",authCode:""}]);
//     }
//
//     const removeSupervisorRow = (index) => {
//      const updated = [...supervisorRows];
//      updated.splice(index,1);
//      setSupervisorRows(updated);
//     }
//
//    return(
//        <motion.div
//            initial={{opacity:0,y:20}}
//            animate={{opacity:1,y:0}}
//            transition={{duration:0.5}}
//        >
//                <Header/>
//                <AircraftHeader/>
//            <Paper
//                elevation={4}
//                sx={{
//                    p:2,mt:2,
//                    mb:4,
//                    borderRadius:4,
//                    border:'4px solid #64b5f6',
//                    background:'linear-gradient(to right,#e3f2fd,#bbdefb)',
//                }}
//            >
//                <Typography
//                    variant="h4"
//                    align="center"
//                    gutterBottom
//                    sx={{
//                        fontWeight:'900',
//                        color:'#0d47a1',
//                        letterSpacing:1,
//                    }}
//                >
//                    Clear/Close Unserviceability Log
//                </Typography>
//            </Paper>
//
//            <Box px={{xs:2,md:4}}>
//                <Grid container spacing={3}>
//                    {/* Left Form Section */}
//                    <Grid item xs={12} md={6}>
//                        <Card
//                            sx={{
//                                borderLeft:'6px solid #4dd0e1',
//                                backgroundColor:'#e0f7fa',
//                                borderRadius: 4,
//                            }}
//                        >
//                            <CardContent>
//                                <Box display="flex" flexDirection="column">
//
//                                  <TextField
//                                        label="Man Hours"
//                                        variant="outlined"
//                                        fullWidth
//                                        InputProps={{
//                                            startAdornment: (
//                                                <InputAdornment position="start">
//                                                    <HourglassBottomIcon sx={{color:'#0097a7'}} />
//                                                </InputAdornment>
//                                            )
//                                            }}
//                                            sx={{my:2}}
//                                    />
//
//                                    <TextField
//                                    type="datetime-local"
//                                        label="Completion Time& Date"
//                                        variant="outlined"
//                                        fullWidth
//                                        InputLabelProps={{shrink:true}}
//                                        sx={{my:2}}/>
//
//                                     <Typography variant="subtitle1" color="#00796b" sx={{mt:2}}>Trade,Name,Rank,Auth Code</Typography>
//                                      {tradeRows.map((row,index) => (
//                                      <Box key={index} sx={{border:'1px solid #b2ebf2',borderRadius:2,p:2,mb:2}}>
//
//                                      <TextField
//                                        select label="Trade"
//                                        variant="outlined"
//                                        fullWidth
//                                        value={row.trade} onChange={(e) => handleTradeChange(index,"trade",e.target.value)}
//                                        InputProps={{startAdornment:(
//                                        <InputAdornment position="start">
//                                        <WorkIcon sx={{color:"#42a5f5"}}/>
//                                        </InputAdornment>
//                                        )}}
//                                        sx={{mb:2}}>
//                                        {trade.map((trade) => (
//                                          <MenuItem key={trade} value={trade}>{trade}</MenuItem>
//                                        ))}
//                                        </TextField>
//
//                                        <TextField label="Name and Rank" fullwidth variant="outlined" value={row.nameRank}
//                                         onChange={(e) => handleTradeChange(index,"nameRank",e.target.value)} sx ={{mb:2}}/>
//
//                                         <TextField label="Auth Code" fullwidth variant="outlined" value={row.authCode}
//                                         onChange={(e) => handleTradeChange(index,"authCode",e.target.value)}
//                                          InputProps={{startAdornment:(
//                                         <InputAdornment position="start">
//                                        <KeyIcon sx={{color:"#eF5350"}}/> </InputAdornment>
//                                      )}}
//                                      sx={{mb:2}}  />
//
//                                      {tradeRows.length > 1 && (
//                                      <Box textAlign="right">
//                                       <IconButton onClick={() =>
//                                       removeTradeRow(index)} color="error">
//                                       <RemoveCircleIcon />
//                                      </IconButton>
//                                      </Box>
//                                      )}
//                                      </Box>
//                                      ))}
//
//                                      <Button onClick={addTradeRow} startIcon={<AddIcon/>} variant="outlined" sx={{mb:2}}>
//                                       Add Trade Entry
//                                       </Button>
//
//                                       <Typography variant="subtitle1" color="#00796b" sx={{mt:2}}>Supervisor,Name,Rank,Auth Code</Typography>
//                                      {supervisorRows.map((row,index) => (
//                                      <Box key={index} sx={{border:'1px solid #b2ebf2',borderRadius:2,p:2,mb:2}}>
//
//                                        <TextField
//                                        select
//                                        label="Supervisor"
//                                        variant="outlined"
//                                        fullWidth
//                                        value={row.supervisor} onChange={(e) => handleSuperVisorChange(index,"supervisor",e.target.value)}
//                                        InputProps={{startAdornment:(
//                                        <InputAdornment position="start">
//                                        <SupervisorAccountIcon sx={{color:'#ab47bc'}}/>
//                                        </InputAdornment>
//                                        )}}
//                                        sx={{mb:2}}>
//                                        {supervisor.map((sup) => (
//                                          <MenuItem key={sup} value={sup}>{sup}</MenuItem>
//                                        ))}
//                                        </TextField>
//
//                                    {rows.map((row,index) => (
//                                        <Box key={index} display="flex" flexDirection="column">
//                                            <TextField
//                                                select
//                                                label="Trade"
//                                                fullWidth
//                                                variant="outlined"
//                                                value={row.trade}
//                                                onChange={(e) => handleChange(index,"trade",e.target.value)}
//                                                InputProps={{
//                                                    startAdornment:(
//                                                        <InputAdornment position="start">
//                                                            <WorkIcon sx={{color:'#42a5f5'}} />
//                                                        </InputAdornment>
//                                                    ),
//                                                }}
//                                                sx={{ mb :2 }}
//                                            >
//                                                {trades.map((trade)=>(
//                                                    <MenuItem key={trade} value={trade}>
//                                                        {trade}
//                                                    </MenuItem>
//                                                ))}
//                                            </TextField>
//
//                                            <TextField label="Name and Rank" fullwidth variant="outlined" value={row.nameRank}
//                                         onChange={(e) => handleTradeChange(index,"nameRank",e.target.value)} sx ={{mb:2}}/>
//
//
//                                         <TextField label="Auth Code" fullwidth variant="outlined" value={row.authCode}
//                                         onChange={(e) => handleTradeChange(index,"authCode",e.target.value)} onChange={(e) => handleTradeChange(index,"authCode",e.target.value)}
//                                          InputProps={{startAdornment:(
//                                         <InputAdornment position="start">
//                                        <KeyIcon sx={{color:"#EF5350"}}/> </InputAdornment>
//                                      )}}
//                                      sx={{mb:2}}  />
//
//                                      {supervisorRows.length > 1 && (
//                                      <Box textAlign="right">
//                                       <IconButton onClick={() =>
//                                       removeSupervisorRow(index)} color="error">
//                                       <RemoveCircleIcon />
//                                      </IconButton>
//                                      </Box>
//                                      )}
//                                      </Box>
//                                      ))}
//
//                                      <Button onClick={addSupervisorRow} startIcon={<AddIcon/>} variant="outlined" sx={{mb:2}}>
//                                      Add Supervisor Entry
//                                      </Button>
//
//                                      <TextField label="ATO/SSS Signature" fullWidth variant="outlined" inputProps={{startAdornment:(
//                                      <InputAdornment position="start">
//                                      <KeyIcon sx={{color:'#fbc02d'}}/>
//                                      </InputAdornment>
//                                      )}}
//                                      sx={{my:2}}/>
//                                      </Box>
////                                      </CardContent>
//                                      </Card>
//                                      </Grid>
//
//                    {/* Right Remarks Section */}
//                    <Grid item xs={12} md={6}>
//                        <Card
//                            sx={{
//                                borderLeft:'6px solid #ffb74d',
//                                backgroundColor:'#fff3e0',
//                                borderRadius:4,
//                                height:'50%',
//                                width:"150%",
//                                marginLeft:"150px"
//
//                            }}
//                        >
//                            <CardContent>
//                                <Typography variant="h6" gutterBottom color="#ef6c00">
//                                            Remarks:
//                                </Typography>
//
//                                <TextField
//                                    multiline
//                                    rows={12}
//                                    fullWidth
//                                    placeholder="Enter remarks here..."
//                                    variant="outlined"
//                                    InputProps={{
//                                        startAdornment: (
//                                            <InputAdornment position="start">
//                                                <CommentIcon sx={{color:'#ef6c00'}} />
//                                            </InputAdornment>
//                                        ),
//                                    }}
//                                />
//                                </Box>
//                            </CardContent>
//                        </Card>
//                    </Grid>
//
//                    {/* Save Button*/}
//                    <Grid item xs={12} >
//                        <Box textAlign="right" mt={4}>
//                            <Button
//                                variant="contained"
//                                startIcon={<SaveIcon />}
//                                sx={{
//                                    mt: 50,
//                                    px:6,
//                                    py:1.5,
//                                    fontWeight:'bold',
//                                    fontSize:'1rem',
//                                    borderRadius:2,
//                                    backgroundColor:'#4dd0e1',
//                                    color:'#000',
//                                    '&:hover':{backgroundColor:'#00acc1'}
//                                }}
//                            >
//                                Save
//                            </Button>
//                        </Box>
//                    </Grid>
//                </Grid>
//            </Box>
//            </Paper
//                <Footer/>
//        </motion.div>
//
//    );
//}