// Enter software modification data A-703B (Section-2). Suman@LEMAR
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField, Typography } from "@mui/material";
import {} from "@mui/icons-material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, FileText } from "lucide-react";
import * as yup from "yup";
import dayjs from "dayjs";
import Select2 from "../Utils/CustomComponents/Select2";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useAlert } from "../Utils/Alerts/AlertContext";
import { keyframes } from "@mui/system";


const schema = yup.object({});

export default function RoleChangeLogEntry({}) {
  const params = useParams();
  const [formData, setFormData] = useState({
    weightValue: "",
    longMomentValue: "",
    latMomentValue: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errors, setErrors] = useState({});
  const regex = /^\d{0,10}(\.\d{0,2})? $/;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/roleChangeLogData/", {
          params: { aircraft_master_id: params.params.aircraft_master_id },
        });
        console.log(res);
        const responseData = res.data;
        console.log(responseData);
        if (responseData && responseData.length > 0) {
          const latest = responseData.reduce((max, item) =>
            item.id > max.id ? item : max,
          );
          console.log(latest);
          setFormData({
            weightValue: latest.corrected_weight || "",
            longMomentValue: latest.corrected_moment_long || "",
            latMomentValue: latest.corrected_moment_lat || "",
            weightValueRemoved: "",
            longMomentRemoved: "",
            latMomentValueRemoved: "",
            weightValueAdded: "",
            longMomentValueAdded: "",
            latMomentValueAdded: "",
            currentWeightValue: "",
            currentLongValue: "",
            currentLatVertValue: "",
            currentCgLongValue: "",
            currentCgLatVertValue: "",
            mac: "",
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [params]);

  const methods = useForm({
    defaultValues: {},
    mode: "onChange",
  });

  const { control, setError, clearErrors, formState, watch } = methods;
  const { isDirty } = formState;

  const handleNumberInput = (e, setFormData, fieldName) => {
      let value = String(e.target.value || "");
      const allowed = /^\d*\.?\d*$/.test(value);
      if(!allowed){
          return;
          }
      if(value.includes(".")){
          const [intPart,decPart] = value.split(".")
          console.log(intPart, decPart);
      if(decPart.length > 2){
          return;
          }
      }
  value= value.replace(/^0+(?=\d)/,"");
          setFormData((prev) => ({
              ...prev,
              [fieldName]: value,
              }));
          };

  return (
    <FormProvider {...methods}>
      <motion.form
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 5 }}
        noValidate
      >
          <label className="px-3 py-2 text-2xl font-semibold flex justify-center rounded-md text-md rounded-lg bg-gradient-to-r from-[#a2c0df] via-[#a6e1ec]/60 to-[#a2c0df] h-13 mt-1 mb-1">
          <h2 className="font-bold"style={{textAlign: "center",fontSize: "25px",fontFamily: "algerian",}}>
            CURRENT OPERATING DATA (WEIGHT & BALANCE){" "}
            <samp className="font-bold" style={{textAlign: "center",fontSize: "15px",fontFamily: "algerian",}}>
              (Role Change)
            </samp>
          </h2>
        </label>

          <section className="rounded-2xl border border border-indigo-100 bg-gradient-to-br from-[#a2c0df] via-[#a6e1ec]/60 to-[#a2c0df] p-6"style={{}}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-black-400 animate-[blink_1s_inifinite]">
                <u>CURRENT AIRCRAFT DATA</u>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                <Controller
                name="weightValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Weight (Kg)"
                    fullWidth
                    value={formData.weightValue || ""}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="longMomentValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Long Moment (Nm)"
                    fullWidth
                    value={formData.longMomentValue || ""}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="latMomentValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Lat/ Vert (Nm)"
                    fullWidth
                    value={formData.latMomentValue || ""}
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>
            </div>
            <br />

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-red-400">
                <u>ITEMS REMOVED</u>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="weightValueRemoved"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Weight (Kg)"
                    fullWidth
                    variant="outlined"
                    value={formData.weightValueRemoved || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"weightValueRemoved")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    inputProps={{
                        inputMode: "decimal"
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="longMomentRemoved"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Long Moment (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.longMomentRemoved || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"longMomentRemoved")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="latMomentValueRemoved"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Lat/ Vert (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.latMomentValueRemoved || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"latMomentValueRemoved")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>
            </div>

            <br />


            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-green-600">
                <u>ITEMS FITTED</u>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="weightValueAdded"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Weight (Kg)"
                    fullWidth
                    variant="outlined"
                    value={formData.weightValueAdded || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"weightValueAdded")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="longMomentValueAdded"
                control={control}
                render={({ field, fieldState }) => (
                   <TextField
                    {...field}
                    label="Long Moment (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.longMomentValueAdded || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"longMomentValueAdded")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="latMomentValueAdded"
                control={control}
                render={({ field, fieldState }) => (
                 <TextField
                    {...field}
                    label="Lat/ Vert (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.latMomentValueAdded || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"latMomentValueAdded")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>
            </div>

            <br />

            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                <u>CURRENT OPERATING WEIGHT AND MOMENT</u>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="currentWeightValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Weight (Kg)"
                    fullWidth
                    variant="outlined"
                    value={formData.currentWeightValue || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"currentWeightValue")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="currentLongValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Long Moment (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.currentLongValue || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"currentLongValue")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="currentLatVertValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Lat/ Vert (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.currentLatVertValue || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"currentLatVertValue")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>
            </div>

            <br />


            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-700">
                <u>CURRENT OPERATING CG POSITION</u>
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 w-full">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="currentCgLongValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Long (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.currentCgLongValue || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"currentCgLongValue")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="currentCgLatVertValue"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Lat/ Vert (Nm)"
                    fullWidth
                    variant="outlined"
                    value={formData.currentCgLatVertValue || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"currentCgLatVertValue")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Controller
                name="mac"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="% MAC"
                    fullWidth
                    variant="outlined"
                    value={formData.mac || ""}
                    onChange={(e) => handleNumberInput(e,setFormData,"mac")}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
                 </div>
              </div>
            </div>
          </section>

      </motion.form>
    </FormProvider>
  );
}
