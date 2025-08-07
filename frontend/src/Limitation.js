import React from 'react';
import axios from 'axios';
import {useForm} from "react-hook-form";
import {Typography,Box,Container,FormControl,Tabs,Tab,Paper,Grid,InputLabel} from "@mui/material";
import {motion,AnimatePresence} from "framer-motion";

export default function Limitation() {
    const {register,handleSubmit} = useForm();
    const [tab,setTab] = React.useState(0);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen font-sans">
            <motion.div
                className="bg-blue-500-white p-4 rounded-lg shadow-xl mb-6"
                initial={{opacity:0,y:-20}}
                animate={{opacity:1,y:0}}>
                <h1 className="text-2xl font-bold">Info Bay - Defects in the Aircraft which may affect job performance or role limitation</h1>
            </motion.div>

            <Tabs value={tab} onChange={(e,val) => setTab(val)} className="mb-6">
                <Tab value="Defect Entry" />
                <Tab value="System Affected" />
                <Tab value="Deferred Until" />
                <Tab value="Limitation Removed" />
            </Tabs>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {tab === 0 && (
                    <div className ="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold">Ser No</label>
                            <input {...register("ser_no")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Trade</label>
                            <input {...register("trade")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Date</label>
                            <input type="date" {...register("date")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">AF Hrs</label>
                            <input {...register("afr_hrs")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Defect</label>
                            <input {...register("defect")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Auth Code(ATO)</label>
                            <input {...register("auth_code")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Time</label>
                            <input type="time" {...register("time")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Date (Auth)</label>
                            <input type="date" {...register("auth_date")} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                )}

                {tab === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold">System Affected</label>
                            <textarea {...register("system_affected")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Item Part No.</label>
                            <input {...register("item_part_no")} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                )}

                {tab === 2 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold">Deferred Until</label>
                            <textarea {...register("deferred_until")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Deferred Unit</label>
                            <input {...register("deferred_unit")} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                )}

                {tab === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block font-semibold">SNOW</label>
                            <textarea {...register("snow")} className="w-full p-2 border rounded" />
                        </div>
                        <div>
                            <label className="block font-semibold">Date</label>
                            <input {...register("limitation_removed_date")} className="w-full p-2 border rounded" />
                        </div>
                    </div>
                )}

                <div className="text-center">
                    <button type="submit" className="bg-green-600 hover:bg-grteen-700 text-white font-bold py-2 px-6 rounded-lg">
                        Submit
                    </button>
                </div>
            </form>
        </div>





    );
}
