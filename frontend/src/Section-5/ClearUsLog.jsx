import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem
} from "@mui/material";
import * as yup from "yup";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import TradeSupAto from "../Authentication/AuthenticationTwo";
// import { Dialog, DialogTitle, DialogContent, TextFiled, DialogActions, Button} from "@mui/material";


import BasicWeightAndMoment from "../Section-9/BasicWeightAndMoment";
import CompassLog from "../Section-10/CompassLog";
import SoftwareLogEntry from "../Section-2/SoftwareLogEntry"
import RoleChangeLogEntry from "../Section-9/RoleChangeLogEntry"

import { X, Plane } from "lucide-react";
import { FaMapMarkerAlt, FaTools, FaUser, FaClock } from "react-icons/fa";
import dayjs from "dayjs";

function formatDateTime(isoString) {
  if (!isoString) return { date: "", time: "" };
  const dateObj = dayjs(isoString);
  const date = dateObj.format("DD/MM/YYYY");
  const time = dateObj.format("HH:mm");
  return { date, time };
}

const ClearUsLog = ({ defect }) => {
     const { params, loading } = useParams();
  const [formError, setFormError] = useState(null);
  const [wbData, setWbData] = useState({});
  const [compassData, setCompassData] = useState({});
  const [formData, setFormData] = useState([]);
    const [items, setItems] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const gridData = location.state;
  console.log(gridData);

  useEffect(()=>{
      if(!gridData){
          navigate("/usLog",{replace:true});
          }},[gridData,navigate]);

  const { date, time } = formatDateTime(gridData?.user_time_date);
  useEffect(() => {
      console.log("amruth");
      const params = JSON.parse(sessionStorage.getItem('params'));
      if (params && params.aircraft_type_id){
          fetchItems(params.aircraft_type_id);
          }
      }, []);
  const fetchItems = async (aircrafttypeid) => {
      try{
          const response = await fetch(`http://localhost:8000/api/get_items/?aircraft_type_id=${aircrafttypeid}`);
          const data = await response.json();
          console.log('Fetched Items:', data);
          } catch (error) {
              console.log('Error fetching items:', error);
              }
          };
  const methods = useForm({
    defaultValues: {
      workDone: "",
      manHrs: "",
      tradesmen: 0,
      supervisor: 0,
      remarks: "",
      workDateTime: new Date().toISOString().slice(0, 16),
      manHours: "",
      limitaion: false,
      defered: false,
      husbandary: false,
      concession: false,
      entryEIE: false,
      lseChecks: false,
      indeChecks: false,
    },
  });

  const handleWbData = (data) => {
    console.log(data);
    setWbData(data);
  };
  const handleCompassData = (data) => {
    setCompassData(data);
  };
  const [openLimitation, setOpenLimitation] = useState(false);
  const [limitationText, setLimitationText] = useState("");
  const [deferedText, setDeferedText] = useState("");
  const [openDefered, setOpenDefered] = useState("");
  const handleLimitationChange = (event) => {
         if (event.target.checked) {
              setOpenLimitation(true);
              }
          else {
              setOpenLimitation(false);
              }
          };
      const handleDeferedChange = (event) => {
          if(event.taget.checked){
              setOpenDefered(true);
              }
          else{
              setOpenDefered(false);
              }
          };
      const handleCloseDefered = () =>{
          setOpenDefered(false);
          };
      const handleCloseLimitation = () => {
          setOpenLimitation(false);
          };
      const [systemAffected, setSystemAffected] = useState("");
      const [partNumber, setPartNumber] = useState("");


  useEffect(() => {
    if (gridData?.entry_type == 2025101) {
      setFormData(wbData);
    }
    if (gridData?.entry_type == 2025104) {
      setFormData(compassData);
    }
  }, [wbData, compassData]);
  console.log("formData:", formData);
   useEffect(() => {
           if (openLimitation) {
               fetch("http://localhost:8000/api/items/")
               .then((res) => res.json())
               .then((data) => setItems(data))
               .catch((err) => console.error("Error fetching items:", err));
               }
           }, [openLimitation]);

  const {
    register,
    formState: { errors },
    watch,
  } = methods;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      formData: formData,
      gridData: gridData,
    };
