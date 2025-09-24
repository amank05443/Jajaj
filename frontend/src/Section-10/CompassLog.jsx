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
  /*   const handleSubmit = () => {
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
      }, 2500);
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
  }; */

  return (
    <div className="bg-gray-100 p-2 space-y-3">
      <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-11 p-1 m-1">
        <h2
          className="font-bold"
          style={{
            textAlign: "center",
            fontSize: "25px",
            fontFamily: "algerian",
          }}
        >
          COMPASS CALIBRATION LOG
        </h2>
      </div>
      <div
        className="bg-gradient-to-r  rounded-xl shadow-2xl border border-grey-100 p-4 ml-2 mr-3
            transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm"
      >
        {data && (
          <div className="border-4 border-black-400 rounded-lg p-4 backdrop-blur-sm">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr className="bg-blue-300 text-gray-900 font-bold">
                  <td className="border border-gray-400 p-2 w-1/4 text-yellow">
                    <strong>Compass Swing Date :</strong> &nbsp;&nbsp;
                    <b class="text-orange-600">
                      <span>{data.compass_swing_date || "NA"}</span>
                    </b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    Due Date : &nbsp;&nbsp;
                    <b class="text-green-700">{data.due_date || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    AP Reference : &nbsp;&nbsp;
                    <b class="text-green-700">{data.ap_reference || "NA"}</b>
                  </td>
                </tr>
                <tr className="bg-blue-300 text-gray-900 font-bold">
                  <td className="border border-gray-400 p-2 w-1/4">
                    Place : &nbsp;&nbsp;
                    <b class="text-green-700">{data.place || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    Ref SNOW : &nbsp;&nbsp;
                    <b class="text-green-700">{data.ref_snow || "NA"}</b>
                  </td>
                  <td className="border border-gray-400 p-2 w-1/4">
                    Method : &nbsp;&nbsp;
                    <b class="text-green-700">{data.method || "NA"}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <table className="table-auto border-collapse border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border border-gray-400 p-2" colSpan="2">
                Compass Particular
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-400 p-2 font-semibold">Type</td>
              <td className="border border-gray-400 p-2">
                <input
                  type="text"
                  value={form.compass_type}
                  name="compass_type"
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
        <table className="table-auto border-collapse border-gray-400 w-full text-center shadow-lg">
          <thead>
            <tr className="bg-green-500 text-white">
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
            <tr className="bg-green-300">
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
            <tr className="bg-purple-500 text-white">
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
      </div>
    </div>
  );
};
export default CompassLog;
