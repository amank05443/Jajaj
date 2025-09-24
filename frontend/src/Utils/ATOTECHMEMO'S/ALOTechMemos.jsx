import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


import {
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

const ALOTechMemos = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("Name");
    const tabs = [ { label: "STI", color: "bg-green-300" }, { label: "SI", color: "bg-blue-300" }, { label: "NTI", color: "bg-purple-300" }, { label: "ALOTechMemos", color: "bg-yellow-200" }, { label: "AEOTechMemos", color: "bg-pink-300" }];
  const [formData, setFormData] = useState({
      heading: "",
      reasonForIssue: "",
      recording: "",
      });
  const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value,});
      };
  const handleSubmit = (e) => {
      e.preventDefault();
      alert(`Heading: ${formData.heading}\nReason: ${formData.reason}`);
      };

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
          Technical Instruction
        </h4>
      </div>

      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-14 mt-1 mb-1">
      <div
        className="flex justify-between">
         {tabs.map((tab) => (
             <button
             key={tab.label}
             onClick={() => setActiveTab(tab.label)}
             className={`flex-1 py-4 text-center font-semibold rounded-md shadow-md transition
                 ${tab.color} ${activeTab === tab.label ? "ring-4 ring-offset-1 ring-indigo-500" : "opacity-90 hover:opacity-100" }`}
                 >
                 {tab.label}
                 </button>
                 ))}


 </div>
      </div>

    <div className="">
         <div className="">
              <div className="">
                  <form
                  onSubmit={handleSubmit}
                  className="bg-white p-6 rounded shadow-md w-full max-w-lg">
                  <div className="flex items-center mb-4">
                      <label className="w-32 font-medium text-gray-600">Heading:</label>
                      <input
                      type="text"
                      name="heading"
                      value={formData.heading}
                      onChange={handleChange}
                      placeholder="Enter heading"
                      className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                      />
                      </div>
                      <div className="flex items-center mb-4">
                          <label className="w-32 font-medium text-gray-600">Reason For Instruction:</label>
                      <input
                      type="text"
                      name="heading"
                      value={formData.reasonForIssue}
                      onChange={handleChange}
                      placeholder="Enter Reason For Instruction"
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
                      <div className="col-span-3 flex justify-end mt-1">
          <button
            onClick={() => navigate("/CompassLogView")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </div>
                      </form>
                  </div>
                  </div>
                  </div>
                  </div>
  );
};
export default ALOTechMemos;
