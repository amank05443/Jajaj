import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import axios from "axios";
import useValidation from "../Utils/CustomHooks/useValidation";

const CompassLog = () => {
  const { create, error } = useTableApi("compass_calibration_logs");
  const { showAlert } = useAlert();
  const [errors, setErrors] = useState([{}]);
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({
    compass_type: 202503280,
    compass_ser_no: 202500003,
    place: 2017104,

    actual_north: "",
    actual_east: "",
    actual_south: "",
    actual_west: "",

    a_c_north: "",
    a_c_north_east: "",
    a_c_east: "",
    a_c_south_east: "",
    a_c_south: "",
    a_c_south_west: "",
    a_c_west: "",
    a_c_north_west: "",

    coeff_a: "",
    coeff_b: "",
    coeff_c: "",
  });

  const { data, loading } = useTableApi("compass_calibration_logs");
  if (loading) {
    <p>Loading...</p>;
  }
  const handleFormChange = (e) => {
    const { index, name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    create(form);
    if (!error) {
      showAlert({
        type: "success",
        title: "New Entry added to Section-10",
        message: "Compass Calibration Data saved successfully.",
        data: { "Compass Type": form.compass_type },
      });
      setTimeout(() => {
        window.location.reload();
      }, 5500);
    } else {
      showAlert({
        type: "error",
        title: "Error occurred",
        message: "Failed to save Compass Calibration Data.",
        data: error,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
  };

  return (
    <div className="">
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

        <div className="col-span-3 flex justify-end mt-1">
          <button
            onClick={() => navigate("/CompassLogView")}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            View History
          </button>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] p-1">
        {data && (
          <div className="grid grid-cols-3 gap-6 my-6">
              <div className="flex flex-col items-center justify-center w-4- h-30 transform-full shadow-lg bg-gradient-to-r from-pink-200 to purple-200">
                  <div className="flex justify-between w-30">
                      <p className="font-semibold">Compass Swing Date :</p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.compass_swing_date || "NA"}</span>
                  </b>
                      </div>
                      <div className="flex justify-between w-30 mt-3">
                      <p className="font-semibold">Due Date :</p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.due_date || "NA"}</span>
                  </b>
                      </div>
                      </div>
                      <div className="flex flex-col items-center justify-center w-4- h-30 rounded-full shadow-lg bg-gradient-to-r from-pink-200 to purple-200">
                  <div className="flex justify-between w-30">
                      <p className="font-semibold">AP Reference :</p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.ap_reference || "NA"}</span>
                  </b>
                      </div>
                      <div className="flex justify-between w-30 mt-3">
                      <p className="font-semibold">Place :</p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.place || "NA"}</span>
                  </b>
                      </div>
                      </div>
                      <div className="flex flex-col items-center justify-center w-4- h-30 rounded-full shadow-lg bg-gradient-to-r from-pink-200 to purple-200">
                  <div className="flex justify-between w-30">
                      <p className="font-semibold">Ref SNOW :</p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.ref_snow || "NA"}</span>
                  </b>
                      </div>
                      <div className="flex justify-between w-30 mt-3">
                      <p className="font-semibold">Method : </p>
                      &nbsp;&nbsp;
                   <b class="text-orange-600">
                     <span>{data.method || "NA"}</span>
                  </b>
                      </div>
                      </div>
{/*             <table className="w-full border-collapse text-sm"> */}
{/*               <tbody> */}
{/*                 <tr className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-6 mt-1 mb-1"> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4 text-yellow"> */}
{/*                     <strong>Compass Swing Date :</strong> &nbsp;&nbsp; */}
{/*                     <b class="text-orange-600"> */}
{/*                       <span>{data.compass_swing_date || "NA"}</span> */}
{/*                     </b> */}
{/*                   </td> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4"> */}
{/*                     <strong>Due Date : </strong>&nbsp;&nbsp; */}
{/*                     <b class="text-green-700">{data.due_date || "NA"}</b> */}
{/*                   </td> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4"> */}
{/*                     <strong>AP Reference : </strong>&nbsp;&nbsp; */}
{/*                     <b class="text-green-700">{data.ap_reference || "NA"}</b> */}
{/*                   </td> */}
{/*                 </tr> */}
{/*                 <tr className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-6 mt-1 mb-1"> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4"> */}
{/*                     <strong>Place :</strong> &nbsp;&nbsp; */}
{/*                     <b class="text-green-700">{data.place || "NA"}</b> */}
{/*                   </td> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4"> */}
{/*                     <strong>Ref SNOW :</strong> &nbsp;&nbsp; */}
{/*                     <b class="text-green-700">{data.ref_snow || "NA"}</b> */}
{/*                   </td> */}
{/*                   <td className="border border-gray-400 p-2 w-1/4"> */}
{/*                     <strong>Method : </strong>&nbsp;&nbsp; */}
{/*                     <b class="text-green-700">{data.method || "NA"}</b> */}
{/*                   </td> */}
{/*                 </tr> */}
{/*               </tbody> */}
{/*             </table> */}
          </div>
        )}
      </div>
      {/*       <div className="bg-white p-4 rounded-lg shadow-md"> */}
      {/*           {data && ( */}
      {/*         <table className="w-full border border-gray-300"> */}
      {/*           <thead> */}
      {/*             <tr className="bg-green-200 text-center"> */}
      {/*               <th className="p-2 border">Compass Swing Date</th> */}
      {/*               <th className="p-2 border">Due Date</th> */}
      {/*               <th className="p-2 border">SNOW</th> */}
      {/*               <th className="p-2 border">View Details</th> */}
      {/*             </tr> */}
      {/*           </thead> */}
      {/*           <tbody> */}
      {/*             {records.map((record, index) => ( */}
      {/*               <tr key={index} className="border-t"> */}
      {/*                 <td className="p-2 border"> */}
      {/*                   <input */}
      {/*                     type="date" */}
      {/*                     value={data.ref_snow} */}
      {/*                     className="border rounded px-2 py-1 w-full" */}
      {/*                   /> */}

      {/*                 </td> */}
      {/*                 <td className="p-2 border"> */}
      {/*                   <input */}
      {/*                     type="text" */}
      {/*                     value={record.occasion} */}
      {/*                     onChange={(e) => */}
      {/*                       handleChange(index, e.target.value, "occasion") */}
      {/*                     } */}
      {/*                     className="border rounded px-2 py-1 w-full" */}
      {/*                   /> */}
      {/*                   {errors[index].occasion && ( */}
      {/*                     <span className="text-red-500"> */}
      {/*                       {errors[index].occasion} */}
      {/*                     </span> */}
      {/*                   )} */}
      {/*                 </td> */}
      {/*                 <td className="p-2 border"> */}
      {/*                   <input */}
      {/*                     type="text" */}
      {/*                     value={data.ref_snow} */}
      {/*                     onChange={(e) => */}
      {/*                       handleChange(index, e.target.value, "snow") */}
      {/*                     } */}
      {/*                     className="border rounded px-2 py-1 w-full" */}
      {/*                   /> */}
      {/*                    */}
      {/*                 </td> */}
      {/*                 <td className="p-2 border text-center"> */}
      {/*                   <button */}
      {/*                     onClick={() => */}
      {/*                       setOpenIndex(openIndex === index ? null : index) */}
      {/*                     } */}
      {/*                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-600" */}
      {/*                   > */}
      {/*                     {openIndex === index ? "hide" : "view"} */}
      {/*                   </button> */}
      {/*                 </td> */}
      {/*               </tr> */}
      {/*             ))} */}
      {/*           </tbody> */}
      {/*         </table> */}
      {/*         )} */}
      {/*         {openIndex !== null && ( */}
      {/*           <div className="mt-4 bg-gray-50 p-4 rounded-lg border"> */}
      {/*             <div className="grid grid-cols-3 gap-4"> */}
      {/*               <div> */}
      {/*                 <label className="block text-sm">AP Reference:</label> */}
      {/*                 <input */}
      {/*                   type="text" */}
      {/*                   value={records[openIndex].details.reference} */}
      {/*                   onChange={(e) => */}
      {/*                     handleDetailsChange(openIndex, "reference", e.target.value) */}
      {/*                   } */}
      {/*                   className="border rounded px-2 py-1 w-full" */}
      {/*                 /> */}
      {/*               </div> */}
      {/*               <div> */}
      {/*                 <label className="block text-sm">PLACE:</label> */}
      {/*                 <input */}
      {/*                   type="text" */}
      {/*                   value={records[openIndex].details.place} */}
      {/*                   onChange={(e) => */}
      {/*                     handleDetailsChange(openIndex, "place", e.target.value) */}
      {/*                   } */}
      {/*                   className="border rounded px-2 py-1 w-full" */}
      {/*                 /> */}
      {/*               </div> */}
      {/*               <div> */}
      {/*                 <label className="block text-sm">METHOD:</label> */}
      {/*                 <input */}
      {/*                   type="text" */}
      {/*                   value={records[openIndex].details.method} */}
      {/*                   onChange={(e) => */}
      {/*                     handleDetailsChange(openIndex, "method", e.target.value) */}
      {/*                   } */}
      {/*                   className="border rounded px-2 py-1 w-full" */}
      {/*                 /> */}
      {/*               </div> */}
      {/*             </div> */}
      {/*           </div> */}

      {/*         )} */}
      {/*       </div> */}
      <div className="grid grid-cols-3 gap-6 rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] ">
        {data && (
          <table className="table-auto border-collapse border-gray-400 w-full text-center shadow-lg">
            <thead>
              <tr className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] font-bold text-black">
                <th className="border border-gray-400 p-2" colSpan="2">
                  Compass Particular
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Type
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="text"
                    value={form.compass_type}
                    name="compass_ser_no"
                    onChange={handleFormChange}
                    className="border p-1 w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Serial No
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="text"
                    value={form.compass_ser_no}
                    name="compass_ser_no"
                    onChange={handleFormChange}
                    className="border p-1 w-full"
                  />
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 p-2 font-semibold">
                  Position
                </td>
                <td className="border border-gray-400 p-2">
                  <input
                    type="text"
                    value={form.place}
                    name="place"
                    onChange={handleFormChange}
                    className="border p-1 w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <table className="table-auto border-collapse border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-orange-300 via-cyan-30 to-indigo-300 font-bold text-black">
              <th className="border border-gray-400 p-2" colSpan="4">
                Deviation Record
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-yellow-200">
              <td colSpan="4" className="border border-gray-400 font-semibold">
                {" "}
                Before Correction{" "}
              </td>
            </tr>
            <tr>
              <td className="border p-2">N</td>
              <td className="border p-2">E</td>
              <td className="border p-2">S</td>
              <td className="border p-2">W</td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.actual_north}
                  name="actual_north"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
                {errors.actual_north && (
                  <span className="text-red-500">{errors.actual_north}</span>
                )}
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.actual_east}
                  name="actual_east"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.actual_south}
                  name="actual_south"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.actual_west}
                  name="actual_west"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
            </tr>
            <tr className="bg-gradient-to-r from-orange-300 via-cyan-100 to-indigo-300 font-bold text-black">
              <td colSpan="4" className="border border-gray-400 font-semibold">
                {" "}
                After Correction{" "}
              </td>
            </tr>
            <tr>
              <td className="border p-2">N</td>
              <td className="border p-2">NE</td>
              <td className="border p-2">E</td>
              <td className="border p-2">SE</td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_north}
                  name="a_c_north"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_north_east}
                  name="a_c_north_east"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_east}
                  name="a_c_east"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_south_east}
                  name="a_c_south_east"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2">S</td>
              <td className="border p-2">SW</td>
              <td className="border p-2">W</td>
              <td className="border p-2">NW</td>
            </tr>
            <tr>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_south}
                  name="a_c_south"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_south_west}
                  name="a_c_south_west"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_west}
                  name="a_c_west"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.a_c_north_west}
                  name="a_c_north_west"
                  onChange={handleFormChange}
                  className="w-14 border p-1"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto border-collapse border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] font-bold text-black">
              <th className="border border-gray-400 p-2" colSpan="2">
                Coeff & Corrector Currents
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 font-semibold">Coeff A</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.coeff_a}
                  name="coeff_a"
                  onChange={handleFormChange}
                  className="border p-1 w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Corrector B</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.coeff_b}
                  name="coeff_b"
                  onChange={handleFormChange}
                  className="border p-1 w-full"
                />
              </td>
            </tr>
            <tr>
              <td className="border p-2 font-semibold">Corrector C</td>
              <td className="border p-2">
                <input
                  type="text"
                  value={form.coeff_c}
                  name="coeff_c"
                  onChange={handleFormChange}
                  className="border p-1 w-full"
                />{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <div className="text-gray-800 font-semibold text-lg">
          <button
            onClick={handleSubmit}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-300 to-blue-500 w-60 h-10 rounded-t-full shadow-x1 flex items-center justify-center cursor-pointer"
          >
            Authenticate
          </button>
        </div>
      </div>
    </div>
  );
};
export default CompassLog;
