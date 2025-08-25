import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Box,
  Tooltip,
  List,
  ListItem,
  ListItemButton,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import * as Yup from "yup";
import {
  Eye,
  EyeOff,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Lock,
  Search,
} from "lucide-react";
import StepProgress from "./StepProgress";

const api = {
  searchUsers: async (roleKey, q) => {
    await new Promise((r) => setTimeout(r, 300));
    if (!q) return [];
    return [
      { id: q + "01", name: "Alice" + q, meta: { dept: "Ops" } },
      { id: q + "02", name: "Bob" + q, meta: { dept: "Sales" } },
    ].slice(0, 5);
  },
  getUserDetails: async (id) => {
    await new Promise((r) => setTimeout(r, 300));
    return {
      id,
      name: "Name" + id,
      dept: "Dept",
      phone: "12345",
      extra: "details",
    };
  },
  verifyCredentials: async (roleKey, id, password) => {
    await new Promise((r) => setTimeout(r, 700));
    const ok = id && id.length >= 2 && password && password.length >= 3;
    return { ok, reason: ok ? undefined : "Invalid Credentials" };
  },
  recordAudit: async (auditTrail) => {
    await new Promise((r) => setTimeout(r, 200));
    return { ok: true };
  },
};

async function hashStringSHA256(text) {
  if (!text) return "";
  const enc = new TextEncoder();
  const data = enc.encode(text);
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  return btoa(text);
}

