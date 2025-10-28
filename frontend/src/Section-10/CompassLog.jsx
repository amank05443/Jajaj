import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import axios from "axios";
import useValidation from "../Utils/CustomHooks/useValidation";

const CompassLog = ({ compassData }) => {
  const { create, error } = useTableApi("compass_calibration_logs");
  const { showAlert } = useAlert();
  const rules = {
    occasion: { capsOnly: true, maxLength: 5 },
    date: { dateNotBeforeToday: true },
  };
  const { validateField } = useValidation({}, rules);

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
    compassData(form);
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
    <div className="bg-gray-100 p-2 space-y-3">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-14 mt-1 mb-1">
        <h2
          className="font-bold"
          style={{
            textAlign: "center",
            fontSize: "35px",
            fontFamily: "algerian",
          }}
        >
          COMPASS CALIBRATION LOG
        </h2>
{/*         <div className="col-span-2 flex justify-end"> */}
{/*           <button */}
{/*             onClick={() => navigate("/CompassLogView")} */}
{/*             className="bg-green-600 text-white rounded hover:bg-green-700" */}
{/*           > */}
{/*             View Details */}
{/*           </button> */}
{/*         </div> */}
      </div>
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
            <tr className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] font-bold text-black">
              <th className="border border-gray-400 p-2" colSpan="4">
                Deviation Record
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gradient-to-r from-orange-300 via-cyan-100 to-indigo-300 font-bold text-black">
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
            <div className="flex items-center mb-4">
            <label className="w-32 font-bold text-black">Remarks:</label>
            <textarea
              type="text"
              name="Remarks"
//               value={formData.heading}
//               onChange={handleChange}
              rows={1}
              placeholder="Enter Remarks"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
{/*           <button */}
{/*             onClick={handleSubmit} */}
{/*             className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-300 to-blue-500 w-60 h-10 rounded-t-full shadow-x1 flex items-center justify-center cursor-pointer" */}
{/*           > */}
{/*             Authenticate */}
{/*           </button> */}
        </div>
      </div>
    </div>
  );
};
export default CompassLog;
