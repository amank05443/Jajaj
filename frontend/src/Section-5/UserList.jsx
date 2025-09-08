import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useParams } from "../Utils/CustomHooks/useParams";
import useValidation from "../Utils/CustomHooks/useValidation";
import dayjs from "dayjs";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Button,
  Box,
  Card,
  CardContent,
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

const USLogForm = () => {
  //   const [form, setForm] = useState({
  //     aircraft_master_id: "",
  //     airframe_hrs: "",
  //     reason_for_placing_unserviceable: "",
  //     system_time_date: "",
  //   });
  const { formData, errors, handleChange, validateAll, setFormData } =
    useValidation(
      {
        entryType: "",
        howFound: "",
        dateAndTime: "",
        airframeHrs: "",
        aircraft_master_id: "",
        reason_for_placing_unserviceable: "",
        system_time_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        entryType: { required: true },
        howFound: { required: true },
        dateAndTime: { dateTimeNotBeforeNow: true },
        airframeHrs: { required: true },
        aircraft_master_id: { required: true },
        reason_for_placing_unserviceable: { alphaNumeric: true },
        system_time_date: { required: true },
      },
    );
  const { register, watch } = useForm();
  const { params, loading3 } = useParams();
  const { data: howFound, loading } = useTableApi("how_found_defects");
  const { data: entryType, loading1 } = useTableApi("entry_types");
  //   const { data: aircraftMaster, loading2 } = useTableApi("aircraft_masters", {
  //     id: params.aircraft_master_id,
  //   });

  const [user, setUser] = useState({ name: "", rank: "" });
  const [afHours, setAfHours] = useState("");
  const authCode = watch("authCode");
  const [open, setOpen] = useState(false);

  const [aircraftMaster, setAircraftMaster] = useState(null);
  useEffect(() => {
    if (!loading3) {
      const aircraft_master_id = params.aircraft_master_id;
      if (aircraft_master_id) {
        axios
          .get(`/api/leadingParticularsOfAircraft/${aircraft_master_id}`)
          .then((response) => {
            setAircraftMaster(response.data);
          })
          .catch((error) => {
            console.error("Error aircraft Marks:", error);
          });
      }
    }
  }, [params, loading3]);

  useEffect(() => {
    if (aircraftMaster) {
      setFormData((prev) => ({ airframeHrs: aircraftMaster.airframe_hrs }));
    }
  }, [aircraftMaster, setFormData]);

  useEffect(() => {
    if (authCode === "1234") {
      setUser({ name: "🤪JASPER PANDA", rank: "LEMA(R)" });
    } else {
      setUser({ name: "", rank: "" });
    }
  }, [authCode]);

  //   useEffect(() => {
  //     const nowLocal = new Date()
  //       .toLocaleString("sv-SE")
  //       .replace("", "T")
  //       .slice(0, 16);
  //     setValue("timestamp", nowLocal);
  //   }, [setValue, howFound, entryType, loading, loading2]);

  //      const handleChange = (e) => {
  //        setFormData({
  //            ...formData,
  //            [e.target.name]:e.target.value
  //        });
  //     };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      aircraft_master_id: formData.aircraft_master_id,
      airframe_hrs: formData.airframeHrs,
      reason_for_placing_unserviceable:
        formData.reason_for_placing_unserviceable,
      system_time_date: formData.system_time_date,
    };
    if (validateAll()) {
      try {
        const res = await fetch("/api/serviceability-log/", {
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

  //   const FloatingLabel = ({ label }, { label: string }) => (
  const FloatingLabel = ({ label }) => (
    <div className="absolute left-0 -top-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-indigo-500">
      {label}
    </div>
  );
  const checkBoxesLDHC = ["Limitation", "Deferred", "Husbandry"];
  const checkBoxesChecks = ["Independent Check", "Loose Articles Check"];
  if (loading && loading1) {
    <p>Loading...</p>;
  }

  return (
    <div className="items-start bg-blue-200 p-1">
      {/*<h1>------------------------------------------------------Headings ------------------------------------------------------------------</h1>*/}
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 mt-1 mb-1">
        <h2
          className="absolute text-md font-bold"
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: "35px",
            margin: 4,
            fontFamily: "Algerian",
          }}
        >
          CHANGE OF SERVICEABILITY LOG
        </h2>
      </div>
      {/*<h1>-------------------------------------------------------Forms & Body ---------------------------------------------------</h1>*/}
      <form onSubmit={handleSubmit} className=" p-1 space-y-4 ">
        <div className="p-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/90 shadow-lg">
          {/*<h1>-------------------------------------------------------row 1 ---------------------------------------------------</h1>*/}
          <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
              <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                Entry Type
              </label>
              <select
                name="entryType"
                value={formData.entryType}
                onChange={handleChange}
                className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select Entry Type</option>
                {!loading &&
                  entryType?.map((entry_types) => (
                    <option key={entry_types.id} value={entry_types.occasion}>
                      {entry_types.occasion}
                    </option>
                  ))}
              </select>
              {errors.entryType && (
                <p className="text-red-500">
                  {errors.entryType.message || errors.entryType}
                </p>
              )}
            </div>

            <div>
              <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                How Found
              </label>
              <select
                name="howFound"
                value={formData.howFound}
                onChange={handleChange}
                className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
              >
                <option value="">Select How Found</option>
                {!loading1 &&
                  howFound?.map((how_found) => (
                    <option key={how_found.id} value={how_found.occasion}>
                      {how_found.occasion}
                    </option>
                  ))}
              </select>
              {errors.howFound && (
                <p className="text-red-500">
                  {errors.howFound.message || errors.howFound}
                </p>
              )}
            </div>

            <div>
              <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                Date & Time
              </label>
              <input
                type="datetime-local"
                //                 type="date"
                name="dateAndTime"
                value={formData.dateAndTime}
                onChange={handleChange}
                className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
              />
              {errors.dateAndTime && (
                <p className="text-red-500">
                  {errors.dateAndTime.message || errors.dateAndTime}
                </p>
              )}
            </div>

            {aircraftMaster && (
              <div>
                <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                  Airframe Hours
                </label>
                <input
                  type="text"
                  name="airframe_hrs"
                  value={formData.airframeHrs || "40"}
                  className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                  readOnly
                ></input>
              </div>
            )}
          </div>
          {/* SECTION 2: REASON & CONDITIONS */}
          {/*<h1>------------------------------------------------------- row 2 ---------------------------------------------------</h1>*/}
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 mt-8">
            {/* Reason */}
            <div className="border-2 border-black-600 rounded-lg p-4">
              <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                Reason for placing aircraft unserviceable
              </label>
              <textarea
                name="reason_for_placing_unserviceable"
                value={formData.reason_for_placing_unserviceable || ""}
                onChange={handleChange}
                rows={4}
                placeholder="Enter reason for placing aircraft unserviceable"
                className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
              />
              {errors.reason_for_placing_unserviceable && (
                <p className="text-red-500">
                  {errors.reason_for_placing_unserviceable.message ||
                    errors.reason_for_placing_unserviceable}
                </p>
              )}
            </div>

            {/* Checkboxes for LDHC*/}
            <div className="grid grid-cols-2 gap-2">
              <div className="border-2 border-black-600 rounded-lg p-4">
                <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                  Select LDHC
                </label>
                {checkBoxesLDHC.map((box) => (
                  <label key={box} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`check_${box}`)}
                      className="accent-pink-600"
                    />
                    <span className="text-gray-800">{box}</span>
                  </label>
                ))}
              </div>
              {/* Checkboxes for Additional Checks*/}
              <div className="border-2 border-black-600 rounded-lg p-4">
                <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                  Select Additional Checks
                </label>
                {checkBoxesChecks.map((box) => (
                  <label key={box} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      {...register(`check_${box}`)}
                      className="accent-green-600"
                    />
                    <span className="text-gray-800">{box}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-300 to-blue-500 w-60 h-10 rounded-t-full shadow-x1 flex items-center justify-center cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <span className="text-gray-800 font-semibold text-lg">
            Authorize and Forward
          </span>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            className="bg-white rounded-2x1 shadow-2x1 p-6 flex flex-col items-center gap-4"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 400,
            }}
          >
            <Typography variant="h6" className="text-gray-800 font-bold mb-2">
              Authorization
            </Typography>
            <TextField
              {...register("authCode")}
              label="Authorization Code"
              variant="outlined"
              fullWidth
            />
            {user?.name && (
              <Typography className="text-green-600">
                {" "}
                Authorized By {user.name} {user.rank}
              </Typography>
            )}
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              fullWidth
              className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold shadow-lg hover:opacity-90"
            >
              Forward to Clear Defect
            </Button>
            <Button onClick={() => setOpen(false)} color="inherit">
              {" "}
              Close
            </Button>
          </Box>
        </Modal>
      </form>
    </div>
  );
};
export default USLogForm;
