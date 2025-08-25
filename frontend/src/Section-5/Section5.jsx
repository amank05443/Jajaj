import React,{useState,useEffect} from 'react';
import axios from 'axios';
import{Box,FormControl,InputLabel,MenuItem,Select,Typography,Paper} from "#mui/material";
import {motion,AnimatePresence} from "framer-motion";

const Section5 {() => = (
    const [mainOption,setMainOption] = useState('');
    const [subOption,setSubOption] = useState('');

    const mainOptions = [Defect,Compass,Weight and Balance Data,Routine Inspection,Power Performance,Robbing,For DI,
                         Snap QA,Pre Survey,Ground Run,CTF,MTF,Taxi]

    const setSubOption = {
        Defect : ["Limitation","Deferred Defect","Husbandry","Concession"]
        Compass : ["View","Data Entry"]
        Weight and Balance Data : ["View","Data Entry"]
        Routine Inspection : ["View","Data Entry"]
        Power Performance : ["View","Data Entry"]
        Robbing : ["View","Data Entry"]
        For DI : ["View","Data Entry"]
        Snap QA : ["View","Data Entry"]
        Pre Survey : ["View","Data Entry"]
        Ground Run : ["View","Data Entry"]
        CTF : ["View","Data Entry"]
        MTF : ["View","Data Entry"]
        Taxi : ["View","Data Entry"]
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8">
            <Paper elevation={6} sx={{p:4,borderRadius:4,width:400,textAlign:"center",}}>
                <Typography variant="h5" mb={3} fontWeight="bold">
                    Section 5
                </Typography>

                <Form Control fullWidth sx={{mb:3}}>
                    <InputLabel> Entry Type  </InputLabel>
                    <Select
                        value={mainOption}
                        label="Main Dropdown"
                        onChange={(e) => {
                            setMainOption(e.target.value);
                            setSubOption("");
                        }}
                    >
                        {mainOptions.map((opt,index) => (
                            <MenuItem key = {index} value={opt}>
                                {opt}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <AnimatePresence>
                    {subOption && (
                    <motion.div
                        initial={{opacity:0,scale:0.9}}
                        animate={{opacity:1,scale:1}}
                        exit={{opacity:0}}
                        transition={{duration:0.3}}
                        >
                        <Box mt={2} p{2} bgcolor="#2e7d32" fontWeight="bold">
                            Selected:{mainOption} {subOption}
                        </Box>
                    </motion.div>
                    )}
                </AnimatePresence>
            </Paper>
        </Box>
    );
};

export default Section5;