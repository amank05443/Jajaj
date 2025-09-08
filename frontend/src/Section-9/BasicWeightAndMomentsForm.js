import React, { useState, useEffect } from "react";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";
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
  const [showGraph, setShowGraph] = useState(false);
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
    <div>
      {wbData && (
        <div>
          <CustomGrid
            data={wbData}
            columns={columns}
            heading="BASIC WEIGHT AND MOMENT (702A)"
          />
        </div>
      )}
    </div>
  );
};
export default BasicWeightAndMoments;
