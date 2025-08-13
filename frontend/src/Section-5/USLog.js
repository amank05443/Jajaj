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

const EntryGridPage = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([
    {
      id: 1,
      status: "Open",
      entryType: "Robbing",
      snow: "SN001",
      airframes: "AF001",
      reason: "Routine Check",
    },
    {
      id: 2,
      status: "Closed",
      entryType: "Compass",
      snow: "SN002",
      airframes: "AF002",
      reason: "Component Replacement",
    },
    {
      id: 3,
      status: "Open",
      entryType: "MTF",
      snow: "SN003",
      airframes: "AF003",
      reason: "Scheduled Maintenance",
    },
  ]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [entryData, setEntryData] = useState({
    entryType: "",
    snow: "",
    airframes: "",
    reason: "",
  });
  const [gridColor, setGridColor] = useState("#ffffff");
  const [headerColor, setHeaderColor] = useState("#1976d2");

  const handleEdit = (row) => {
    setEditing(true);
    setCurrentId(row.id);
    setEntryData({
      entryType: row.entryType,
      snow: row.snow,
      airframes: row.airframes,
      reason: row.reason,
    });
    setDrawerOpen(true);
  };
  const handleNewEntry = () => {
    navigate("/userList");
  };

  const handleChange = (field, value) => {
    setEntryData({ ...entryData, [field]: value });
  };

  const handleSaveEntry = () => {
    if (editing) {
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === currentId ? { ...row, ...entryData } : row,
        ),
      );
    } else {
      const newId = rows.length + 1;
      setRows([...rows, { id: newId, ...entryData, status: "Open" }]);
    }
    setDrawerOpen(false);
  };

  const columns = [
    { field: "id", headerName: "SNo", width: 90 },
    { field: "status", headerName: "Status", width: 90 },
    { field: "entryType", headerName: "Entry Type", width: 150 },
    { field: "snow", headerName: "SNOW", width: 120 },
    { field: "reason", headerName: "Reason Placing U/S", width: 230 },
    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        if (!params?.row) return null;

        return params.row.status === "Closed" ? (
          <Button variant="outlined" color="secondary" size="small">
            View
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Open/Edit
          </Button>
        );
      },
    },
  ];

  return (
    <Box sx={{ padding: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            mb: 3,
            background: "linear-gradient(90deg,#1976d2,#4caf50)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Section - 5
        </Typography>
      </motion.div>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="subtitle1">Select Grid Color:</Typography>
        <input
          type="color"
          value={gridColor}
          onChange={(e) => setGridColor(e.target.value)}
          style={{ cursor: "pointer", width: 50, height: 30, border: "none" }}
        />
      </Box>

      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <Typography variant="subtitle1">Select Header Color:</Typography>
        <input
          type="color"
          value={headerColor}
          onChange={(e) => setHeaderColor(e.target.value)}
          style={{ cursor: "pointer", width: 50, height: 30, border: "none" }}
        />
      </Box>

      <Button
        variant="contained"
        color="success"
        sx={{ mb: 2 }}
        onClick={handleNewEntry}
      >
        New Entry
      </Button>

      <Paper elevation={4} sx={{ height: 400, width: "90vw", padding: 2 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{
            "& .MuiDataGrid-cell": { backgroundColor: gridColor },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: `${headerColor} ! important`,
              color: "#576477",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold",
              color: "#576477",
            },
          }}
        />
      </Paper>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 350, p: 3 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">
              {editing ? " Edit Entry" : "Add New Entry"}
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <ClearIcon />
            </IconButton>
          </Box>

          <TextField
            label="Entry Type"
            variant="outline"
            fullWidth
            sx={{ mb: 2 }}
            value={entryData.entryType}
            onChange={(e) => handleChange("entryType", e.target.value)}
          />
          <TextField
            label="SNOW"
            variant="outline"
            fullWidth
            sx={{ mb: 2 }}
            value={entryData.snow}
            onChange={(e) => handleChange("snow", e.target.value)}
          />
          <TextField
            label="Airframes"
            variant="outline"
            fullWidth
            sx={{ mb: 2 }}
            value={entryData.airframes}
            onChange={(e) => handleChange("airframes", e.target.value)}
          />
          <TextField
            label="Reason for Placing U/S"
            variant="outline"
            fullWidth
            sx={{ mb: 2 }}
            value={entryData.reason}
            onChange={(e) => handleChange("reason", e.target.value)}
          />

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSaveEntry}
            >
              {editing ? "Update Entry" : "Save Entry"}
            </Button>
          </motion.div>
        </Box>
      </Drawer>
    </Box>
  );
};

export default EntryGridPage;


