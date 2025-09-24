import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";

import BasicWeightAndMoment from "../Section-9/BasicWeightAndMoment";
import CompassLog from "../Section-10/CompassLog";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Drawer,
  IconButton,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
  Toolbar,
  TextField,
} from "@mui/material";
import { FaMapMarkerAlt, FaTools, FaUser, FaClock } from "react-icons/fa";

const ClearUsLog = ({ defect }) => {
  const [formError, setFormError] = useState(null);
  const [wbData, setWbData] = useState({});
  const [compassData, setCompassData] = useState({});

  const methods = useForm({
    defaultValues: {
      workDone: "",
      manHrs: "",
      tradesmen: 0,
      supervisor: 0,
    },
  });

  const handleWbData = (data) => {
    setWbData(data);
    console.log("wbData:", wbData);
  };
  const handleCompassData = (data) => {
    setCompassData(data);
    console.log("compassData:", compassData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = methods;

  const infoCards = [
    {
      label: "SNOW",
      value: "2255",
      icon: <FaMapMarkerAlt size={20} />,
      bg: "#fef3c7",
      color: "#92400e",
    },
    {
      label: "Dated",
      value: "22/10/2015",
      icon: <FaTools size={20} />,
      bg: "#e0f2fe",
      color: "#075985",
    },
    {
      label: "Reason",
      value: "I am a disco dancer.",
      icon: <FaUser size={20} />,
      bg: "#ede9fe",
      color: "#4c1d95",
    },
    {
      label: "Entry Type",
      value: "Weight and Balance",
      icon: <FaClock size={20} />,
      bg: "#dcfce7",
      color: "#166534",
    },
  ];

  return (
    <Box
      p={4}
      /*  className="min-h-screen"
      sx={{background:"linear-gradient(135deg,#0f1710 0%, #312e81 30%, #7c3aed 100%)",}} */
      className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 space-y-4"
    >
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 mt-1 mb-1">
        <h2
          className="text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "35px",
            margin: 4,
            fontFamily: "Algerian",
          }}
        >
          CLEAR ~SERVICEABILITY~ LOG
        </h2>
      </div>
      {/*      Info Bar */}
      <Paper
        elevation={8}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg,#fdfbfb 0%,#ebedee 100%)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 3,
            color: "primary.main",
            textAlign: "center",
          }}
        >
          Defect Information
        </Typography>
        <Grid container spacing={3}>
          {infoCards.map((f, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  bgcolor: f.bg,
                  color: f.color,
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
                component={motion.div}
                whileHover={{ scale: 1.03 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {f.icon}
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, ml: 1 }}
                  >
                    {f.label}
                  </Typography>
                </Box>
                <Typography variant="body1">{f.value}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
      <motion.div
        //           key={ExtraForm ? "with-extra" : "only-basic"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <FormProvider {...methods}>
          <form>
            <Paper className="p-4 shadow-md">
              <CompassLog compassData={handleCompassData} />
            </Paper>
            <Paper className="p-4 shadow-md">
              <BasicWeightAndMoment wbData={handleWbData} />
            </Paper>
          </form>
        </FormProvider>
      </motion.div>
    </Box>
  );
};
export default ClearUsLog;
