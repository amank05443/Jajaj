import React, { useState, useEffect } from "react";
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
  demand_no: yup.string().required("Demand Details is required"),
  deferred_until: yup.string().required("Deferred Until is required"),
});

export default function NewEntryForLimitationLog({ onSave }) {
  const { showAlert } = useAlert();
  const { params } = useParams();
  const { data: systems, loading: systemsLoading } = useTableApi("systems", {
    query: { aircraft_type_id: params.aircraft_type_id },
  });

  const { data: roles, loading: rolesLoading } = useTableApi("aircraft_roles", {
    query: { aircraft_type_id: params.aircraft_type_id },
  });
  const { data: items, loading: itemsLoading } = useTableApi("items", {
    query: { store_type_id: params.aircraft_type_id },
  });
  const { create } = useTableApi("lim_defr_def_logs");

  useEffect(() => {}, []);

  const methods = useForm({
    defaultValues: {
      snow: 2233,
      aircraft_master: params.aircraft_master_id,
      sysdate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      user_date: "",
      airframe_hours: 1234,
      main_system: "",
      aircraft_role: "",
      item: "",
      demand_no: "",
      deferred_until: "",
    },
    mode: "onBlur", //Validate on every blur
  });
  const { control, handleSubmit, setError, clearErrors, formState, watch } =
    methods;
  const { isSubmitting, isDirty } = formState;

  const validateField = async (name, value) => {
    try {
      await schema.validateAt(name, { [name]: value });
      clearErrors(name);
    } catch (error) {
      setError(name, { type: "manual", message: error.message });
    }
  };
  //Watch all fields for live validations
  const formValues = watch();
  const { dirtyFields } = formState;

  useEffect(() => {
    Object.entries(formValues).forEach(([name, value]) => {
      if (dirtyFields[name]) {
        validateField(name, value);
      } else {
        clearErrors(name);
      }
    });
  }, [formValues, dirtyFields]);

  const onSubmit = async (data) => {
    try {
      await schema.validate(data, { abortEarly: false });
      console.log("data:", data);
      create(data);
      showAlert({
        type: "success",
        title: "New Entry added to Section-5",
        message: "Data saved successfully.",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (err) {
      if (err.inner) {
        err.inner.forEach((validationError) => {
          methods.setError(validationError.path, {
            type: "manual",
            message: validationError.message,
          });
        });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-4 p-8 rounded-lg bg-gradient-to-br from-blue-100 to-green-100 p-6 rounded-xl shadow-inner">
      <FormProvider {...methods}>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          noValidate
        >
          <div className="mx-auto mt-4 p-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-lg">
            <div
              className="grid gap-6 px-4"
              style={{
                gridTemplateColumns: "repeat(auto-fit,minmax(260px, 1fr))",
              }}
            >
              <div className="w-full">
                <Controller
                  name="user_date"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Date & Time"
                      fullWidth
                      variant="outlined"
                      type="datetime-local"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message ?? " "}
                      InputProps={{
                        startAdornment: (
                          <AccessTime
                            size={20}
                            className="text-gray-400 mr-2"
                          />
                        ),
                      }}
                      className="mb-6"
                      autoComplete=""
                      disabled={isSubmitting}
                    />
                  )}
                />
              </div>
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
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
                  name="demand_no"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label="Select Demand No."
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
                      disabled={isSubmitting}
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
                      disabled={isSubmitting}
                    />
                  )}
                />
              </div>
            </div>
          </div>
          <motion.div
            whileHover={{ scale: !isSubmitting && isDirty ? 1.05 : 1 }}
            className="mt-4"
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              size="large"
              sx={{ py: 1, fontWeight: "bold", textTransform: "none" }}
            >
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </motion.div>
        </motion.form>
      </FormProvider>
    </div>
  );
}
