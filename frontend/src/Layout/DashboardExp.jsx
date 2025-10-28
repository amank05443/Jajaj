import React, { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import AircraftHeader from "./AircraftHeader";
// import { useThemeMode } from "./ThemeProvider";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TableCell,
  TableRow,
  Table,
  TableBody,
  TableHead,
  TableContainer,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  Plane,
  Layers,
  Settings,
  Zap,
  Wrench,
  CalendarClock,
  CalendarCog,
  Calendar,
  ClockPlus,
  Cog,
  FileCog,
  StepForward,
  ArrowBigRightDash,
  ExternalLink,
  Activity,
  PlaneTakeoff,
  Moon,Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DisabledByDefault,
  AlarmOn,
  Discount,
  ArrowCircleRight,
} from "@mui/icons-material";

export default function DashboardExp() {
//     const [theme,setTheme]=useState("light");
//       useEffect(() => {
//           const savedTheme= localStorage.getItem("theme")||"light";
//           setTheme(savedTheme);
//           document.documentElement.classList.toggle("dark",savedTheme==="dark");
//   }, []);
//   const toggleTheme = ()=>{
//       const newTheme = theme ==="light" ? "dark" :"light";
//       setTheme(newTheme);
//       localStorage.setItem("theme",newTheme);
//       document.documentElement.classList.toggle("dark",newTheme ==="dark");};
// const {mode , toggleTheme}=useThemeMode();
  const navigate = useNavigate();
  useEffect(() => {
//     document.body.style.margin = "0";
//     document.body.style.padding = "0";
//     document.body.style.overflow = "auto";
//     document.body.style.height = "90%";
//     document.documentElement.style.height = "90%";

    //         return()=>(document.body.style.overflow="auto");
  }, []);
  console.log(window.innerWidth,"*",window.innerHeight);
  return (
    <div className=" min-h-screen  bg-gradient-to-br from-sky-100 via-indigo-50 to-purple-100 dark:from-white dark:via-white dark:to-white p-[1%]  rounded-xl ">
{/*       <div className="flex flex-col h-[calc(100dvh-93px)]   "> */}
      <div >
        {/*           main 3 total division div */}
        <div className=" h-[calc(100vh-93px)] w-full grid grid-cols-1 md:grid-cols-7 gap-[1%] ">
          {/*                 starting of parent of left 2 div */}
          <div className="md:col-span-5 grid grid-rows-2 items-center  gap-[1%] h-full  overflow-hidden ">
            {/*                     starting left top div half of parent*/}
            <Card className="flex flex-col  w-full p-[1%] !bg-gradient-to-r from-gray-800 to-indigo-600 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900    shadow-lg  !rounded-2xl border border-indigo-500 !text-white
                     h-full overflow-hidden ">
{/*               <Card */}
{/*                 className="" */}{/* !bg-gradient-to-r from-gray-800 to-indigo-600 */}
{/*               > */}
{/*                 <CardContent className=" !p-3"> */}

{/*                     starting of aircraft overview full div1 */}
                  <div className=" flex-[1] flex  justify-between h-[100%]">
{/*                       aircraft overview only */}
                    <div className="flex ">
                      <div className="p-[1vw] bg-white/20 rounded-xl backdrop-blur-sm">
                        <Plane className=" w-[2.5vw] h-[2.5vw]  " strokeWidth={1.5} />
                      </div>
{/*                       <div className="ml-2"> */}
                       <div className="ml-[.6vw]">
{/*                         <h2 className="text-2xl font-bold "> */}
                        <h2 className="text-[1.75vw] font-bold ">
                          Aircraft Overview
                        </h2>
                        <p className="text-blue-100 text-[1.05vw]   leading-relaxed">
                          Monitor real-time aircraft status
                        </p>
                      </div>
                    </div>
{/*                     <div> */}
{/*                         <button */}
{/*                             onClick={toggleTheme} */}
{/*                             className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900 shadow hover:shadow-lg transition-all duration-500"> */}
{/*                             {theme === "light" ? ( */}
{/*                                 <> <Moon className="w-5 h-5 text-yellow-500"/> */}
{/*                                 <span> Dark </span> */}
{/*                                 </> */}
{/*                                 ) : ( */}
{/*                                     <> <Sun className="w-5 h-5 text-yellow-500"/> */}
{/*                                 <span> Light </span> */}
{/*                                 </> )} */}
{/*                                 </button> */}

{/*                         <button */}
{/*                         onClick={toggleTheme} */}
{/*                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 dark:bg-gray-200 text-gray-100 dark:text-gray-900 shadow hover:shadow-lg transition-all duration-500"> */}
{/*                         {mode === "light" ? "switch to Dark" : "switch to Light"} */}
{/*                         </button> */}

{/*                         </div> */}
{/*                 starting od maintenance ref card */}
                    <div>
                      <Card
                        className=" p-[.28vw] flex-1 items-center justify-center   !bg-gradient-to-r from-sky-400  to-red-300 dark:from-black/70 dark:to-black/70 dark:border-white  shadow-lg
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              "
                      >
                        <div className=" flex justify-content items-center  p-[.28vw] dark:text-yellow-200   ">
                          <div className=" p-[.28vw] bg-white/20 rounded-xl backdrop-blur-sm">
                            <Activity className=" w-[1.67vw] h-[1.67vw] " strokeWidth={1.5} />
                          </div>

                          <div className="text-[1.3vw] font-bold ml-[1vw] ">
                            Maintenance Ref Card
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* starting of 2nd part */}
                  <div className="flex-[5] flex gap-[.6vw] mt-[0.6vw]  ">
{/*                     <div className="  grid grid-cols-1 md:grid-cols-5  gap-2  bg-blue-600"> */}
{/*                         a/f hours */}
                      <div className="flex-[3] flex flex-col gap-[.6vw] font-bold">
                        <div className="flex-1 bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm w-full h-ful">
                          <div className="text-[1.05vw] text-blue-200 mb[0.28vw] ">
                            A/F Hours
                          </div>
                          <div className="text-[1.45vw]  font-bold">4000 </div>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-lg p-[0.83vw] backdrop-blur-sm">
                          <div className="text-[1.05vw] text-blue-200 mb-[0.28vw]">
                            Status
                          </div>
                          <div className="text-[1.45vw] font-bold text-green-400 dark:text-white">
                            Serviceable
                          </div>
                        </div>
                      </div>
{/*                         engine details  */}
                      <div className="flex-[6] bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm  font-bold ">
                        <h2 className="text-[1.05vw] text-blue-200 mb-[0.28vw]">
                          Engine Details
                        </h2>

                        <div className="flex flex-col mt-[1.2vw] gap-[1.2vw] font-bold " >
                          <div className="flex col-span-1 ">
                            <div className="flex-1 ">
                              <div className="text-[1.2vw] text-pink-400 dark:text-blue-200 font-semibold ">
                                PORT
                              </div>
                            </div>
                            <div className="flex-1 text-[1.2vw] text-blue-200 dark:text-white mr-[1.2vw] ">

                              D2-5B-65689
                            </div>
                            <div className="flex-1 text-[1.2vw] text-blue-200 dark:text-white">

                              180 Hrs
                            </div>
                          </div>
                          {/* D1-5B-45689 */}
                          <div className="flex col-span-1 mt-[1.2vw]  ">
                            <div className="flex-1">
                              <div className="text-[1.2vw] text-cyan-400 dark:text-blue-200 font-semibold ">
                                STBD
                              </div>
                            </div>
                            <div className="flex-1 text-[1.2vw] text-blue-200  dark:text-white mr-[1.2vw] ">
                              {" "}
                              F2-7D-25989
                            </div>
                            <div className="flex-1 text-[1.2vw] text-blue-200 dark:text-white ">

                              210 Hrs
                            </div>
                          </div>
                        </div>
{/*                       </div> */}


                    </div>
{/*                         open entries */}
                    <div className="flex-[8]  ">
                      <div className=" bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm w-full h-full ">
                        <div className="flex justify-center  items-center">
                          <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-900 to-pink-400   dark:from-white/20 dark:via-white/20 dark:to-white/20 dark:text-white text-yellow-400 text-[1.3vw] mb-[0.6vw]  rounded-lg  w-full pb[0.28vw] backdrop-blur-sm">
                            Open Entries
                          </h2>
                        </div>
                        <div className="text-[1.2vw] text-yellow-300 dark:text-white flex font-bold">
                          <ul className="space-y-[0.83vw]  text-[1.3vw] flex-[4] ">
                            <li className="flex items-center gap-[1.2vw] ">
                              {/*                                                            <div className="text-3xl text-green-400">✈</div> */}
                              <ExternalLink
                                className="w-[2vw] h-[2vw] text-orange-400 dark:text-white"
                                strokeWidth={2}
                              />
                              <Link
                                to="/usLog"
                                className="  hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105"
                              >
                                Change of Serviceability Log
                              </Link>
                            </li>

                            <li className="flex items-center gap-[1.2vw]">
                              <ExternalLink
                                className=" w-[2vw] h-[2vw] text-purple-300 dark:text-white"
                                strokeWidth={2}
                              />
                              <Link
                                to="/limitationLog"
                                className=" hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105"
                              >
                                Limitation Log
                              </Link>
                            </li>

                            <li className="flex items-center gap-[1.2vw]">
                              <ExternalLink
                                className="w-[2vw] h-[2vw] text-yellow-300 dark:text-white"
                                strokeWidth={2}
                              />
                              Deferred Defect
                            </li>

                            <li className="flex items-center gap-[1.2vw]">
                              <ExternalLink
                                className=" w-[2vw] h-[2vw] text-green-400 dark:text-white"
                                strokeWidth={2}
                              />
                              Concession
                            </li>
                          </ul>
                          <ul className=" ml-[1vw] flex-3  flex-[1] space-y-[0.83vw] font-bold text-[1.3vw] ">
                            <li className="flex items-center gap-[1.2vw] "> 10</li>
                            <li className="flex items-center gap-[1.2vw]"> 06</li>
                            <li className="flex items-center gap-[1.2vw] "> 05</li>
                            <li className="flex items-center gap-[1.2vw]"> 00</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*                              </div> */}
{/*                 </CardContent> */}
{/*               </Card> */}
            </Card>