export default function TransactionAuth({
  open,
  onClose,
  onAuthorize,
  stepsConfig,
  draftKey = "tx-auth-draft",
}) {
  const totalSteps = stepsConfig.length;
  const adaptive = totalSteps <= 1;

  const initialValues = useMemo(() => {
    const obj = {};
    stepsConfig.forEach((s) => {
      obj[`${s.key}_id`] = "";
      obj[`${s.key}_password`] = "";
    });
    return obj;
  }, [stepsConfig]);
  const [values, setValues] = useState(initialValues);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState({});
  const [idSearchResults, setIdSearchResults] = useState({});
  const [idDetails, setIdDetails] = useState({});
  const [idLoading, setIdLoading] = useState({});
  const [attempts, setAttempts] = useState({});
  const [statusByStep, setStatusByStep] = useState({});
  const [auditTrail, setAuditTrail] = useState([]);
  const autosaveTimer = useRef(null);
  const idDebounce = useRef({});

  const schemas = useMemo(
    () =>
      stepsConfig.map((s) =>
        Yup.object().shape({
          [`${s.key}_id`]: Yup.string().required(`${s.label} ID is required`),
          [`${s.key}_password`]: Yup.string().required(
            `${s.label} Password is required`,
          ),
        }),
      ),
    [stepsConfig],
  );

  useEffect(() => {
    if (!open) return;
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.values) {
          const restored = { ...values };
          Object.keys(parsed.values).forEach((k) => {
            if (k.endsWith("_password")) {
              restored[k] = "";
            } else {
              restored[k] = parsed.values[k];
            }
          });
          setValues(restored);
          setStep(parsed.step ?? 0);
          if (parsed.attempts) setAttempts(parsed.attempts);
          if (parsed.statusByStep) setStatusByStep(parsed.statusByStep);
        }
      }
    } catch (e) {
      console.warn("Failed to load draft", e);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      const cleared = { ...values };
      stepsConfig.forEach((s) => {
        cleared[`${s.key}_password`] = "";
      });
      setValues(cleared);
      setPasswordVisible({});
      setIdSearchResults({});
      setIdDetails({});
      setIdLoading({});
      setErrors({});
      setStatusByStep({});
      setAuditTrail([]);
      if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (autosaveTimer.current) clearTimeout(autosaveTimer.current);
    autosaveTimer.current = setTimeout(async () => {
      try {
        const toSave = { ...values };
        for (const s of stepsConfig) {
          const pwKey = `${s.key}_password`;
          const plain = toSave[pwKey] || "";
          if (plain) {
            try {
              toSave[pwKey] = await hashStringSHA256(plain);
            } catch {
              toSave[pwKey] = "";
            }
          } else {
            toSave[pwKey] = "";
          }
        }
        const payload = {
          values: toSave,
          step,
          attempts,
          statusByStep,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(draftKey, JSON.stringify(payload));
      } catch (err) {
        console.warn("Auto-save failed", err);
      }
    }, 800);
    return () => clearTimeout(autosaveTimer.current);
  }, [values, step, attempts, statusByStep, draftKey, open, stepsConfig]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.ctrlKey && e.key === "ArrowLeft") {
        e.preventDefault();
        handleBack();
      } else if (e.ctrlKey && e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, values, step, attempts]);

  const isLocked = (roleKey) => {
    const a = attempts[roleKey];
    if (!a || !a.lockedUntil) return false;
    return new Date(a.lockedUntil) > new Date();
  };

  const registerAttempt = (roleKey, success) => {
    const cfg = stepsConfig.find((s) => s.key === roleKey) || {};
    const maxAttempts = cfg.maxAttempts ?? 3;
    const lockMinutes = cfg.lockMinutes ?? 5;

    setAttempts((prev) => {
      const cur = prev[roleKey] || { count: 0 };
      if (success) {
        return { ...prev, [roleKey]: { count: 0 } };
      } else {
        const next = (cur.count || 0) + 1;
        if (next >= maxAttempts) {
          const lockedUntil = new Date(
            Date.now() + lockMinutes * 60 * 1000,
          ).toISOString();
          setStatusByStep((s) => ({ ...s, [roleKey]: "locked" }));
          return { ...prev, [roleKey]: { count: next, lockedUntil } };
        }
        setStatusByStep((s) => ({ ...s, [roleKey]: "failed" }));
        return { ...prev, [roleKey]: { count: next } };
      }
    });
  };

  const validateCurrent = async () => {
    try {
      await schemas[step].validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErr = {};
      err.inner.forEach((e) => (newErr[e.path] = e.message));
      setErrors(newErr);
      return false;
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((p) => ({ ...p, [name]: null }));

    const m = name.match(/^(.+)_id$/);
    if (m) {
      const roleKey = m[1];
      setIdLoading((s) => ({ ...s, [roleKey]: true }));
      if (idDebounce.current[roleKey])
        clearTimeout(idDebounce.current[roleKey]);
      idDebounce.current[roleKey] = setTimeout(async () => {
        try {
          const res = await api.searchUsers(roleKey, value);
          setIdSearchResults((s) => ({ ...s, [roleKey]: res }));
        } catch {
          setIdSearchResults((s) => ({ ...s, [roleKey]: [] }));
        } finally {
          setIdLoading((s) => ({ ...s, [roleKey]: false }));
        }
      }, 400);
    }
  };

  const selectId = async (roleKey, id) => {
    setValues((v) => ({ ...v, [`${roleKey}_id`]: id }));
    try {
      const details = await api.getUserDetails(id);
      setIdDetails((d) => ({ ...d, [id]: details }));
    } catch {
      setIdDetails((d) => ({ ...d, [id]: null }));
    }
    setIdSearchResults((s) => ({ ...s, [roleKey]: [] }));
  };

  const togglePwVisible = (roleKey) => {
    setPasswordVisible((p) => ({ ...p, [roleKey]: !p[roleKey] }));
  };

  const handleBack = () => {
    setErrors({});
    if (step > 0) setStep((s) => s - 1);
  };

  const handleClose = () => {
    const cleared = { ...values };
    stepsConfig.forEach((s) => (cleared[`${s.key}_password`] = ""));
    setValues(cleared);
    setPasswordVisible({});
    onClose && onClose();
  };

  const handleNext = useCallback(async () => {
    const cfg = stepsConfig[step];
    const roleKey = cfg.key;
    if (isLocked(roleKey)) {
      alert(
        `${cfg.label} is temporarily locked due to too many failed attempts.`,
      );
      return;
    }
    const valid = await validateCurrent();
    if (!valid) return;

    const idVal = values[`${roleKey}_id`];
    if (cfg.requireExistingId) {
      try {
        const search = await api.searchUsers(roleKey, idVal);
        const exists = search.some((x) => x.id === idVal);
        if (!exists) {
          setErrors((e) => ({
            ...e,
            [`${roleKey}_id`]: `${cfg.label} not found`,
          }));
          return;
        }
      } catch {
        //ignore
      }
    }
    setStatusByStep((s) => ({ ...s, [roleKey]: "pending" }));

    const pw = values[`${roleKey}_password`];
    const auth = await api.verifyCredentials(roleKey, idVal, pw);

    const entry = {
      roleKey,
      label: cfg.label,
      id: idVal,
      time: new Date().toISOString(),
      ok: !!auth.ok,
      reason: auth.reason,
    };
    setAuditTrail((t) => [...t, entry]);

    if (!auth.ok) {
      registerAttempt(roleKey, false);
      setStatusByStep((s) => ({ ...s, [roleKey]: "failed" }));
      setValues((v) => ({ ...v, [`${roleKey}_password`]: "" }));
      alert(auth.reason || "Invalid credentials");
      return;
    }
    registerAttempt(roleKey, true);
    setStatusByStep((s) => ({ ...s, [roleKey]: "success" }));
    setValues((v) => ({ ...v, [`${roleKey}_password`]: "" }));

    if (step < stepsConfig.length - 1) {
      setStep((s) => s + 1);
    } else {
      const finalPayload = stepsConfig.reduce((acc, s) => {
        acc[s.key] = { id: values[`${s.key}_id`] };
        return acc;
      }, {});
      try {
        await api.recordAudit(auditTrail.concat([entry]));
      } catch {}
      onAuthorize && onAuthorize(finalPayload, auditTrail.concat([entry]));
      localStorage.removeItem(draftKey);
      handleClose();
    }
  }, [step, stepsConfig, values, auditTrail]);

  const StatusIcon = ({ status }) => {
    if (status === "success") return <CheckCircle color="green" size={16} />;
    if (status === "failed") return <XCircle color="red" size={16} />;
    if (status === "locked") return <Lock color="gray" size={16} />;
    return <span style={{ width: 16, height: 16, display: "inline-block" }} />;
  };

  const currentCfg = stepsConfig[step];
  const roleKey = currentCfg.key;
  const idField = `${roleKey}_id`;
  const pwField = `${roleKey}_password`;

  const progressSteps = stepsConfig.map(s => {
      let iconNode = null;
      if(s.icon) {
          if(React.isValidElement(s.icon)){
              iconNode = s.icon;
              } else if (typeof s.icon === "function"){
                  const Icon = s.icon;
                  iconNode = <Icon size={16} />;
                  } else {
                      if(s.icon && typeof s.icon.default === "function") {
                          const Icon = s.icon.default;
                          iconNode = <Icon size={16} />;
                          }
                      }
          }
      return {label:s.label,icon:iconNode};
      });

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Transaction Authorisation</Typography>
          <Typography variant="body2" color="textSecondary">
            {adaptive ? null : `Step ${step + 1} of ${totalSteps}`}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!adaptive && (
          <Box mb={2}>
            <StepProgress
              steps={stepsConfig.map((s) => ({ label: s.label, icon: s.icon }))}
              currentStep={step}
            />
            <Box display="flex" gap={1} mt={1} alignItems="center">
              {stepsConfig.map((s, i) => (
                <Box key={s.key} display="flex" alignItems="center" gap={0.5}>
                  <StatusIcon status={statusByStep[s.key]} />
                  <Typography variant="caption">{s.label}</Typography>
                  {i < stepsConfig.length - 1 && (
                    <span style={{ margin: "0 6px" }}>a</span>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        )}

        <Box display="flex" gap={2}>
          <Box flex={2}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={roleKey + step}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.28 }}
              >
                <Typography variant="subtitle1" mb={1}>
                  {currentCfg.label}
                </Typography>
                <TextField
                  label={`${currentCfg.label} ID`}
                  name={idField}
                  fullWidth
                  value={values[idField]}
                  onChange={handleInput}
                  error={!!errors[idField]}
                  helperText={
                    errors[idField] ||
                    (idLoading[roleKey] ? "Searching..." : "")
                  }
                  margin="normal"
                  InputProps={{ endAdornment: <Search size={18} /> }}
                  autoFocus
                />
                {Array.isArray(idSearchResults[roleKey]) &&
                  idSearchResults[roleKey].length > 0 && (
                    <Paper
                      variant="outlined"
                      sx={{ maxHeight: 160, overflow: "auto", mb: 1 }}
                    >
                      <List dense>
                        {idSearchResults[roleKey].map((r) => (
                          <ListItem key={r.id} disablePadding>
                            <ListItemButton
                              onClick={() => selectId(roleKey, r.id)}
                            >
                              <Box
                                display="flex"
                                justifyContent="space-between"
                                width="100%"
                              >
                                <Box>
                                  <Typography variant="body2">
                                    {r.id}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    color="textSecondary"
                                  >
                                    {r.name}
                                    {r.meta ? `ac ${r.meta.dept || ""}` : ""}
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="caption"
                                  color="textSecondary"
                                >
                                  Search
                                </Typography>
                              </Box>
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  )}
                <Box position="relative">
                  <TextField
                    label={`${currentCfg.label} Password`}
                    type={passwordVisible[roleKey] ? "text" : "password"}
                    name={pwField}
                    fullWidth
                    value={values[pwField]}
                    onChange={handleInput}
                    error={!!errors[pwField]}
                    helperText={errors[pwField]}
                    margin="normal"
                    inputProps={{
                      onPaste: (e) => {
                        if (currentCfg.preventPaste) e.preventDefault();
                      },
                      autoComplete: "new-password",
                    }}
                  />
                  <Box position="absolute" right={8} top={40}>
                    <Tooltip
                      title={
                        passwordVisible[roleKey]
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      <IconButton
                        size="small"
                        onClick={() => togglePwVisible(roleKey)}
                        aria-label="toggle-password"
                      >
                        {passwordVisible[roleKey] ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {isLocked(roleKey) && (
                  <Typography variant="body2" color="error">
                    Locked due to too many failed attempts.Please wait and try
                    later.
                  </Typography>
                )}
              </motion.div>
            </AnimatePresence>
          </Box>

          <Box flex={1}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2">Details Preview</Typography>
              <Box mt={1}>
                {values[idField] ? (
                  idDetails[values[idField]] ? (
                    <>
                      <Typography variant="body2">
                        <strong>{idDetails[values[idField]].name}</strong>
                      </Typography>
                      <Typography variant="caption">
                        Dept:{idDetails[values[idField]].dept}
                      </Typography>
                      <Typography variant="caption">
                        Phone:{idDetails[values[idField]].phone}
                      </Typography>
                      <Box mt={1}>
                        <Typography variant="caption">
                          Extra:{idDetails[values[idField]].extra}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <Button
                      size="small"
                      onClick={async () => {
                        try {
                          const det = await api.getUserDetails(values[idField]);
                          setIdDetails((d) => ({
                            ...d,
                            [values[idField]]: det,
                          }));
                        } catch {
                          setIdDetails((d) => ({
                            ...d,
                            [values[idField]]: null,
                          }));
                        }
                      }}
                    >
                      Load Details
                    </Button>
                  )
                ) : (
                  <Typography variant="caption" color="textSecondary">
                    Start typing ID to search
                  </Typography>
                )}
              </Box>
            </Paper>

            <Paper variant="outlined" sx={{ p: 1, mt: 2 }}>
              <Typography variant="subtitle2">Audit Trail</Typography>
              {auditTrail.length === 0 ? (
                <Typography variant="caption" color="textSecondary">
                  No attempts yet
                </Typography>
              ) : (
                auditTrail.slice(-5).map((a, idx) => (
                  <Box
                    key={idx}
                    display="flex"
                    justifyContent="space-between"
                    mt={0.5}
                  >
                    <Typography variant="caption">
                      {a.label} ac {a.id}
                    </Typography>
                    <Typography
                      variant="caption"
                      color={a.ok ? "green" : "error"}
                    >
                      {a.ok ? "OK" : "FAIL"}
                    </Typography>
                  </Box>
                ))
              )}
            </Paper>
          </Box>
        </Box>

        {Object.values(statusByStep).length === stepsConfig.length &&
          Object.values(statusByStep).every((s) => s === "success") && (
            <Box mt={2} p={1} border="1px solid #eee" borderRadius={2}>
              <Typography variant="subtitle2">Audit Summary</Typography>
              {auditTrail.map((a, i) => (
                <Box
                  key={i}
                  display="flex"
                  justifyContent="space-between"
                  mt={1}
                >
                  <Typography variant="body2">{a.label}</Typography>
                  <Typography variant="body2" color={a.ok ? "green" : "error"}>
                    {a.ok ? "Authorized" : `Failed (${a.reason || "unknown"})`}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Box sx={{ flex: 1 }} />
        <Button
          onClick={handleBack}
          variant="text"
          startIcon={<ArrowLeft size={16} />}
          disabled={step === 0}
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          variant="contained"
          color="primary"
          disabled={isLocked(roleKey)}
        >
          {step < stepsConfig.length - 1 ? "Next" : "Authorize"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
