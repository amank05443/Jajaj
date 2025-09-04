import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Tooltip,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
//import useTableApi from '.../Utils/useTableApi';
import axios from "axios";
import dayjs from "dayjs";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(() => ({
  background:
    "linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.4))",
  backdropFilter: "blur(6px) saturate(110%)",
  WebkitBackdropFilter: "blur(6px) saturate(110%)",
  borderBottom: "1px solid rgba(15,23,42,0.05)",
  transition: "background .22s ease",
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#0f172a",
  "&:hover": {
    background:
      "linear-gradient(90deg,rgba(99,102,241,0.07),rgba(255,255,255,0.55))",
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  cursor: "pointer",
  transition: "transform .22s ease, box-shadow .22s ease, background .22s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
  },
}));

const LimitationLog = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  //    const {data,loading,update,create} = useTableApi('');
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [rowDetails, setRowDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(true);

  return (
    <div
      style={{
        padding: 20,
        height: "100vh",
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="h2"
          fontFamily="Roboto"
          align="center"
          gutterBottom
          fontWeight={600}
          color="#f50057"
          letterSpacing={3}
          sx={{
            background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
          }}
        >
          Limitation Log
          <sub
            style={{ fontSize: "0.85rem", color: "#fff", fontWeight: "1000" }}
          >
            (MOD Form 703)
          </sub>
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/newEntryForLimitationLog")}
      >
        New Entry
      </Button>
      <TableContainer
        component={Paper}
        style={{
          marginTop: 20,
          p: 4,
          borderRadius: 3,
          backgroundColor: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
          width: "100%",
          mt: 5,
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#1976d2" }}>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Limitation Number
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Entry Date
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Trade
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                SNOW
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                A/F Hrs
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Defect/Limitation Details
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Entry Status
              </StyledTableCell>
              <StyledTableCell sx={{ fontWeight: "bold" }}>
                Action
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/*<TableBody>
                        {entries.map((row) => {const isClosed = !!row.status; return (
                            <TableRow key={row.id}>
                                <TableCell>{isClosed ? 'Closed':'Open'}</TableCell>
                                <TableCell>{dayjs(isClosed ? row.closed_at:row.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
                                <TableCell>{row.snow}</TableCell>
                                <TableCell>{row.afHours}</TableCell>
                                <TableCell>{row.reasonUS}</TableCell>
                                <TableCell>
                                    <Tooltip title={isClosed ? 'View Details' : 'Clear U/S'}>
                                        <Button variant="contained" size="small" onClick={() => handleClick(row)}>
                                            {isClosed ? 'View' : 'Continue'}
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>*/}
          <TableBody>
            <StyledTableRow>
              <StyledTableCell>KV31/566/LIM/1227</StyledTableCell>
              <StyledTableCell>2022-10-12 15:17</StyledTableCell>
              <StyledTableCell>AE</StyledTableCell>
              <StyledTableCell>1227</StyledTableCell>
              <StyledTableCell>142:15</StyledTableCell>
              <StyledTableCell>Minor crack detected</StyledTableCell>
              <StyledTableCell>Open</StyledTableCell>
              <StyledTableCell>
                <Tooltip title="Clear U/S">
                  <Button variant="contained" size="small">
                    Continue
                  </Button>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell>KV31/566/LIM/1225</StyledTableCell>
              <StyledTableCell>2022-10-12 15:17</StyledTableCell>
              <StyledTableCell>AE</StyledTableCell>
              <StyledTableCell>1225</StyledTableCell>
              <StyledTableCell>141:15</StyledTableCell>
              <StyledTableCell>Minor leak detected</StyledTableCell>
              <StyledTableCell>Open</StyledTableCell>
              <StyledTableCell>
                <Tooltip title="Clear U/S">
                  <Button variant="contained" size="small">
                    Continue
                  </Button>
                </Tooltip>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default LimitationLog;
