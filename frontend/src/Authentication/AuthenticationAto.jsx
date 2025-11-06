import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "../Utils/CustomHooks/useParams";
import useValidation from "../Utils/CustomHooks/useValidation";
import Select3 from "../Utils/CustomComponents/Select3";
import { useForm, Controller, FormProvider } from "react-hook-form";
export default function AtoOnly({ auth }) {
  const { params, loading } = useParams();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [showPassKey, setShowPassKey] = useState(false);
  const {
    formData,
    errors,
    setErrors,
    handleChange,
    validateAll,
    setFormData,
  } = useValidation(
    { byWhom: "", passkey: "" },
    {
      byWhom: { required: true },
      passkey: { required: true, passkey: true },
    },
  );
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  const methods = useForm({
    defaultValues: {},
    mode: "onChange", //Validate on every blur
  });
  const { control, setError, clearErrors, formState, watch } = methods;
  const handleChangeByWhom = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  useEffect(() => {
    const aircraft_type_id = params.aircraft_type_id;
    const qualificationValue = formData.qualification ? "" : "ATO";
    if (!loading && open && qualificationValue) {
      axios
        .get("/api/userAllDetailsForAuthenticationTwo/", {
          params: {
            aircraft_type_id: aircraft_type_id,
            qualification: qualificationValue,
            trade: "202500012",
          },
        })
        .then((response) => {
          const formatted = response.data.map((item) => ({
            ...item,
            display: `${item.pno || ""}, ${item.user_name || ""}, ${item.abbreviation || ""}`,
          }));
          setData(formatted);
          setFormData({ qualification: qualificationValue });
          console.log("User (ATO) data found :");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Bluunder:", error);
        });
    }
  }, [open, loading, formData.qualification]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll) return;
    try {
      const csrfToken = Cookies.get("csrftoken");
      const res = await fetch("/api/checkPasskey/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({
          byWhom: formData.byWhom,
          passkey: formData.passkey,
        }),
      });
      if (!res.ok) throw new Error("Invalid Passkey0");
      const data = await res.json();
      setErrors((prev) => ({ ...prev, passkey: "" }));
      console.log("Authenticated :", data.user);
      const authData = {
        authenticated: "Yes",
        user_id: data.user.id,
        user_name: data.user.name,
      };
      if (auth) {
        auth(authData);
      }
      setOpen(false);
      setErrors("");
      setFormData({ qualification: "", byWhom: "", passkey: "" });
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        passkey: "Invalid Passkey",
      }));
      console.log("Not Authenticated :", data.message);
    }
  };

  return (
    <>
      <div>
        <button
          fontFamily="algerian"
          variant="contained"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center px-12 py-2 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
        >
          ATO
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="relative bg-white dark:bg-gray-400 p-2 rounded-md w-[700px]  border-2 border-indigo-300 shadow-lg z-10">
              {/* ---------------------------- Heading & close Button-------------------------------- */}
              <div className=" rounded-md shadow-md">
                <button
                  onClick={() => {
                    setFormData({ qualification: "", byWhom: "", passkey: "" });
                    setErrors("");
                    setOpen(false);
                  }}
                  className="absolute top-3 right-3 border border-gray-400 rounded bg-red-200"
                >
                  ❌
                </button>
                <h2
                  style={{ fontFamily: "algerian" }}
                  className="font-bold flex items-center justify-center bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/40 to-[#FFD5E0] h-10 dark:from-gray-600 dark:via-gray-600 dark:to-gray-600 dark:text-white text-black rounded-lg text-xl"
                >
                  👮🏻‍♂️ ATO's AUTHENTICATION
                </h2>
              </div>
              {/* ------------------------------ Authentication Form -------------------------------- */}
              <div>
                <form className=" p-1 space-y-4 ">
                  <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
                    <div>
                      <label className="inline-block px-2 py-1 rounded-md text-blue-900 dark:text-white font-semibold hover:bg-blue-300 transition">
                        Qualification
                      </label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="border p-2 text-center w-full rounded border-gray-300 bg-transparent dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select Name</option>
                        <option value="ATO">ATO</option>
                        <option value="STO">STO</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="inline-block px-2 py-1 rounded-md text-blue-900 dark:text-white font-semibold hover:bg-blue-300 transition">
                        Authorised by ATO
                      </label>
                      {data && (
                        <Controller
                          name="byWhom"
                          control={control}
                          render={({ field }) => (
                            <div>
                              <Select3
                                items={data}
                                placeholder="- - Select Name - -"
                                value={formData.byWhom}
                                onChange={(value) => {
                                  handleChangeByWhom("byWhom", value);
                                }}
                                valueKey="id"
                                displayKey="display"
                                className="border p-1 w-full rounded border-gray-300 bg-transparent dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                              />
                            </div>
                          )}
                        />
                      )}
                    </div>
                    <div>
                      <label className="inline-block px-2 py-1 rounded-md text-blue-900 dark:text-white font-semibold hover:bg-blue-300 transition">
                        Signature Pin
                      </label>
                      <input
                        type={showPassKey ? "text " : "password"}
                        name="passkey"
                        value={formData.passkey}
                        onChange={handleChange}
                        placeholder="* 06 Digit Pin *"
                        className="border p-1  w-full rounded border-gray-300 bg-transparent dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassKey((prev) => !prev)}
                        className=" absolute right-4  mt-2 text-grey-500 hover: text-gray-700"
                      >
                        {showPassKey ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                      {errors.passkey && (
                        <p className="text-red-500">
                          {errors.passkey.message || errors.passkey}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="px-2 float-right font-bold border border-gray-400 rounded bg-green-300"
                  >
                    Authenticate
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
