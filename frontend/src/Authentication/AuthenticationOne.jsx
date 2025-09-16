import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import Select2 from "../Utils/CustomComponents/Select2";
import { TextField, Grid } from "@mui/material";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function AllUsers() {
  const { showAlert } = useAlert();
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);
  const [data, setData] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [error, setError] = useState(null);
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
      passkey: { passkey: true },
    },
  );
  useEffect(() => {
    if (open) {
      axios
        .get("/api/userDetailsForAuthenticationAllUsers/")
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

  //   useEffect(() => {
  //     if (formData.passkey.length === 6) {
  //       fetch("/api/checkPasskey/", {
  //         method: "POST",
  //         headers: { "content-Type": "application/json" },
  //         body: JSON.stringify({ formData.passkey }),
  //       })
  //         .then((res) => {
  //           if (!res.ok) throw new Error("Invalid Passkey");
  //           return res.json();
  //         })
  //         .then((data) => {
  //           setAuthUser(data.user);
  //           setError("");
  //         })
  //         .catch((err) => {
  //           setAuthUser(null);
  //           setError("Invalid Passkey");
  //         });
  //     } else {
  //       setAuthUser(null);
  //       setError("");
  //     }
  //   }, [formData.passkey]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll) return;
    try {
      const csrfToken = Cookies.get("csrftoken");
      const res = await fetch("/api/auth/checkPasskey/", {
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
      if (!res.ok) throw new Error("Invalid Passkey");
      //     if (res.Fail) throw new Error("Invalid Passkey ak");
      const data = await res.json();
      setErrors((prev) => ({ ...prev, passkey: "" }));
      console.log("Authenticated :", data.user);
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
          <div className="fixed inset-0 flex items-center justify-center bg-black/60">
            <div className="bg-white p-2 rounded-md w-[600px] relative border-2 border-indigo-300 shadow-lg">
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
                <h2 className="font-bold flex items-center justify-center bg-blue-200 h-12 rounded-lg ">
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
                        type="text"
                        name="passkey"
                        value={formData.passkey}
                        onChange={handleChange}
                        placeholder="***6***"
                        className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                      />
                      {errors.passkey && (
                        <p className="text-red-500">
                          {errors.passkey.message || errors.passkey}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleSubmit}
                    className="px-2 float-right font-bold border border-gray-400 rounded bg-green-200"
                  >
                    Submit
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
