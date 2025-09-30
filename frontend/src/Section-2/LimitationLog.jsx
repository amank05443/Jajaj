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
import { useParams } from "../Utils/CustomHooks/useParams";
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
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { params, loading } = useParams();
  const [dataLoading, setDataLoading] = useState(false);
  useEffect(() => {
    const aircraft_master_id = params.aircraft_master_id;
    setDataLoading(true);

    if (!loading) {
      axios
        .get(`http://localhost:8000/api/limGridData/${aircraft_master_id}`)
        .then((res) => {
          setRows(res.data);
          console.log("Fetched data:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching:", err);
        })
        .finally(() => {
          setDataLoading(false);
        });
    }
  }, [loading]);

  return (
    <div className="bg-gradient-to-r from-teal-200 via-sky-300 to-blue-300 min-h-screen">
      {/* style=
      {{
        padding: 20,
        height: "100vh",
        backgroundImage: 'url("/images/background.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }} */}

      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0]">
        <h2
          className="font-bold"
          style={{
            textAlign: "center",
            fontSize: "35px",
            fontFamily: "algerian",
          }}
        >
          LIMITATION LOG
        </h2>
      </div>
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
              {/* <StyledTableCell sx={{ fontWeight: "bold" }}>
                Trade
              </StyledTableCell> */}
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
          <TableBody>
            {rows.map((row) => {
              const isClosed = !!row.lim_def_removal_by_id;
              return (
                <TableRow /* key={row.id} */>
                  <TableCell>
                    {row.change_of_serviceability_log.status_label}
                  </TableCell>
                  <TableCell>
                    {dayjs(row.closed_at).format("YYYY-MM-DD HH:mm")}
                  </TableCell>
                  <TableCell>{row.snow}</TableCell>
                  <TableCell>{row.afHours}</TableCell>
                  <TableCell>{row.reasonUS}</TableCell>
                  <TableCell>
                    <Tooltip title={isClosed ? "View Details" : "Clear U/S"}>
                      {/* <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleClick(row)}
                      >
                        {isClosed ? "View" : "Continue"}
                      </Button> */}
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default LimitationLog;
