import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import TradeSupAto from "../Authentication/AuthenticationTwo";

import BasicWeightAndMoment from "../Section-9/BasicWeightAndMoment";
import CompassLog from "../Section-10/CompassLog";
import SoftwareLogEntry from "../Section-2/SoftwareLogEntry"
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
} from "@mui/material";
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
  const [formError, setFormError] = useState(null);
  const [wbData, setWbData] = useState({});
  const [compassData, setCompassData] = useState({});
  const [formData, setFormData] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  const gridData = location.state;
  console.log(gridData);

  useEffect(() => {
    if (!gridData) {
      navigate("/usLog", { replace: true });
    }
  }, [gridData, navigate]);

  const { date, time } = formatDateTime(gridData?.user_time_date);

  const methods = useForm({
    defaultValues: {
      workDone: "",
      manHrs: "",
      tradesmen: 0,
      supervisor: 0,
    },
  });

  const handleWbData = (data) => {
    console.log(data);
    setWbData(data);
  };
  const handleCompassData = (data) => {
    setCompassData(data);
  };

  useEffect(() => {
    if (gridData?.entry_type == 2025101) {
      setFormData(wbData);
    }
    if (gridData?.entry_type == 2025104) {
      setFormData(compassData);
    }
  }, [wbData, compassData]);
  console.log("formData:", formData);

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
    if (payload) {
      try {
        const res = await fetch("/api/clearUsLog/", {
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
                <div className="border border-green-800">
                  {" "}
                  {gridData?.snow}{" "}
                </div>
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
          </div>
        </div>
        <div>
          <motion.div
            //           key={ExtraForm ? "with-extra" : "only-basic"}
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
              {gridData?.entry_type == 2025112 && (
                    <SoftwareLogEntry />
                  )}
                  {gridData?.entry_type == 2025111 && (
                    <TextField
                      variant="outlined"
                      className="mb-6"
                      label="Enter the details of Work Done."
                    />)}
                </Paper>
              </form>
              <div className="flex justify-center mt-2">
                <TradeSupAto snowId={202520333} />
              </div>
              <button
                onClick={handleSubmit}
                type="submit"
                variant="contained"
                //                 disabled={!isAuthenticated}
                className="hidden primary p-4"
              >
                Submit
              </button>
            </FormProvider>
          </motion.div>
        </div>
      </div>
    </Box>
  );
};
export default ClearUsLog;
