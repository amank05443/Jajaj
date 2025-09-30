import react from "react";
import { X, Plane } from "lucide-react";
import React, { useRef } from "react";
import { Typography, Button, Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import dayjs from "dayjs";

// function formatDateTime(isoString){
//     if (!isoString) return{date:"",time:""};
//     const dateObj= new Date(isoString);
//     const date=dateObj.toLocaleDateString("en-GB");
//     const time = dateObj.toLocaleDateString("en-GB",{
//         hour:"2-digit",
//         minute:"2-digit",});
//         return {date,time};
//         }
function formatDateTime(isoString) {
  if (!isoString) return { date: "", time: "" };
  const dateObj = dayjs(isoString);
  const date = dateObj.format("DD/MM/YYYY");
  const time = dateObj.format("HH:mm");
  return { date, time };
}

export default function GridModal({
  data,
  onClose,
  prevSelectedRow,
  nextSelectedRow,
}) {
  const { date, time } = formatDateTime(data?.user_time_date);
  return (
    //     <div
    //       onClick={onClose}
    //       className="fixed inset-0  bg-opacity-20 backdrop-blur-sm flex justify-center items-center"
    //     >
    //       <div className=" mt-10 flex flex-col gap-5 text-white ">
    //         <button className="place-self-end " onClick={onClose}>
    //           <X size={30} color="red" />
    //         </button>
    //         <div
    //           onClick={(e) => e.stopPropagation()}
    //           className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4"
    //         >
    //           <h1 className="text-3xl font-extrabold"> DETAILS INFO</h1>
    //           <p className="text-center">SN : {data.snow}</p>
    //           <p className="text-center">
    //             FOUND : {data.how_found_defect?.occasion || "N/A"}
    //           </p>
    //           <p className="text-center">
    //             RN : {data.reason_for_placing_unserviceable}
    //           </p>
    //           <p className="text-center">MA : {data?.man_hrs || "N/A"}</p>
    //           <div className="space-y-3 text-lg text-white-700">
    //             <p>
    //               <span className="font-semibold"> Na : </span>
    //               {data.snow}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //
    //     </div>

    // another code
    //     <div
    //       onClick={onClose}
    //       className="fixed inset-0  bg-opacity-20 bg-gradient-to-r from-[#FFE6CC]/50 via-[#87CEEB]/35 to-[#FFD5E0]/50  backdrop-blur-sm flex justify-center items-center "
    //     >
    //       <Box
    //         onClick={(e) => e.stopPropagation()}
    //         className=" w-[400px] h-[400px] mx-auto  bg-white rounded-lg mt-20 shadow-2xl"
    //       >
    //         <Box className="bg-indigo-500 text-white p-2 text-center rounded-t-lg py-6 px-6">
    //           <button className="place-self-end " onClick={onClose}>
    //             <X size={30} color="red" />
    //           </button>
    //           <Typography variant="h5">DETAILS INFO</Typography>
    //         </Box>
    //         <Box className="p-4">
    //           <div className="space-y-2 mt-5">
    //             <div className="flex mb-2">
    //               <div className="w-32 font-semibold">SNOW:</div>
    //               <div> {data.snow}</div>
    //             </div>
    //           </div>
    //
    //           <div className="space-y-2 mt-5">
    //             <div className="flex mb-2">
    //               <div className="w-32 font-semibold">HOW FOUND:</div>
    //               <div> {data.how_found_defect?.occasion || "N/A"}</div>
    //             </div>
    //           </div>
    //         </Box>
    //       </Box>
    //     </div>
    //     //           another code end

    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center p-4 z-50"
    >
      <div
        className=" bg-gray-600 text-white rounded-xl w-auto max-w-4xl p-4 sm:p-6 border border-white flex flex-col
         gap-4 max-h-[90vh] overflow-x-auto "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center items-center font-extrabold text-3xl ">
          <Plane size={35} color="white" />
          &nbsp;&nbsp;
          <div> DETAILS INFO</div>
        </div>
        <div className="border border-white rounded-lg p-2 flex flex-col gap-4 break-all">
          <div className="grid grid-cols-5 text-center  border-white pb-2 min-w-[500px] font-bold">
            <div> DATE & TIME </div>
            <div> SNOW </div>
            <div> A/F HRS </div>
            <div> HOW FOUND </div>
            <div> BY WHOM </div>
          </div>
          <div className="grid grid-cols-5 text-center border-b border-white pb-2 min-w-[500px] ">
            <div>
              {date} <br /> {time}
            </div>
            <div> {data.snow} </div>
            <div> {data.airframe_hrs} </div>
            <div> {data.how_found_defect?.occasion || "N/A"} </div>
            <div> {data.by_whom || "N/A"} </div>
          </div>
          <div className=" py-2 min-w-[500px]  ">
            <h2 className="font-bold"> REASON FOR PLACING UNSERVICEABLE : </h2>
            <p> {data.reason_for_placing_unserviceable}</p>
          </div>
          {data.status_label === "CLOSED" && (
            <>
              <div className="border-b border-t border-white py-2 min-w-[500px] ">
                <h2 className="font-bold"> WORK UNDERTAKEN : </h2>
                <p> this is the work undertaken</p>
              </div>

              <div className="flex ">
                <h2 className="font-bold "> MAN HRS : </h2>
                <p> 20 </p>
              </div>
              <div className="grid grid-cols-3 text-center py-2 min-w-[500px] font-bold">
                <div> TRADESMAN </div>
                <div> SUPERVISOR </div>
                <div> ATO </div>
              </div>

              <div className="grid grid-cols-3 text-center py-2 min-w-[500px]">
                <div> 1 </div>
                <div> 2 </div>
                <div> 3 </div>
              </div>
            </>
          )}
        </div>
        <button
          className="self-end bg-red-500 px-6 py-2 rounded hover:bg-red-700"
          onClick={prevSelectedRow}
        >
          prev...
        </button>
        <button
          className="self-end bg-red-500 px-6 py-2 rounded hover:bg-red-700"
          onClick={nextSelectedRow}
        >
          next...
        </button>
      </div>
    </div>
  );
}
