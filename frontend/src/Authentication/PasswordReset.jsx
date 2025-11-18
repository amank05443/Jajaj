import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Grid,
  Alert,
  AppBar,
  Toolbar,
  CssBaseline,
  Paper,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../Authentication/AuthContext";

export default function PasswordReset() {
  const [pno, setPno] = useState("");
  const [canReset, setCanReset] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [option, setOption] = useState("");
  const [questions, setQuestions] = useState([]);
  const [securityQ, setSecurityQ] = useState("");
  const [selectedQ, setSelectedQ] = useState("");
  const [securityAns, setSecurityAns] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [validationMsg, setValidationMsg] = useState("");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [pnoError, setPnoError] = useState("");
  const [formData, setFormData] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const getPnoBase = (pnoStr) => {
    if (!pnoStr) return "";
    const match = pnoStr.match(/^\d+/);
    return match ? match[0] : "";
  };

  const isPasscodeSameAsPnoBase = (pnoStr, passcode) => {
    const base = getPnoBase(pnoStr);
    return base && passcode === base;
  };

  const fetchUser = async () => {
    if (pno.trim() === "") return;
    try {
      const res = await fetch(`/api/get_user_details/${pno}/`);
      const json = await res.json();
      if (json && json.user_name && json.rank) {
        setData(json);
        setPnoError("");
        setStep(2);
      } else {
        setData(null);
        setPnoError("Invalid PNo, please check and try again");
      }
    } catch (err) {
      console.error(err);
      setData(null);
      setPnoError("Error fetching user details, try again later");
    }
  };

  const fetchSecurityQuestion = async () => {
    const res = await fetch(`/api/get_security_questions/`);
    const json = await res.json();
    setSecurityQ(json.questions);
  };

  const fetchValidationPassword = async () => {
    if (!pno || !currentPassword) return;
    setIsLoading(true);
    try {
      const csrfToken = Cookies.get("csrftoken");
      const res = await fetch(`/api/validate_password/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pno, password: currentPassword }),
      });
      const json = await res.json();
      if (json.valid) {
        setValidationMsg("Password validated successfully");
        setCanReset(true);
        setStep(3);
      } else {
        setValidationMsg("Incorrect password,please try again");
        setCanReset(false);
      }
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  const fetchValidationSecurity = async () => {
    if (!pno || !selectedQ || !securityAns) {
      setValidationMsg("Please select a question and enter the answer");
      return;
    }
    try {
      setIsLoading(true);
      const csrfToken = Cookies.get("csrftoken");
      const payload = {
        pno,
        security_question_id: parseInt(selectedQ, 10),
        security_question_ans: securityAns.trim(),
      };
      const res = await fetch(`/api/validate_security_answer/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const raw = await res.text();
      let json = null;
      try {
        json = raw ? JSON.parse(raw) : null;
      } catch {
        json = null;
      }
      console.log(
        "validate_security_answer status",
        res.status,
        json,
        "raw:",
        raw,
      );
      if (!res.ok) {
        if (!res.status === 403) {
          setValidationMsg(
            json?.error || "Forbidden (CSRF). Please refresh try again.",
          );
        } else {
          setValidationMsg(json?.error || `Server error (${res.status}).`);
        }
        setCanReset(false);
        return;
      }
      if (json?.valid === true) {
        setValidationMsg("Security answer validated successfully");
        setCanReset(true);
        setStep(3);
      } else {
        setValidationMsg("Incorrect answer, please try again");
        setCanReset(false);
      }
    } catch (err) {
      console.error("fetchValidationSecurity error:", err);
      setValidationMsg("Network error. Please try again");
      setCanReset(false);
    } finally {
      setIsLoading(false);
    }
  };

  const submitReset = async () => {
    setResetMsg("");
    if (!newPass || !confirmPass) {
      return;
    }
    if (isPasscodeSameAsPnoBase(pno, newPass)) {
      setResetMsg("Passcode must not be equal to PNO");
      setNewPass("");
      setConfirmPass("");
      return;
    }
    if (!newPass || newPass !== confirmPass) {
      setResetMsg("New passcodes do not match");
      setNewPass("");
      setConfirmPass("");

      return;
    }

    try {
      setIsLoading(true);
      const csrfToken = Cookies.get("csrftoken");
      const res = await fetch(`/api/reset_passcode/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrfToken || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pno,
          new_passcode: newPass,
          confirm_passcode: confirmPass,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCanReset(
          "Passcode updated for this detachment/embarkation only. Note: Please reset the passcode in NAMS when connection is available",
        );

        setNewPass("");
        setConfirmPass("");
        setValidationMsg("");
      } else {
        setResetMsg(json.error || "Unable to reset passcode");
      }
      setShowPopup(true);
    } catch (err) {
      console.error("reset passcode error:", err);
      setResetMsg("Something went wrong. Try again later.");
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };
  const [step, setStep] = useState(1);

  const handleButtonClick = () => {
    if (step === 1) {
      fetchUser();
    } else if (step === 2) {
      if (option === "security") fetchValidationSecurity();
      else if (option === "password") fetchValidationPassword();
      else alert("Please select an option");
    } else if (step === 3) {
      submitReset();
    }
  };

  const buttonText =
    step === 1
      ? "Next"
      : step === 2
        ? "Validate"
        : step === 3
          ? "Save"
          : isLoading
            ? "Saving..."
            : "Save";

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="relative flex items-center justify-center p-1 min-h-screen">
      <div className="p-1 absolute inset-0 bg-cover bg-center opacity-70">
        <img src="./images/vkd.png" />
      </div>
      <CssBaseline />
      <div className="flex items-center justify-center min-h-screen absolute inset-0 bg-black/40">
        <div className="bg-white shadow-lg rounded-2x1 p-8 w-full max-w-md rounded-md">
          <h2 className="text-2x1 font-semibold text-center text-white-400 mb-6">
            SIGNATURE PIN RESET
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 mb-1">PNO</label>
              <input
                type="text"
                placeholder="Enter PNO"
                value={pno}
                onChange={(e) => {
                  setPno(e.target.value.toUpperCase());
                }}
                disabled={!!data}
//                 onBlur={fetchUser}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none
        focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
              />
              {pnoError && <p className="mt-1 text-red-600"> {pnoError}</p>}
            </div>
            {data && (
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-600 mb-1">Name</label>
                  <input
                    type="text"
                    value={data.user_name}
                    readOnly
                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-gray-600 mb-1">Rank</label>
                  <input
                    type="text"
                    value={data.rank}
                    readOnly
                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
                  />
                </div>
              </div>
            )}

            {data && (
              <div>
                <label className="block text-gray-600 mb-1">
                  Select Option For Signature PIN Reset
                </label>
                <select
                  value={option}
                  onChange={(e) => {
                    const val = e.target.value;
                    setOption(val);
                    setCanReset(false);
                    setValidationMsg("");
                    setNewPass("");
                    setConfirmPass("");
                    setSelectedQ("");
                    setSecurityQ("");
                    setSecurityAns("");
                    setStep(2);
                    if (val === "security") fetchSecurityQuestion();
                  }}
                  className="w-full border border-gray-300  rounded-lg px-4 py-2 focus:outline-none
                focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                >
                  <option value="">--Select --</option>
                  <option value="security">Security Question</option>
                  <option value="password">Login Password</option>
                </select>
              </div>
            )}
            {option === "security" && securityQ && (
              <>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Security Question{" "}
                  </label>
                  <select
                    value={selectedQ}
                    onChange={(e) => {
                      setSelectedQ(e.target.value);
                      setSecurityAns("");
                      setValidationMsg("");
                      setCanReset(false);
                      setNewPass("");
                      setConfirmPass("");
                      setStep(2);
                    }}
                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2"
                  >
                    <option value="">--Select Questions --</option>
                    {securityQ.map((q) => (
                      <option key={q.id} value={q.id}>
                        {q.sec_questions}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 mb-">
                    Your Answer{" "}
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Answer"
                    value={securityAns}
                    onChange={(e) => {
                      setSecurityAns(e.target.value);
                      if (validationMsg) setValidationMsg("");
                    }}
                    //                    onBlur={fetchValidationSecurity}
                    className="w-full border border-gray-300  rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                  />
                  {validationMsg && (
                    <p
                      className={`mt-2 text-setValidationMsg $ {validationMsg.includes("validated") ? "text-green-600": "text-red-600"}`}
                    >
                      {validationMsg}
                    </p>
                  )}
                </div>
              </>
            )}
            {option === "password" && (
              <div>
                <label className="block text-gray-600 mb-1">
                  Enter Current Password{" "}
                </label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (validationMsg) setValidationMsg("");
                    setCanReset(false);
                  }}
                  //                  onBlur={fetchValidationPassword}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2"
                />
                {validationMsg && (
                  <p
                    className={`mt-2 text-setValidationMsg $ {validationMsg.includes("validated") ?
                "text-green-600": "text-red-600"}`}
                  >
                    {validationMsg}
                  </p>
                )}
              </div>
            )}
            <div></div>
            {canReset && (
              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-gray-600 mb-1">
                    New Signature PIN
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Passcode"
                    value={newPass}
                    maxLength={6}
                    onChange={(e) => setNewPass(e.target.value)}
                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-600 mb-1">
                    Confirm Signature PIN
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm Signature PIN"
                    value={confirmPass}
                    maxLength={6}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    className="w-full border border-gray-300 bg-gray-100 rounded-lg px-4 py-2 text-gray-700"
                  />
                </div>
              </div>
            )}
            <button
              onClick={handleButtonClick}
              disabled={isLoading}
              className="bg-violet-500 hover:bg-blue-600 text-white rounded-lg px-4
              hover:bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              {buttonText}
            </button>

            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm text-center">
                  <p className="text-gray-700">{canReset}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => {
                      setShowPopup(false);
                      navigate("/login");
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
            {resetMsg && (
              <p
                className={`mt-2 text-setValidationMsg $ {resetMsg.includes("successful") ? "text-green-600":"text-red-6000"}`}
              >
                {resetMsg}
              </p>
            )}

            {/*<button
            onClick={fetchValidationPassword}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2"
            disabled={isLoading}
          >
            {" "}
            {isLoading ? "Please wait..." : "Submit"}
          </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}




{/* Top App Bar */}
      {/*       <AppBar position="fixed" sx={{ background: "#24133" }}> */}
      {/*         <Toolbar> */}
      {/*           <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold" }}> */}
      {/*             e-700 */}
      {/*           </Typography> */}
      {/*           <Typography variant="subtitle1">CNAMS</Typography> */}
      {/*         </Toolbar> */}
      {/*       </AppBar> */}