{/*             responsive upto that */}
            {/*                       starting left bottom div */}
            <div className=" flex  w-full gap-[0.6vw] h-full ">
              <Card
                className="!flex-[3] !bg-gradient-to-br from-gray-800 to-indigo-600  dark:from-gray-900  dark:to-gray-900  shadow-lg  !rounded-2xl border border-indigo-500
                     h-full "
              >
               <div className="m-[0.6vw]   h-[94%] ">
               <div className=" bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm w-full h-full ">
                    <div className="flex  flex-col justify-center  items-center">
                      <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-900 to-pink-400  dark:from-white/20 dark:via-white/20 dark:to-white/20 dark:text-white text-yellow-400 text-[1.3vw] mb-[0.6vw]  rounded-lg  w-full pb-[0.28vw] backdrop-blur-sm">
                     Aircraft Functions
                      </h2>
                      <div className="flex flex-col gap-[1.2vw]">
                         <div className="flex flex-col  items-center justify-center  ">
                        <Card className=" !bg-gradient-to-r from-blue-800 to-green-400 dark:from-black/70 dark:to-black/70  dark:border-yellow-200 shadow-xl   !rounded-full border-4 border-yellow-500 hover:scale-110 !backdrop-blur-lg   w-[4.68vw] h-[4.68vw]">
                          {/*                             <Card className="!bg-gradient-to-r from-pink-800 to-orange-400 shadow-xl  !rounded-[50%] border border-orange-500 !backdrop-blur-lg  w-80 h-40"> */}
                          <CardContent
                            className="flex items-center justify-center w-full h-full  "
                            onClick={() => navigate("/flying-operations")}
                          >
                            <PlaneTakeoff
                              className="w-[4.68vw] h-[4.68vw] text-white "
                              strokeWidth={1.5}
                            />
                          </CardContent>
                        </Card>
                        {/*                             </Card> */}
                        <div className="text-black text-[1.05vw] !bg-gradient-to-r from-sky-400  to-red-300   dark:from-white/20 dark:to-white/20 dark:text-white p-[0.28vw] rounded-lg font-extrabold mt-[0.28vw]">
                          Flying Operation
                        </div>
                      </div>
                      <div className="flex flex-col  items-center justify-center  ">
                        <Card className="!bg-gradient-to-br from-sky-400 to-rose-600 dark:from-black/70 dark:to-black/70  dark:border-yellow-200 shadow-xl  !rounded-full  hover:scale-110 border-4 border-emerald-400 backdrop-blur-lg w-[4.68vw] h-[4.68vw]">
                          {/*                           <Card className="!bg-gradient-to-br from-orange-800 to-orange-600 shadow-xl  !rounded-[50%] border border-orange-500 backdrop-blur-lg w-80 h-40"> */}
                          <CardContent
                            className="flex items-center justify-center w-full h-full"
                            onClick={() => navigate("/usLogForm")}
                          >
                            <Wrench
                              className="w-[4.68vw] h-[4.68vw] text-white"
                              strokeWidth={1.5}
                            />
                          </CardContent>
                          {/*                            </Card> */}
                        </Card>
                        <div className="text-black text-[1.05vw] !bg-gradient-to-r from-sky-400  to-red-300 dark:from-white/20 dark:to-white/20 dark:text-white p-[0.28vw] rounded-lg font-extrabold mt-[0.28vw] ">
                          Maintenance Activity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>
              </Card>

              <Card
                className="!flex-[3.5] !bg-gradient-to-br from-indigo-600 to-gray-800 dark:from-gray-900  dark:to-gray-900  shadow-lg  !rounded-2xl border border-indigo-500
                     h-full "
              >
               <div className="m-[0.6vw]   h-[94%] ">
               <div className=" bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm w-full h-full ">
                    <div className="flex justify-center  items-center">
                      <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-900 to-pink-400  dark:from-white/20 dark:via-white/20 dark:to-white/20 dark:text-white text-yellow-400 text-[1.3vw] mb-[0.6vw]  rounded-lg  w-full pb-[0.28vw] backdrop-blur-sm">
                        Additional Information
                      </h2>
                    </div>
                </div>
                </div>

              </Card>

              <Card
                className="!flex-[5] !bg-gradient-to-br from-gray-800 to-indigo-600  dark:from-gray-900 dark:to-gray-900  shadow-lg  !rounded-2xl border border-indigo-500
                     h-full "
              >
                <div className="m-[0.6vw]  h-[94%] ">
                  <div className=" bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm w-full h-full ">
                    <div className="flex justify-center  items-center">
                      <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-900 to-pink-400 dark:from-white/20 dark:via-white/20 dark:to-white/20 dark:text-white text-yellow-400 text-[1.3vw] mb-[0.6vw]  rounded-lg  w-full pb-[0.28vw] backdrop-blur-sm">
                        Aircraft Information
                      </h2>
                    </div>
                    <div className="text-[1.2vw] text-yellow-300 dark:text-white flex  font-bold ">
                      <ul className="space-y-[0.83vw]  text-[1.3vw] flex-[4] ">
                        <li className="flex items-center gap-[1.2vw] ">
                          <ArrowBigRightDash
                            className=" w-[1.67vw] h-[1.67vw] text-amber-600 dark:text-white"
                            strokeWidth={2}
                          />
                          Date of A/c Acceptance
                        </li>
                        <li className="flex items-center gap-[1.2vw] ">
                          <ArrowBigRightDash
                            className=" w-[1.67vw] h-[1.67vw]  text-sky-600 dark:text-white"
                            strokeWidth={2}
                          />
                          Present Status
                        </li>
                        <li className="flex items-center gap-[1.2vw] ">
                          <ArrowBigRightDash
                            className=" w-[1.67vw] h-[1.67vw]  text-purple-300 dark:text-white"
                            strokeWidth={2}
                          />
                          Additional Info
                        </li>
                        <li className="flex items-center gap-[1.2vw]">
                          <ArrowBigRightDash
                            className="w-[1.67vw] h-[1.67vw]  text-lime-400 dark:text-white"
                            strokeWidth={2}
                          />
                           Additional Info
                        </li>
                        <li className="flex items-center gap-[1.2vw] ">
                          <ArrowBigRightDash
                            className=" w-[1.67vw] h-[1.67vw] text-orange-300 dark:text-white"
                            strokeWidth={2}
                          />
                           Additional Info
                        </li>
                      </ul>
                      <ul className=" ml-[1.67vw] flex-3 font-bold  text-yellow-300 dark:text-white flex-[1] space-y-[0.83vw] text-[1.3vw] ">
                        <li className="flex items-center gap-[1.2vw] "> 18/09/25</li>
                        <li className="flex items-center gap-[1.2vw] "> BFS </li>
                        <li className="flex items-center gap-[1.2vw] "> NIL</li>
                        <li className="flex items-center gap-[1.2vw] "> NIL</li>
                        <li className="flex items-center gap-[1.2vw] "> NIL</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/*           starting of right vertical div */}
          <div className="flex flex-col md:col-span-2  ">
{/*               short forecast ist */}

            <Card
              className="!bg-gradient-to-r from-gray-800 to-indigo-600  dark:from-gray-900 dark:via-gray-900 dark:to-gray-900  shadow-lg  !rounded-2xl border border-indigo-500 !text-white
                     h-full "
            >
              <CardContent className=" !p-[0.6vw]">
                <div className="flex ">
                      <div className="p-[1vw] bg-white/20 rounded-xl backdrop-blur-sm">
                        <Calendar className=" w-[2.5vw] h-[2.5vw]  " strokeWidth={1.5} />
                      </div>
                  <div className="ml-[0.6vw]  ">
                    <h2 className="text-[1.75vw] font-bold  ">Short Forecast </h2>
                    <p className="!text-white text-[1.05vw] leading-relaxed">
                      Monitor aircraft forecast
                    </p>
                  </div>
                </div>
                {/*                        parent of 2 button */}
                <div className="flex p-[0.6vw] gap-[0.6vw] ">
{/*                     ist */}
                  <Card
                    className="  flex-[1.5] items-center justify-center  !bg-gradient-to-r from-sky-400  to-red-300    dark:from-black/70 dark:to-black/70 dark:border-white shadow-lg
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-white "
                  >
                    <div className=" flex justify-content items-center p-[0.28vw] text-black dark:text-yellow-200  ">
                      <div className="p-[0.28vw] bg-white/20 rounded-xl backdrop-blur-sm ">
                        <Activity className=" w-[1.2vw] h-[1.2vw] " strokeWidth={1.5} />
                      </div>

                      <div className="text-[1.2vw]  font-bold ml-[0.6vw]">
                    Modify
                      </div>
                    </div>
                  </Card>
{/*                   2nd */}
{/*                   <Card */}
{/*                     className="  flex-[2] items-center justify-center  !bg-gradient-to-r from-blue-400  to-yellow-300   shadow-lg */}
{/*                          !rounded-2xl  border border-green-500 !backdrop-blur-lg */}
{/*                               !text-black " */}
{/*                   > */}
{/*                     <div className=" flex justify-content items-center pt-[0.6vw] pl-[0.6vw] text-black "> */}
{/*                       <div className="p-[0.28vw] bg-white/20 rounded-xl backdrop-blur-sm"> */}
{/*                         <Activity className=" w-[1.2vw] h-[1.2vw] " strokeWidth={1.5} /> */}
{/*                       </div> */}

