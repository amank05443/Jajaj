// Enter software modification data A-703B (Section-2). Suman@LEMAR
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Paper,
  Box,
  TextField,
  Typography,
  Select,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  FormControlLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import {
  AccessTime,
  Flight,
  Person,
  Build,
  Code,
  ReportProblem,
  Warning,
  HourglassEmpty,
  Home,
  Gavel,
  VpnKey,
  Search,
  Comment,
  BugReport,
  FlightLand,
  FlightTakeoff,
  LinkOff,
  ClosedCaption,
  Note,
  Construction,
  BatteryAlert,
} from "@mui/icons-material";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, FileText } from "lucide-react";
import * as yup from "yup";
import dayjs from "dayjs";
import Select2 from "../Utils/CustomComponents/Select2";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useAlert } from "../Utils/Alerts/AlertContext";

const schema = yup.object({
});

export default function SoftwareLogEntry({ onDataChange }) {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const { params, loading: paramsLoading } = useParams();
  const [systems, setSystems] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get("/api/softwareLogData/", {
          params: { aircraft_type_id: params.aircraft_type_id },
        });
        setSystems(data.data);
    console.log(data.data);

      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);


  const methods = useForm({
    defaultValues: {

    },
    mode: "onChange", //Validate on every blur
  });
  const { control, setError, clearErrors, formState, watch } = methods;
  const { isDirty } = formState;

  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      clearErrors(name);
    } catch (error) {
      setError(name, { type: "manual", message: error.message });
    }
  };

  const { dirtyFields } = formState;

  useEffect(() => {
    const subscription = watch((values, { name }) => {
      onDataChange(values);
      if (dirtyFields[name]) {
        validateField(name, values[name]);
      } else {
        clearErrors(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, dirtyFields, onDataChange]);


  return (
    <FormProvider {...methods}>
      <motion.form
        className="space-y-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 5}}
        noValidate
      >
        <label className="px-3 py-2 text-2xl font-semibold flex justify-center rounded-md text-md rounded-lg bg-gradient-to-r from-[#a2c0df] via-[#a6e1ec]/60 to-[#a2c0df] h-13 mt-1 mb-1">
          ENTER SOFTWARE MODIFICATION CARRIED OUT
        </label>
        <div className="mx-auto mt-4 p-8 rounded-lg bg-gradient-to-r from-[#a6e1ec] via-[#a2c0df]/60 to-[#a6e1ec] border border-white/30 shadow-lg">
        <div className="grid gap-6 px-4" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px, 1fr))"}}>
            <div className="w-full">
              {systems && (
                <Controller
                  name="system"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select2
                        items={systems}
                        label="System"
                        value={field.value}
                        onChange={field.onChange}
                        displayKey="system__system"
                        valueKey="id"
                        descriptionKey="system"
                      />
                      {!!fieldState.error && (
                        <p style={{ color: "red", fontSize: "0.8rem" }}>
                          {fieldState.error?.message ?? " "}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}
            </div>

            <div className="w-full">
              {systems && (
                <Controller
                  name="software_description"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select2
                        items={systems}
                        label="Software Description"
                        value={field.value}
                        onChange={field.onChange}
                        displayKey="software_description"
                        valueKey="id"
                        descriptionKey="software_description"
                      />
                      {!!fieldState.error && (
                        <p style={{ color: "red", fontSize: "0.8rem" }}>
                          {fieldState.error?.message ?? " "}
                        </p>
                      )}
                    </div>
                  )}
                />
              )}
            </div>
            <div className="w-full">
              <Controller
                name="software_version"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Version"
                    fullWidth
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
            <div className="w-full">
              <Controller
                name="notes"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Notes/ Compatibility"
                    fullWidth
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
      </motion.form>
    </FormProvider>
  );
}