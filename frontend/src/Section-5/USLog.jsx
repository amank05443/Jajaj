//new code
//
//import React, { useState, useEffect } from "react";
//import {
//  Button,
//  Table,
//  TableBody,
//  TableCell,
//  TableContainer,
//  TableHead,
//  TableRow,
//  Paper,
//  Typography,
//  Dialog,
//  DialogTitle,
//  DialogContent,
//  CircularProgress,
//  Tooltip,
//  Box,
//} from "@mui/material";
//import { useNavigate } from "react-router-dom";
////import useTableApi from '.../Utils/useTableApi';
//import axios from "axios";
//import dayjs from "dayjs";
//import { styled } from "@mui/material/styles";
//
//const StyledTableCell = styled(TableCell)(() => ({
//  background:
//    "linear-gradient(180deg,rgba(255,255,255,0.6),rgba(255,255,255,0.4))",
//  backdropFilter: "blur(6px) saturate(110%)",
//  WebkitBackdropFilter: "blur(6px) saturate(110%)",
//  borderBottom: "1px solid rgba(15,23,42,0.05)",
//  transition: "background .22s ease",
//  fontSize: "0.9rem",
//  fontWeight: 500,
//  color: "#0f172a",
//  "&:hover": {
//    background:
//      "linear-gradient(90deg,rgba(99,102,241,0.07),rgba(255,255,255,0.55))",
//  },
//}));
//
//const StyledTableRow = styled(TableRow)(() => ({
//  cursor: "pointer",
//  transition: "transform .22s ease, box-shadow .22s ease, background .22s ease",
//  "&:hover": {
//    transform: "translateY(-3px)",
//    boxShadow: "0 8px 24px rgba(15,23,42,0.08)",
//  },
//}));
//
//const USLog = () => {
//  const navigate = useNavigate();
////  const [entries, setEntries] = useState([]);
//  //    const {data,loading,update,create} = useTableApi('');
////  const [openDialog, setOpenDialog] = useState(false);
////  const [selectedRowId, setSelectedRowId] = useState(null);
//  const [rowDetails, setRowDetails] = useState(null);
////  const [loadingDetails, setLoadingDetails] = useState(true);
//useEffect(()=>{
//                axios.get('http://localhost:8000/api/serviceability-log/')
//                .then((res)=>{
//                console.log("Fetched data:",res.data);
//                setRowDetails(res.data);
//                })
//                .catch((err)=>{
//                  console.error("Error fetching:",err);
//                  });
//                  },[]);
//
//  return (
//    <div
//      style={{
//        padding: 20,
//        height: "100vh",
//        //        backgroundImage: 'url("/images/background.jpg")',
//        backgroundColor: "#bfdbfe",
//        backgroundSize: "cover",
//        backgroundRepeat: "no-repeat",
//        backgroundPosition: "center",
//      }}
//    >
//      <Box sx={{ p: 1.5 }}>
//        <Typography
//          variant="h3"
//          fontFamily="Algerian"
//          align="center"
//          gutterBottom
//          fontWeight={600}
//          color="#f50057"
//          letterSpacing={3}
//          sx={{
//            background: "linear-gradient(45deg,#FE6B8B,#FF8E53)",
//            WebkitBackgroundClip: "text",
//            WebkitTextFillColor: "transparent",
//            textShadow: "2px 2px 4px rgba(0,0,0,0.4)",
//          }}
//        >
//          Change of Serviceability Log
//        </Typography>
//      </Box>
//
//      <Box
//        sx={{
//          display: "flex",
//          justifyContent: "space-between",
//          width: "100%",
//          padding: "16px",
//        }}
//      >
//        <Button
//          variant="contained"
//          color="primary"
//          onClick={() => navigate("/newEntryForUSLog")}
//        >
//          New Entry
//        </Button>
//        <Box
//          sx={{
//            display: "flex",
//            gap: 2,
//          }}
//        >
//          <Button
//            variant="contained"
//            sx={{
//              backgroundColor: "primary",
//              color: "white",
//            }}
//            onClick={() => navigate("/newEntryForUSLog")}
//          >
//            All Entry
//          </Button>
//
//          <Button
//            variant="contained"
//            sx={{
//              backgroundColor: "red",
//              color: "white",
//            }}
//            onClick={() => navigate("/newEntryForUSLog")}
//          >
//            Open Entry
//          </Button>
//        </Box>
//      </Box>
//
//      <TableContainer
//        component={Paper}
//        style={{
//          marginTop: 20,
//          p: 4,
//          borderRadius: 3,
//          backgroundColor: "rgba(255,255,255,0.1)",
//          backdropFilter: "blur(10px)",
//          WebkitBackdropFilter: "blur(10px)",
//          border: "1px solid rgba(255,255,255,0.3)",
//          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.37)",
//          width: "100%",
//          mt: 5,
//        }}
//      >
//        <Table>
//          <TableHead>
//            <TableRow sx={{ backgroundColor: "#1976d2" }}>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "10%" }}>
//                SNOW
//              </StyledTableCell>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "30%" }}>
//                How Found
//              </StyledTableCell>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "30%" }}>
//                Reason
//              </StyledTableCell>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "10%" }}>
//                Status
//              </StyledTableCell>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "10%" }}>
//                Details
//              </StyledTableCell>
//              <StyledTableCell sx={{ fontWeight: "bold", width: "10%" }}>
//                Action
//              </StyledTableCell>
//            </TableRow>
//          </TableHead>
//          {/*<TableBody>
//                        {entries.map((row) => {const isClosed = !!row.status; return (
//                            <TableRow key={row.id}>
//                                <TableCell>{isClosed ? 'Closed':'Open'}</TableCell>
//                                <TableCell>{dayjs(isClosed ? row.closed_at:row.created_at).format('YYYY-MM-DD HH:mm')}</TableCell>
//                                <TableCell>{row.snow}</TableCell>
//                                <TableCell>{row.afHours}</TableCell>
//                                <TableCell>{row.reasonUS}</TableCell>
//                                <TableCell>
//                                    <Tooltip title={isClosed ? 'View Details' : 'Clear U/S'}>
//                                        <Button variant="contained" size="small" onClick={() => handleClick(row)}>
//                                            {isClosed ? 'View' : 'Continue'}
//                                        </Button>
//                                    </Tooltip>
//                                </TableCell>
//                            </TableRow>
//                        )})}
//                    </TableBody>*/}
//          <TableBody>
//            <StyledTableRow>
//              <StyledTableCell>{}</StyledTableCell>
//              <StyledTableCell>2022-10-12 15:17</StyledTableCell>
//              <StyledTableCell>AE</StyledTableCell>
//              <StyledTableCell>1227</StyledTableCell>
//              <StyledTableCell>Open</StyledTableCell>
//              <StyledTableCell>
//                <Tooltip title="Clear U/S">
//                  <Button variant="contained" size="small">
//                    Continue
//                  </Button>
//                </Tooltip>
//              </StyledTableCell>
//            </StyledTableRow>
//          </TableBody>
//        </Table>
//      </TableContainer>
//    </div>
//  );
//};
//export default USLog;

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "../Utils/CustomHooks/useParams";
import GridModal from "./USLogGridModal";
import axios from "axios";
export default function USLog() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const { params, loading } = useParams();

  useEffect(() => {
    const aircraft_master_id = params.aircraft_master_id;
    setSelectedAircraft(aircraft_master_id);
    console.log(selectedAircraft);
    if (selectedAircraft) {
      axios
        .get(`http://localhost:8000/api/serviceability-log/${selectedAircraft}`)
        .then((res) => {
          setRows(res.data);
          console.log("Fetched data:", res.data);
        })
        .catch((err) => {
          console.error("Error fetching:", err);
        });
    }
  }, [loading, params, selectedAircraft]);

  const filteredRows =
    filter === "all" ? rows : rows.filter((row) => row.status_label === "OPEN");

  const handleOpenModel = (data) => {
    setModalOpen(true);
    setSelectedRow(data);
  };

  const handleCloseModel = () => {
    setModalOpen(false);
    setSelectedRow(null);
  };

  const handlePrev = () => {
    if (!selectedRow) return;
    const rowIndex = rows.findIndex((r) => r.snow === selectedRow.snow);
    if(rowIndex==0){alert("THIS IS THE FIRST SNOW")};
    if (rowIndex <= 0) return;
    setSelectedRow(rows[rowIndex - 1]);
    console.log(selectedRow);
  };

  const handleNext = () => {
    if (!selectedRow) return;
    const rowIndex = rows.findIndex((r) => r.snow === selectedRow.snow);
    if(rowIndex==rows.length - 1){alert("THIS IS THE LAST SNOW")};
    if (rowIndex >= rows.length - 1) return;
    setSelectedRow(rows[rowIndex + 1]);

  };
    const handleAction=(data)=>{
        navigate("/clearUsLog",{state:data});
        console.log(data);
        };


  return (
    <div className="bg-gray-100 min-h-screen items-center justify-center">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 p-1 m-1 ml-2 mr-2">
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
          Change of Serviceability Log
        </h2>
      </div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/uSLogForm")}
        >
          New Entry
        </Button>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            //            sx={{
            //              backgroundColor: "primary",
            //              color: "white",
            //            }}
            onClick={() => setFilter("all")}
          >
            All Entry
          </Button>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
            }}
            onClick={() => setFilter("openOnly")}
          >
            Open Entry
          </Button>
        </Box>
      </Box>

      <Card className="shadow-lg rounded-xl">
        <CardContent className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0]  ">
          <div style={{ height: 420, width: "100%" }}>
            <DataGrid
              rows={filteredRows}
              columns={[
                {
                  field: "snow",
                  headerName: "SNOW",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                },
                {
                  field: "occasion",
                  headerName: "HOW FOUND",
                  flex: 2,
                  renderCell: (rowData) =>
                    rowData.row.how_found_defect?.occasion || "N/A",
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },

                {
                  field: "reason_for_placing_unserviceable",
                  headerName: "REASON",
                  flex: 2,
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                },

                {
                  field: "status_label",
                  headerName: "STATUS",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                  renderCell: (rowData) => (
                    <span
                      style={{
                        color:
                          rowData.value === "CLOSED"
                            ? "green"
                            : rowData.value === "OPEN"
                              ? "red"
                              : "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {rowData.value}
                    </span>
                  ),
                },
                {
                  field: "Details",
                  headerName: "DETAILS",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                  renderCell: (rowData) => (
                    //                  rowData.row.status_label === "open" ?
                    <div
                    //                       style={{
                    //                         display: "flex",
                    //                         justifyContent: "center",
                    //                         alignItems: "center",
                    //                         height: "100%",
                    //                       }}
                    >
                      <Button
                        variant="contained"
                        size="small"
                        color="info"
                        onClick={() => handleOpenModel(rowData.row)}
                      >
                        View
                      </Button>
                    </div>
                  ),
                },

                {
                  field: "Action",
                  headerName: "ACTION",
                  flex: 1,
                  headerAlign: "center",
                  align: "center",
                  disableColumnMenu: true,
                  sortable: false,
                  renderCell: (rowData) =>
                    rowData.row.status_label === "OPEN" ? (
                      <div
                      //                         style={{
                      //                           display: "flex",
                      //                           justifyContent: "center",
                      //                           alignItems: "center",
                      //                           height: "100%",
                      //                         }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="info"
                          onClick={() => handleAction(rowData.row)}
                        >
                          Close Here
                        </Button>{" "}
                      </div>
                    ) : (
                      <span
                        style={{
                          color: "green",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        N/A
                      </span>
                    ),
                },
              ]}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableColumnSelector
              //               disableColumnMenu

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
      {/*         <Modal open={modalOpen} onClose={handleCloseModel}> */}
      {/*                        <Box */}
      {/*                       sx={{ */}
      {/*                           position: "absolute", */}
      {/*                           top: "50%", */}
      {/*                           left: "50%", */}
      {/*                           transform:"translate(-50%,-50%)", */}
      {/*                           width:400, */}
      {/*                           backgroundColor:"background.paper", */}
      {/*                            borderRadius:2, */}
      {/*                            p:4, */}
      {/*                            boxShadow:24, */}
      {/*                        }} */}
      {/*                          > */}
      {/*                         <Typography */}
      {/*                             variant="h6" */}
      {/*                            mb={2}> */}
      {/*                         Details Info */}
      {/*                         </Typography> */}

      {/*                         { selectedRow ? ( */}
      {/*                             <div> */}
      {/*                                 <Typography> SNOW: {selectedRow.snow} </Typography> */}
      {/*                                 <Typography> 453563 </Typography> */}
      {/*                                 <Typography> SNOW </Typography> */}
      {/*                                 <Typography> SNOW </Typography> */}
      {/*                                 <Typography> SNOW </Typography> */}
      {/*                                 </div> */}
      {/*                                 ) : ( */}
      {/*                                     <Typography> NO DATA </Typography> */}
      {/*                                     ) */}

      {/*                         } */}
      {/*                         </Box> */}
      {/*                        </Modal> */}

      {modalOpen && (
        <GridModal
          data={selectedRow}
          onClose={handleCloseModel}
          prevSelectedRow={handlePrev}
          nextSelectedRow={handleNext}
        />
      )}
    </div>
  );
}
