import React, { useState } from "react";
import { Button } from "@mui/material";
import { useAlert } from "../Utils/Alerts/AlertContext";
import { useConfirm } from "../Utils/Alerts/ConfirmContext";
import LimitationLog from "../Section-2/LimitationLog";
import ViewLeadingParticulars from "../LeadingParticulars/ViewLeadingParticulars";
import TransactionAuth from "../Utils/TransactionAuth";
import {UserCheck,UserCog,ShieldCheck} from "lucide-react";

const stepsConfig = [
  {
    key: "tradesman",
    label: "Tradesman",
//     icon: <UserCheck size={16} />,
    icon: "👨‍🔧",
    maxAttempts: 3,
    lockMinutes: 5,
    requireExistingId: true,
  },
  {
    key: "tradesman",
    label: "Tradesman",
//     icon: <UserCheck size={16} />,
    icon: "👨‍🔧",
    maxAttempts: 3,
    lockMinutes: 5,
    requireExistingId: true,
  },
  {
    key: "supervisor",
    label: "Supervisor",
//     icon: <UserCog size={16} />,
    icon: "🕵️‍♂️",
    maxAttempts: 3,
    lockMinutes: 10,
    requireExistingId: true,
  },
  {
    key: "ato",
    label: "ATO",
    icon: "🧑‍✈️",
//     icon: <ShieldCheck size={16} />,
    maxAttempts: 2,
    lockMinutes: 10,
    requireExistingId: true,
  },
];

const DemoSaveForm = () => {
  const { showAlert } = useAlert();
  const { confirm } = useConfirm();
  const [authOpen, setAuthOpen] = useState(false);

  const [open, setOpen] = useState(false);

  const [openA, setOpenA] = useState(false);

  const handleSuccess = () => {
    showAlert("Saved successfully!", "success");
    setOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setAuthOpen(true);
  };

  const handleAuthComplete = (credentials) => {
    console.log("Authorized bg : ", credentials);
    setAuthOpen(false);
    showAlert({
      type: "success",
      title: "New Entry added to Section-5",
      message: "Data saved successfully.",
      data: credentials,
    });
  };

  const fakeFormData = {
    name: "Abhishek Singh",
    email: "abhshdsjdkj@gamil.com",
  };
  const handleSave = () => {
           confirm({
               title:'Confirm Save',
               message:'Are you sure you want to add new Entry into Section-5 (UNSERVICEABILITY LOG) ?',
               onConfirm:() => {
    showAlert({
      type: "error",
      title: "New Entry added to Section-5",
      message: "Data saved successfully.",
      data: fakeFormData,
    });
               }
           });
  };

  const openPageWindow = () => {
    window.FloatingWindowAPI.open(
      "Leading Particulars",
      <ViewLeadingParticulars />,
    );
  };

  const handleAuthorize = (finalPayload, auditTrail) => {
    console.log("Authorize Payload:", finalPayload);
    console.log("Audit:", auditTrail);
    setOpenA(false);
  };
  return (
    <>
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
      <Button variant="contained" onClick={openPageWindow}>
        Open Form Window
      </Button>

      <div className="p-6">
        <h1 className="text-2x1 font-bold mb-4">Product Form</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            className="border p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Authorize Transaction
          </button>
        </form>

{/*                         <TransactionAuth open={authOpen} onClose={() => setAuthOpen(false)} onAuthorize={handleAuthComplete} /> */}
      </div>

      <button
      type="submit" className="bg-blue-600 text-white px-4 py-2 rounded"
       onClick={() => setOpenA(true)}>Authorize Transaction 2</button>
      <TransactionAuth
        open={openA}
        onClose={() => setOpenA(false)}
        onAuthorize={handleAuthorize}
        stepsConfig={stepsConfig}
      />
    </>
  );
};
export default DemoSaveForm;
