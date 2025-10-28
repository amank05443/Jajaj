// <---This  is used to display the Grid View of Change of Serviceability Log  (section-5)---> //
// <---Developed by Ghulam Shirree, LAM on 29 Sep 2025 ---> //

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
  Badge,
} from "@mui/material";
import {
  PlusSquare,
  List,
  FolderOpen,
  FileDigit,
  Search,
  AlertTriangle,
  CircleCheckBig,
  Eye,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "../Utils/CustomHooks/useParams";
import axios from "axios";
import { motion } from "framer-motion";
import { useAlert } from "../Utils/Alerts/AlertContext";

export default function USLog() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { params, loading } = useParams();
  const [dataLoading, setDataLoading] = useState(false);
  const [allEntryHidden, SetAllEntryHidden] = useState(false);
  const [openHidden, SetOpenHidden] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    const aircraft_master_id = params.aircraft_master_id;
    setSelectedAircraft(aircraft_master_id);
    console.log(selectedAircraft);
    setDataLoading(true);
    if (selectedAircraft) {
      axios
        .get(`http://localhost:8000/api/limGridData/${selectedAircraft}`)
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
  }, [loading, params, selectedAircraft]);

  //  <---Data is filtering here to show as per requirements of ALL ENTRY and OPEN ENTRY buttons--->
  const filteredRows =
    filter === "all" ? rows : rows.filter((row) => row.status_label === "OPEN");

  // <---All open entries are filtering here to get the total counts --->
  const openEntries = useMemo(() => {
    return rows?.filter((r) => r.status_label === "OPEN");
  }, [rows]);

  //  <---Function to Open the Modal--->
  const handleOpenModel = (data) => {
    setModalOpen(true);
    setSelectedRow(data);
  };
  // <---Function to Close the Modal--->
  const handleCloseModel = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  // <---Function to show Previous SNOW data to the Modal--->
  const handlePrev = () => {
    if (!selectedRow) return;
    const rowIndex = rows.findIndex((r) => r.snow === selectedRow.snow);
    if (rowIndex == 0) {
      //       alert("THIS IS THE FIRST SNOW");
      showAlert({
        type: "INFO",
        message: "THIS IS THE FIRST SNOW",
      });
    }
    if (rowIndex <= 0) return;
    setSelectedRow(rows[rowIndex - 1]);
    console.log(selectedRow);
  };

  // <---Function to show Previous SNOW data to the Modal--->
  const handleNext = () => {
    if (!selectedRow) return;
    const rowIndex = rows.findIndex((r) => r.snow === selectedRow.snow);
    if (rowIndex == rows.length - 1) {
      //       alert("THIS IS THE LAST SNOW");
      showAlert({
        type: "INFO",
        message: "THIS IS THE LAST SNOW",
      });
    }
    if (rowIndex >= rows.length - 1) return;
    setSelectedRow(rows[rowIndex + 1]);
  };
  const handleAction = (data) => {
    navigate("/clearUsLog", { state: data });
    console.log(data);
  };

  return (
    <div className="bg-gray-100 min-h-screen items-center justify-center">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 p-1 m-1 ml-2 mr-2 shadow-md ">
        <h2
          className=" absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "35px",
            margin: 0,
            fontFamily: "algerian",
          }}
        >
          Limitation Log
        </h2>
      </div>
      <Card className="shadow-lg rounded-xl">
        <CardContent className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
          <div style={{ height: 420, width: "100%" }}>
            <DataGrid
              loading={dataLoading}
              rows={filteredRows}
              columns={[
                {
                  field: "ldh_no",
                  headerName: "LIMITATION NUMBER",
                  flex: 2,
                  headerAlign: "center",
                  align: "center",
                },
                {
                  field: "user_time_date",
                  headerName: "ENTRY DATE",
                  flex: 2,
                   renderCell: (rowData) =>
                    rowData.row.change_of_serviceability_log?.user_time_date || "N/A",
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },

                {
                  field: "snow",
                  headerName: "SNOW",
                  flex: 1,
                   renderCell: (rowData) =>
                    rowData.row.change_of_serviceability_log?.snow || "N/A",
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },
             {
                  field: "airframe_hrs",
                  headerName: "A/F HRS",
                  flex: 1,
                    renderCell: (rowData) =>
                    rowData.row.change_of_serviceability_log?.airframe_hrs || "N/A",
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },
             {
                  field: "reason_for_placing_unserviceable",
                  headerName: "DEFECT/LIMITATION DETAILS",
                  flex: 2,
                   renderCell: (rowData) =>
                    rowData.row.change_of_serviceability_log?.reason_for_placing_unserviceable || "N/A",
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },
            {
                  field: "entryStatus",
                  headerName: "ENTRY STATUS",
                  flex: 2,
                  renderCell: (rowData) => {
//                     rowData.row.change_of_serviceability_log?.status || "N/A",
                    const  statusValue = rowData.row.change_of_serviceability_log?.status;
                    let displayStatus;

                    if (statusValue === "2") {
                        displayStatus = "Open";
                        }
                    else if (statusValue === "1"){
                        displayStatus = "Closed";
                        }
                    else{
                        displayStatus = "NA";
                        }
                    return displayStatus;
                    },
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },

                {
                  field: "Details",
                  headerName: "VIEWS/ACTION",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                  renderCell: (rowData) => (
                    <div>
                      <motion.div
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Button
                          variant="contained"
                          sx={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            fontWeight: "bold",
                          }}
                          size="small"
                          onClick={() => handleAction(rowData.row)}
                        >
                          Clear
                        </Button>
                      </motion.div>
                    </div>
                  ),
                },


              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableColumnSelector
              sx={{
                border: 0,
                backgroundColor: "#F9FAFB ",
                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#352A87",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "1.2 rem",
                  border: "1px solid #708238",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },

                "& .MuiDataGrid-cell": {
                  //  backgroundColor: "cream",
                  fontSize: "1 rem ",
                  padding: "12px",
                  border: "1px solid #708238",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: "#F0F7FE ",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: "#EDE9FE ",
                },
                "& .MuiDataGrid-columnSeparator": {
                  display: "none",
                },
                "& .MuiDataGrid-menuIconButton": {
                  color: "white",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: "white",
                },
              }}
            />
          </div>
        </CardContent>
      </Card>
      {/*       <---The End of the Grid---> */}

      {/* <---Attachment of the Grid Modal---> */}

    </div>
  );
}
