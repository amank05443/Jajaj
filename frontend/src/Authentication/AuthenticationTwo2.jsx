import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "../Utils/CustomHooks/useParams";
import { Eye, EyeOff, CheckCircle, Trash2, Plus } from "lucide-react";
import useValidation from "../Utils/CustomHooks/useValidation";
export default function TradeSupAto1({ snowId, authTwo }) {
  const { params, loading } = useParams();
  const [open, setOpen] = useState(false);
  const [isAtz, setIsATZ] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    users: [
      {
        id: "",
        qualification: "",
        trade: "",
        byWhom: "",
        passkey: "",
        cleared_yn: "N",
        showPassKey: false,
      },
    ],
  });

  const [errors, setErrors] = useState([{}]);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);
  useEffect(() => {
    if (!snowId) return;
    const fetchSavedData = async () => {
      try {
        const res = await axios.get("/api/fetchSavedEntries/", {
          params: {
            snowId: snowId,
          },
        });
        if (Array.isArray(res.data)) {
          const formattedUsers = res.data.map((item) => ({
            id: item.id,
            qualification: item.tradesman_sup,
            trade: item.trade_id,
            byWhom: item.user_qual_id,
            //             passkey: "••••••",
            cleared_yn: item.cleared_yn,
            availableTrades: [{ id: item.trade_id, trade: item.trade_name }],
            availableUsers: [
              {
                id: item.user_qual_id,
                pno: item.pno,
                user_name: item.user_qual_name,
                abbreviation: item.rank,
              },
            ],
            showPassKey: false,
          }));
          console.log("Fetched saved formattedUsers:", formattedUsers);
          setFormData({ users: formattedUsers });
        }
      } catch (err) {
        console.error("Error fetching saved authentication:", err);
      }
    };
    if (open && snowId) {
      fetchSavedData();
    }
  }, [snowId, open]);

  //  ------------------------------- TO ADD THE ROW FOR A NEW USER AUTHENTICATION -------------------------------------
  const addRow = () => {
    setFormData({
      ...formData,
      users: [
        ...formData?.users,
        {
          id: "",
          qualification: "",
          trade: "",
          byWhom: "",
          passkey: "",
          cleared_yn: "N",
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
  const removeRow = async (index) => {
    const removedUsers = formData?.users[index];
    console.log(formData?.users[index]);
    if (removedUsers?.id === "") {
      const updatedUsers = formData?.users.filter((_, i) => i !== index);
      setFormData({ ...formData, users: updatedUsers });
      setErrors((prev) =>
        Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
      );
    } else {
      try {
        const csrfToken = Cookies.get("csrftoken");
        const res = await fetch("/api/removeUser/", {
          method: "POST",
          headers: {
            "X-CSRFToken": csrfToken,
            "Content-Type": "application/json",
          },
          withCredentials: true,
          body: JSON.stringify({
            snowId: snowId,
            coslLinesId: removedUsers.id,
            trade: removedUsers.trade,
            qualification: removedUsers.qualification,
            byWhom: removedUsers.byWhom,
          }),
        });
        const data = await res.json();
        if (data.status == "OK") {
          const updatedUsers = formData?.users.filter((_, i) => i !== index);
          setFormData({ ...formData, users: updatedUsers });
          setErrors((prev) =>
            Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
          );
          console.log("DB updated  :", data);
          alert("Removed  " + data);
        } else {
          console.error("Error updating DB :");
          alert("Error updating DB :");
        }
      } catch (err) {
        console.error("Error updating DB :", err);
      }
    }
    if (removedUsers.qualification.toUpperCase() === "ATZ") {
      setIsATZ(false);
    }
  };

  // ------------------------- ON CHANGE FUNCTION AND API CALL FOR TRADES & USERS  -------------------------------------
  const handleRowChange = (index, field, value) => {
    const updatedUsers = [...formData?.users];
    updatedUsers[index][field] = value;
    setFormData({ ...formData, users: updatedUsers });
    validateField(index, field, value);

    // ----------------------- API CALL FOR TRADES ON CHANGE OF QUALIFICATION  -----------------------------------------
    if (field === "qualification") {
      if (value === "ATZ") {
        const hasNotSigned = updatedUsers.some(
          (u) => u.qualification !== "ATZ" && u.cleared_yn !== "Y",
        );
        const hasTds = updatedUsers.some(
          (u) => u.qualification === "TDS" && u.cleared_yn === "Y",
        );
        const hasSup = updatedUsers.some(
          (u) => u.qualification === "SUP" && u.cleared_yn === "Y",
        );
        const hasAtz = updatedUsers.some(
          (u) => u.qualification === "ATZ" && u.cleared_yn === "Y",
        );
        console.log("Trades :", value, hasTds, hasSup);
        if (!hasTds || !hasSup || hasNotSigned) {
          if ((hasTds && hasSup) && hasNotSigned) {
            alert(
              "To authorise this entry,  Either sign remaining tradesman and supervisor or remove them.",
            );
          } else {
            alert(
              "To authorise any limitation entry at least one tradesman and one supervisor signature is mandatory.",
            );
          }
          updatedUsers[index].qualification = "";
          updatedUsers[index].trade = "";
          updatedUsers[index].byWhom = "";
          return;
        }
        if (hasAtz > 0) {
          alert(
            "Entry is authorised already , No further authorisation required..",
          );
          updatedUsers[index].qualification = "";
          updatedUsers[index].trade = "";
          updatedUsers[index].byWhom = "";
          return;
        }
        updatedUsers[index].trade = "0000";
        setFormData({ ...formData, users: updatedUsers });
        handleRowChange(index, "trade", "0000");
        return;
      }
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
      setErrors((prev) => {
        const safePrev = Array.isArray(prev) ? prev : [];
        const updated = [...safePrev];
        updated[index] = { ...updated[index], byWhom: "Select user " };
        return updated;
      });
      return;
    }
    if (!row.passkey) {
      alert("Enter passkey");
      return;
    }
    try {
      const csrfToken = Cookies.get("csrftoken");
      const res = await fetch("/api/checkPasskeyRightSide/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify({
          snowId: snowId,
          coslLinesId: row.id,
          trade: row.trade,
          qualification: row.qualification,
          byWhom: row.byWhom,
          passkey: row.passkey,
          cleared: row.cleared_yn,
        }),
      });
      const data = await res.json();
      if (data.status == "OK") {
        console.log("Authenticated Two :", data.user);
        const updatedUsers = [...formData?.users];
        updatedUsers[index].id = data?.cosl_line_id;
        updatedUsers[index].cleared_yn = "Y";
        updatedUsers[index].showPassKey = false;
        updatedUsers[index].passkey = "••••••";
        if (updatedUsers[index].qualification === "ATZ") {
          setIsATZ(true);
        }
        setFormData({ ...formData, users: updatedUsers, ...data.user });
        console.log({ ...formData });
        alert("Authenticated by " + data.user.name);
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
  //----------------- when user or passkey changes we must reset isPasskeyValid for that row ---------------------------
  const handleSubmit = () => {
    const payload = formData?.users.map((row) => {
      const u = formData.users.find((u) => u.id === parseInt(row.byWhom));
      return {
        authenticated: "Yes",
        user_qual_id: row.byWhom,
      };
    });
    if (authTwo) {
      authTwo(payload);
    }
    setOpen(false);
    setErrors("");
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
            <div className="relative bg-white p-2 rounded-md w-[980px]  border-2 border-indigo-300 shadow-lg z-10">
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
                <h2
                  style={{ fontFamily: "algerian" }}
                  className="font-bold flex items-center justify-center bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/40 to-[#FFD5E0] h-12 rounded-lg text-xl"
                >
                  USERS AUTHENTICATION
                </h2>
              </div>
              {/* ------------------------------ Authentication Form -------------------------------- */}
              <div>
                <h2 className="p-2 flex items-center text-lg text-blue-400">
                  ⚠️ One tradesman one supervisor and a authorizer
                  authentication is mandatory to submit
                </h2>
                <form className="mt-2 space-y-4 ">
                  {formData?.users.map((row, index) => (
                    <>
                      <div
                        key={index}
                        className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-1"
                      >
                        <div className="col-span-1">
                          <input type="hidden" name="id" value={row.id || ""} />
                          <div className="grid grid-cols-5 gap-1">
                            <div
                              className={`${row.qualification === "ATZ" ? "col-span-5" : "col-span-3"}`}
                            >
                              <select
                                name="qualification"
                                value={row.qualification}
                                disabled={row.cleared_yn !== "N"}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "qualification",
                                    e.target.value,
                                  );
                                }}
                                className={`border p-2 text-center w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500
                                    ${row.qualification === "ATZ" ? "bg-indigo-300" : row.qualification === "SUP" ? "bg-cyan-100" : row.qualification === "TDS" ? "bg-indigo-100" : ""}`}
                              >
                                <option value="">Select Qualification</option>
                                <option value="TDS">Tradesman</option>
                                <option value="SUP">Supervisor</option>
                                <option value="ATZ">ATO</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              {row.availableTrades !== "ATZ" && (
                                <select
                                  name="trade"
                                  value={row.trade}
                                  disabled={row.cleared_yn !== "N"}
                                  hidden={row.qualification === "ATZ"}
                                  onChange={(e) => {
                                    handleRowChange(
                                      index,
                                      "trade",
                                      e.target.value,
                                    );
                                  }}
                                  className={`border p-2 text-center w-full rounded border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500
                                      ${
                                        row.trade == "202500007"
                                          ? "bg-orange-100"
                                          : row.trade == "202500008"
                                            ? "bg-pink-100"
                                            : row.trade == "202500009"
                                              ? "bg-pink-200"
                                              : row.trade == "202500010"
                                                ? "bg-yellow-100"
                                                : ""
                                      }`}
                                >
                                  <option value="">Select Trade</option>
                                  {row.availableTrades?.map((T) => (
                                    <option key={T.id} value={T.id}>
                                      {T.trade}
                                    </option>
                                  ))}
                                </select>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-span-2">
                          <div className="grid grid-cols-2 lg:grid-cols-8 gap-1">
                            <div className="col-span-4">
                              <select
                                name="byWhom"
                                value={row.byWhom}
                                disabled={row.cleared_yn !== "N"}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "byWhom",
                                    e.target.value,
                                  );
                                }}
                                className="border p-2  w-full rounded border-gray-300 bg-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                              >
                                <option value="">Select Name</option>
                                {row.availableUsers &&
                                  row.availableUsers.map((d) => (
                                    <option key={d.id} value={d.id}>
                                      {d.pno}, {d.user_name},{d.abbreviation}
                                    </option>
                                  ))}
                              </select>
                            </div>
                            <div className="col-span-2 relative">
                              <input
                                type={row.showPassKey ? "text " : "password"}
                                name="passkey"
                                value={
                                  row.cleared_yn === "Y"
                                    ? "••••••"
                                    : row.passkey
                                }
                                disabled={row.cleared_yn === "Y"}
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "passkey",
                                    e.target.value,
                                  );
                                }}
                                placeholder="**Passkey**"
                                className="border pr-8 p-1 w-full text-center rounded border-gray-300 bg-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                disabled={row.cleared_yn === "Y"}
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
                                    disabled={row.cleared_yn === "Y"}
                                    onClick={() => handleCheck(index)}
                                    className={`p-1 w-32 font-bold border border-gray-400 rounded  text-gray-800 focus:outline-none focus:border-indigo-500
                                    ${row.cleared_yn === "Y" ? "bg-green-100 " : " bg-purple-100  "}`}
                                  >
                                    {row.cleared_yn === "Y"
                                      ? "Signed "
                                      : "Sign here "}
                                  </button>
                                </div>
                                <div className="col-span-2">
                                  {formData?.users.length > 0 && (
                                    <button
                                      type="button"
                                      hidden={isAtz} // Remove user 'X' button will be disabled once authorised by authorizer.
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
                        {errors[index]?.qualification && (
                          <p className="text-sm text-red-500">
                            {errors[index].qualification}
                          </p>
                        )}
                        {errors[index]?.byWhom && (
                          <p className="text-sm text-red-500">
                            {errors[index].byWhom}
                          </p>
                        )}
                        {errors[index]?.trade && (
                          <p className="text-sm text-red-500">
                            {errors[index].trade}
                          </p>
                        )}
                      </div>
                    </>
                  ))}
                </form>
                <div className=" mt-2">
                  {!isAtz && (
                    <button
                      type="button"
                      onClick={addRow} // 'Add user' button will be disabled if authorised by any authorizer.
                      className="px-2 float-left font-bold border border-gray-400 rounded bg-blue-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                    >
                      + Add user
                    </button>
                  )}

                  <button
                    onClick={handleSubmit}
                    className=" hidden px-2 float-right font-bold border border-gray-400 rounded bg-green-400"
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
