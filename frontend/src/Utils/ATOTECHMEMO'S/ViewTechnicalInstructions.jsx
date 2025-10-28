import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "../CustomHooks/useParams";
import axios from "axios";
import GridModal from "../../Section-5/USLogGridModal";
import useTableApi from "../CustomHooks/useTableApi";
import { X, Plane } from "lucide-react";
import { motion } from "framer-motion";
import dayjs from "dayjs";


import {
    Modal,
  Card,
  CardContent,
  Container,
  IconButton,
  Button,
  Select,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Dialog,
  MenuItem,
  DialogTitle,
  Autocomplete,
} from "@mui/material";

const ViewTechnicalInstructions = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("");
   const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all");
  const [selectedRow, setSelectedRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const { params, loading } = useParams();


  const tabs = [
    { label: "STI", color: "bg-green-300" },
    { label: "SI", color: "bg-blue-300" },
    { label: "NTI", color: "bg-purple-300" },
    { label: "ALOTechMemos", color: "bg-yellow-200" },
    { label: "AEOTechMemos", color: "bg-pink-300" },
  ];
  const [formData, setFormData] = useState({
    heading: "",
    reasonForIssue: "",
    recording: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Heading: ${formData.heading}\nReason: ${formData.reason}`);
  };
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
     const filteredRows =
    filter === "all" ? rows : rows.filter((row) => row.status_label === "OPEN");
//     const { data, loading } = useTableApi("compass_calibration_logs");
//   if (loading) {
//     <p>Loading...</p>;
//   }
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

  return (
    <div style={{ padding: 15 }}>
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-14 mt-1 mb-1">
        <h4
          className="absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "30px",
            margin: 6,
            fontFamily: "Algerian",
          }}
        >
          Technical Instruction's
        </h4>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-14 mt-1 mb-1">
        <div className="flex justify-between">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex-1 py-4 text-center font-semibold rounded-md shadow-md transition
                 ${tab.color} ${activeTab === tab.label ? "ring-4 ring-offset-1 ring-indigo-500" : "opacity-90 hover:opacity-100"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/*     <div className=""> */}
      {/*          <div className=""> */}
      {/*               <div className=""> */}
      {/*                   <form */}
      {/*                   onSubmit={handleSubmit} */}
      {/*                   className="bg-white p-6 rounded shadow-md w-full max-w-lg"> */}
      {/*                   <div className="flex items-center mb-4"> */}
      {/*                       <label className="w-32 font-medium text-gray-600">Heading:</label> */}
      {/*                       <input */}
      {/*                       type="text" */}
      {/*                       name="heading" */}
      {/*                       value={formData.heading} */}
      {/*                       onChange={handleChange} */}
      {/*                       placeholder="Enter heading" */}
      {/*                       className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" */}
      {/*                       /> */}
      {/*                       </div> */}
      {/*                       <div className="flex items-center mb-4"> */}
      {/*                           <label className="w-32 font-medium text-gray-600">Reason For Instruction:</label> */}
      {/*                       <input */}
      {/*                       type="text" */}
      {/*                       name="heading" */}
      {/*                       value={formData.reasonForIssue} */}
      {/*                       onChange={handleChange} */}
      {/*                       placeholder="Enter Reason For Instruction" */}
      {/*                       className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" */}
      {/*                       /> */}
      {/*                       </div> */}
      {/*                       <div className="flex items-center mb-4"> */}
      {/*                           <label className="w-32 font-medium text-gray-600">Recording:</label> */}
      {/*                       <input */}
      {/*                       type="text" */}
      {/*                       name="heading" */}
      {/*                       value={formData.recording} */}
      {/*                       onChange={handleChange} */}
      {/*                       placeholder="Enter recording" */}
      {/*                       className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" */}
      {/*                       /> */}
      {/*                       </div> */}
      {/*                       <div className="col-span-3 flex justify-end mt-1"> */}
      {/*           <button */}
      {/*             onClick={() => navigate("/CompassLogView")} */}
      {/*             className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700" */}
      {/*           > */}
      {/*             Submit */}
      {/*           </button> */}
      {/*         </div> */}
      {/*                       </form> */}
      {/*                   </div> */}
      {/*                   </div> */}
      {/*                   </div> */}

      <div className="bg-gray-100 min-h-screen items-center justify-center">
         <Card className="shadow-lg rounded-xl">
         <CardContent className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0]  ">
            <h2 className="text-lg text-center font-bold mb-2">{activeTab}</h2>
          <div style={{ height: 420, width: "100%" }}>
                              <DataGrid
              rows={filteredRows}
                columns={[
                  {
                    field: "snow",
                    headerName: "Sl.No",
                    flex: 1,
                    headerAlign: "center",
                    align: "center",
                  },
                  {
                    field: "occasion",
                    headerName: "Heading",
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
                    headerName: "Technical Instruction No.",
                    flex: 2,
                    headerAlign: "center",
                    align: "center",
                    disableColumnMenu: true,
                    sortable: false,
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

                    <div
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
                  "& .MuiDataGrid-cell": {
               backgroundColor: "cream",
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
{/* <thead> */}
{/*                     <tr className="bg-blue-900 text-white text-left"> */}
{/*                         <th className="px-4 py-2 border border-gray-400">Sl. No.</th> */}
{/*                         <th className="px-4 py-2 border border-gray-400">Heading</th> */}
{/*                         <th className="px-4 py-2 border border-gray-400">Technical Instruction No.</th> */}
{/*                         <th className="px-4 py-2 border border-gray-400">Action</th> */}
{/*                         </tr> */}
{/*                         </thead> */}
{/* <tbody> */}
{/*             {loading ? ( */}
{/*                 <tr> */}
{/*                     <td colSpan= "4" className="text-center py-4 text-gray-500 italic"> */}
{/*                         Loading... */}
{/*                         </td> */}
{/*                         </tr> */}
{/*                         ) : rows.length > 0 ? ( */}
{/*                             rows.map((row, index) => ( */}
{/*                                 <tr key={row.id} className="hover:bg-gray-100"> */}
{/*                                     <td className="px-4 py-2 border border-gray-300 text-center"> */}
{/*                                         {index + 1} */}
{/*                                         </td> */}
{/*                                         <td className="px-4 py-2 border border-gray-300">{row.snow}</td> */}
{/*                                         <td className="px-4 py-2 border border-gray-300">{row.snow}</td> */}
{/*                                         <td className="px-4 py-2 border border-gray-300 text-center"> */}
{/*                                             <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"> */}
{/*                                                 View </button> */}
{/*                                                 </td> */}
{/*                                                 </tr> */}
{/*                                                 )) */}
{/*                                             ) : ( */}
{/*                                                 <tr> */}
{/*                                                     <td colSpan="4" className="text-center py-4 text-gray-500 italic"> */}
{/*                                                         No rows */}
{/*                                                         </td> */}
{/*                                                         </tr> */}
{/*                                                 )} */}
{/*                                             </tbody> */}

          </div>
          </CardContent>
        </Card>
      </div>
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
};
export default ViewTechnicalInstructions;
