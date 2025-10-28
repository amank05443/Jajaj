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
import { useForm } from "react-hook-form";

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

const PromulgateTechnicalInstruction = () => {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applicability, setApplicability] = useState("");
  const [partNo, setPartNo] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedAircraft, setSelectedAircraft] = useState([]);
  const [loading, setLoading] = useState(true);
  const { params, loading: paramsLoading } = useParams();
  const [occurrenceOptions, setOccurrence] = useState([]);
  const [entryTypeOptions, setEntryTypeOptions] = useState([]);
  const [aircraftMaster, setAircraftMaster] = useState(null);
  const aircraft = ["223", "227", "229", "241", "237"];
  const allParts = ["FGM129", "VU931", "BKDU941"];

  const handleCheckboxChange = (aircraft) => {
    setSelectedAircraft((prev) =>
      prev.includes(aircraft)
        ? prev.filter((n) => n !== aircraft)
        : [...prev, aircraft],
    );
  };
  const handleSelectAll = () => {
    if (selectedAircraft.length === aircraft.length) {
      setSelectedAircraft([]);
    } else {
      setSelectedAircraft(aircraft);
    }
  };
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
        setOccurrence(data.data.howFoundDefects);
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
  const fetchPartNumbers = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `/api/fetchAllPartNumbers/?search=${query}`,
      );
      setSuggestions(response.data);
      console.log("Items :", response.data);
    } catch (error) {
      console.error("Blunder in Items:", error);
    }
  };
  const fetchDescription = async (selectedPart) => {
    try {
      const response = await axios.get(
        `/api/fetchAllPartNumbers/${selectedPart}/`,
      );
      setDescription(response.data);
      console.log("Items :", response.data.description);
    } catch (error) {
      console.error("Blunder in Items:", error);
    }
  };
  const handlePartNoChange = (e) => {
    const value = e.target.value;
    setPartNo(value);
    fetchPartNumbers(value);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (selected) => {
    setPartNo(selected);
    setShowSuggestions(false);
    fetchDescription(selected);
  };
  const handlePartInput = (e) => {
    const value = e.target.value;
    setPartNo(value);
    setDescription("");
    if (value.length > 0) {
        const filtered = allParts.filter((p) =>
        p.toLowerCase().includes(value.toLowerCase())
        );
    setSuggestions(filtered);
    } else {
        setSuggestions([]);
        }
  };
  const handleSelectPart = (part) => {
      setPartNo(part);
      setSuggestions([]);
      const descMap = {
          FGM129: "Radar",
          VU931: "Inverter",
          BKDU941: "Onboard Oxygen",
          };
      setDescription(descMap[part] || "No description available");
      };

  return (
    <div style={{ padding: 15 }}>
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
          ATO TECHNICAL MEMORANDUM
        </h2>
      </div>

      <div className="p-4 rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] border border-white/90 shadow-lg">
        <form className="grid md:grid-cols-2 sm:grid-cols-2 gap-4">
          <div className="flex items-center mb-4">
            <label className="w-32 font-medium text-gray-600">Heading:</label>
            <textarea
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              rows={1}
              placeholder="Enter heading max 50 character"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-32 font-medium text-gray-600">
              Applicability:
            </label>
            <select
              value={applicability}
              onChange={(e) => {
                setApplicability(e.target.value);
                setPartNo("");
                setDescription("");
              }}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Applicability</option>
              <option value="gse">GSE</option>
              <option value="engine">Engine</option>
              <option value="aircraft">Aircraft</option>
            </select>
          </div>
          {applicability === "gse" && (
            <div className="flex items-center mb-2">
              <label className="w-32 font-medium text-gray-600">
                Enter Pt No:
              </label>
              <input
                type=""
                placeholder="Enter part number"
                className="flex-1 border rounded px-3 py-2"
              />
            </div>
          )}
          {applicability === "engine" && (
            <div className="flex items-center mb-2">
{/*               <div className="relative"> */}
                <label className="w-32 font-medium text-gray-600">Pt No:</label>
{/*                 <input */}
{/*                   type="text" */}
{/*                   value={partNo} */}
{/*                   onChange={handlePartNoChange} */}
{/*                   onBlur={() => */}
{/*                     setTimeout(() => setShowSuggestions(false), 200) */}
{/*                   } */}
{/*                   onFocus={() => partNo && setShowSuggestions(true)} */}
{/*                   placeholder="Enter part number" */}
{/*                   className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" */}
{/*                 /> */}
{/*                 {showSuggestions && suggestions.length > 0 && ( */}
{/*                   <ul className="absolute z-10 bg-white border rounded shadow-md mt-1 w-full max-h-40 overflow-y-auto"> */}
{/*                     {suggestions.map((s, index) => ( */}
{/*                       <li */}
{/*                         key={index} */}
{/*                         onClick={() => handleSuggestionClick(s)} */}
{/*                         className="px-3 py-2 cursor-pointer hover:bg-blue-100" */}
{/*                       > */}
{/*                         {s} */}
{/*                       </li> */}
{/*                     ))} */}
{/*                   </ul> */}
{/*                 )} */}
{/*               </div> */}

{/*               {description && ( */}
{/*                 <div> */}
{/*                   <label className="block font-medium mb-1">Description:</label> */}
{/*                   <input */}
{/*                     type="text" */}
{/*                     value={description} */}
{/*                     readOnly */}
{/*                     className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300" */}
{/*                   /> */}
{/*                 </div> */}
{/*               )} */}
{/*             </div> */}
{/*           )} */}
 <div className="relative inline-block w-32">
      <input
                  type="text"
                  value={partNo}
                  onChange={handlePartInput}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 200)
                  }
                  onFocus={() => partNo && setShowSuggestions(true)}
                  placeholder="Enter part number"
                  className="border border-gray-300 rounded px-3 py-2 mb-2"
                />
                {suggestions.length > 0 && (
                  <ul className="absolute left-15 mt-0.1 w-3/4 border rounded shadow-md max-h-40">
                    {suggestions.map((part) => (
                      <li
                        key={part}
                        onClick={() => handleSelectPart(part)}
                        className="px-3 py-2 cursor-pointer hover:bg-blue-100"
                      >
                        {part}
                      </li>
                    ))}
                  </ul>
                )}
            </div>


              {description && (
                <div>
                  <label className="relative inline-block w-32"></label>
                  <input
                    type="text"
                    value={description}
                    readOnly
                    className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              )}
            </div>
          )}

          {applicability === "aircraft" && (
            <div className="border border-blue-800 rounded p-3">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedAircraft.length === aircraft.length}
                  onChange={handleSelectAll}
                  className="mr-2"
                />
                <span className="font-medium">Select All</span>
              </div>
              <div className="flex flex-wrap gap-4">
                {aircraft.map((aircraft, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAircraft.includes(aircraft)}
                      onChange={() => handleCheckboxChange(aircraft)}
                    />
                    <span>{aircraft}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center mb-4">
            <label className="w-32 font-medium text-gray-600">
              Occurrence:
            </label>
            <select
              name="howFoundDefects"
              value={formData.howFoundDefects}
              onChange={handleChange}
              disabled={isAuthenticated}
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Occurrence</option>
              {occurrenceOptions.map((how_found_defects) => (
                <option key={how_found_defects.id} value={how_found_defects.id}>
                  {how_found_defects.occasion}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-4">
            <label className="w-32 inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
              Reason for Instruction:
            </label>
            <textarea
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              rows={3}
              placeholder="Enter reason for instruction "
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-32 inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
              Inspection Details:
            </label>
            <textarea
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              rows={4}
              placeholder="Enter inspection details "
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-32 font-medium text-gray-600">Recording:</label>
            <input
              type="text"
              name="heading"
              value={formData.recording}
              onChange={handleChange}
              placeholder="Enter recording"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="flex items-center mb-4">
            <label className="w-32 font-medium text-gray-600">Validity:</label>
            <input
              type="text"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Enter Validity"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="text-gray-800 font-semibold text-lg">
            <button
              onClick={handleSubmit}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-300 to-blue-500 w-60 h-10 rounded-t-full shadow-x1 flex items-center justify-center cursor-pointer"
            >
              Authenticate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PromulgateTechnicalInstruction;