{/*                       <div className="text-[1.05vw] font-bold ">Grant Latitude</div> */}
{/*                     </div> */}
{/*                   </Card> */}
                     <Card
                    className="  flex-[2.5] items-center justify-center  !bg-gradient-to-r from-sky-400  to-red-300   dark:from-black/70 dark:to-black/70 dark:border-white shadow-lg
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-white "
                  >
                    <div className=" flex justify-content items-center p-[0.28vw] text-black dark:text-yellow-200">
                      <div className="p-[0.28vw] bg-white/20 rounded-xl backdrop-blur-sm ">
                        <Activity className=" w-[1.2vw] h-[1.2vw] " strokeWidth={1.5} />
                      </div>

                      <div className="text-[1.2vw] font-bold ml-[0.6vw]">
                    Grant Latitude
                      </div>
                    </div>
                  </Card>
                </div>

{/*                 starting of all inspection table */}

                <div className=" flex-1 flex-col  h-[58vh] flex bg-white/10 rounded-lg p-[0.6vw] backdrop-blur-sm  mt-[0.6vw] ">
                    <div>
                        <Table
                      size="small"
                      sx={{
                        "& th": { color: "white", fontWeight: "bold" ,},
//                         "& td": { color: "black" },
                        "& .MuiTableCell-root":{fontSize:"clamp(0px,1.03vw,9999px)"}
                      }}
                    >
                     <TableHead>
                        <TableRow>
                          <TableCell
                     >
                            INSPECTION / <br />
                            COMPONENT
                          </TableCell>
                          <TableCell
                          >TIME LEFT</TableCell>
                        </TableRow>
                      </TableHead>
                      </Table>
                      </div>

                  <div className=" overflow-y-auto">
                    <Table
                      size="small"
                      sx={{
//                         "& th": { color: "black", fontWeight: "bold" ,},
                        "& td": { color: "white" },
                        "& .MuiTableCell-root":{fontSize:"clamp(0px,1.03vw,9999px)"}

                      }}
                    >
                      <TableBody>
                        <TableRow>
                          <TableCell>100 Hrs</TableCell>
                          <TableCell>20 Hrs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>200 Hrs</TableCell>
                          <TableCell>20 Hrs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>300 Hrs</TableCell>
                          <TableCell>120 Hrs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>30 Weekly</TableCell>
                          <TableCell>10 Days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>06 Monthly</TableCell>
                          <TableCell>10 Days</TableCell>
                        </TableRow> <TableRow>
                          <TableCell>06 Monthly</TableCell>
                          <TableCell>10 Days</TableCell>
                        </TableRow> <TableRow>
                          <TableCell>06 Monthly</TableCell>
                          <TableCell>10 Days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>12 Monthly</TableCell>
                          <TableCell>20 Days</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
{/*                 3rd part button */}
                <Card
                  className="  mt-[1.2vw] flex-1 items-center justify-center  !bg-gradient-to-r from-sky-400  to-red-300  dark:from-black/70 dark:to-black/70 dark:border-white shadow-lg
                         !rounded-2xl  border border-green-500  !backdrop-blur-lg
                              !text-white  "
                >
                  <div className=" flex justify-content items-center p-[0.28vw] ml-[0.6vw]  text-black dark:text-yellow-200">
                    <div className="p-[0.28vw] bg-white/20 rounded-xl  backdrop-blur-sm">
                      <Activity className=" w-[1.67vw] h-[1.67vw] " strokeWidth={1.5} />
                    </div>
                    <div className="text-[1.3vw]  font-bold ml-[0.6vw]">
                      View Detailed Forecast
                    </div>
                  </div>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>

  );
}
