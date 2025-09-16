import React, { useState, useEffect } from "react";
import axios from "axios";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import Select2 from "../Utils/CustomComponents/Select2";
import { TextField, Grid } from "@mui/material";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function TradeSupAto() {
  const [open, setOpen] = useState(false);
  const [trades, setTrades] = useState(null);
  const [selectedTrades, setSelectedTrades] = useState("");
  const [quals, setQuals] = useState(null);
  const [data1, setData1] = useState(null);
  const { formData, errors,setErrors, handleChange, validateAll, setFormData } =
    useValidation(
      { trade: "", qualification: "", byWhom: "", passkey: "" },
      {
        trade: { required: true },
        qualification: { required: true },
        byWhom: { required: true },
        passkey: { passkey: true },
      },
    );
  const { data, refetch, loading } = useTableApi("user_quals", {
    related: ["user"],
  });
  useEffect(() => {
    if (open) {
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
  }, [open]);
  useEffect(() => {
    console.log("selectedTrades");
    console.log(selectedTrades);
    if (selectedTrades) {
      axios
        .get(`/api/userDetailsForAuthentication/${selectedTrades}`)
        .then((response) => {
          setData1(response.data);
          console.log("User data found :");
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Bluunder:", error);
        });
    }
  }, [selectedTrades]);

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
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white p-2 rounded-md w-[700px] relative border-2 border-indigo-300 shadow-lg">
              {/* ---------------------------- Heading & close Button-------------------------------- */}
              <div className=" rounded-md shadow-md">
                <button
                  onClick={() => {
                    setFormData({ byWhom: "", passkey: "" });
                    setErrors('');
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
                  <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                        Select Trade
                      </label>
                      <select
                        name="trade"
                        value={formData.trade}
                        onChange={(e) => {
                          setSelectedTrades(e.target.value);
                          handleChange(e);
                        }}
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
                    <div>
                      <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                        Qualification
                      </label>
                      <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select Quals</option>
                        {quals &&
                          quals?.map((Q) => (
                            <option key={Q.qual_id} value={Q.qual_name}>
                              {Q.qual_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="inline-block px-2 py-1 rounded-full text-blue-900 font-semibold hover:bg-blue-300 transition">
                        By Whom
                      </label>
                      <select
                        name="byWhom"
                        value={formData.byWhom}
                        onChange={handleChange}
                        className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                      >
                        <option value="">Select Name</option>
                        {data1 &&
                          data1?.map((d) => (
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
                    {/*                 <input */}
                    {/*                 type="datetime-local" */}
                    {/*                 //                 type="date" */}
                    {/*                 name="dateAndTime" */}
                    {/*                 value={formData.dateAndTime} */}
                    {/*                 onChange={handleChange} */}
                    {/*                 className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500" */}
                    {/*               /> */}
                    {/*               {errors.dateAndTime && ( */}
                    {/*                 <p className="text-red-500"> */}
                    {/*                   {errors.dateAndTime.message || errors.dateAndTime} */}
                    {/*                 </p> */}
                    {/*               )} */}
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
