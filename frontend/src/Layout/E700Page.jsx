import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Alert,
  AppBar,
  CircularProgress,
  Toolbar,
  CssBaseline,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import Footer from "../Layout/Footer";

const E700Page = () => {
  const navigate = useNavigate();
  //params context
  const { params, setParam, setMultipleParams, loading } = useParams();

  const [aircraftTypes, setAircraftTypes] = useState([]);
  const [aircraftDetails, setAircraftDetails] = useState([]);

  const [selectedAircraftType, setSelectedAircraftType] = useState("");
  const [selectedAircraftDetail, setSelectedAircraftDetail] = useState("");

  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/aircraft-type-details")
      .then((response) => {
        setAircraftTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Aircraft Types", error);
      });
  }, []);

  useEffect(() => {
    if (selectedAircraftType) {
      axios
        .get(`/api/aircraft-details/${selectedAircraftType}`)
        .then((response) => setAircraftDetails(response.data));
    } else {
      setAircraftDetails([]);
    }
  }, [selectedAircraftType]);

  const handleChange = (event) => {
    setSelectedAircraftType(event.target.value);
  };
  const handleChange1 = (e) => {
    setSelectedAircraftDetail(e.target.value);
  };

  //to save a/c type and master id into local storage
  const handleSelection = async () => {
    if (!selectedAircraftDetail) {
      setStatus("Please select A/C Side No.");
      console.log(status);
      return;
    }
       await setMultipleParams({
      aircraft_type_id: selectedAircraftType,
      aircraft_master_id: selectedAircraftDetail,
    });
    navigate("/dashboard");
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        background:
          "linear-gradient(135deg,#0f172a 0%,#6a11cb 70%,#2575fc 100%)",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <svg width="100%" height="100%">
          <rect
            x="10%"
            y="10%"
            width="80%"
            height="80%"
            rx="32"
            stroke="#818CF8"
            strokeWidth="12"
            fill="none"
            opacity="0.15"
          />
        </svg>
      </Box>
      <Paper
        elevation={6}
        sx={{
          p: 6,
          background: "linear-gradient(135deg, rgba(99,102,241,0.95) 0%, rgba(49,46,129,0.97) 100%)",
          color: "white",
          minHeight: "180px",
          position:'relative',
          zIndex:1,
          boxShadow:'0 0 32px 10px rgba(99,102,241,0.4), 0 0 0 2px #6366F1',borderRadius:'32px'
        }}
      >
        <Typography variant="h4" align="center" sx={{fontFamily:'Orbitron,sans-serif',letterSpacing:2}}>
          {" "}
          <animate>
            {" "}
            <b>
              {" "}
              <u>Welcome to Seven Hundred !! </u>
            </b>{" "}
          </animate>
        </Typography>
        <Grid container direction="column" spacing={2} xs={6}>
          <Grid item sm={6}>
            <Box align="center">
              <FormControl fullWidth margin="normal">

                <Select
                  labelId="aircraft-type-label"
                  id="aircraft-type-select"

                  value={selectedAircraftType}
                  label="Aircraft Type"
                   displayEmpty
                  sx={{ backgroundColor: "white" }}
                  inputProps={{'aria-label':'Select Aircraft Type'}}

                  onChange={handleChange}
                >
                <MenuItem value="">
                    <em>Select Aircraft Type </em>
                </MenuItem>


                  {aircraftTypes.map((aircraftType) => (
                    <MenuItem key={aircraftType.id} value={aircraftType.id}>
                      {aircraftType.aircraft_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box align="center">
              <FormControl fullWidth size="medium">

                <Select
                  labelId="aircraft-side-no-label"
                  id="aircraft-side-no-select"
                  value={selectedAircraftDetail}
                  label="Aircraft Side No"
                  displayEmpty
                  sx={{ backgroundColor: "white" }}
                   inputProps={{'aria-label':'Select Aircraft Side no.'}}
                  onChange={handleChange1}
                >
                 <MenuItem value="">
                    <em>Select Aircraft Side no. </em>
                </MenuItem>
                  {aircraftDetails.map((aircraft) => (
                    <MenuItem key={aircraft.id} value={aircraft.id}>
                      {aircraft.side_no}
                    </MenuItem>
                  ))}
                </Select>
                <p>{aircraftDetails.id}</p>
              </FormControl>
            </Box>
          </Grid>
          <Box align="center">
            <FormControl>
              <Button
                style={{
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  background: "rgb(44,210,113)",
                  color: "#fff",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "4px",
                }}
                onClick={handleSelection}
              >
                <b>Prepare/ Verify E 700 Details</b>
              </Button>
            </FormControl>
          </Box>
        </Grid>
      </Paper>
    </Box>
  );
};

export default E700Page;
