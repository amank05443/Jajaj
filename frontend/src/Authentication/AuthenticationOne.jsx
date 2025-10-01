import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Eye, EyeOff } from "lucide-react";
import { useParams } from "../Utils/CustomHooks/useParams";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function AllUsers({ auth }) {
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
  useEffect(() => {
    if (open && !loading) {
      const aircraft_type_id = params.aircraft_type_id;
      axios
        .get(`/api/userDetailsForAuthenticationAllUsers/${aircraft_type_id}`)
        .then((response) => {
          setData(response.data);
          console.log("User data found :");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Bluunder:", error);
        });
    }
  }, [open]);
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
      setFormData({ byWhom: "", passkey: "" });
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
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Authenticate
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="relative bg-white p-2 rounded-md w-[600px]  border-2 border-indigo-300 shadow-lg z-10">
              {/* ---------------------------- Heading & close Button-------------------------------- */}
              <div className=" rounded-md shadow-md">
                <button
                  onClick={() => {
                    setFormData({ byWhom: "", passkey: "" });
                    setErrors("");
                    setOpen(false);
                  }}
                  className="absolute top-3 right-3 border border-gray-400 rounded bg-red-200"
                >
                  ❌
                </button>
                <h2 className="font-bold flex items-center justify-center bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/40 to-[#FFD5E0] h-10 rounded-lg text-xl font-family: 'Algerian'">
                  Users authentication
                </h2>
              </div>
              {/* ------------------------------ Authentication Form -------------------------------- */}
              <div>
                <form className=" p-1 space-y-4 ">
                  <div className="grid md:grid-cols-2 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="inline-block px-2 py-1 rounded-xl text-blue-900 font-semibold hover:bg-blue-300 transition">
                        By Whom
                      </label>
                      <select
                        name="byWhom"
                        value={formData.byWhom}
                        onChange={handleChange}
                        className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select Name</option>
                        {data &&
                          data?.map((d) => (
                            <option key={d.id} value={d.id}>
                              {d.abbreviation}, {d.user_name} ({d.pno})
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                        Passkey
                      </label>
                      <input
                        type={showPassKey ? "text " : "password"}
                        name="passkey"
                        value={formData.passkey}
                        onChange={handleChange}
                        placeholder="******"
                        className="border p-1  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
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
