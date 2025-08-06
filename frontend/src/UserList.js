import React, { useState } from "react";
import {
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Container,
  Grid,
  Paper,
  Box,
  Button,
  Divider,
  useTheme,
  useMediaQuery,
  TextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import BuildIcon from "@mui/icons-material/Build";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";

const subOptions = {
  CTF: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  MTF: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Compass: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Routine: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  PP: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Robbing: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Snap_QA: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Pre_Survey: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  Ground_Run: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  BFS: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  AFS: ["Limitation", "Deferred", "Husbandary", "Concession", "None"],
  "Weight and balance": [
    "Limitation",
    "Deferred",
    "Husbandary",
    "Concession",
    "None",
  ],
};

const icons = {
  CTF: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />, // sage green
  MTF: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Compass: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Routine: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  PP: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Robbing: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Snap_QA: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Pre_Survey: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  Ground_Run: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  BFS: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  AFS: <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />,
  "Weight and balance": (
    <ArrowRightIcon fontSize="small" sx={{ color: "#6a8f78" }} />
  ),
};

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
};

const menuItemVariants = {
  rest: { scale: 1, backgroundColor: "transparent" },
  hover: {
    scale: 1.05,
    backgroundColor: "rgba(199, 107, 81, 0.12)", // terracotta light alpha
    transition: { duration: 0.15 },
  },
  selected: {
    scale: 1.07,
    backgroundColor: "rgba(199, 107, 81, 0.25)",
  },
};

const CUL = () => {
  const [mainSelection, setMainSelection] = useState("");
  const [subSelection, setSubSelection] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [pin, setPin] = useState("");
  const [supervisorData, setSupervisorData] = useState(null);
  const [error, setError] = useState("");

  const SUPERVISOR_PIN = "1234";
  const SUPERVISOR_INFO = {
    name: "Panda",
    rank: "CHELAR(R)",
  };
  const handleMainChange = (event) => {
    setMainSelection(event.target.value);
    setSubSelection("");
  };

  const handleSubChange = (event) => {
    setSubSelection(event.target.value);
  };

  // Animate heading variants
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: { scale: 1.03 },
  };

  const handleSubmit = () => {
    if (pin === SUPERVISOR_PIN) {
      setSupervisorData(SUPERVISOR_INFO);
      setError("");
    } else {
      setError("Invalid PIN.Please try again");
      setSupervisorData(null);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 6, display: "flex", justifyContent: "center" }}
    >
      {/* Info bar on left */}

      <Paper
        elevation={6}
        sx={{ p: 4, borderRadius: 3, flexGrow: 1, maxWidth: 600 }}
      >
        {/* Animated Header outside Paper could be done, but here kept inside for layout */}
        <motion.div
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          style={{
            display: "inline-block",
            marginBottom: 24,
            userSelect: "none",
          }}
        >
          <Typography
            variant={isMobile ? "h5" : "h4"}
            fontWeight="bold"
            sx={{ color: "#4a5a6a" }} // deep slate blue-gray heading
          >
            Change of Unserviceability Log
          </Typography>
        </motion.div>

        {/* Secondary info label */}
        <Typography
          variant="subtitle1"
          color="text.secondary"
          fontWeight={500}
          mb={4}
        >
          A/F Hrs
        </Typography>

        {/* Main Dropdown */}
        <FormControl fullWidth sx={{ mb: 4 }}>
          <InputLabel
            id="main-select-label"
            sx={{ fontWeight: 600, color: "#4a5a6a" }}
          >
            How Found
          </InputLabel>
          <Select
            labelId="main-select-label"
            value={mainSelection}
            label="How Found"
            onChange={handleMainChange}
            IconComponent={ArrowDropDownIcon}

            sx={{
              "& .MuiSelect-select": {
                py: 1.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                fontWeight: 600,
                color: "#4a5a6a",
              },
            }}
          >
            {Object.entries(subOptions).map(([option]) => (
              <MenuItem
                key={option}
                value={option}
                component={motion.div}
                initial="rest"
                whileHover="hover"
                animate={mainSelection === option ? "selected" : "rest"}
                variants={menuItemVariants}
                tabIndex={-1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: "#4a5a6a",
                }}
              >
                {icons[option]}
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Animated Sub Dropdown */}
        <AnimatePresence mode="wait">
          {mainSelection && (
            <motion.div
              key="sub-dropdown"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel
                  id="sub-select-label"
                  sx={{ fontWeight: 600, color: "#4a5a6a" }}
                >
                  Defect Type
                </InputLabel>
                <Select
                  labelId="sub-select-label"
                  value={subSelection}
                  label="Select Subcategory"
                  onChange={handleSubChange}
                  IconComponent={ArrowDropDownIcon}

                  sx={{
                    "& .MuiSelect-select": {
                      py: 1.5,
                      fontWeight: 600,
                      color: "#4a5a6a",
                    },
                  }}
                >
                  {subOptions[mainSelection].map((sub) => (
                    <MenuItem
                      key={sub}
                      value={sub}
                      component={motion.div}
                      initial="rest"
                      whileHover="hover"
                      animate={subSelection === sub ? "selected" : "rest"}
                      variants={menuItemVariants}
                      tabIndex={-1}
                      sx={{ color: "#4a5a6a" }}
                    >
                      {sub}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField label="Reason for Placing U/S" variant="outlined" fullWidth />
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: "1px",
                    background: "linear-gradient(90deg,#4cafef,#00c853)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    mb: 3,
                    mt: 2,
                  }}
                >
                  SuperVisor Authentication
                </Typography>
              </motion.div>

              {!supervisorData ? (
                <>
                  <TextField
                    label="Enter Supervisor PIN"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  {error && (
                    <Typography
                      color="error"
                      variant="body2"
                      sx={{ marginBottom: 2 }}
                    >
                      {error}
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={pin.trim() === ""}
                  >
                    Submit
                  </Button>
                </>
              ) : (
                <Box sx={{ textAlign: "center", marginTop: 2 }}>
                  <Typography variant="h6" color="success.main">
                    Verified Supervisor
                  </Typography>
                  <Typography>
                    <strong>Name:</strong>
                    {supervisorData.name}
                  </Typography>
                  <Typography>
                    <strong>Rank:</strong>
                    {supervisorData.rank}
                  </Typography>
                </Box>
              )}
              {/* Action button shows only if both selections made */}
              {subSelection && (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#4a7c75", // muted teal
                      "&:hover": { backgroundColor: "#3f6b68" },
                    }}
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      alert(`Selected ${mainSelection} > ${subSelection}`)
                    }
                  >
                    Confirm Selection
                  </Button>
                </Box>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </Container>
  );
};

export default CUL;
