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
  user_date: yup
    .date()
    .required("Date/Time is required")
    .max(new Date(), "Date/Time cannot be in future"),
  main_system: yup.string().required("System Affected is required"),
  aircraft_role: yup.string().required("Role Affected is required"),
  item: yup.string().required("Item Part No is required"),
  demand_id: yup.number().required("Demand Details is required"),
  deferred_until: yup.string().required("Deferred Until is required"),
});

export default function NewEntryForLimitationLog({ onDataChange }) {
  const { showAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const { params, loading: paramsLoading } = useParams();
  const [systems, setSystemsOptions] = useState([]);
  const [roles, setRolesOptions] = useState([]);
  const [items, setItemsOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get("/api/limLogData/", {
          params: { aircraft_type_id: params.aircraft_type_id },
        });
        console.log(data);
        setSystemsOptions(data.data.systemsData);
        setRolesOptions(data.data.acRoleData);
        setItemsOptions(data.data.itemsData);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const methods = useForm({
    defaultValues: {
      main_system: "",
      aircraft_role: "",
      item: "",
      demand_id: "",
      deferred_until: "",
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        noValidate
      >
        <label className="px-3 py-2 text-2xl font-semibold flex justify-center rounded-md text-blue-900 bg-blue-300 transition">
          Entry for Limitation Log
        </label>
        <div className="mx-auto mt-4 p-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
          <div
            className="grid gap-6 px-4"
            style={{
              gridTemplateColumns: "repeat(auto-fit,minmax(260px, 1fr))",
            }}
          >
            <div className="w-full">
              <Controller
                name="main_system"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="System Affected"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                      startAdornment: (
                        <BugReport size={20} className="text-gray-400 mr-2" />
                      ),
                    }}
                    className="mb-6"
                    autoComplete=""
                  >
                    {systems &&
                      systems.map((sys) => (
                        <MenuItem key={sys.id} value={sys.id}>
                          {sys.system}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="aircraft_role"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    select
                    label="Role Affected"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                      startAdornment: (
                        <LinkOff size={20} className="text-gray-400 mr-2" />
                      ),
                    }}
                    className="mb-6"
                    autoComplete=""
                  >
                    {roles &&
                      roles.map((role) => (
                        <MenuItem key={role.id} value={role.id}>
                          {role.role}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
              />
            </div>
            <div className="w-full">
              {items && (
                <Controller
                  name="item"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select2
                        items={items}
                        label="Select Item Part Number"
                        value={field.value}
                        onChange={field.onChange}
                        displayKey="part_number"
                        valueKey="id"
                        descriptionKey="description"
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
                name="demand_id"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Select Demand Id."
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                      startAdornment: (
                        <Note size={20} className="text-gray-400 mr-2" />
                      ),
                    }}
                    className="mb-6"
                    autoComplete=""
                  />
                )}
              />
            </div>
            <div className="w-full">
              <Controller
                name="deferred_until"
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Deferred Until"
                    fullWidth
                    variant="outlined"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message ?? " "}
                    InputProps={{
                      startAdornment: (
                        <BatteryAlert
                          size={20}
                          className="text-gray-400 mr-2"
                        />
                      ),
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
