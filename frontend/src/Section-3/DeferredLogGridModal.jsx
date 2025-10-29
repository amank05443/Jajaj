// <---This modal is used to display a clear, wholesome and well-structured overview of Change of Serviceability Log  (section-5)---> //
// <---Developed by Ghulam Shirree, LAM on 29 Sep 2025 ---> //

import react from "react";
import {
  X,
  Plane,
  CalendarClock,
  FileDigit,
  Clock,
  Search,
  User,
  AlertTriangle,
  Wrench,
  Timer,
  UserCog,
  ChevronLeft,
  ChevronRight,
  CircleArrowRight,
  Cog,
  Bug,
} from "lucide-react";
import React, { useRef } from "react";
import { Typography, Button, Box, Modal } from "@mui/material";
import { motion } from "framer-motion";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

// <---Function to convert the Data & Time to Human Readable ---> //
function formatDateTime(isoString) {
  if (!isoString) return { date: "", time: "" };
  const dateObj = dayjs(isoString);
  const date = dateObj.format("DD/MM/YYYY");
  const time = dateObj.format("HH:mm");
  return { date, time };
}

export default function DeferredLogGridModal({
  data,
  onClose,
  prevSelectedRow,
  nextSelectedRow,
}) {
  const navigate = useNavigate();
  const { date, time } = formatDateTime(data?.change_of_serviceability_log.user_time_date);

  //  <---Function for the Button to Forward Users to the Right side of Section-5--->
  const handleAction = (data) => {
    {data && Object.keys(data).length &&
    navigate("/ClearUsLog", { state: data });
    console.log(data);}
  };
  //   <---For filtering of Tradesman data further used in showing Name and Rank--->
//   const tradesmanData = data.change_of_serviceability_log_lines.filter(
//     (row) => row.tradesman_sup === "TDS",
//   );

  //   <---For filtering of Supervisor data further used in showing Name and Rank--->
//   const supervisorData = data.change_of_serviceability_log_lines.filter(
//     (row) => row.tradesman_sup === "SUP",
//   );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center p-4 items-center z-50"
    >
      <div
        className=" relative bg-gray-300  text-gray-900  rounded-2xl h-auto w-[85%]  p-4 sm:p-6 flex flex-col
         gap-4  overflow-y-auto  "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 p-2 bg-red-700 rounded-full hover:bg-red-700 transition"
          onClick={onClose}
        >
          <X className="w-5 h-5 text-white" strokeWidth={5} />
        </button>

        <div className="flex p-2 mr-12 ml-14 w-50 justify-center items-center rounded-full shadow-lg bg-blur-sm bg-gray-200 border border-gray-300 font-extrabold text-3xl  ">
          <div
            className="w-10 h-10 mr-1 bg-gradient-to-b from-[#ff671f]/60 via-[#ffffff]/60 to-[#046a38]/60  rounded-3xl flex items-center justify-center shadow-lg
            transform transition-transform duration-300 hover:scale-101 hover:translate-y-1 hover:shadow-xl"
          >
            <Plane size={24} className="text-gray-500" />
          </div>

          <div className="text-gray-500 font-sans tracking-wide ">
            DETAILED INFO
          </div>
        </div>

        <div className="border border-white rounded-lg p-2 flex flex-col gap-3 break-words">
          <div
            className="bg-gradient-to-r from-[#f6d5f7]  to-[#fbe9d7] shadow-md  py-2 min-w-[500px] rounded-2xl
            transform transition-transform duration-300 hover:scale-101 hover:translate-y-1 hover:shadow-xl"
          >
            <div className="grid grid-cols-12 text-center   mb-2 pb-2 min-w-[500px] font-bold  ">
              <div className="flex items-center col-span-2 justify-center gap-2">
                <CalendarClock className="w-5 h-5 mb-1" />
                DATE & TIME
              </div>

              <div className="flex items-center col-span-2 justify-center gap-2">
                <FileDigit className="w-5 h-5 mb-1" />
                SNOW
              </div>

              <div className="flex items-center col-span-2 justify-center gap-2">
                <Clock className="w-5 h-5 mb-1" />
                A/F HRS
              </div>

              <div className="flex items-center col-span-4 justify-center gap-2">
                <Bug className="w-5 h-5 mb-1" />
                SYSTEM AFFECTED
              </div>

              <div className="flex items-center col-span-2 justify-center gap-2">
                <Cog className="w-5 h-5 mb-1" />
               ITEM PART NO
              </div>
            </div>

            <div className="grid grid-cols-12 text-center pb-2 min-w-[500px] ">
              <div className="col-span-2">
                {date} <br /> {time}
              </div>
              <div className="col-span-2">
                  {data.change_of_serviceability_log.snow || "N/A"}
                  </div>
              <div className="col-span-2">
                  {data.change_of_serviceability_log.airframe_hrs || "N/A"}
                  </div>
              <div className="col-span-4">
{/*                 {data.how_found_defect?.occasion || "N/A"} */}
              </div>
              <div className="col-span-2">
{/*                 {data.by_whom?.user?.user_name?.toUpperCase() || "N/A"} <br /> */}
{/*                 {data.by_whom?.user?.rank?.abbreviation} */}
              </div>
            </div>
          </div>

          <div
            className=" rounded-2xl p-6 bg-gradient-to-r from-[#f6d5f7]  to-[#fbe9d7]  shadow-md py-2 min-w-[500px]
            transform transition-transform duration-300 hover:scale-101 hover:translate-y-1 hover:shadow-xl"
          >
            <div className="flex gap-2 ">
              <AlertTriangle className="w-5 h-5 mb-1" />
              <h2 className="font-bold mb-2 ">
                DEFERRED DEFECT DETAILS
              </h2>
            </div>
            <div className="break-words ml-7">
              {data.change_of_serviceability_log.reason_for_placing_unserviceable}
            </div>
          </div>

          {data.lim_def_removal_by === !null && (
            <>
              <div
                className="rounded-2xl p-6 bg-gradient-to-r from-[#8acbde]  to-[#d3f3f1] shadow-md  py-2 min-w-[500px]
             transform transition-transform duration-300 hover:scale-101 hover:translate-y-1 hover:shadow-xl"
              >
                <div className=" grid grid-cols-9">
                  <div className="col-span-8">
                    <div className="flex gap-2 ">
                      <Wrench className="w-5 h-5 mb-1" />
                      <h2 className="font-bold mb-2 "> WORK UNDERTAKEN </h2>
                    </div>
                    <div className="break-words ml-7 ">
                      {data.change_of_serviceability_log.work_carried_out || "N/A"}
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="flex gap-2 ">
                      <Timer className="w-5 h-5 mb-1" />
                      <h2 className="font-bold mb-2 "> MAN HRS </h2>
                    </div>
                    <div className="break-words ml-7 ">
                      {data.change_of_serviceability_log.man_hrs || "N/A"}
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="rounded-2xl p-2 bg-gradient-to-r from-[#8acbde]  to-[#d3f3f1] shadow-md
                transform transition-transform duration-300 hover:scale-101 hover:translate-y-1 hover:shadow-xl"
              >
                <div className="grid grid-cols-3 text-center mb-2 pb-2 min-w-[500px] font-bold">
                  <div className="flex items-center justify-center gap-2">
                    <UserCog className="w-5 h-5 mb-1" />
                    TRADESMAN
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <UserCog className="w-5 h-5 mb-1" />
                    SUPERVISOR
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <UserCog className="w-5 h-5 mb-1" />
                    ATO
                  </div>
                </div>

                <div className="grid grid-cols-3 text-left  mb-2 pb-2 min-w-[500px] ">
                  <div className="flex  justify-center gap-2">
{/*                     <ul className="list-disc list-inside"> */}
{/*                       {tradesmanData?.map((tradesman) => ( */}
{/*                         <li key={tradesman.id}> */}
{/*                           {tradesman?.user_qual?.user?.user_name?.toUpperCase()} */}
{/*                           , {tradesman?.user_qual?.user?.rank?.abbreviation} */}
{/*                         </li> */}
{/*                       ))} */}
{/*                     </ul> */}
                  </div>
                  <div className="flex  justify-center gap-2">
{/*                     <ul className="list-disc list-inside"> */}
{/*                       {supervisorData?.map((supervisor) => ( */}
{/*                         <li key={supervisor.id}> */}
{/*                           {supervisor?.user_qual?.user?.user_name?.toUpperCase()} */}
{/*                           , {supervisor?.user_qual?.user?.rank?.abbreviation} */}
{/*                         </li> */}
{/*                       ))} */}
{/*                     </ul> */}
                  </div>
                  <div className="flex  justify-center gap-2">
{/*                     <ul className="list-disc list-inside"> */}
{/*                       <li> */}
{/*                         {data?.authorised_by?.user?.rank?.abbreviation}&nbsp; */}
{/*                         {data?.authorised_by?.user?.user_name?.toUpperCase()} */}
{/*                       </li> */}
{/*                     </ul> */}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between items-center font-bold ">
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <button
              className="flex items-center gap-2 bg-blue-500 shadow-md text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              onClick={prevSelectedRow}
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={4} />
              PREV
            </button>
          </motion.div>

          {data.lim_def_removal_by === null && (
            <div className="flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                <button
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 shadow-md rounded-lg hover:bg-green-700  shadow-lg transition"
                  onClick={() => handleAction(data)}
                >
                  CLEAR DEFERRED DEFECT
                  <CircleArrowRight className="w-8 h-7 " strokeWidth={2.5} />
                </button>
              </motion.div>
            </div>
          )}
          <motion.div
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <button
              className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 shadow-md rounded-lg hover:bg-blue-700  transition "
              onClick={nextSelectedRow}
            >
              NEXT
              <ChevronRight className="w-5 h-5" strokeWidth={4} />
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
