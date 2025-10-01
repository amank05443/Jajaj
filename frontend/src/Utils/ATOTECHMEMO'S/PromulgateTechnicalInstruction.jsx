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
  const [howFoundOptions, setHowFoundOptions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [applicability, setApplicability] = useState("");
  const [aircraft, setAircraft] = useState([]);
  const [selectedAircraft, setSelectedAircraft] = useState([]);

  const handleCheckboxChange = (aircraft) => {
      setSelectedAircraft((prev) =>
      prev.includes(aircraft)
      ? prev.filter((n) => n !== aircraft)
       : [...prev, aircraft]
       );
   };
   const handleSelectAll = () => {
       if (selectedAircraft.length === aircraft.length) {
           setSelectedAircraft([]);
           } else {
               setSelectedAircraft(aircraft.map((n) => n.aircraft));
               }
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
                        <form

                        className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
                        <div className="flex items-center mb-4">
                            <label className="w-32 font-medium text-gray-600">Heading:</label>
                            <textarea
                            type="text"
                            name="heading"
                            value={formData.heading}
                            onChange={handleChange}
                            rows={2}
                            placeholder="Enter heading"
                            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                            />
                            </div>
                            <div className="flex items-center mb-4">
                                <label className="w-32 font-medium text-gray-600">Applicability:</label>
                            <select
                value={applicability}
                onChange={(e) => setApplicability(e.target.value)}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Applicability</option>
                <option value="gse">GSE</option>
                <option value="aircraft">Aircraft</option>
                     </select>
                            </div>
                            {applicability === "aircraft" && (
                                <div className="border rounded p-3">
                                    <div className="flex items-center mb-2">
                                        <input
                                        type="checkbox"
                                        checked={selectedAircraft.length === aircraft.length}
                                        onChange={handleSelectAll}
                                        className="mr-2"
                                        />
                                        <span className="font-medium">Select All</span>
                                        </div>
                                        {aircraft.map((n, index) => (
                                            <div key={index} className="flex items-center mb-1">
                                                <input
                                                type="checkbox"
                                        checked={selectedAircraft.includes(n.aircraft)}
                                        onChange={() => handleCheckboxChange(n.aircraft)}
                                        className="mr-2"
                                        />
                                        <span>n.aircraft</span>
                                        </div>
                                                ))}
                                            </div>
                                            )}
                            <div className="flex items-center mb-4">
                                <label className="w-32 font-medium text-gray-600">Occurrence:</label>
                            <select
                name="howFound"
                value={formData.howFound}
                onChange={handleChange}
                disabled={isAuthenticated}
                className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="">Select Occurrence</option>
                {howFoundOptions.map((how_found) => (
                  <option key={how_found.id} value={how_found.id}>
                    {how_found.occasion}
                  </option>
                ))}
              </select>
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
                            <div className="border-2 border-blue-400 rounded-lg p-4">
              <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                Inspection Details
              </label>
              <textarea
                name="reason_for_placing_unserviceable"
                value={formData.reason_for_placing_unserviceable || ""}
                onChange={handleChange}
                disabled={isAuthenticated}
                rows={4}
                placeholder="Enter Inspection Details"
                className="border p-2  w-full rounded border-blue-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-800"
              />
            </div>


                            </form>


                        </div>
                        </div>





  );
};
export default PromulgateTechnicalInstruction;
