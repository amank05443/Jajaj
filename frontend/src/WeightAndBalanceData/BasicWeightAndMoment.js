import React, { useState } from "react";
function SignToggle({ name, value, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden shadow-sm">
      {["+", "-"].map((s, i) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange({ target: { name, value: s } })}
          className={`px-3 py-1 text-sm leading-none focus:outline-none ${
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
  return (
    <div className="relative">
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${width} pr-10 px-3 py-2 rounded-x1 border text-sm shadow-sm focus:ring-2 focus:outline-none ${
          error
            ? "border-red-400 ring-red-200"
            : "border-gray-300 ring-indigo-200 focus:border-indigo-400"
        }`}
      />
      {unit && (
        <span className="pointer-events-none absolute inset-y-0 right-2 my-auto h-5 rounded-md bg-gray-100 px-1.5 text-[11px] leading-5 text-gray-600 border-gray-200">
          {unit}
        </span>
      )}
    </div>
  );
}

export default function BasicWeightAndMoment() {
  const [formData, setFormData] = useState({
    dateSnow: "2025-11-08",
    description: "",
    weightSign: "",
    weightValue: "",
    longSign: "",
    longValue: "",
    latVertSign: "",
    latVertValue: "",
    correctedWeight: "",
    correctedCGLongPos: "",
    correctedLongMoment: "",
    correctedCGLateralPos: "",
    correctedLateralMoment: "",
    authCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
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
    "correctedLongMoment",
    "correctedCGLateralPos",
    "correctedLateralMoment",
    "authCode",
  ];
  const validate = () => {
    const n = {};
    requiredKeys.forEach((k) => {
      if (!formData[k]) n[k] = "Required";
    });

    return n;
  };

  const handleSubmit = () => {
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Form submitted successfully !");
    }, 600);
  };

  const inputClass = (name) =>
    `w-full p-3 rounded-2x1 border text-1g shadow-sm transition-all duration-300 focus:ring-4 ${
      errors[name]
        ? "border-red-400 focus:ring-red-300"
        : "border-gray-300 focus:ring-blue-400"
    }`;

  return (
    <div className="min-h-screen bg--gradient-to-br from-indigo-50 via-purple to-pink-50 p-6">
      <div className="mx-auto w-full max-w-[1200px] rounded-3x1 bg-white shadow-2x1 ring-1 ring-black/5">
        <header className="flex items-end justify-between gap-4 border-b border-b border-gray-100 p-5">
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            BASIC WEIGHT AND MOMENT
          </h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-500">
              Date SNOW
            </label>
            <input
              type="date"
              name="dateSnow"
              value={formData.dateSnow}
              readOnly
              className="rounded-x1 border border-gray-200 bg-gray-100 px-3 py-2 text-gray-700 shadow-inner"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <main className="md:col-span-8 p-6 space-y-6">
            <section className="space-y-2">
              <label className="text-lg font-semibold font-medium uppercase tracking-wide text--gray-500">
                Weighing / Change /Modification
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description here..."
                className={`w-full resize-y rounded-2x1 border px-3 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "border-red-400 ring-red-200"
                    : "border-gray-300 ring-indigo-200 focus:border-indigo-400"
                }`}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description}</p>
              )}
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
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
                    unit="kg"
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
                    unit="kg"
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
                    unit="kg"
                    error={errors.latVertValue}
                  />
                  {errors.latVertSign && (
                    <span className="text-[11px] text-red-500">Sign</span>
                  )}
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  CORRECTED BASIC DATA
                </h2>
              </div>
              <div className="grid grid-cols-4 gap-4 sm:grid-cols-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    Weight
                  </div>
                  <NumberField
                    name="correctedWeight"
                    value={formData.correctedWeight}
                    onChange={handleChange}
                    placeholder="0"
                    unit="kg"
                    error={errors.correctedWeight}
                    width="w-32"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-md font-medium text-gray-500">
                    CG Position (Long)
                  </div>
                  <NumberField
                    name="correctedCGLongPos"
                    value={formData.correctedCGLongPos}
                    onChange={handleChange}
                    placeholder="0"
                    unit="mm"
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
                    CG Position (Lateral % MAC){" "}
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
            </section>
          </main>
          <aside className="md:col-span-4 p-6">
            <div className="sticky top-6 space-y-4">
              <div className="rounded-2x1 border border-gray-100 bg-white p-4 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">
                  Review & Submit
                </h2>
                <br/>
                <h2 className="text-lg font text-gray-700">
                  Details of Change
                </h2>
                <div className="mt-3 space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Date SNOW</span>
                    <span>{formData.dateSnow}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span>
                      {formData.weightSign || "+-"}
                      {formData.weightValue || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Long Moment</span>
                    <span>
                      {formData.longSign || "+-"}
                      {formData.longValue || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lat/Vert</span>
                    <span>
                      {formData.latVertSign || "+-"}
                      {formData.latVertValue || 0}
                    </span>
                  </div>

                <h2 className="text-lg font text-gray-700">
                  Corrected Basic Data
                </h2>
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span>
                     {formData.correctedWeight || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>CG Position(Long)</span>
                    <span>
                     {formData.correctedCGLongPos || 0}
                    </span>
                  </div>
                 <div className="flex justify-between">
                    <span>Moment(Long)</span>
                    <span>
                     {formData.correctedCGLongMoment || 0}
                    </span>
                  </div>
                </div>
              </div>
              <div className="rounded-2x1 border border-gray-100 bg-white p-4 shadow-sm">
                <div className="mb-2 text-sm font-semibold text-gray-900">
                  Auth Code
                </div>
                <input
                  type="number"
                  name="authCode"
                  value={formData.authCode}
                  onChange={handleChange}
                  placeholder="Enter Code"
                  className={`w-full rounded-x1 border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
                    errors.authCode
                      ? "border-red-400 ring-red-200"
                      : "border-gray-300 ring-indigo-200 focus:border-indigo-400"
                  }`}
                />
                {errors.authCode && (
                  <p className="mt-1 text-xs text-red-500">{errors.authCode}</p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`mt-4 w-full rounded-2x1 px-5 py-2  text-sm  font-semibold text-black shadow-1g  transition-all ${
                    isSubmitting
                      ? "bg-gray-400"
                      : "bg-gradient-to-r from indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : " Submit"}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
