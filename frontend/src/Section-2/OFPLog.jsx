import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import axios from "axios";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";

const OFPLogView = () => {
  const columns = [
    {
      field: "system",
      headerName: "System",
      width: 50,
      sortable: true,
      filterable: true,
    },
    {
      field: "soft_desc",
      headerName: "Software Description",
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      field: "soft_ver",
      headerName: "Software Standard/ Version",
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      field: "ref_snow",
      headerName: "mf 707 Ref / SNOW",
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      field: "compatibility",
      headerName: "Notes/ Compatibility",
      sortable: true,
      filterable: true,
      width: 50,
    },

  ];
  const { data, loading } = useTableApi("ofp_logs");
  if (loading) {
    <p>Loading...</p>;
  }

  return (
      <div className="bg-gray-100 min-h-screen items-center justify-center">
          <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
            <h2 className="text-center text-md font-bold"
                style={{
                    fontSize: "35px",
                    fontFamily: "algerian",
                }}>
                    Operation Flight Program (OFP)/ Onboard Software Log
            </h2>
          </div>
          <div>
              <div>
{/*           {data && ( */}
                     <div>
                        <CustomGrid data={data} columns={columns} heading="" theme="Sunset_Mist"/>
                    </div>
{/*           )} */}
             </div>
         </div>
     </div>
  );
};
export default OFPLogView;