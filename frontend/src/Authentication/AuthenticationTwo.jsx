import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "../Utils/CustomHooks/useParams";
import { Eye, EyeOff, CheckCircle, Trash2, Plus } from "lucide-react";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function TradeSupAto({ authTwo }) {
  const { params, loading } = useParams();
  const [open, setOpen] = useState(false);
  const [trades, setTrades] = useState(null);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    users: [
      {
        qualification: "",
        trade: "",
        byWhom: "",
        passkey: "",
        status: false,
        showPassKey: false,
      },
    ],
  });

  const [errors, setErrors] = useState([{}]);
  //  ------------------------------- TO ADD THE ROW FOR A NEW USER AUTHENTICATION -------------------------------------
  const addRow = () => {
    setFormData({
      ...formData,
      users: [
        ...formData?.users,
        {
          qualification: "",
          trade: "",
          byWhom: "",
          passkey: "",
          status: false,
          showPassKey: false,
          availableTrades: [],
          availableUsers: [],
        },
      ],
    });
    setErrors((prev) => [...prev, {}]);
  };
  // ------------------------- TO VIEW THE PASSKEY OF INDIVIDUAL ROW ---------------------------------------------------
  const handleChangeShowPasskey = (index) => {
    const updatedUsers = [...formData?.users];
    updatedUsers[index].showPassKey = !updatedUsers[index].showPassKey;
    setFormData({ ...formData, users: updatedUsers });
  };
  // ------------------------- TO REMOVE ANY ROW FROM TEMPLATE  --------------------------------------------------------
  const removeRow = (index) => {
    const updatedUsers = formData?.users.filter((_, i) => i !== index);
    //     const updatedErrors = errors?.filter((_, i) => i !== index);
    setFormData({ ...formData, users: updatedUsers });
    //     setErrors(updatedErrors);
    setErrors((prev) =>
      Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
    );
  };

  // ------------------------- ON CHANGE FUNCTION AND API CALL FOR TRADES & USERS  -------------------------------------
  const handleRowChange = (index, field, value) => {
    const updatedUsers = [...formData?.users];
    updatedUsers[index][field] = value;
    setFormData({ ...formData, users: updatedUsers });
    validateField(index, field, value);
    // ----------------------- API CALL FOR TRADES ON CHANGE OF QUALIFICATION  -----------------------------------------
    if (field === "qualification") {
      axios
        .get("/api/userAuthenticationTrade/")
        .then((response) => {
          updatedUsers[index].availableTrades = response.data;
          updatedUsers[index].availableUsers = [];
          updatedUsers[index].trade = "";
          updatedUsers[index].byWhom = "";
          updatedUsers[index].passkey = "";
          setFormData({ ...formData, users: updatedUsers });
          console.log("Trades :", value, response.data);
        })
        .catch((error) => {
          console.error("Blunder in trades:", error);
        });
    }
    // ----------------------- API CALL FOR USERS ON CHANGE OF TRADES AND IF TRADES AVAILABLE --------------------------
    if (!loading && field === "trade") {
      const aircraft_type_id = params.aircraft_type_id;
      const qualificationValue = updatedUsers[index].qualification;
      axios
        .get("/api/userAllDetailsForAuthenticationTwo/", {
          params: {
            aircraft_type_id: aircraft_type_id,
            qualification: qualificationValue,
            trade: value,
          },
        })
        .then((response) => {
          updatedUsers[index].availableUsers = response.data;
          updatedUsers[index].byWhom = "";
          updatedUsers[index].passkey = "";
          setFormData({ ...formData, users: updatedUsers });
          console.log("Users :", qualificationValue, value, response.data);
        })
        .catch((error) => {
          console.error("Blunder for user details:", error);
        });
    }
    // ----------------------- JAVASCRIPT FOR ON CHANGE OF USERS  ------------------------------------------------------
    if (field === "byWhom") {
      updatedUsers[index].passkey = "";
    }
  };

  // ------------------------- TO VALIDATE ALL THE FIELD ON TEMPLATES  -------------------------------------------------
  const validateField = (index, field, value) => {
    let message = "";
    if (field === "passkey") {
      if (value === "") {
        message = "";
      } else if (!/^\d*$/.test(value)) {
        message = "Passkey must be numeric";
      } else if (value.length > 6) {
        message = "Passkey cannot be more than 06 digits";
      } else if (value.length === 6 && !/^\d{6}$/.test(value)) {
        message = "Passkey must be exactly 06 digits";
      }
    }
    if (field === "qualification" && !value) {
      message = "Qualification is required";
    }
    if (field === "byWhom" && !value) {
      message = "User is required";
    }
    if (field === "trade" && !value) {
      message = "Trade is required";
    }
    setErrors((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      const updated = [...safePrev];
      updated[index] = { ...updated[index], [field]: message };
      return updated;
    });
  };

  // --------- API CALL FOR CHECKING THE PASSKEY WITH SELECTED USER AND FETCH DATA HAS TO PASS ON MAIN PAGE ------------
  const handleCheck = async (index) => {
    const row = formData?.users[index];
    console.log("row" + row);
    if (!row.byWhom) {
      alert("Select user");
      return;
    }
    if (!row.passkey) {
      alert("Enter passkey");
      return;
    }
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
          byWhom: row.byWhom,
          passkey: row.passkey,
        }),
      });
      //       if (!res.ok) {throw new Error("Invalid Passkey0"); return;}

      const data = await res.json();
      if (data.status == "OK") {
        console.log("Authenticated Two :", data.user);
        const updatedUsers = [...formData?.users];
        updatedUsers[index].status = true;
        updatedUsers[index].passkey = "••••••";
        setFormData({ ...formData, users: updatedUsers, ...data.user });
        console.log({ ...formData });
        alert("Authenticated by " + data.user.name);

        //                 console.log("Authenticated Two :", data.user);
        //                 const updatedUsers = [...(formData?.users || [])];
        //                 updatedUsers[index] = {
        //                   ...(updatedUsers[index] || {}),
        //                   status: true,
        //                   passkey: "••••••",
        //                   userAuthData: data.user,
        //                 };
        //                 setFormData({ ...formData, users: updatedUsers });
        //                 console.log({ ...formData });
        //                 alert("Authenticated " + data.user.name );
      } else {
        console.log(data);
        setErrors((prev) => {
          const safePrev = Array.isArray(prev) ? prev : [];
          const updated = [...safePrev];
          updated[index] = { ...updated[index], passkey: "Invalid Passkey " };
          return updated;
        });
      }
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        passkey: "Invalid Passkey",
      }));
      console.error("Not Authenticated :", err);
    }
  };
  //    -------------------when user or passkey changes we must reset isPasskeyValid for that row ---------------------------
  const handleSubmit = () => {
    //         e.preventDefault();
    //         if (!validateAll) return;
    console.log({ ...formData });
    const payload = formData?.users.map((row) => {
      const u = formData.users.find((u) => u.id === parseInt(row.byWhom));
      return {
        authenticated: "Yes",
        user_id: row.byWhom,
        user_name: data.user.name,
        byWhom: row.byWhom,
        passkey: row.passkey,
      };
    });
    if (authTwo) {
      authTwo(payload);
    }
    //     setOpen(false);
    //     setErrors("");
    //     setFormData({
    //       trade: "",
    //       qualification: "",
    //       byWhom: "",
    //       passkey: "",
    //       status: "",
    //     });
  };

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
            <div className="relative bg-white p-2 rounded-md w-[950px]  border-2 border-indigo-300 shadow-lg z-10">
              {/* ---------------------------- Heading & close Button-------------------------------- */}
              <div className=" rounded-md shadow-md">
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      users: [...formData?.users],
                    });
                    setErrors("");
                    setOpen(false);
                  }}
                  className="absolute top-3 right-3 border border-gray-400 rounded bg-red-200"
                >
                  ❌
                </button>
                <h2 className="font-bold flex items-center justify-center bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/40 to-[#FFD5E0] h-12 rounded-lg text-xl font-family: 'Algerian'">
                  Users authentication
                </h2>
              </div>
              {/* ------------------------------ Authentication Form -------------------------------- */}
              <div>
                <form className="mt-2 space-y-4 ">
                  {formData?.users.map((row, index) => (
                    <>
                      <div
                        key={index}
                        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1"
                      >
                        <div className="col-span-1">
                          <div className="grid grid-cols-5 gap-1">
                            <div className="col-span-3">
                              <select
                                name="qualification"
                                value={row.qualification}
                                disabled={row.status}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "qualification",
                                    e.target.value,
                                  );
                                }}
                                className="border p-2 text-center w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                              >
                                <option value="">Select Qualification</option>
                                <option value="TDS">Tradesman</option>
                                <option value="SUP">Supervisor</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <select
                                name="trade"
                                value={row.trade}
                                disabled={row.status}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "trade",
                                    e.target.value,
                                  );
                                }}
                                className="border p-2 text-center w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                              >
                                <option value="">Select Trade</option>
                                {row.availableTrades &&
                                  row.availableTrades?.map((T) => (
                                    <option key={T.id} value={T.id}>
                                      {T.trade}
                                    </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="grid grid-cols-2 lg:grid-cols-8 gap-1">
                            <div className="col-span-4">
                              <select
                                name="byWhom"
                                value={row.byWhom}
                                disabled={row.status}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "byWhom",
                                    e.target.value,
                                  );
                                }}
                                className="border p-2  w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                              >
                                <option value="">Select Name</option>
                                {row.availableUsers &&
                                  row.availableUsers.map((d) => (
                                    <option key={d.id} value={d.id}>
                                      {d.abbreviation}, {d.user_name}, {d.pno}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-span-2 relative">
                              <input
                                type={row.showPassKey ? "text " : "password"}
                                name="passkey"
                                value={row.passkey}
                                disabled={row.status}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "passkey",
                                    e.target.value,
                                  );
                                }}
                                placeholder="**Passkey**"
                                className="border pr-8 p-1 w-full text-center rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                disabled={row.status}
                                onClick={() => handleChangeShowPasskey(index)}
                                className=" absolute inset-y-0 right-1 flex items-center text-grey-500 hover: text-gray-700"
                              >
                                {row.showPassKey ? (
                                  <EyeOff size={20} />
                                ) : (
                                  <Eye size={20} />
                                )}
                              </button>
                            </div>

                            <div className="col-span-2 ">
                              <div className="grid grid-cols-6 gap-1 ">
                                <div className="col-span-4">
                                  <button
                                    type="button"
                                    name="status"
                                    disabled={row.status}
                                    onClick={() => handleCheck(index)}
                                    className={`p-1 w-32 font-bold border border-gray-400 rounded  text-gray-800 focus:outline-none focus:border-indigo-500
                                    ${row.status ? "bg-green-200 " : " bg-purple-300  "}`}
                                  >
                                    {row.status ? "Signed " : " Please Sign  "}
                                  </button>
                                </div>
                                <div className="col-span-2">
                                  {formData?.users.length > 0 && (
                                    <button
                                      type="button"
                                      name="status"
                                      onClick={() => removeRow(index)}
                                      className="p-1 ml-7 border border-black rounded text-red-700 focus:outline-none focus:border-indigo-500 bg-red-200"
                                    >
                                      ✘
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        {errors[index]?.passkey && (
                          <p className="text-sm text-red-500">
                            {errors[index].passkey}
                          </p>
                        )}
                      </div>
                    </>
                  ))}
                </form>
                <div className=" mt-2">
                  <button
                    type="button"
                    name="status"
                    onClick={addRow}
                    className="px-2 float-left font-bold border border-gray-400 rounded bg-blue-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                  >
                    + Add user
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-2 float-right font-bold border border-gray-400 rounded bg-green-400"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
