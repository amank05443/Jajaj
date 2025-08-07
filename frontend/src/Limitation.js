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
  IconButton,
  useMediaQuery,
  Drawer,
  TextField,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { DataGrid } from "@mui/x-data-grid";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";

const LimitationPage = () => {
    const [limitations,setLimitations] = useState([
        {id:1,date:"2025-08-06,time:"10:00",ato:"ATO-123",atoCode:"27-10",system:"Flying Controls",
            defect:"Spoiler Actuator Leak",status:"Active",},
    ]);

    const [drawerOpen,setDrawerOpen] = useState(false);
    const[editing,setEditing] = useState(false);
    const [currentId,setCurrentId] = useState(null);
    const[formData,setFormData] = useState({
        date:"",time:"",ato:"",atoCode:"",system:"",defect:"",
    });

    const handleChange = (field)
}