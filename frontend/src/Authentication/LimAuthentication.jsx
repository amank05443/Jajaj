import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useParams } from "../Utils/CustomHooks/useParams";
import { Eye, EyeOff, CheckCircle, Trash2, Plus } from "lucide-react";
import Select3 from "../Utils/CustomComponents/Select3";
import { useForm, Controller } from "react-hook-form";
export default function LimitationAuth({ snowId }) {
  const { params, loading } = useParams();
  const [open, setOpen] = useState(false);
  const [isATO, setIsATO] = useState(false);
  const [availableQualifications, setAvailableQualifications] = useState([]);
  const [supervisor, setSupervisor] = useState("");
  const [supPassword, setSupPassword] = useState("");
  const [showSupPassKey, setShowSupPassKey] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isRemoveOk, setIsRemoveOk] = useState(false);
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
  const methods = useForm({
    defaultValues: {},
    mode: "onChange",
  });
  const { control, setError, clearErrors, formState, watch } = methods;
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    const updatedUsers = [...formData?.users];
    const hasSigned = updatedUsers.some((u) => u.cleared_yn === "Y");
    const addUserBtn1 = document?.getElementById("addUserBtn");
    if (updatedUsers.length >= 2) {
      if (addUserBtn1) addUserBtn1.classList.add("hidden");
    } else if (updatedUsers.length < 2) {
      if (addUserBtn1) addUserBtn1.classList.remove("hidden");
    }
  }, [open, formData]);
  useEffect(() => {
    if (isRemove === true) {
      setIsRemoveOk(false);
    }
  }, [formData]);
  useEffect(() => {
    if (!snowId) return;
    const fetchSavedData = async () => {
      try {
        const res = await axios.get("/api/fetchSavedEntries/", {
          params: {
            snowId: snowId,
          },
        });
        if (Array.isArray(res.data.data)) {
          const formattedUsers = res.data.data.map((item) => ({
            id: item.id,
            qualification: item.tradesman_sup,
            trade: item.trade_id,
            byWhom: item.user_qual_id,
            cleared_yn: item.cleared_yn,
            availableTrades: [{ id: item.trade_id, trade: item.trade_name }],
            availableUsers: [
              {
                id: item.user_qual_id,
                pno: item.pno,
                user_name: item.user_qual_name,
                abbreviation: item.rank,
                display: `${item.pno || ""}, ${item.user_qual_name || ""}, ${item.rank || ""}`,
              },
            ],
            showPassKey: false,
          }));
          console.log("Fetched saved formattedUsers:", formattedUsers);
          if (formattedUsers.length !== 0) {
            setFormData({ users: formattedUsers });
          }
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
    const removedUsers = formData?.users;
    console.log(formData?.users[index]);
    const hasAto = removedUsers.some(
      (u) => u.qualification === "ATO" && u.cleared_yn === "Y",
    );
    if (hasAto) {
      alert("No changes can be done after ATO Authorisation");
      return;
    } else {
      const confirmRemove = window.confirm(
        "Are you sure you want to reset this user ?",
      );
      if (confirmRemove) {
        removedUsers[index].qualification = "";
        removedUsers[index].trade = "";
        removedUsers[index].byWhom = "";
        removedUsers[index].cleared_yn = "R";
        removedUsers[index].passkey = "";
        removedUsers[index].showPassKey = "";
        removedUsers[index].availableTrades = [];
        removedUsers[index].availableUsers = [];
        setFormData({ ...formData, users: removedUsers });
        setErrors((prev) =>
          Array.isArray(prev) ? prev.filter((_, i) => i !== index) : [],
        );
      }
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
      const hasNotSigned = updatedUsers.some(
        (u) => u.qualification !== "ATO" && u.cleared_yn !== "Y",
      );
      //       const hasSignedTds = updatedUsers.some(
      //         (u) => u.qualification === "TDS" && u.cleared_yn === "Y",
      //       );
      const hasSignedSup = updatedUsers.some(
        (u) => u.qualification === "SUP" && u.cleared_yn === "Y",
      );
      const hasAto = updatedUsers.some(
        (u) => u.qualification === "ATO" && u.cleared_yn === "Y",
      );
      console.log("Trades :", value);
      //       if (value === "TDS") {
      //         const count = updatedUsers.filter((u) => u.qualification === value,).length;
      //         if (count > 1) {
      //           alert("Tradesman allotted already , No further tradesman required.");
      //           updatedUsers[index].qualification = "";
      //           updatedUsers[index].trade = "";
      //           updatedUsers[index].byWhom = "";
      //           return;
      //         }
      //       }
      if (value === "SUP") {
        const count = updatedUsers.filter(
          (u) => u.qualification === value,
        ).length;
        if (count > 1) {
          alert(
            "Supervisor allotted already , No further supervisor required.",
          );
          updatedUsers[index].qualification = "";
          updatedUsers[index].trade = "";
          updatedUsers[index].byWhom = "";
          return;
        }
      }
      if (value === "ATO") {
        if (!hasSignedSup || hasNotSigned) {
          if (hasSignedSup && hasNotSigned) {
            alert(
              "To authorise this entry,  Either sign supervisor or remove him.",
            );
          } else {
            alert(
              "To authorise any limitation entry supervisor signature is mandatory.",
            );
          }
          updatedUsers[index].qualification = "";
          updatedUsers[index].trade = "";
          updatedUsers[index].byWhom = "";
          return;
        }
        updatedUsers[index].trade = "202500012";
        setFormData({ ...formData, users: updatedUsers });
        handleRowChange(index, "trade", "202500012");
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
          console.log(response.data);
          const formatted = response.data.map((item) => ({
            ...item,
            display: `${item.pno || ""}, ${item.user_name || ""}, ${item.abbreviation || ""}`,
          }));
          updatedUsers[index].availableUsers = formatted;
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
      const res = await fetch("/api/checkPasskeyRightSideLimitation/", {
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
        if (updatedUsers[index].qualification === "ATO") {
          setIsATO(true);
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

  const handleSetRemove = () => {
    const updatedUsers = [...formData?.users];
    const hasSigned = updatedUsers.some((u) => u.cleared_yn === "Y");
    console.log(hasSigned);
    if (hasSigned) {
    }
    setIsRemove(!isRemove);
  };

  return (
    <>
      <div>
        <button
          fontFamily="algerian"
          variant="contained"
          onClick={() => setOpen(true)}
          className="flex items-center justify-center px-4 py-2 font-bold text-black dark:text-yellow-400 !bg-gradient-to-r from-sky-400  to-red-300 dark:from-gray-400 dark:to-gray-500 dark:border-white  shadow-lg
                         !rounded-md border border-green-500 dark:border-yellow-500 !backdrop-blur-lg"
        >
          Lim Authentication
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="relative bg-white dark:bg-gray-400 p-2 rounded-md w-[980px]  border-2 border-indigo-300 shadow-lg z-10">
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
                    setIsRemove(false);
                    setIsRemoveOk(false);
                  }}
                  className="absolute top-3 right-3 border border-gray-400 rounded bg-red-200"
                >
                  ❌
                </button>
                <h2
                  className="flex items-center justify-center font-bold font-algerian bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/40 to-[#FFD5E0] dark:from-gray-600 dark:via-gray-600 dark:to-gray-600 dark:text-white text-black h-12 rounded-lg text-xl"
                >
                  👮🏻‍♂️ USERS AUTHENTICATION
                </h2>
              </div>
              {/* ------------------------------ Authentication Form -------------------------------- */}
              <div>
                <form className="mt-2 space-y-4 ">
                  <h3 className="shadow-lg text-black dark:text-white text-center font-bold flex item-center justify-center w-[90%] h-8 rounded-full mx-auto px-4 py-1 [clip-path:ellipse(50%_50%_at_50%_50%)] bg-purple-200 dark:bg-gray-500 ">
                    {/*                   <h3 className="flex py-1 justify-center font-bold bg-purple-200 dark:bg-gray-500 text-black dark:text-white border-gray-400 rounded-md"> */}
                    ⚠️ One supervisor and an ATO authentication is mandatory.
                  </h3>
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
                              className={`${row.qualification === "ATO" ? "col-span-5" : "col-span-3"}`}
                            >
                              <select
                                name="qualification"
                                value={row.qualification}
                                disabled={
                                  row.cleared_yn === "I" ||
                                  row.cleared_yn === "Y"
                                }
                                onChange={(e) => {
                                  handleRowChange(
                                    index,
                                    "qualification",
                                    e.target.value,
                                  );
                                }}
                                className={`border p-2 text-center w-full rounded border-gray-300 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500
                                    ${row.qualification === "ATO" ? "bg-indigo-300" : row.qualification === "SUP" ? "bg-green-100" : row.qualification === "TDS" ? "bg-indigo-100" : ""}`}
                              >
                                <option value="">Select Qualification</option>
                                <option value="SUP">SUP</option>
                                <option value="ATO">ATO</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              {row.availableTrades !== "ATO" && (
                                <select
                                  name="trade"
                                  value={row.trade}
                                  disabled={
                                    row.cleared_yn === "I" ||
                                    row.cleared_yn === "Y"
                                  }
                                  hidden={row.qualification === "ATO"}
                                  onChange={(e) => {
                                    handleRowChange(
                                      index,
                                      "trade",
                                      e.target.value,
                                    );
                                  }}
                                  className={`border p-2 text-center w-full rounded border-gray-300  bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500
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
                              <Controller
                                name="byWhom"
                                control={control}
                                render={({ field }) => (
                                  <div className="border w-full rounded border-gray-300 bg-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500">
                                    <Select3
                                      items={row.availableUsers}
                                      placeholder="- - Select Name - -"
                                      disabled={
                                        row.cleared_yn === "I" ||
                                        row.cleared_yn === "Y"
                                      }
                                      value={row.byWhom}
                                      onChange={(value) => {
                                        handleRowChange(index, "byWhom", value);
                                      }}
                                      valueKey="id"
                                      displayKey="display"
                                      className="border p-1 w-full rounded border-gray-300 bg-transparent dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                                    />
                                  </div>
                                )}
                              />
                            </div>
                            <div className="col-span-2 relative ">
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
                                placeholder="* 06 Digit Pin *"
                                className="border pr-8 p-1 w-full text-center rounded border-gray-300 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-white focus:outline-none focus:border-indigo-500"
                              />
                              <button
                                type="button"
                                disabled={row.cleared_yn === "Y"}
                                onClick={() => handleChangeShowPasskey(index)}
                                className=" absolute inset-y-0 right-1 flex items-center text-grey-500 dark:text-white"
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
                                    className={`p-1 w-32 font-bold text-gray-800 dark:text-yellow-500 border rounded  border-gray-400 dark:border-yellow-500 dark:from-gray-500 dark:to-gray-600 focus:outline-none focus:border-indigo-500
                                    ${row.cleared_yn === "Y" ? "bg-gradient-to-r from-green-100 to-green-300 " : row.cleared_yn === "I" ? "bg-gradient-to-r from-purple-100 to-purple-300 " : " bg-gradient-to-r from-blue-100 to-blue-300 "}`}
                                    className={`p-1 w-32 font-bold border border-gray-400 dark:border-yellow-500 rounded text-gray-800 dark:text-yellow-500 dark:from-gray-500 dark:to-gray-600 focus:outline-none focus:border-indigo-500
                                    ${row.cleared_yn === "Y" ? "bg-gradient-to-r from-green-100 to-green-300 " : " bg-gradient-to-r from-purple-100 to-purple-300"}`}
                                  >
                                    {row.cleared_yn === "Y"
                                      ? "️️☑️ Signed "
                                      : "🖋️ Sign here "}
                                  </button>
                                </div>
                                <div className="col-span-2">
                                  <button
                                    type="button"
                                    //                                     hidden={} // Remove user 'X' button will be disabled once authorised by authorizer.
                                    onClick={() => removeRow(index)}
                                    className="p-1 ml-7 border border-black rounded text-red-700 focus:outline-none focus:border-indigo-500 bg-red-200"
                                  >
                                    ✘
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-[40%]">
                        {errors[index]?.qualification && (
                          <p className="text-sm text-red-500">
                            {errors[index].qualification}
                          </p>
                        )}

                        {errors[index]?.trade && (
                          <p className="text-sm text-red-500">
                            {errors[index].trade}
                          </p>
                        )}
                        {errors[index]?.byWhom && (
                          <p className="text-sm text-red-500">
                            {errors[index].byWhom}
                          </p>
                        )}
                        {errors[index]?.passkey && (
                          <p className="text-sm text-red-500">
                            {errors[index].passkey}
                          </p>
                        )}
                      </div>
                    </>
                  ))}
                </form>
                <div class="flex flex-col space-y-4">
                  <div>
                    {!isATO && (
                      <button
                        type="button"
                        id="addUserBtn"
                        disabled={isRemove}
                        onClick={addRow} // 'Add user' button will be disabled if authorised by any authorizer.
                        className="px-8 py-[0.1rem] ml-1 float-left font-bold border rounded border-gray-400 dark:border-yellow-500 text-gray-800 dark:text-yellow-500 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-blue-400 dark:to-gray-500 focus:outline-none focus:border-indigo-500 disabled:opacity-30 "
                      >
                        + Add user
                      </button>
                    )}
                    <button
                      type="button"
                      id="removeBtn"
                      onClick={handleSetRemove}
                      hidden={""}
                      className="hidden px-2 mr-60 float-right font-bold border border-gray-400 rounded bg-red-500 text-gray-800 focus:outline-none focus:border-indigo-500"
                    >
                      ✘ Remove signed user
                    </button>
                  </div>
                  {isRemove && (
                    <div className="grid lg:grid-cols-12 gap-6">
                      <div className="col-span-4">
                        <select
                          onChange={(e) => setSupervisor(e.target.value)}
                          className="border ml-2 p-1  text-center rounded border-gray-300 bg-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                          className="border p-2  rounded border-gray-300 bg-gray-200 text-gray-800  focus:border-indigo-500"
                        >
                          <option value="">Select Supervisor</option>
                          {formData.users
                            .filter(
                              (group) =>
                                group.qualification === "SUP" &&
                                group.cleared_yn === "Y",
                            )
                            .flatMap((group) => group.availableUsers)
                            .map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.pno}, {user.user_name},{user.abbreviation}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="col-span-3">
                        <input
                          type={"password"}
                          onChange={(e) => setSupPassword(e.target.value)}
                          placeholder="**Passkey**"
                          className="border ml-12 p-1 text-center rounded border-gray-300 bg-gray-200 text-gray-800 focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      {/*                       <div className="col-span-3"> */}
                      {/*                         <button */}
                      {/*                           onClick={handleAuthToRemove} */}
                      {/*                           className="px-2 py-1 float-right font-bold border border-gray-400 rounded bg-gradient-to-r from-green-200 to-red-400" */}
                      {/*                         > */}
                      {/*                           Auth To Remove */}
                      {/*                         </button> */}
                      {/*                       </div> */}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    setFormData({
                      ...formData,
                      users: [...formData?.users],
                    });
                    setOpen(false);
                    setIsRemove(false);
                    setIsRemoveOk(false);
                  }}
                  className="px-2  float-right font-bold text-black dark:text-yellow-500 bg-gradient-to-r from-blue-200 to-blue-400 dark:from-gray-500 dark:to-gray-600
                   border rounded border-gray-400 dark:border-yellow-500 disabled:opacity-30"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
