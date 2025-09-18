import React, { useState, useEffect } from "react";
import axios from "axios";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import Select2 from "../Utils/CustomComponents/Select2";
import { TextField, Grid } from "@mui/material";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function TradeSupAto() {
  const [open, setOpen] = useState(false);
  const [trades, setTrades] = useState(null);
  const [quals, setQuals] = useState(null);
  const [data, setData] = useState(null);
  const {
    formData,
    errors,
    setErrors,
    handleChange,
    validateAll,
    setFormData,
  } = useValidation(
    { trade: "", qualification: "", byWhom: "", passkey: "", status: "" },
    {
      trade: { required: true },
      qualification: { required: true },
      byWhom: { required: true },
      passkey: { passkey: true },
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
    if (formData.qualification) {
      axios
        .get("/api/userAuthenticationTrade/")
        .then((response) => {
          setTrades(response.data);
          console.log("Trades found :");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Bluunder in trades:", error);
        });
    }
  }, [formData.qualification]);
  useEffect(() => {
    console.log("selectedTrades");
    console.log(formData.trade);
    console.log(formData.qualification);
    if (formData.trade) {
      axios
        .get(`/api/userDetailsForAuthentication/${formData.trade}`)
        .then((response) => {
          setData(response.data);
          console.log("User data found :");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Bluunder:", error);
        });
    }
  }, [formData.trade]);

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Authenticate 2
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="relative bg-white p-2 rounded-md w-[900px]  border-2 border-indigo-300 shadow-lg z-10">
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
                  <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-2">
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                      <div>
                        <label className="inline-block px-2 py-1 rounded-md text-blue-900 font-semibold hover:bg-blue-300 transition">
                          Qualification
                        </label>
                        <select
                          name="qualification"
                          value={formData.qualification}
                          onChange={handleChange}
                          className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="">Select Quals</option>
                          <option value="TDS">Tradesman</option>
                          <option value="SUP">Supervisor</option>
                        </select>
                      </div>
                      <div>
                        <label className="inline-block px-2 py-1 rounded-md text-blue-900 font-semibold hover:bg-blue-300 transition">
                          Select Trade
                        </label>
                        <select
                          name="trade"
                          value={formData.trade}
                          onChange={handleChange}
                          className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                        >
                          <option value="">Select Trade</option>
                          {trades &&
                            trades?.map((T) => (
                              <option key={T.id} value={T.id}>
                                {T.trade}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="inline-block px-2 py-1 rounded-md text-blue-900 font-semibold hover:bg-blue-300 transition">
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
                    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2">
                      <div>
                        <label className="inline-block px-2 py-1 rounded-md text-blue-900 font-semibold hover:bg-blue-300 transition">
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
                      <div>
                        <label className="inline-block px-2 py-1 rounded-md text-blue-900 font-semibold hover:bg-blue-300 transition">
                          Status
                        </label>
                        <input
                          type="text"
                          name="status"
                          value={"Pending"}
                          placeholder="status"
                          className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                        />
                        {errors.passkey && (
                          <p className="text-red-500">
                            {errors.passkey.message || errors.passkey}
                          </p>
                        )}
                      </div>
                    </div>
                    {/*                 <div> */}
                    {/*                         <Select2 */}
                    {/*                           items={} */}
                    {/*                           label="Select Item Part Number" */}
                    {/*                           value={} */}
                    {/*                           onChange={} */}
                    {/*                           displayKey="part_number" */}
                    {/*                           valueKey="id" */}
                    {/*                           descriptionKey="description" */}
                    {/*                         /> */}
                    {/*                         {!!fieldState.error && ( */}
                    {/*                           <p style={{ color: "red", fontSize: "0.8rem" }}> */}
                    {/*                             {fieldState.error?.message ?? " "} */}
                    {/*                           </p> */}
                    {/*                         )} */}
                    {/*                       </div> */}
                  </div>
                  <button
                    onClick={() => setOpen(false)}
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
