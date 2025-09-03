import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useAlert } from "../Utils/Alerts/AlertContext";
import { Button } from "@mui/material";
import useValidation from "../Utils/useValidation";

const TestQuals = () => {
  const { showAlert } = useAlert();
  const { params } = useParams();
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const { data, refetch, create, update, loading } = useTableApi("quals"); // Fetching data from database;
  const {formData, errors, handleChange, validateAll, setFormData, setErrors, validateField, } = useValidation(
      { abbreviation: "", qual_name: "", user_type: "" },
      {
          abbreviation: { capsOnly: true, maxLength: 5, messages: { capsOnly: "CAPS ONLY", maxLength: "MAX 03 CHARACTERS ALLOWED" }},
          qual_name: { capsOnly: true, maxLength: 3 },
      //         user_type: { capsOnly: true, maxLength: 3 },
          user_type: { dateNotBeforeToday: true },
    },
  );
  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleClickNewEntry = () => {
    setEditingId(null);
    setShowForm(true);
  };
  const handleView = (row) => {
    setFormData({
      abbreviation: row.abbreviation || "",
      qual_name: row.qual_name || "",
      user_type: row.user_type || "",
    });
    const newErrors = {
      abbreviation: validateField("abbreviation", row.abbreviation || ""),
      qual_name: validateField("qual_name", row.qual_name || ""),
      user_type: validateField("user_type", row.user_type || ""),
    };
    setErrors(newErrors);
    if (!validateAll()) {
      setFormData({
        abbreviation: "",
        qual_name: "",
        user_type: "",
      });
    }
    setEditingId(row.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("validateAll:", typeof validateAll);
    if (validateAll()) {
      try {
        if (editingId == null) {
          create(formData);
          showAlert({
            type: "success",
            title: "New Entry added to Quals !",
            message: "Data saved successfully.",
            data: formData,
            autoHideDuration: 10000,
          });
          setShowForm(false);
          setFormData({ abbreviation: "", qual_name: "", user_type: "" });
          refetch();
        } else {
          update(editingId, formData, "PATCH");
          showAlert({
            type: "success",
            title: "Entry Updated !",
            message: "Data updated successfully.",
            data: formData,
            autoHideDuration: 10000,
          });
          setShowForm(false);
          refetch();
        }
      } catch (error) {
        console.log("error");
      }
    } else {
      console.error(error);
      showAlert({
        type: "error",
        title: "BLUNDER !",
        message: "Validation failed :",
        data: errors,
        autoHideDuration: 20000,
      });
    }
  };

  const resetForm = () => {
    setFormData({
      abbreviation: "",
      qual_name: "",
      user_type: "",
    });
  };

  return (
    <>
      <div>
        <Button
          onClick={handleClickNewEntry}
          className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
        >
          {" "}
          New Entry
        </Button>
      </div>

      {showForm && (
        <div>
          <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-4"
          >
            <h2>Quals Form</h2>
            <div>
              <input
                type="text"
                name="abbreviation"
                placeholder="Enter Abbreviation -- Alphabets only--"
                value={formData.abbreviation}
                onChange={handleChange}
                required
              />
              {errors.abbreviation && (
                <span className="text-red-500">{errors.abbreviation}</span>
              )}
            </div>
            <div>
              <input
                type="text"
                name="qual_name"
                placeholder="Enter Qualification"
                value={formData.qual_name}
                onChange={handleChange}
                required
              />
              {errors.qual_name && (
                <span className="text-red-500"> {errors.qual_name} </span>
              )}
            </div>
            <div>
              <input
                type="date"
                name="user_type"
                placeholder="Enter User Type"
                value={formData.user_type}
                onChange={handleChange}
                required
              />
              {errors.user_type && (
                <span className="text-red-500"> {errors.user_type}</span>
              )}
            </div>
            <button type="submit"> Save</button>
            <button type="button" onClick={resetForm}>
              Reset
            </button>
            {/*             {error && <p className="text-orange-500"> {error} </p>} */}
          </form>
        </div>
      )}

      {!loading && data && (
        <table className="border 2px solid max-w-md mx-auto mt-4">
          <thead>
            <tr>
              <td> ID </td>
              <td> Abbreviation </td>
              <td> Qual Name </td>
              <td> User Type </td>
              <td> Action </td>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td className="border 2px solid"> {row.id} </td>
                <td className="border 2px solid"> {row.abbreviation} </td>
                <td className="border 2px solid"> {row.qual_name} </td>
                <td className="border 2px solid"> {row.user_type} </td>
                <td className="border 2px solid">
                  <Button onClick={() => handleView(row)}> view </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default TestQuals;