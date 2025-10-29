// <---This  is used to display the Grid View of Limitation Log  (section-2)---> //
// <---Developed by Ghulam Shirree, LAM on 28 oct 2025 ---> //

import React, { useState, useEffect, useMemo } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
  Badge,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import {
  PlusSquare,
  List,
  FolderOpen,
  FileDigit,
  Search,
  AlertTriangle,
  CircleCheckBig,
  Eye,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "../Utils/CustomHooks/useParams";
import axios from "axios";
import { motion } from "framer-motion";
import DeferredLogGridModal from "./DeferredLogGridModal";
import { useAlert } from "../Utils/Alerts/AlertContext";
import HighlightSearchedText from "../Utils/GridComponent/HighlightSearchedText";

export default function DeferredDefectLog1() {
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
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [columnFilterName, setColumnFilterName] = useState("snow");
  //   const [filteredRows, setFilteredRows] = useState(setRows);
  const { showAlert } = useAlert();

  useEffect(() => {
    const aircraft_master_id = params.aircraft_master_id;
    setSelectedAircraft(aircraft_master_id);
    console.log(selectedAircraft);
    setDataLoading(true);
    if (selectedAircraft) {
      axios
        .get(`http://localhost:8000/api/DeferredGridData/${selectedAircraft}`)
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
    filter === "all"
      ? rows
      : rows.filter((row) => row.lim_def_removal_by === null);

  //     const filteredDefectRows = rows.filter((row) => {
  //         const detail = row.reason_for_placing_unserviceable ? row.reason_for_placing_unserviceable.toLowerCase(): "";
  //         const query = searchDefect.toLowerCase();
  //         if (query.length === 0) return true;
  //         return detail.includes(query);
  //         console.log("123")
  //         console.log(searchDefect)
  //         if(!searchDefect || searchDefect.trim() ==="")return true;
  //         return
  //         (row.reason_for_placing_unserviceable && row.reason_for_placing_unserviceable?.toLowerCase().includes(searchDefect.toLowerCase()));
  //         });
  //     const handleSearch =(value)=> {
  //         setSearchText(value);
  const filteredParticularColumn = filteredRows.filter((row) =>
    row.change_of_serviceability_log?.[columnFilterName]
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );
  //     setFilteredRows(filtered);
  //     }

  // <---All open entries are filtering here to get the total counts --->
  const openEntries = useMemo(() => {
    return rows?.filter((r) => r.lim_def_removal_by === null);
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
    const rowIndex = rows.findIndex(
      (r) =>
        r.change_of_serviceability_log.snow ===
        selectedRow.change_of_serviceability_log.snow,
    );
    if (rowIndex == 0) {
      //       alert("THIS IS THE FIRST SNOW");
      showAlert({
        type: "INFO",
        message: "THIS IS THE LATEST SNOW",
      });
    }
    if (rowIndex <= 0) return;
    setSelectedRow(rows[rowIndex - 1]);
    console.log(selectedRow);
  };

  // <---Function to show Previous SNOW data to the Modal--->
  const handleNext = () => {
    if (!selectedRow) return;
    const rowIndex = rows.findIndex(
      (r) =>
        r.change_of_serviceability_log.snow ===
        selectedRow.change_of_serviceability_log.snow,
    );
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
  const handleOpenSearch = () => {
    setSearchOpen((searchOpen) => !searchOpen);
  };
  const handelToggleSearchFilter = (data) => {
    setColumnFilterName(data);
    setSearchText("");
  };
  //   const highlightText=(value,searchText)=>{
  //        if (!searchText) return value;
  //                    const index=value.toLowerCase().indexOf(searchText.toLowerCase());
  //
  //                    if ( index === -1) return value;
  //
  //                    const before = value.slice(0,index);
  //                    const match=value.slice(index,index + searchText.length);
  //                    const after = value.slice(index+searchText.length);
  //                    return(
  //                        <span>
  //                            {before}
  //                            <span className="bg-red-200  font-bold"> {match}</span>
  //                            {after}
  //                            </span>);
  //
  //       }
  //

  return (
    <div className="bg-gray-100 min-h-screen items-center justify-center">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] dark:from-gray-700 dark:via-gray-700 dark:to-gray-700 dark:text-white  h-[4.68vw] p-[0.29vw] m-[0.29vw] ml-[0.59vw] mr-[0.59vw] shadow-md ">
        <h2
          className=" absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "2.56vw",
            margin: 0,
            fontFamily: "algerian",
          }}
        >
          DEFERRED DEFECT LOG
        </h2>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "1.17vw",
        }}
      >
        {/*          <---Button for All Entry Types where all entry(open & close) is handled---> */}
        <div className="flex gap-[0.88vw] ">
          {/*         search button */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className="flex items-center gap-[0.59vw] text-[1.17vw] font-bold bg-green-600 dark:bg-black  dark:hover:bg-gray-700 shadow-lg text-white dark:text-yellow-300 px-[1.17vw] py-[0.59vw] shadow-md rounded-lg hover:bg-green-700 transition"
              onClick={handleOpenSearch}
            >
              <Search className="w-[1.46vw] " strokeWidth={3} />
            </button>
          </motion.div>
          {searchOpen && (
            <div className="flex ml-[1.17vw]  gap-[0.88vw] ">
              {/*                   button */}
              <button
                className={`flex items-center gap-[0.59vw] font-bold  text-white px-[1.17vw] py-[0.59vw] shadow-md rounded-lg text-[1.17vw]
            transition ${columnFilterName === "snow" ? "bg-gradient-to-r from-indigo-600 to-purple-500 shadow-lg  scale-110 dark:from-black dark:to-black dark:text-yellow-300 " : "bg-gray-500 text-gray-700 hover:shadow-md"}`}
                onClick={() => handelToggleSearchFilter("snow")}
              >
                SNOW
              </button>
              <button
                className={`flex items-center gap-[0.59vw] font-bold  text-white px-[1.17vw] py-[0.59vw] shadow-md rounded-lg text-[1.17vw]
            transition ${columnFilterName === "reason_for_placing_unserviceable" ? "bg-gradient-to-r from-orange-500 to-red-500  shadow-lg  scale-110 dark:from-black dark:to-black dark:text-yellow-300 " : "bg-gray-500 text-gray-700 hover:shadow-md"}`}
                onClick={() =>
                  handelToggleSearchFilter("reason_for_placing_unserviceable")
                }
              >
                DEFECT
              </button>

              {/*                 <TextField */}
              {/*                   label="Search Here..." */}
              {/*                   variant="outlined" */}
              {/*                   size="small" */}
              {/*                   fullWidth */}
              {/* //                   sx={{ mb: 2 }} */}
              {/*                   value={searchText} */}
              {/*                   onChange={(e) => setSearchText(e.target.value)} */}
              {/* //                   InputProps ={{ */}
              {/* //                       endAdornment:<InputAdornment position="end"> */}
              {/* //                           <IconButton */}
              {/* //                             size="small" */}
              {/* //                             onclick={handleOpenSearch} */}
              {/* //                             edge="end"> */}
              {/* //                             <ClearIcon/> */}
              {/* //                             </IconButton> */}
              {/* //                             </InputAdornment> */}
              {/* // */}
              {/* //                         }} */}
              {/*                 /> */}
              <div className="relative flex items-center  ">
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder={
                    columnFilterName === "reason_for_placing_unserviceable"
                      ? "Search Defect Here..."
                      : `Search SNOW Here...`
                  }
                  className="w-full h-full px-[1.17vw] text-lg border-2 border-gray-200 rounded-xl
                  focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition all"
                />
                <button
                  onClick={() => {
                    setSearchText("");
                  }}
                  className=" absolute  right-[0.59vw] text-[1.17vw] p-[0.29vw] bg-gray-400 rounded-full hover:bg-red-700 transition"
                >
                  <X
                    className="w-[0.88vw] h-[0.88vw] text-white"
                    strokeWidth={5}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
        {/*  <---Button for Open Entry Types where only OPEN entry is handled---> */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <button
              className={`flex items-center gap-[0.59vw]  text-[1.17vw] font-bold bg-blue-500  text-white dark:text-yellow-300 dark:bg-black  dark:hover:bg-gray-700 px-[1.17vw] py-[0.59vw] shadow-md rounded-lg hover:bg-blue-700 transition ${filter === "all" && " scale-105 "}`}
              onClick={() => setFilter("all")}
            >
              <List className="w-[1.46vw] " strokeWidth={3} />
              All Entry
            </button>
          </motion.div>

          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Badge
              badgeContent={openEntries.length}
              sx={{
                "& .MuiBadge-badge": {
                  height: "2.05vw",
                  borderRadius: "50%",
                  minWidth: "2.05vw",
                  fontSize: "1.17vw",
                  color: "white",
                  backgroundColor: "#ef4444",
                  boxShadow: "0 0 0.73vw 0.22vw #ffffff",
                  //                 animation:"glow 1.5s ease-in-out infinite alternate",
                },
                //           "@keyframes glow":{
                //               from:{
                //                    boxShadow:"0 0 5px 2px #ffffff",},
                //                      to:{
                //                    boxShadow:"0 0 15px 5px #ffffff",},}
              }}
            >
              <button
                className={`flex items-center gap-[0.59vw] text-[1.17vw]   font-bold bg-red-500 text-white dark:text-yellow-300 dark:bg-black  dark:hover:bg-gray-700 px-[1.17vw] py-[0.59vw] shadow-md rounded-lg hover:bg-red-700 transition ${filter === "openOnly" && "scale-105"}`}
                onClick={() => setFilter("openOnly")}
              >
                <FolderOpen className="w-[1.46vw] " strokeWidth={3} />
                Open Entry
              </button>
            </Badge>
          </motion.div>
        </Box>
      </Box>
      <Card className="shadow-lg rounded-xl">
        <CardContent className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] dark:from-gray-500 dark:via-gray-500 dark:to-gray-500  ">
          <div style={{ height: "30.74vw", width: "100%" }}>
            <DataGrid
              loading={dataLoading}
              rows={filteredParticularColumn}
              columns={[
                {
                  field: "ldh_no",
                  headerName: "DEFERRED NUMBER",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                  sortable: false,
                },

                {
                  field: "snow",
                  headerName: "SNOW",
                  flex: 1,

                  renderCell: (rowData) => {
                    const value =
                      rowData.row.change_of_serviceability_log?.snow || "N/A";
                    return HighlightSearchedText(value, searchText);
                  },
                  valueGetter: (value, row) => {
                    return row.change_of_serviceability_log?.snow;
                  },

                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: true,
                },
                //                 {
                //                   field: "user_time_date",
                //                   headerName: "ENTRY DATE",
                //                   flex: 2,
                //                    renderCell: (rowData) =>
                //                     rowData.row.change_of_serviceability_log?.user_time_date || "N/A",
                //                   headerAlign: "center",
                //                   align: "center",
                //                   disableColumnMenu: true,
                //                   sortable: false,
                //                 },

                //              {
                //                   field: "airframe_hrs",
                //                   headerName: "A/F HRS",
                //                   flex: 1,
                //                     renderCell: (rowData) =>
                //                     rowData.row.change_of_serviceability_log?.airframe_hrs || "N/A",
                //                   headerAlign: "center",
                //                   align: "center",
                //                   disableColumnMenu: true,
                //                   sortable: false,
                //                 },
                {
                  field: "reason_for_placing_unserviceable",
                  headerName: "DEFECT/LIMITATION DETAILS",
                  flex: 3,
                  //                    renderCell: (rowData) =>
                  //                     rowData.row.change_of_serviceability_log?.reason_for_placing_unserviceable || "N/A",
                  headerAlign: "center",
                  align: "left",
                  disableColumnMenu: true,
                  sortable: false,
                  renderHeader: () => (
                    <div className="flex">
                      <div> DEFECT/LIMITATION DETAILS</div>
                    </div>
                  ),
                  renderCell: (rowData) => {
                    const value =
                      rowData.row.change_of_serviceability_log
                        ?.reason_for_placing_unserviceable || "N/A";
                    return HighlightSearchedText(value, searchText);
                  },
                },
                {
                  field: "entryStatus",
                  headerName: "ENTRY STATUS",
                  flex: 1,
                  renderCell: (rowData) => (
                    //                     rowData.row.change_of_serviceability_log?.status || "N/A",
                    //                     const  statusValue = rowData.row.change_of_serviceability_log?.status;
                    //                     let displayStatus;
                    //
                    //                     if (statusValue === "2") {
                    //                         displayStatus = "Open";
                    //                         }
                    //                     else if (statusValue === "1"){
                    //                         displayStatus = "Closed";
                    //                         }
                    //                     else{
                    //                         displayStatus = "NA";
                    //                         }
                    //                     return displayStatus;

                    <span
                      style={{
                        color:
                          rowData.row.lim_def_removal_by === null
                            ? "red"
                            : "green",

                        fontWeight: "bold",
                      }}
                    >
                      {rowData.row.lim_def_removal_by === null
                        ? "OPEN"
                        : "CLOSE"}
                    </span>
                  ),

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
                            backgroundColor: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#ffffff"
                                : "#3b82f6",

                            color: (theme) =>
                              theme.palette.mode === "dark"
                                ? "#000000"
                                : "white",
                            fontWeight: "bold",
                            border: (theme) =>
                              theme.palette.mode === "dark"
                                ? "1px solid yellow"
                                : "",
                          }}
                          size="small"
                          onClick={() => handleOpenModel(rowData.row)}
                        >
                          View
                        </Button>
                      </motion.div>
                    </div>
                  ),
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              //
              disableColumnSelector
              sx={{
                border: 0,

                backgroundColor: (theme) =>
                  theme.palette.mode === "dark" ? "#3f3f3f" : "#F9FAFB",

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "black" : "#352A87",
                  color: "#FFFFFF",
                  fontWeight: "bold",
                  fontSize: "1.1vw",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid #ffffff"
                      : "0.073vw solid #708238",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                },

                "& .MuiDataGrid-cell": {
                  //  backgroundColor: "cream",
                  fontSize: "1vw ",
                  padding: "0.88vw",
                  border: (theme) =>
                    theme.palette.mode === "dark"
                      ? "1px solid #ffffff"
                      : "0.1vw solid #708238",
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#ffffff" : "#000000",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                },
                "& .MuiDataGrid-row:hover": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "gray" : "#F0F7FE ",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "#EDE9FE ",
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
      {modalOpen && (
        <DeferredLogGridModal
          data={selectedRow}
          onClose={handleCloseModel}
          prevSelectedRow={handlePrev}
          nextSelectedRow={handleNext}
        />
      )}
    </div>
  );
}
