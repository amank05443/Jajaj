import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import axios from "axios";
import CustomGrid from "../Utils/CustomComponents/CustomGrid";

const CompassLogView = () => {
  //   const [CompassData, setCompassData] = useState({});
  //   const [rows, setRows] = useState(
  //     Array()
  //       .fill(null)
  //       .map(() => ({
  //         compass_type: "",
  //         compass_ser_no: "",
  //         place: "",
  //
  //         actual_north: "",
  //         actual_east: "",
  //         actual_south: "",
  //         actual_west: "",
  //
  //         a_c_north: "",
  //         a_c_north_east: "",
  //         a_c_east: "",
  //         a_c_south_east: "",
  //         a_c_south: "",
  //         a_c_south_west: "",
  //         a_c_west: "",
  //         a_c_north_west: "",
  //
  //         coeff_a: "",
  //         coeff_b: "",
  //         coeff_c: "",
  //       })),
  //   );
  //
  //   const [compassData, setCompassData] = useState({});
  //   const handleRowChange = (
  //     index,
  //     value,
  //     field,
  //     subField = null,
  //     section = null,
  //   ) => {
  //     const newRows = [...rows];
  //     if (section) {
  //       newRows[index][section][subField] = value;
  //     } else {
  //       newRows[index][field] = value;
  //     }
  //
  //     if (index === rows.length - 1) {
  //       newRows.push({
  //         date: "",
  //         type: "",
  //         serNo: "",
  //         position: "",
  //         beforeCorrection: { N: "", E: "", S: "", W: "" },
  //         afterCorrection: {
  //           N: "",
  //           NE: "",
  //           E: "",
  //           SE: "",
  //           S: "",
  //           SW: "",
  //           W: "",
  //           NW: "",
  //         },
  //         remarks: "",
  //         coeffA: "",
  //         coeffB: "",
  //         coeffC: "",
  //       });
  //     }
  //     setRows(newRows);
  //   };
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
              sortable: true,
              filterable: true,
            },
            {
              field: "actual_east",
              headerName: "E",
              sortable: true,
              filterable: true,
            },
            {
              field: "actual_south",
              headerName: "S",
              sortable: true,
              filterable: true,
            },
            {
              field: "actual_west",
              headerName: "W",
              sortable: true,
              filterable: true,
            },
          ],
        },
        {
          group: "After Correction",
          children: [
            {
              field: "a_c_north",
              headerName: "N",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_north_east",
              headerName: "NE",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_east",
              headerName: "E",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_south_east",
              headerName: "SE",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_south",
              headerName: "S",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_south_west",
              headerName: "SW",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_west",
              headerName: "W",
              sortable: true,
              filterable: true,
            },
            {
              field: "a_c_north_west",
              headerName: "NW",
              sortable: true,
              filterable: true,
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
      sortable: true,
      filterable: true,
      width: 50,
    },
    {
      group: "Corrector Currents",
      children: [
        { field: "coeff_b", headerName: "B", sortable: true, filterable: true },
        { field: "coeff_c", headerName: "C", sortable: true, filterable: true },
      ],
    },
  ];
  const { data, loading } = useTableApi("compass_calibration_logs");
  if (loading) {
    <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-8">
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
          COMPASS CALIBRATION LOG
        </h2>
      </div>
      <div
        className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] "
      >
        {data && (
          <div className="border-4 border-black-400 rounded-lg p-4 backdrop-blur-sm">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
                  <td className="border border-gray-400 p-2 w-1/4">
                    <strong>Compass Swing Date</strong> : &nbsp;&nbsp;
                    <b class="text-green-700">{data.compass_swing_date || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    <strong>Due Date</strong> : &nbsp;&nbsp;
                    <b class="text-green-700">{data.due_date || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    <strong>AP Reference</strong> : &nbsp;&nbsp;
                    <b class="text-green-700">{data.ap_reference || "NA"}</b>
                  </td>
                </tr>
                <tr className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
                  <td className="border border-gray-400 p-2 w-1/4"><strong>Place</strong> : &nbsp;&nbsp;
                    <b class="text-green-700">{data.place || "NA"}</b></td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    <strong>Ref SNOW</strong> : &nbsp;&nbsp;
                    <b class="text-green-700">{data.ref_snow || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4"><strong>Method </strong>: &nbsp;&nbsp;
                    <b class="text-green-700">{data.method || "NA"}</b></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {/*         <div className="overflow-x-auto border border-400 rounded-lg shadow-lg-white"> */}
        {/*           <table className="table-auto w-full border-collapse border border-gray-400 text-sm"> */}
        {/*             <thead> */}
        {/*               <tr className=" text-black-700"> */}
        {/*                 <th rowSpan="2" className="border border-gray-400 px-2 py-1"> */}
        {/*                   Date */}
        {/*                 </th> */}
        {/*                 <th colSpan="3" className="border border-gray-400 px-2 py-1"> */}
        {/*                   Compass Particular */}
        {/*                 </th> */}
        {/*                 <th colSpan="12" className="border border-gray-400 px-2 py-1"> */}
        {/*                   Deviation Record */}
        {/*                 </th> */}
        {/*                 <th rowSpan="2" className="border border-gray-400 px-2 py-1"> */}
        {/*                   Remarks */}
        {/*                 </th> */}
        {/*                 <th rowSpan="2" className="border border-gray-400 px-2 py-1"> */}
        {/*                   Coeff 'A' */}
        {/*                 </th> */}
        {/*                 <th */}
        {/*                   colSpan="2" */}
        {/*                   rowSpan="1" */}
        {/*                   className="border border-gray-400 px-2 py-1" */}
        {/*                 > */}
        {/*                   Corrector Currents */}
        {/*                 </th> */}
        {/*               </tr> */}
        {/*               <tr className=" text-black"> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">Type</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">Ser No</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">Position</th> */}
        {/*                 <th */}
        {/*                   colSpan="4" */}
        {/*                   className="border border-gray-400 px-2 py-1 bg-purple-300" */}
        {/*                 > */}
        {/*                   Before Correction */}
        {/*                 </th> */}
        {/*                 <th */}
        {/*                   colSpan="8" */}
        {/*                   className="border border-gray-400 px-2 py-1 bg-purple-300" */}
        {/*                 > */}
        {/*                   After Correction */}
        {/*                 </th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">B</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">C</th> */}
        {/*               </tr> */}
        {/*               <tr className="bg-green-300 font-bold"> */}
        {/*                 <th */}
        {/*                   colSpan="4" */}
        {/*                   className="border border-gray-400 px-2 py-1" */}
        {/*                 ></th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">N</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">E</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">S</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">W</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">N</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">NE</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">E</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">SE</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">S</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">SW</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">W</th> */}
        {/*                 <th className="border border-gray-400 px-2 py-1">NW</th> */}
        {/*                 <th */}
        {/*                   colSpan="4" */}
        {/*                   className="border border-gray-400 px-2 py-1" */}
        {/*                 ></th> */}
        {/*               </tr> */}
        {/*             </thead> */}
        {/*             <tbody> */}
        {/*               {compData && */}
        {/*                 compData.map((data, index) => ( */}
        {/*                   <tr */}
        {/*                     key={index} */}
        {/*                     className="odd:bg-white even:bg-gray-50 hover:bg-red-200 transition" */}
        {/*                   > */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.compass_swing_date} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.compass_type} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.compass_ser_no} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.place} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     {["N", "E", "S", "W"].map((dir) => ( */}
        {/*                       <td */}
        {/*                         key={dir} */}
        {/*                         className="border border-gray-gray-400 px-2 py-1" */}
        {/*                       > */}
        {/*                         <input */}
        {/*                           type="text" */}
        {/*                           className="w-full p-1 border rounded" */}
        {/*                           value={data.actual_north ? data.actual_north[dir] : '-'} */}
        {/*                         /> */}
        {/*                       </td> */}
        {/*                     ))} */}
        {/*                     {["N", "NE", "E", "SE", "S", "SW", "W", "NW"].map((dir) => ( */}
        {/*                       <td */}
        {/*                         key={dir} */}
        {/*                         className="border border-gray-gray-400 px-2 py-1" */}
        {/*                       > */}
        {/*                         <input */}
        {/*                           type="text" */}
        {/*                           className="w-full p-1 border rounded" */}
        {/*                           value={data.actual_south ? data.actual_south[dir] : '-'} */}
        {/*                         /> */}
        {/*                       </td> */}
        {/*                     ))} */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.aircraft_master} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     <td className="border border-gray-gray-400 px-2 py-1"> */}
        {/*                       <input */}
        {/*                         type="text" */}
        {/*                         className="w-full p-1 border rounded" */}
        {/*                         value={data.coeff_a} */}
        {/*                       /> */}
        {/*                     </td> */}
        {/*                     {["B", "C"].map((dir) => ( */}
        {/*                       <td */}
        {/*                         key={dir} */}
        {/*                         className="border border-gray-gray-400 px-2 py-1" */}
        {/*                       > */}
        {/*                         <input */}
        {/*                           type="text" */}
        {/*                           className="w-full p-1 border rounded" */}
        {/*                           value={data.coeff_b ? data.coeff_b[dir] : '-'} */}
        {/*                         /> */}
        {/*                       </td> */}
        {/*                     ))} */}
        {/*                   </tr> */}
        {/*                 ))} */}
        {/*               } */}
        {/*             </tbody> */}
        {/*           </table> */}
        {/*         </div> */}
        <div>
          {data && (
            <div>
              <CustomGrid
                data={data}
                theme="Forest_Fog"
                columns={columns}
                heading=""
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default CompassLogView;