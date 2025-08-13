import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import StepProgress from './StepProgress';
import { UserCheck, UserCog, ShieldCheck } from "lucide-react";

const STEPS = ['👨‍🔧Tradesman','🕵️‍♂️Supervisor','🧑‍✈️ATO'];

const schemas = [
  Yup.object().shape({
    tradesmanId: Yup.string().required("Tradesman ID is required"),
    tradesmanAuthCode: Yup.string().required("Tradesman Auth Code is required"),
  }),
  Yup.object().shape({
    supId: Yup.string().required("Supervisor ID is required"),
    supAuthCode: Yup.string().required("Supervisor Auth Code is required"),
  }),
  Yup.object().shape({
    atoId: Yup.string().required("ATO ID is required"),
    atoAuthCode: Yup.string().required("ATO Auth Code is required"),
  }),
];

const TransactionAuth = ({ open, onClose, onAuthorize }) => {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    tradesmanId: "",
    tradesmanAuthCode: "",
    supId: "",
    supAuthCode: "",
    atoId: "",
    atoAuthCode: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: null }));
  };

  const handleValidate = async () => {
    try {
      await schemas[step].validate(values, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((e) => (newErrors[e.path] = e.message));
      setErrors(newErrors);
      return false;
    }
  };

  const handleNext = async () => {
    const valid = await handleValidate();
    if (!valid) return;

    const currentCred = {
      0: { id: values.tradesmanId, password: values.tradesmanAuthCode },
      1: { id: values.supId, password: values.supAuthCode },
      2: { id: values.atoId, password: values.atoAuthCode },
    };
    const authSuccess = await fakeCheckCredentials(currentCred[step]);
    if (!authSuccess) {
      alert("Invalid credentials");
      return;
    }
    if (step < STEPS.length - 1) {
      setStep(step + 1);
    } else {
      onAuthorize(values);
      handleClose();
    }
  };

  const handleClose = () => {
    setStep(0);
    setValues({
      tradesmanId: "",
      tradesmanAuthCode: "",
      supId: "",
      supAuthCode: "",
      atoId: "",
      atoAuthCode: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown
    >
      <DialogTitle className="text-center font-bold text-lg">
        Transaction Authorization
      </DialogTitle>
      <DialogContent

      >
        <div className="mb-4">
          <StepProgress steps={STEPS} currentStep={step} />
        </div>
        <div className="space-y-4 mt-4">
          {step === 0 && (
            <>
              <TextField
                label="Tradesman P.No."
                name="tradesmanId"
                fullWidth
                value={values.tradesmanId}
                onChange={handleInput}
                error={!!errors.tradesmanId}
                helperText={errors.tradesmanId}
              />
              <TextField
                label="Tradesman Auth Code"
                type="password"
                name="tradesmanAuthCode"
                fullWidth
                value={values.tradesmanAuthCode}
                onChange={handleInput}
                error={!!errors.tradesmanAuthCode}
                helperText={errors.tradesmanAuthCode}
              />
            </>
          )}
          {step === 1 && (
            <>
              <TextField
                label="Supervisor P.No."
                name="supId"
                fullWidth
                value={values.supId}
                onChange={handleInput}
                error={!!errors.supId}
                helperText={errors.supId}
              />
              <TextField
                label="Supervisor Auth Code"
                type="password"
                name="supAuthCode"
                fullWidth
                value={values.supAuthCode}
                onChange={handleInput}
                error={!!errors.supAuthCode}
                helperText={errors.supAuthCode}
              />
            </>
          )}
          {step === 2 && (
            <>
              <TextField
                label="ATO P.No."
                name="atoId"
                fullWidth
                value={values.atoId}
                onChange={handleInput}
                error={!!errors.atoId}
                helperText={errors.atoId}
              />
              <TextField
                label="ATO Auth Code"
                type="password"
                name="atoAuthCode"
                fullWidth
                value={values.atoAuthCode}
                onChange={handleInput}
                error={!!errors.atoAuthCode}
                helperText={errors.atoAuthCode}
              />
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions className="px-6 pb-4">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleNext} variant="contained" color="primary">
          {step < 2 ? "Next" : "Authorize"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
async function fakeCheckCredentials({ id, password }) {
  await new Promise((res) => setTimeout(res, 600));
  return id.length >= 2 && password.length >= 3;
}
export default TransactionAuth;
