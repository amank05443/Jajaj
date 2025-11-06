import React, { useState, useEffect } from "react";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { ModForm710 } from "../WeasyPrintReports/WeasyPrint";
import AtoOnly from "../Authentication/AuthenticationAto";
import AllUsers from "../Authentication/AuthenticationOne";
import TradeSupAto from "../Authentication/AuthenticationTwo";
import LimitationAuth from "../Authentication/LimAuthentication";

export default function RoutineServicingTab() {
  const {
    data: gridData,
    loading: gridLoading,
    update: gridUpdate,
    create: gridCreate,
  } = useTableApi("aircraft_masters");
  const columns = [
    {
      field: "side_no",
      headerName: "Operation/Task (Routine/Component change)",
    },
    {
      field: "aircraft_mark",
      headerName: "Time/ Date Commenced",
      sortable: true,
      filterable: true,
    },
    {
      field: "airframe_serial_no",
      headerName: "Time/ Date Completed",
      sortable: true,
      filterable: true,
    },
    { field: "basic_weight", headerName: "A/F Hours", sortable: true },
    { field: "airframe_serial_no", headerName: "Trade" },
    {
      field: "airframe_serial_no",
      headerName: "Cross Reference to MOD Form 707(SNOW)/Job Card",
      sortable: true,
      filterable: true,
    },
    {
      field: "airframe_serial_no",
      headerName: " Signature of Authorised Personnel",
    },
  ];
  if (gridLoading) return <p> Loading ...</p>;
  const handleDataFromAtoOnly = (data) => {};
  const handleDataFromAllUsers = (data) => {};
  const handleDataFromTradeSupAto = (data) => {};

  return (
    <div>
      <div className="bg-gray-100 min-h-screen items-center justify-center">
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
            ROUTINE SERVICING CERTIFICATE
          </h2>
        </div>
        <div className="flex justify-center mt-5 gap-5">
          <AllUsers auth={handleDataFromAllUsers} />
          <AtoOnly auth={handleDataFromAtoOnly} />
          {/*           <TradeSupAto snowId={202520386} /> */}
          <TradeSupAto snowId={202520391} />
          <LimitationAuth snowId={202520391} />
        </div>
        <div>
          <CustomGrid data={gridData} theme="Forest_Fog" columns={columns} />
        </div>
        <div className="flex justify-center mt-5 gap-5">
          <ModForm710 />
        </div>
      </div>
    </div>
  );
}
