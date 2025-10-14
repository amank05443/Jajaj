import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { motion } from "framer-motion";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useParams } from "../Utils/CustomHooks/useParams";
import useValidation from "../Utils/CustomHooks/useValidation";
import AllUsers from "../Authentication/AuthenticationOne";
import NewEntryForLimitationLog from "../Section-2/NewEntryForLimitationLog";
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
  //::-- States and variables used in the page
  const [loading, setLoading] = useState(true);
  const { params, loading: paramsLoading } = useParams();
  const [howFoundOptions, setHowFoundOptions] = useState([]);
  const [entryTypeOptions, setEntryTypeOptions] = useState([]);
  const [aircraftMaster, setAircraftMaster] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [limLogData, setLimLogData] = useState({});

  //::--checkboxes states and its management
  const checkBoxesLDHC = [
    { key: "lim", label: "Limitation" },
    { key: "def", label: "Deferred" },
    { key: "hus", label: "Husbandry" },
  ];
  const checkBoxesChecks = [
    { key: "indCheck", label: "Independent Check" },
    { key: "lartCheck", label: "Loose Articles Check" },
  ];
  const [activeCheckboxes, setActiveCheckboxes] = useState({
    lim: false,
    def: false,
    hus: false,
    indCheck: false,
    lartCheck: false,
  });

  const toggleCheckboxes = (box) =>
    setActiveCheckboxes((prev) => ({ ...prev, [box]: !prev[box] }));

  console.log("activeCheckboxes:", activeCheckboxes);

  //::-- the FORM State
  const { formData, errors, handleChange, validateAll, setFormData } =
    useValidation(
      {
        entryType: "",
        howFound: "",
        dateAndTime: "",
        airframeHrs: "",
        aircraft_master_id: params ? params.aircraft_master_id : "",
        reason_for_placing_unserviceable: "",
      },
      {
        entryType: { required: true },
        howFound: { required: true },
        dateAndTime: { dateTimeNotAfterNow: true },
        airframeHrs: { required: true },
        aircraft_master_id: { required: true },
        reason_for_placing_unserviceable: { alphaNumeric: true },
      },
    );

  //::--Fetching base data from tables
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get("/api/usLogDropDowns/", {
          params: {
            aircraft_master_id: params?.aircraft_master_id,
            aircraft_type_id: params?.aircraft_type_id,
          },
        });
        setHowFoundOptions(data.data.howFoundDefects);
        setEntryTypeOptions(data.data.entryTypes);
        setAircraftMaster(data.data.aircraftMasters);
        setFormData((prev) => ({
          ...prev,
          ["airframeHrs"]: data.data.aircraftMasters.airframe_hrs,
        }));
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  //for handling authentication data
  const handleDataFromAllUsers = (data) => {
    const { authenticated, user_id, user_name } = data;
    setFormData((prev) => ({
      ...prev,
      authenticated: authenticated,
      user_id: user_id,
      user_name: user_name,
    }));
    setIsAuthenticated(true);
  };

  //for submitting the form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      formData: formData,
      limLogData: limLogData,
      activeCheckboxes: activeCheckboxes,
    };
    if (validateAll()) {
      try {
        const res = await fetch("/api/saveUsLogData/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error("Failed to save data");
        const data = await res.json();
        if (data.success === true) {
          alert(data.message);
        }
        console.log("Saved:", data);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log("Blundeeeeer");
    }
  };

  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-white-600 to-indigo-600 py-12 px-6">
      {/*<h1>------------------------------------------------------Headings ------------------------------------------------------------------</h1>*/}
      <div className="mx-auto max-w-4x1 bg-white/20 backdrop-blur-lg border-white/30 rounded-2x1 p-8">
{/*           <div className="flex items-center justify-between mb-6"> */}
        <h1 className="text-center text-1x1 font-bold text-gray-900">
          CHANGE OF SERVICEABILITY LOG
        </h1>
{/*         </div> */}
      </div>
      {/*<h1>-------------------------------------------------------Forms & Body ---------------------------------------------------</h1>*/}
      <form onSubmit={handleSubmit} className=" space-y-6 ">
        <div className="grid grid-cols-3 gap-6 items-start">
          {/*<h1>-------------------------------------------------------row 1 ---------------------------------------------------</h1>*/}
{/*           <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4"> */}
            <div className="col-span-2 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
              <label className="block font-medium text-gray-700 mb-1">
                Entry Type
              </label>
              <select
                name="entryType"
                value={formData.entryType}
                onChange={handleChange}
                disabled={isAuthenticated}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-purple-400"
              >
                <option value="">Select Entry Type</option>
                {entryTypeOptions.map((entry_type) => (
                  <option key={entry_type.id} value={entry_type.id}>
                    {entry_type.occasion}
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
              <label className="block font-medium text-gray-700 mb-1">
                How Found
              </label>
              <select
                name="howFound"
                value={formData.howFound}
                onChange={handleChange}
                disabled={isAuthenticated}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Select How Found</option>
                {howFoundOptions.map((how_found) => (
                  <option key={how_found.id} value={how_found.id}>
                    {how_found.occasion}
                  </option>
                ))}
              </select>
              </div>
{/*               </div> */}
              {errors.howFound && (
                <p className="text-red-500">
                  {errors.howFound.message || errors.howFound}
                </p>
              )}
            </div>
    <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-sm font-medium text-gray-700 mb-1">
                Date & Time
              </label>
              <input
                type="datetime-local"
                //                 type="date"
                name="dateAndTime"
                value={formData.dateAndTime}
                onChange={handleChange}
                disabled={isAuthenticated}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-purple-400"
              />
              </div>
              {errors.dateAndTime && (
                <p className="text-red-500">
                  {errors.dateAndTime.message || errors.dateAndTime}
                </p>
              )}


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Airframe Hours
              </label>
              <input
                type="text"
                name="airframe_hrs"
                value={formData.airframeHrs}
                disabled
                className="w-full bg-gray-50 border border-gray-300 rounded-md p-2"
                readOnly
              ></input>
            </div>
          </div>
{/*           </div> */}
          {/* SECTION 2: REASON & CONDITIONS */}
          {/*<h1>------------------------------------------------------- row 2 ---------------------------------------------------</h1>*/}
          <div>
            {/* Reason */}

              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason for placing aircraft unserviceable
              </label>
              <textarea
                name="reason_for_placing_unserviceable"
                value={formData.reason_for_placing_unserviceable || ""}
                onChange={handleChange}
                disabled={isAuthenticated}
                rows={4}
                placeholder="Enter reason for placing aircraft unserviceable"
                className="w-full border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-purple-400"
              />

              {errors.reason_for_placing_unserviceable && (
                <p className="text-red-500">
                  {errors.reason_for_placing_unserviceable.message ||
                    errors.reason_for_placing_unserviceable}
                </p>
              )}
{/*           </div> */}
            </div>


            {/* Checkboxes for LDHC*/}

{/*             <div className="grid grid-cols-2 gap-2"> */}
{/*               {formData.entryType == 2025110 && ( */}
{/*                 <div className="border-2 border-black-600 rounded-lg p-4"> */}
{/*                   <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition"> */}
{/*                     Select LDHC */}
{/*                   </label> */}
{/*                   {checkBoxesLDHC.map((box) => ( */}
{/*                     <label */}
{/*                       key={box.key} */}
{/*                       className="flex items-center space-x-2" */}
{/*                     > */}
{/*                       <input */}
{/*                         type="checkbox" */}
{/*                         checked={activeCheckboxes[box.key]} */}
{/*                         onChange={() => toggleCheckboxes(box.key)} */}
{/*                         disabled={isAuthenticated} */}
{/*                         className="accent-pink-600" */}
{/*                       /> */}
{/*                       <span className="text-gray-800">{box.label}</span> */}
{/*                     </label> */}
{/*                   ))} */}
{/*                 </div> */}
{/*               )} */}
{/*                */}{/* Checkboxes for Additional Checks*/}
{/*               {formData.entryType != 2025110 && ( */}
{/*                 <div className="border-2 border-black-600 rounded-lg p-4"> */}
{/*                   <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition"> */}
{/*                     Select Additional Checks */}
{/*                   </label> */}
{/*                   {checkBoxesChecks.map((box) => ( */}
{/*                     <label */}
{/*                       key={box.key} */}
{/*                       className="flex items-center space-x-2" */}
{/*                     > */}
{/*                       <input */}
{/*                         type="checkbox" */}
{/*                         checked={activeCheckboxes[box.key]} */}
{/*                         onChange={() => toggleCheckboxes(box.key)} */}
{/*                         disabled={isAuthenticated} */}
{/*                       /> */}
{/*                       <span className="text-gray-800">{box.label}</span> */}
{/*                     </label> */}
{/*                   ))} */}
{/*                 </div> */}
{/*               )} */}
{/*             </div> */}
          </div>
        </div>
        {activeCheckboxes.lim && (
          <div className="p-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/90 shadow-lg">
            <NewEntryForLimitationLog onDataChange={setLimLogData} />
          </div>
        )}
      </form>
      <Stack direction="row" spacing={2} mt={2}>
        {!isAuthenticated ? (
          <AllUsers auth={handleDataFromAllUsers} />
        ) : (
          <Typography variant="body1" color="success.main" fontWeight="bold">
            Authenticated by {formData.user_name}
          </Typography>
        )}
        <Button
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          disabled={!isAuthenticated}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-red px-5 py-2 rounded-md font-semibold shadow-md"
        >
          Submit
        </Button>
      </Stack>
    </div>
  );
};
export default USLogForm;
