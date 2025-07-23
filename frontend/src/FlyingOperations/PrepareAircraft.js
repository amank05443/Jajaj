
import React, {useState} from "react";
import '../css/Prepare.css';
import { Link } from 'react-router-dom';
import { FaPlane, FaTools, FaClock, FaChartBar, FaCompare, FaEye } from 'react-icons/fa';
import { Radio,RadioGroup,Box,Tabs,Tab,Paper,Typography,useTheme,TextField,FormControlLabel,Checkbox,Grid,Container,FormGroup,FormControl,Button,Select,MenuItem,InputLabel} from '@mui/material';


 const trades = [
   {id: 1,job: 'AE',color: '#ffD5E0',password: '12345',tasks: ['Physical Check','Hyd.Pressure',],},
   {id: 2,job: 'AL',color: 'lightRed',password: '12345',tasks: ['Check', 'Battery voltage',], },
   {id: 3,job: 'AR',color: 'powderBlue',password: '12345',tasks: ['Check item','radar check', ],},
   {id: 4,job: 'AW',color: 'yellow',password: '12345',tasks: ['Physical Check status','Gun Check',],},
    ];
            const servicingOptions = ['BFS','TRS','ARDS'];
                const operationTypes = ['Routine Flying','NFT','CTF','MTF','GroundRun'];
                    const tradesmen = ['AE','AL','AR','AO'];
                        const fsi = ['SSS'];
                            const PrepareAircraft = () => {
                                const[selectedServicing,setSelectedServicing] = useState('');
                                    const [selectedId, setSelectedId] = useState('');
                                    const [password, setPassword] = useState('');
                                    const [showPasswordField, setShowPasswordField] = useState(false);
                                    const [error, setError] = useState('');
                                        const selectedTrade = trades.find(tde => tde.id === parseInt(selectedId));
                                            const [taskStatus, setTaskStatus] = useState({});
                                                const handleSelect = (e) => {
                                                    const id = e.target.value;
                                                    setSelectedId(id);
                                                    setPassword('');
                                                    setError('');
                                                    setShowPasswordField(false);
                                                    if (!taskStatus[id]) {
                                                const trade = trades.find(tde => tde.id === parseInt(id));
                                                setTaskStatus(prev => ({
                                                ...prev,
                                                [id]: trade.tasks.map(() => false),
                                            }));
                                        }
                                    };
                                const closeModal = () => {
                                 setSelectedId('');
                            };
                        const handleCheckboxChange  = (taskIndex) => {
                        setTaskStatus(prev => {
                    const updated = [...prev[selectedId]];
                    updated[taskIndex] = !updated[taskIndex];
                    return {
                    ...prev,
                    [selectedId]: updated,
                };
            });
    };

 return(
  <Container>

    <Box mt={2} sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'white',width:'100%',maxWidth:200,ml:45}}>
        <FormControl fullWidth >
            <InputLabel id="servicing-label" sx={{color:'#ffffff',fontWeight: 'bold'}}>Select Servicing </InputLabel>
                <Select
                    labelled="servicing-label"
                    id="servicing-select"
                    value={selectedServicing}
                    label="Select Servicing"
                    onChange={(e) =>
                    setSelectedServicing(e.target.value)}

                    >
                    {servicingOptions.map((option) => (
                        <MenuItem key={option} value={option}

                        >
                            {option}
                        </MenuItem>
                    ))}
                </Select>
         </FormControl>
    </Box>

  <Paper elevation={3} sx={{p:4,borderRadius:'20px',maxWidth:'1000px',mx:'auto',mt:4}}>

    <Box sx={{background:'linear-gradient(13deg,#ab47bc,#f06292)',color:'white',px:16,py:2,borderRadius:3,borderShadow:3,
        display:'inline-block',mt:2,ml:32}}>
        <Typography variant="h6" gutterBottom textAlign="center" fontWeight="bold">
            Prepare Aircraft
        </Typography>
    </Box>

    <Box mt={3}>
      <Typography fontWeight="bold">Type of Operation:</Typography>
        <RadioGroup row name="operationType">
            {operationTypes.map((type) => (
                <FormControlLabel key={type} value={type} control={<Radio color="primary"/>}
                     label={type} sx={{mr:8,mb:1}}/>
            ))}
        </RadioGroup>
    </Box>

            <div className="dropdown-box">
                <label htmlFor="trade-select" className="dropdown-label">Select Trade &nbsp;:&nbsp;&nbsp;</label>
                <select id="trade-select" value={selectedId} onChange={handleSelect} className="dropdown-select">
                    <option value="">-- Select a Trade --</option>
                    {trades.map(tde => (
                        <option key={tde.id} value={tde.id}>
                            {tde.job}
                        </option>
                    ))}
                </select>
            </div>

            {selectedTrade && (
                <div className="modal">
                    <div
                        className="model-content"
                        style={{ backgroundColor: selectedTrade.color }}
                    >
                        <p><strong>Trade &nbsp;: &nbsp;&nbsp;</strong> {selectedTrade.job}</p>
                        <table className="task-table">
                        <thead>
                        <tr>
                        <th>Task</th>
                        <th>Completed</th>
                        </tr>
                        </thead>
                        <tbody>
                        {selectedTrade.tasks.map((task, index) => (
                        <tr key={index}>
                        <td>{task}</td>
                        <td>
                        <input
                        type="checkBox"
                        checked={taskStatus[selectedId]?.[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                        />
                        </td>
                        </tr>
                        ))}
                        </tbody>
                        </table>
                        {showPasswordField && (
                        <div className="password-section">
                        <label htmlFor="password">Enter Password:</label>
                        <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) =>
                        setPassword(e.target.value)}
                        placeholder="Enter your password"
                        />
                        {error && <p className="error-message">{error}</p>}
                        </div>
                        )}
                        <button
                            onClick={() => {
                            if (!showPasswordField) {
                            setShowPasswordField(true);
                            } else if (password === selectedTrade.password) {
                            alert(`${selectedTrade.job} authenticated successfully`);
                            closeModal();
                            } else {
                            setError('Incorrect password. Please try again.');
                            }
                            }}
                        >
                            Authenticate
                            </button>
                            <br />
                            <button onClick={closeModal}>Close</button>
                        </div>
                    </div>
                )}

    <Box mt={4}>
        <Typography fontWeight="bold" mb={1}>Assign Tradesmen:</Typography>
            <Grid container spacing={2}>
                {tradesmen.map((trade) => (
                <React.Fragment key={trade}>
                    <Grid item xs={8} sm={1}>
                        <TextField fullwidth label="Trade" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <TextField fullwidth label="Name" variant="outlined" />
                    </Grid>

                    <Grid item xs={12} sm={5}>
                        <TextField fullWidth label="Auth Code" variant="outlined" />
                    </Grid>

                </React.Fragment>
                ))}
            </Grid>
    </Box>


        <Box mt={4}>
       <Typography fontWeight="bold" mb={1}>FSI:</Typography>
       <Grid container spacing={2}>
        {fsi.map((trade) => (
         <React.Fragment key={fsi}>
         <Grid item xs={8} sm={1}>
           <TextField fullwidth label="Trade" variant="outlined" />
            </Grid>
          <Grid item xs={12} sm={2}>
           <TextField fullwidth label="Name" variant="outlined" />
            </Grid>

             <Grid item xs={12} sm={5}>
              <TextField fullWidth label="Auth Code" variant="outlined" />
              </Grid>

              </React.Fragment>
        ))}
        </Grid>
        </Box>
        <Box mt={4} display="flex" justifyContent="flex-end">
         <Button variant="contained" color="primary" size="large" sx={{borderRadius:2,px:4}}>
         Next
         </Button>
         </Box>
         </Paper>
         </Container>

 );
};
 export default PrepareAircraft;





