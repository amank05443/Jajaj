import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import useTableApi from'../Utils/CustomHooks/useTableApi';
import {useParams} from '../Utils/CustomHooks/useParams';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AppBar,
  Button,
  Box,
  Card,
  CardContent,
  Drawer,
  IconButton,
  Grid,
  Modal,
  Paper,
  Stack,
  Typography,
  Toolbar,
  TextField,
} from "@mui/material";

const USLogForm = () => {

  const [form,setForm] = useState({
    aircraft_master_id:"",
    airframe_hrs:"",
    reason_for_placing_unserviceable:"",
    system_time_date:"",
  })
  const { register, watch, setValue } = useForm();
  const [user, setUser] = useState({ name: '', rank: '' });
  const [afHours, setAfHours] = useState('');
  const {params} = useParams();
  console.log(params);
  const authCode = watch('authCode');
  const {data:howFound,loading} = useTableApi('how_found_defects');
  const {data:entryType,loading1} = useTableApi('entry_types');
  const{data:aircraftMaster,loading2} = useTableApi('aircraft_masters',{id:params.aircraft_master_id});
  const [open, setOpen] = useState(false);
  console.log("howFound:",howFound);
  console.log("entryType:",entryType);
  console.log("aircraftMaster:",aircraftMaster);


  if(!loading2){console.log("aircraftMaster:",aircraftMaster)};

  useEffect(() => {
    if (authCode === '1234') {
      setUser({ name: '🤪JASPER PANDA', rank: 'LEMA(R)' });
    } else {
      setUser({ name: '', rank: '' });
    }
  }, [authCode]);

  useEffect(() => {


    const nowLocal = new Date().toLocaleString('sv-SE').replace('','T').slice(0, 16);
    setValue('timestamp', nowLocal);
    if(!loading2){console.log("aircraftMaster:",aircraftMaster)};
    console.log("howFound:",howFound);
    console.log("entryType:",entryType);
    console.log(params.aircraft_master_id);
  }, [setValue,howFound,entryType,loading,loading2]);

//  const handleChange = (e) => {
//    setFormData({
//        ...formData,
//        [e.target.name]:e.target.value
//    });
//};

    const handleSubmit = async (e) => {
    e.preventDefault();

   const payload = {
    aircraft_master_id:form.aircraft_master_id,
    airframe_hrs:form.airframe_hrs,
    reason_for_placing_unserviceable:form.reason_for_placing_unserviceable,
    system_time_date:form.system_time_date,

   };
   try {
    const res = await fetch ("/api/serviceability-log/",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(payload),
    });

    if (!res.ok) throw new Error("Failed to save data");
    const data = await res.json();
    console.log("Saved:",data);
   } catch (err) {
    console.error(err);
   }
   };


  const onSubmit = (data: any) => {
    console.log(data);
    alert('Submitted successfully!');
  };

  const FloatingLabel = ({ label }: { label: string }) => (
    <span className="absolute left-0 -top-4 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-indigo-500">
      {label}
    </span>
  );

  const checkBoxes = ['Limitation', 'Deferred', 'Husbandry', 'Concession'];

  if(loading && loading1 && loading2) {<p>Loading...</p>;}

  return (
    <div className="w-9/2  items-start bg-blue-300 p-6">

       <form onSubmit={handleSubmit} className=" w-200 space-y-10">

         {/* SECTION 1: GENERAL INFO */}
          <div className="w-5/2 border border-green-100 bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50 rounded-xl shadow-inner p-6" width>
           {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-extrabold text-center text-green-600"
        >
         Aircraft Place Unserviceable
        </motion.h1>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">General Information</h2>
            <div className="w- 32 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Entry Type */}
              <div className="relative">
                <select
                  {...register('entryType')}
                  defaultValue=""
                  className="peer h-14 w-full border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="" disabled hidden>Select Entry Type</option>
                  {!loading && entryType?.map((entry_types) => (
                    <option key={entry_types.id} value={entry_types.occasion}>{entry_types.occasion}</option>
                  ))}
                </select>
                <FloatingLabel label="Entry Type" />
              </div>

                {/* How Found */}
              <div className="relative">
                <select
                  {...register('howFound')}
                  defaultValue=""
                  className="peer h-14 w-full border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="" disabled hidden>Select How Found</option>

                  {!loading1 && howFound?.map((how_found) => (
                  <option key = {how_found.id} value={how_found.occasion}>
                     {how_found.occasion}
                  </option>
                  ))}
                </select>
                <FloatingLabel label="How Found" />
              </div>

              {/* AF Hours */}
              {!loading2 && aircraftMaster && (<div className="relative">

               <label className="block text-sm font-medium text-grey-700">
                Airframe Hours
               </label>
               <Typography name="airframe_hrs" onChange={(e) => form.airframe_hrs(e.target.value)}
                value={form.airframe_hrs} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm  focus:border-indigo-500 focus:ring-500 sm:text-sm"
                >{aircraftMaster.airframe_hrs ||""}
                </Typography>

              </div>)}

              {/* Date/Time */}
              <div className="relative col-span-1 md:col-span-1">
                <input
                  type="datetime-local"
                  {...register('timestamp')}
                  className="peer h-14 w-full border-b-2 border-gray-300 text-gray-800 focus:outline-none focus:border-indigo-500"
                />
                <FloatingLabel label="Date & Time Placed U/S" />
              </div>
            </div>


          {/* SECTION 2: REASON & CONDITIONS */}

            <h2 className="text-lg font-semibold text-gray-800 mb-4">Defect Details & Conditions</h2>
            <div className="space-y-6">

              {/* Reason */}
              <div className="relative">
                <textarea
                {...register('reason')}
                  rows={4}
                  placeholder="Reason"
                  name="reason_for_placing_unserviceable" onChange={(e) => setForm({...form,reason_for_placing_unserviceable:e.target.value})}
                  className="peer w-full border-b-2 border-gray-300 placeholder-transparent text-gray-800 focus:border-indigo-500 focus:outline-none resize-none"
                />
                <FloatingLabel label="Reason for placing U/S" />
              </div>

              {/* Checkboxes */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {checkBoxes.map(box => (
                  <label key={box} className="flex items-center space-x-2">
                    <input type="checkbox" {...register(`check_${box}`)} className="accent-pink-600" />
                    <span className="text-gray-800">{box}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

<div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-green-300 to-blue-500 w-60 h-10 rounded-t-full shadow-x1 flex items-center justify-center cursor-pointer"
                onClick={() => setOpen(true)}>
    <span className="text-gray-800 font-semibold text-lg">
    Authorize and Forward</span>
</div>
<Modal open={open} onClose={() => setOpen(false)}>
    <Box className="bg-white rounded-2x1 shadow-2x1 p-6 flex flex-col items-center gap-4" sx={{ position: "absolute",top:"50%", left:"50%", transform:"translate(-50%,-50%)" ,width:400,}}>
        <Typography variant="h6" className="text-gray-800 font-bold mb-2">Authorization</Typography>
            <TextField {...register("authCode")} label="Authorization Code" variant="outlined" fullWidth/>
            {user?.name && (<Typography className="text-green-600"> Authorized By {user.name} {user.rank}
         </Typography>)}
         <Button onClick={handleSubmit} type="submit" variant="contained" fullWidth className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-bold shadow-lg hover:opacity-90">
            Forward to Clear Defect
         </Button>
        <Button onClick={() => setOpen(false)} color="inherit"> Close
        </Button>
    </Box>
</Modal>


        </form>

    </div>
  );
};

export default USLogForm;