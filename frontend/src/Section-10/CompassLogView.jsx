import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import axios from "axios";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";
import {ModForm712A} from "../WeasyPrintReports/WeasyPrint";

const CompassLogView = () => {
    const columns = [
    {
      field: "ref_snow",
      headerName: "DATE",
      width: 50,
      sortable: true,
      filterable: true,
    },
    {
      group: "Compass Particular",
      children: [
        {
          field: "compass_type",
          headerName: "Type",
          sortable: true,
          filterable: true,
        },
        {
          field: "compass_ser_no",
          headerName: "Ser No",
          sortable: true,
          filterable: true,
        },
        {
          field: "place",
          headerName: "Position",
          sortable: true,
          filterable: true,
        },
      ],
    },
    {
      group: "Deviation Record",
      children: [
        {
          group: "Before Correction",
          children: [
            {
              field: "actual_north",
              headerName: "N",
              },
            {
              field: "actual_east",
              headerName: "E",
              },
            {
              field: "actual_south",
              headerName: "S",
              },
            {
              field: "actual_west",
              headerName: "W",
              },
          ],
        },
        {
          group: "After Correction",
          children: [
            {
              field: "a_c_north",
              headerName: "N",
             },
            {
              field: "a_c_north_east",
              headerName: "NE",
              },
            {
              field: "a_c_east",
              headerName: "E",
              },
            {
              field: "a_c_south_east",
              headerName: "SE",
             },
            {
              field: "a_c_south",
              headerName: "S",
              },
            {
              field: "a_c_south_west",
              headerName: "SW",
              },
            {
              field: "a_c_west",
              headerName: "W",
              },
            {
              field: "a_c_north_west",
              headerName: "NW",


            },
          ],
        },
      ],
    },
    {
      field: "ref_snow",
      headerName: "Remarks",
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      field: "coeff_a",
      headerName: "Coeff 'A'",


      width: 50,
    },
    {
      group: "Corrector Currents",
      children: [
        { field: "coeff_b", headerName: "B"},
        { field: "coeff_c", headerName: "C"},
      ],
    },
  ];
  const { data, loading } = useTableApi("compass_calibration_logs");
  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-8">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 mt-1 mb-1 dark:from-black dark:via-black dark:to-black dark:text-white">
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
          COMPASS CALIBRATION LOG
        </h2>
      </div>
       <div>
           {data && (
            <div>
                <CustomGrid
                data={data}
                theme="Forest_Fog"
                columns={columns}
                heading="DETAILS OF LAST COMPASS CALIBRATION"
                className="dark:from-black dark:via-black dark:to-black dark:text-white"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center mt-5 gap-5">
          <ModForm712A />
        </div>
      </div>

  );
};
export default CompassLogView;