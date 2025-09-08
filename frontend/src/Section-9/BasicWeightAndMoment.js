import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import { Grid, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasicWeightAndMomentsForm from "../Section-9/BasicWeightAndMomentsForm";

const BASE_WEIGHT_KG = 13_000;
function SignToggle({ name, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden shadow-sm">
      {["+", "-"].map((s, i) => (
        <button
          key={s}
          font="semibold"
          type="button"
          onClick={() => onChange({ target: { name, value: s } })}
          className={`px-3 py-1 text-sm semibold leading-none focus:outline-none ${
            value === s
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-700 hover:bg-gray-50"
          } ${i === 0 ? "border-r border-gray-300" : ""}`}
        >
          {s}
        </button>
      ))}
    </div>
  );
}

function NumberField({
  name,
  value,
  onChange,
  placeholder,
  unit,
  error,
  width = "w-32",
}) {
  const regex = /^\d{0,10}(\.\d{0,2})? $/;
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    if (errorMsg) {
      const timer = setTimeout(() => setErrorMsg(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [errorMsg]);
  const handleInput = (e) => {
    let newValue = e.target.value;
    if (/[^0-9.]/.test(newValue)) {
      setErrorMsg("Only numbers [0^9] & decimal");
    } else {
      setErrorMsg("");
    }
    newValue = newValue.replace(/[^0-9.]/g, "");
    const dotCount = (newValue.match(/\./g) || []).length;
    if (dotCount > 1) {
      const firstDotIndex = newValue.indexOf(".");
      newValue =
        newValue.slice(0, firstDotIndex + 1) +
        newValue.slice(firstDotIndex + 1).replace(/\./g, "");
    }
    const parts = newValue.split(".");
    if (parts.length > 2) {
      newValue = parts[0] + "." + parts[1];
    }
    if (parts[0].length > 10) {
      setErrorMsg("Max 10 digits allowed");
      parts[0] = parts[0].slice(0, 10);
    }
    if (parts[1] && parts[1].length > 2) {
      setErrorMsg("Max 2 digits allowed after decimal");
      parts[1] = parts[1].slice(0, 2);
    }
    newValue = parts.join(".");
    e.target.value = newValue;
    onChange(e);
  };

  return (
    <div className={`relative $ {width}`}>
      <input
        type="text"
        inputMode="decimal"
        name={name}
        value={value}
        onInput={handleInput}
        placeholder={placeholder}
        className={`${width} pr-10 px-3 py-2 rounded-lg rounded-x1
        border text-sm shadow-sm focus:ring-2 focus:outline-none ${
          errorMsg || error
            ? "border-red-400 ring-red-200"
            : "border-gray-300 ring-indigo-200 focus:border-indigo-400"
        }`}
      />
      {unit && (
        <span
          className="pointer-events-none absolute inset-y-0
        right-2 my-auto h-5 rounded-md bg-gray-100 px-1.5
        text-[11px] leading-5 text-gray-600 border-gray-200"
        >
          {unit}
        </span>
      )}
      {errorMsg && <p className="mt-1 text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
const clearFormData = {
  description: "",
  weightSign: "",
  weightValue: "",
  longSign: "",
  longValue: "",
  latVertSign: "",
  latVertValue: "",
  correctedWeight: "",
  correctedCGLongPos: "",
  correctedCGLongMoment: "",
  correctedCGLateralPos: "",
  correctedLateralMoment: "",
};
export default function BasicWeightAndMoment() {
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(clearFormData);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data, loading, create } = useTableApi("weight_balance");
  const { showAlert } = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
    console.log("formData: ", formData);
  };

  const requiredKeys = [
    "description",
    "weightSign",
    "weightValue",
    "longSign",
    "longValue",
    "latVertSign",
    "latVertValue",
    "correctedWeight",
    "correctedCGLongPos",
    "correctedCGLongMoment",
    "correctedCGLateralPos",
    "correctedLateralMoment",
  ];
  const validate = () => {
    const n = {};
    requiredKeys.forEach((k) => {
      if (!formData[k]) n[k] = "Required";
    });

    return n;
  };

  const handleSubmit = async () => {
    const v = validate();

    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }

    const payload = {
      aircraft_master_id: 1, //replace with actual selected aircraft ID
      weighing_change_mod: formData.description,
      weight_increased:
        formData.weightSign === "+" ? formData.weightValue : null,
      weight_decreased:
        formData.weightSign === "-" ? formData.weightValue : null,
      long_increased: formData.longSign === "+" ? formData.longValue : null,
      long_decreased: formData.longSign === "-" ? formData.longValue : null,
      lat_vert_increased:
        formData.latVertSign === "+" ? formData.latVertValue : null,
      lat_vert_decreased:
        formData.latVertSign === "-" ? formData.longValue : null,
      corrected_weight: formData.correctedWeight,
      corrected_cg_long: formData.correctedCGLongPos,
      corrected_moment_long: formData.correctedCGLongMoment,
      corrected_cg_lat: formData.correctedCGLateralPos,
      corrected_moment_lat: formData.correctedLateralMoment,
      date_authenticated: new Date().toISOString().split("T")[0],
    };
    console.log("formData2: ", formData);

    try {
      setIsSubmitting(true);
      console.log("payload: ", payload);
      create(payload);
      showAlert({
        type: "success",
        title: "New Entry added to Section-9",
        message: "Data saved successfully.",
      });
      //      window.location.reload();
    } catch (err) {
      console.error(err);
      showAlert({
        type: "error",
        title: "ERROR !",
        message: "ERROR...",
        data: err,
      });
    } finally {
      setIsSubmitting(false);
    }
    setFormData(clearFormData);
  };

  const inputClass = (name) =>
    `w-full p-3 rounded-2x1 border text-1g shadow-sm transition-all duration-300 focus:ring-4 ${
      errors[name]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-blue-400"
    }`;

  return (
    <div className="min-h-screen  rounded-lg bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6 overflow-y-hidden">
      <div className="mx-auto rounded-lg   overflow-y-auto rounded-3x1  bg-white shadow-x1 ring-1 ring-gray-100  ">
        <header className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4 border-b border-gray-100 p-5 overflow-x-hidden">
          <h1 className="flex-1 text-center text-[1rem] md:text-[1.8rem] font-extrabold tracking-wide bg-gray-700 bg-clip-text text-transparent ">
            BASIC WEIGHT AND MOMENT
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <main className="md:col-span-8 p-6 space-y-6">
            <section className="space-y-2">
              <label className="text-lg font-semibold font-medium uppercase tracking-wide text-gray-800">
                Weighing / Change /Modification
              </label>

              <textarea
                rows={2}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description here..."
                className={`w-full resize-y rounded-lg rounded-2x1 border px-3 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "border-red-400 ring-red-200"
                    : "border-gray-300 ring-indigo-200 focus:border-indigo-400"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </section>

            <section className="rounded-2xl border border border-indigo-100
            bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-indigo-400">
                  DETAILS OF CHANGE
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-28 shrink-0 text-md font-medium text-gray-500">
                    Weight
                  </div>

                  <SignToggle
                    name="weightSign"
                    value={formData.weightSign}
                    onChange={handleChange}
                  />
                  <NumberField
                    name="weightValue"
                    value={formData.weightValue}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Kg"
                    error={errors.weightValue}
                  />
                  {errors.weightSign && (
                    <span className="text-[11px] text-red-500">Sign</span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-28 shrink-0 text-md font-medium text-gray-500">
                    Long Moment
                  </div>
                  <SignToggle
                    name="longSign"
                    value={formData.longSign}
                    onChange={handleChange}
                  />
                  <NumberField
                    name="longValue"
                    value={formData.longValue}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.longValue}
                  />
                  {errors.longSign && (
                    <span className="text-[11px] text-red-500">Sign</span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-28 shrink-0 text-md font-medium text-gray-500">
                    Lat/ Vert
                  </div>
                  <SignToggle
                    name="latVertSign"
                    value={formData.latVertSign}
                    onChange={handleChange}
                  />
                  <NumberField
                    name="latVertValue"
                    value={formData.latVertValue}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.latVertValue}
                  />
                  {errors.latVertSign && (
                    <span className="text-[11px] text-red-500">Sign</span>
                  )}
                </div>
              </div>
            </section>

            <section
              className="rounded-2xl rounded-lg border border-green-100
            bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 p-6"
            >
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-green-500">
                  CORRECTED BASIC DATA
                </h2>
              </div>

              <div className="grid grid-cols-5 gap-4 sm:grid-cols-5">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    Weight
                  </div>
                  <br />
                  <NumberField
                    name="correctedWeight"
                    value={formData.correctedWeight}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Kg"
                    error={errors.correctedWeight}
                    width="w-32"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    CG Position(Lng)
                  </div>
                  <NumberField
                    name="correctedCGLongPos"
                    value={formData.correctedCGLongPos}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.correctedCGLongPos}
                    width="w-32"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    Moment (Long)
                  </div>
                  <NumberField
                    name="correctedCGLongMoment"
                    value={formData.correctedCGLongMoment}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.correctedCGLongMoment}
                    width="w-32"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    CG Position (Lat){" "}
                  </div>
                  <NumberField
                    name="correctedCGLateralPos"
                    value={formData.correctedCGLateralPos}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.correctedCGLateralPos}
                    width="w-32"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    Moment(Lateral){" "}
                  </div>
                  <NumberField
                    name="correctedLateralMoment"
                    value={formData.correctedLateralMoment}
                    onChange={handleChange}
                    placeholder="0"
                    unit="Nm"
                    error={errors.correctedLateralMoment}
                    width="w-32"
                  />
                </div>
              </div>
              <br />
            </section>
          </main>
          <aside className="md:col-span-4 sm:p-6">
            <div className="sticky top-4 space-y-4">
              <div className="rounded-2x1 rounded-lg border border border-indigo-100 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 ">
                <h2 className="text-xl font-semibold text-gray-500">
                  Review & Submit
                </h2>

                <br />
                <h2 className="text-lg font text-gray-700">
                  Details of Change
                </h2>
                <div className="mt-3 space-y-3 text-md text-gray-600">
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span>
                      {formData.weightSign || ""}
                      {formData.weightValue || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long Moment</span>
                    <span>
                      {formData.longSign || ""}
                      {formData.longValue || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lat/Vert</span>
                    <span>
                      {formData.latVertSign || ""}
                      {formData.latVertValue || 0}
                    </span>
                  </div>

                  <h2 className="text-lg font text-gray-700">
                    Corrected Basic Data
                  </h2>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span>{formData.correctedWeight || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CG Position(Long)</span>
                    <span>{formData.correctedCGLongPos || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moment(Long)</span>
                    <span>{formData.correctedCGLongMoment || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CG Position (Lateral % MAC)</span>
                    <span>{formData.correctedCGLateralPos || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Moment (Lateral)</span>
                    <span>{formData.correctedLateralMoment || 0}</span>
                  </div>
                </div>
              </div>
              <div
                className=" p-2 flex flex-row justify-center gap-4 rounded-2x1 rounded-lg border border-gray-100
              bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-1 gap-4 shadow-sm"
              >
                 <button
                  onClick={handleSubmit}
                  className={`mt-4 w-1/2  ${
                    isSubmitting
                      ? ""
                      : "bg-gradient-to-r from -purple-500 to-indigo-400 text-gray font-semibold px-6 py-3 rounded-lg  active: from-purple-400 active:to-indigo-500"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : " Submit"}
                </button>

                <button
                  onClick={() => navigate("/basicWeightAndMomentsForm")}
                  className="mt-4 w-1/2 rounded-x1 bg-gradient-to-r from -purple-500 to-indigo-400 text-gray font-semibold px-6 py-3 rounded-lg  active: from-purple-400 active:to-indigo-500"
                >
                  History
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}