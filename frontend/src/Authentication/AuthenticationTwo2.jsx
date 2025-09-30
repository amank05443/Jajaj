import React, { useState, useEffect } from "react";

import useValidation from "../Utils/CustomHooks/useValidation";

export default function TradeSupAtoFinal({ onSubmit }) {
  const rules = {
    trade: { required: true, capsOnly: true },
    qualification: { required: true },
    byWhom: { required: true },
    passkey: { passkey: true },
  };
  const [open, setOpen] = useState(false);
  //   const [users, setUsers] = useState([
  //     { trade: "", qualification: "", byWhom: "", passkey: "", status: "" },
  //   ]);
  const {
    formData: users,
    setFormData: setUsers,
    errors,
    //     setErrors,
    //     handleChange,
    validateAll,
    validateField,
  } = useValidation(
    [{ trade: "", qualification: "", byWhom: "", passkey: "", status: "" }],
    rules,
  );
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  const validatePasskey = (passkey) => {
    return passkey === "12345";
  };

  const handleChange = (index, name, value) => {
    const updated = [...users];
    updated[index][name] = value;
    setUsers(updated);
    validateField(name, value, index);
  };

  const handleCheck = (index) => {
    const updated = [...users];
    const valid = validatePasskey(updated[index].passkey);
    updated[index].status = valid ? "Success" : "Pending";
    setUsers(updated);
  };

  const handleAddRow = () => {
    setUsers([
      ...users,
      { trade: "", qualification: "", byWhom: "", passkey: "", status: "" },
    ]);
  };

  const handleSubmit = () => {
    if (!validateAll()) {
      console.log("Validation errors :", errors);
      return;
    }
    const validatedUsers = users.filter((u) => u.status === "Success");
    if (onSubmit) onSubmit(validatedUsers);
    console.log("Authenticated: ", validatedUsers);
  };

  return (
    <>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Authenticate 3
        </button>
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center ">
            <div className="absolute inset-0 bg-black/60 "></div>
            <div className="relative bg-white p-2 rounded-md w-[900px]  border-2 border-indigo-300 shadow-lg z-10">
              {/* ---------------------------- Heading & close Button-------------------------------- */}
              <div className=" rounded-md shadow-md">
                <button
                  onClick={() => {
                    //                     setErrors("");
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

              <table className="w-full border-collapse border boarder-gray-300 mt-2">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="boarder p-2">Qualification</th>
                    <th className="boarder p-2">Trade</th>
                    <th className="boarder p-2">User Name</th>
                    <th className="boarder p-2">Passkey</th>
                    <th className="boarder p-2">status</th>
                    <th className="boarder p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="text-center">
                      <td className="boarder p-2">
                        <input
                          type="text"
                          value={user.qualification}
                          onChange={(e) =>
                            handleChange(
                              index,
                              "qualification",
                              e.target.value,
                            )
                          }
                          className="boarder rounded p-1 w-20"
                        />
                        {errors[index]?.qualification && (
                          <p className="text-red-500 text-sm">
                            {errors[index].qualification}
                          </p>
                        )}
                      </td>
                      <td className="boarder p-2">
                        <input
                          type="text"
                          value={user.trade}
                          onChange={(e) =>
                            handleChange(index, "trade", e.target.value)
                          }
                          className="boarder rounded p-1 w-20"
                        />
                        {errors[index]?.trade && (
                          <p className="text-red-500 text-sm">
                            {errors[index].trade}
                          </p>
                        )}
                      </td>
                      <td className="boarder p-2">
                        <input
                          type="text"
                          value={user.byWhom}
                          onChange={(e) =>
                            handleChange(index, "byWhom", e.target.value)
                          }
                          className="boarder rounded p-1 w-20"
                        />
                        {errors[index]?.byWhom && (
                          <p className="text-red-500 text-sm">
                            {errors[index].byWhom}
                          </p>
                        )}
                      </td>
                      <td className="boarder p-2">
                        <input
                          type="password"
                          value={user.passkey}
                          onChange={(e) =>
                            handleChange(index, "passkey", e.target.value)
                          }
                          className="boarder rounded p-1 w-20"
                        />
                        {errors[index]?.passkey && (
                          <p className="text-red-500 text-sm">
                            {errors[index].passkey}
                          </p>
                        )}
                      </td>
                      <td className="boarder p-2">{user.status}</td>
                      <td className="boarder p-2">
                        <button
                          onClick={() => handleCheck(index)}
                          className="bg-green-600 text-white px-2 py-1 rounded"
                        >
                          Check
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                onClick={handleAddRow}
                className="mt-4 bg-blue-400 text-white px-4 py-2 rounded"
              >
                Add User
              </button>
              <button
                onClick={handleSubmit}
                className="mt-4 ml-4 bg-purple-600 text-white px-4 py-2 rounded"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