console.log(payload)
    if (payload) {
      try {
        const res = await fetch("/api/clear_us_log/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to save data");
        const data = await res.json();
        console.log("Saved:", data);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Blundeeeeer");
    }
  };
  return (
    <Box
      p={4}
      className="min-h-screen"
      /*
      sx={{background:"linear-gradient(135deg,#0f1710 0%, #312e81 30%, #7c3aed 100%)",}}
 */
      /*
      className="min-h-screen bg-gradient-to-r from-emerald-200 via-teal-200 to-rose-400 space-y-4"
 */
    >
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 mt-1 mb-4">
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
          CLEAR SERVICEABILITY LOG
        </h2>
      </div>
      {/*      Info Bar */}
      <div className="space-y-4">
        <div className="">
          <div
            className=" bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0]   rounded-xl w-auto max-w-8xl p-4 sm:p-6 flex flex-col
         gap-4 max-h-[90vh] overflow-x-auto "
          >
            {/* <div className="flex justify-center items-center font-extrabold text-3xl ">
              <Plane size={35} color="white" />
              &nbsp;&nbsp;
              <div> DEFECT INFO</div>
            </div> */}
            <div className="rounded-lg pt-2 pl-2 pr-2 flex flex-col break-all">
              <div className="grid grid-cols-5 text-center text-black-600 border-white min-w-[500px] font-bold">
                <div className="border border-green-800"> DATE & TIME </div>
                <div className="border border-green-800"> SNOW </div>
                <div className="border border-green-800"> A/F HRS </div>
                <div className="border border-green-800"> HOW FOUND </div>
                <div className="border border-green-800"> BY WHOM </div>
              </div>
              <div className="grid grid-cols-5 text-center text-gray-500 pb-2 min-w-[500px] ">
                <div className="border border-green-800">
                  {date} <br /> {time}
                </div>
                <div className="border border-green-800"> {gridData?.snow} </div>
                <div className="border border-green-800">
                  {" "}
                  {gridData?.airframe_hrs}{" "}
                </div>
                <div className="border border-green-800">
                  {" "}
                  {gridData?.how_found_defect?.occasion || "N/A"}{" "}
                </div>
                <div className="border border-green-800">
                  {" "}
                  {gridData?.by_whom?.user_name?.toUpperCase() +
                    "," +
                    gridData?.by_whom?.rank?.abbreviation || "N/A"}{" "}
                </div>
              </div>
              <div className="flex p-4 border border-green-800">
                <h2 className="font-bold text-black-600 ">
                  REASON FOR PLACING UNSERVICEABLE &nbsp;:
                </h2>
                <p className="text-gray-600">
                  &nbsp;&nbsp;&nbsp;{gridData?.reason_for_placing_unserviceable}
                </p>
              </div>
            </div>
            <div className="mt-6 border border-green-700 rounded-lg p-4 bg-gray-100">
                  <h3 className="text-lg font-semibold text-green-900 border-b-2 border-b-2 border-green-700 pb-2 mb-6 text-center">
                      RECORD OF WORK CARRIED OUT, REPLACMENT ETC.
                      </h3>
                      {/* ---ldhc checkbox Section ---*/}
                        <div className="flex flex-wrap items-center gap-6 mb-8 justify-center">
                            <div className="flex items-center gap-2 font-semibold text-gray-700">
                                <label className="font-semibold text-gray-700">Limitation</label>
                                <input
                                    type="checkbox"
                                    {...register("limitaion")}
                                    onChange={handleLimitationChange}
                                    className="w-5 h-5 accent-green-700"
                                    />

                                <label className="font-semibold text-gray-700">Defered</label>
                                <input
                                type="checkbox"
                                {...register("defered")}
                                onChange={handleDeferedChange}
                                className="w-4 h-5 accent-green-700"
                                />

                                <label className="font-semibold text-gray-700">Husbandary</label>
                                <input
                                type="checkbox"
                                {...register("husbandary")}
                                className="w-4 h-5 accent-green-700"
                                />

                                <label className="font-semibold text-gray-700">Concession</label>
                                <input
                                type="checkbox"
                                {...register("concession")}
                                className="w-4 h-5 accent-green-700"
                                />

                                <label className="font-semibold text-gray-700">Independtent Checks</label>
                                <input
                                type="checkbox"
                                {...register("indeChecks")}
                                className="w-4 h-5 accent-green-700"
                                />

                                <label className="font-semibold text-gray-700">Loose Article Checks</label>
                                <input
                                type="checkbox"
                                {...register("lseChecks")}
                                className="w-4 h-5 accent-green-700"
                                />

                                <label className="font-semibold text-gray-700">Entry In Error</label>
                                <input
                                type="checkbox"
                                {...register("entryEIE")}
                                className="w-4 h-5 accent-green-700"
                                />
                          </div>
                  </div>

                {/* --- work done details section --- */}
                <div className="mb-8">
                      <TextField
                            label="Details of Work Carried Out, Replacement etc."
                            variant="outlined"
                            fullWidth
                            {...register("remarks")}
                            className="mb-4"
                            />
                </div>

                      <div className="flex md: flex-row gap-6">

                          <TextField
                            label="Select Date & Time"
                            type="datetime-local"
                            InputLabelProps={{ shrink: true}}
                            fullWidth
                            {...register("workDateTime")}
                            inputProps={{ min: new Date().toISOString().slice(0, 16) }}
                            />

                            <TextField
                        label="Man Hours"
                        type="number"
                        inputProps={{ min: 0, step: 0.5}}
                        fullWidth
                        {...register("manHours")}
                        />
                        </div>

                </div>
          </div>
        </div>
        <div>
          <motion.div

            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FormProvider {...methods}>
              <form>
                <Paper className="p-4 shadow-md">
                  {gridData?.entry_type == 2025104 && (
                    <CompassLog compassData={handleCompassData} />
                  )}
                  {gridData?.entry_type == 2025101 && (
                    <BasicWeightAndMoment wbData={handleWbData} />
                  )}
              {/*  Attaching the software modification form with Clear Serviceability Log  Suman@LEMAR */}
              {gridData?.entry_type === 2025112 && (
                    <SoftwareLogEntry />
                  )}
                  {gridData?.entry_type == 2025111 && (
                    <RoleChangeLogEntry />
                    )}
                </Paper>
              </form>
              <div className="flex justify-center mt-2">
                <TradeSupAto snowId={202520333} />
              </div>

              <button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
//                                 disabled={!isAuthenticated}
                className="primary p-4"
              >
                Submit
              </button>
            </FormProvider>
          </motion.div>

         </div>
      </div>
       {/* limitaion popup */}



          <Dialog open={openLimitation} onClose={handleCloseLimitation}>
              <DialogTitle className="font-bold text-green-800">Limitation Details</DialogTitle>
              <DialogContent className="space-y-4">
                  <TextField
                  autoFocus
                  margin="dense"
                  label="Enter Limitation Details"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={limitationText}
                  onChange={(e) => setLimitationText(e.target.value)}
                  />
                  <TextField
                  select
                  label="System Affected"
                  fullWidth
                  variant="outlined"
                  value={systemAffected}
                  onChange={(e) => setSystemAffected(e.target.value)}
                  SelectProps={{
                      MenuProps: {
                          PaperProps: {
                              style: {
                                  maxHeight: 200,
                                  width: 300,
                                  },
                              },
                          },
                      }}
                  >
                  <MenuItem value="">Select System</MenuItem>
                  {items.map((item) => (
                      <MenuItem key={item.id} value={item.part_number}>
                          {item.part_number},{item.description}
                          </MenuItem>
                          ))}
                  </TextField>
                   <TextField
                  select
                  label="Select Part Number"
                  fullWidth
                  variant="outlined"
                  value={systemAffected}
                  onChange={(e) => setSystemAffected(e.target.value)}
                  >
                  <MenuItem value="">Select System</MenuItem>
                  <MenuItem value="Engine">Engine</MenuItem>
                  <MenuItem value="Hydraulics">Hydraulics</MenuItem>
                  </TextField>

              </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseLimitation} color="error">Cancel</Button>
                <Button
                onClick={() => {
                    handleCloseLimitation();
                    console.log("Limitation details:", limitationText);
                    }}
                color="primary"
                variant="contained"
                >
                Save
                </Button>
              </DialogActions>
          </Dialog>

                   <Dialog open={openDefered} onClose={handleCloseDefered}>
              <DialogTitle className="font-bold text-green-800">Defered Details</DialogTitle>
              <DialogContent className="space-y-4">
                  <TextField
                  autoFocus
                  margin="dense"
                  label="Enter Defered Details"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={deferedText}
                  onChange={(e) => setDeferedText(e.target.value)}
                  />
                  <TextField
                  select
                  label="System Affected"
                  fullWidth
                  variant="outlined"
                  value={systemAffected}
                  onChange={(e) => setSystemAffected(e.target.value)}
                  >
                  <MenuItem value="">Select System</MenuItem>
                  <MenuItem value="Engine">Engine</MenuItem>
                  <MenuItem value="Hydraulics">Hydraulics</MenuItem>
                  </TextField>
                   <TextField
                  select
                  label="Select Part Number"
                  fullWidth
                  variant="outlined"
                  value={systemAffected}
                  onChange={(e) => setSystemAffected(e.target.value)}
                  >
                  <MenuItem value="">Select System</MenuItem>
                  <MenuItem value="Engine">Engine</MenuItem>
                  <MenuItem value="Hydraulics">Hydraulics</MenuItem>
                  </TextField>

              </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDefered} color="error">Cancel</Button>
                <Button
                onClick={() => {
                    handleCloseDefered();
                    console.log("Limitation details:", limitationText);
                    }}
                color="primary"
                variant="contained"
                >
                Save
                </Button>
              </DialogActions>
          </Dialog>
    </Box>
  );
};
export default ClearUsLog;
