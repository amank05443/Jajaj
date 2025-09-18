import React, { useState, useEffect } from "react";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";
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
  Card,
  CardContent,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const BasicWeightAndMoments = () => {
  const [wbData, setWbData] = useState({});
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const columns = [
    {
      field: "snow",
      headerName: "DATE SNOW",
      sortable: true,
      filterable: true,
      width: 100,
    },
    {
      field: "weighing_change_mod",
      headerName: "WEIGHING, CHANGE OR MODIFICATION",
      sortable: true,
      filterable: true,
    },
    {
      group: "DETAILS OF CHANGE",
      children: [
        { field: "weight", headerName: "Weight(Kg)" },
        {
          group: "Moment",
          children: [
            { field: "long", headerName: "Long" },
            { field: "lat", headerName: "Lat/Vert" },
          ],
        },
      ],
    },
    {
      group: "CORRECTED BASIC DATA",
      children: [
        { field: "corrected_weight", headerName: "Weight(Kg)" },
        {
          group: "LONGITUDINAL",
          children: [
            { field: "corrected_cg_long", headerName: "CG POSITION" },
            { field: "corrected_moment_long", headerName: "MOMENT" },
          ],
        },
        {
          group: "LATERAL % MAC ABOUT X ORIGIN",
          children: [
            { field: "corrected_cg_lat", headerName: "CG POSITION" },
            { field: "corrected_moment_lat", headerName: "MOMENT" },
          ],
        },
      ],
    },
  ];
  const { data, loading } = useTableApi("weight_balance");
  useEffect(() => {
    if (!loading && !!data) {
      setWbData(
        data
          .slice()
          .reverse()
          .map((item) => ({
            ...item,
            weight: item.weight_increased
              ? `+${item.weight_increased}`
              : item.weight_decreased
                ? `-${item.weight_decreased}`
                : "",
            long: item.long_increased
              ? `+${item.long_increased}`
              : item.long_decreased
                ? `-${item.long_decreased}`
                : "",
            lat: item.lat_vert_increased
              ? `+${item.lat_vert_increased}`
              : item.lat_vert_decreased
                ? `-${item.lat_vert_decreased}`
                : "",
          })),
      );
      console.log("wbData:", wbData);
    }
  }, [data, loading]);
  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <div className="bg-gray-100 min-h-screen p-6 ">
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
          BASIC WEIGHT AND MOMENT
        </h2>
      </div>

      {wbData && (
        <CustomGrid
          data={wbData}
          columns={columns}
          heading=""
          theme="Forest_Fog"
        />
      )}
      <div className="mb-4 ml-2">
        <button
          onClick={handleBack}
          className="mt-1 w-32 rounded-x1 bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] text-gray
        font-semibold text-lg px-2 py-2 rounded-lg  "
        >
          Back
        </button>
      </div>
    </div>
  );
};
export default BasicWeightAndMoments;
