import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import AircraftHeader from "./AircraftHeader";
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
  ClockPlus,
  Cog,
  FileCog,
  StepForward,
  ArrowBigRightDash,
  ExternalLink,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DisabledByDefault,
  AlarmOn,
  Discount,
  ArrowCircleRight,
} from "@mui/icons-material";

export default function DashboardExp() {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";

    //         return()=>(document.body.style.overflow="auto");
  }, []);
  return (
    <div className=" h-screen w-full  bg-gradient-to-r from-pink-300 via-blue-400 to-purple-400 p-3 rounded-xl ">
      <div className="flex flex-col h-[calc(100vh-93px)]  ">
        {/*           main 3 total division div */}
        <div className=" h-full w-full grid grid-cols-1 md:grid-cols-7 gap-2 ">
          {/*                 starting of parent of left 2 div */}
          <div className="md:col-span-5 flex flex-col items-center  gap-2  h-full ">
            {/*                     starting left top div */}
            <div className="flex-1 items-center justify-center  w-full ">
              <Card
                className="!bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500 !text-white
                     h-full "
              >
                <CardContent className=" !p-3">
                  {/*                              <div className=" bg-red-600 text-white   "> */}

                  <div className=" flex  justify-between ">
                    <div className="flex">
                      <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Plane className=" w-10 h-10 " strokeWidth={1.5} />
                      </div>
                      <div className="ml-2">
                        <h2 className="text-2xl font-bold ">
                          Aircraft Overview{" "}
                        </h2>
                        <p className="text-blue-100 text-sm leading-relaxed">
                          {" "}
                          Monitor real-time aircraft status{" "}
                        </p>
                      </div>
                    </div>

                    <div>
                      <Card
                        className=" p-1 flex-1 items-center justify-center  !bg-gradient-to-r from-blue-600  to-orange-600   shadow-2xl
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-white "
                      >
                        <div className=" flex justify-content items-center p-1  ">
                          <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm">
                            <Activity className=" w-6 h-6 " strokeWidth={1.5} />
                          </div>

                          <div className="text-lg font-bold ml-2">
                            Maintenance Ref Card{" "}
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>

                  {/* starting of 2nd part */}
                  <div className="flex gap-2 mt-2  ">
                    <div className="flex-1  grid grid-cols-1 md:grid-cols-5  gap-2 ">
                      <div className="flex flex-col md:col-span-2 gap-2  ">
                        <div className="flex-1 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <div className="text-sm text-blue-200 mb-1 ">
                            A/F Hours
                          </div>
                          <div className="text-xl font-bold">4000 </div>
                        </div>
                        <div className="flex-1 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                          <div className="text-sm text-blue-200 mb-1">
                            Status
                          </div>
                          <div className="text-xl font-bold text-green-400">
                            Serviceable{" "}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm md:col-span-3">
                        <h2 className="text-sm text-blue-200 mb-1">
                          Engine Details
                        </h2>

                        <div className="flex flex-col mt-4 gap-4">
                          <div className="flex col-span-1 ">
                            <div className="flex-1">
                              <div className="text-m text-pink-400 font-semibold ">
                                PORT
                              </div>
                            </div>
                            <div className="flex-1 text-m text-blue-200  mr-4">
                              {" "}
                              D2-5B-65689
                            </div>
                            <div className="flex-1 text-m text-blue-200">
                              {" "}
                              180 Hrs
                            </div>
                          </div>
                          {/* D1-5B-45689 */}
                          <div className="flex col-span-1 mt-4 ">
                            <div className="flex-1">
                              <div className="text-m text-cyan-400 font-semibold ">
                                STBD
                              </div>
                            </div>
                            <div className="flex-1 text-m text-blue-200  mr-4">
                              {" "}
                              F2-7D-25989
                            </div>
                            <div className="flex-1 text-m text-blue-200 ">
                              {" "}
                              210 Hrs
                            </div>
                          </div>
                        </div>
                      </div>

                      {/*                                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"> */}
                      {/*                                                 <div className="text-sm text-blue-200 mb-1">PORT Engine Hrs</div> */}
                      {/*                                                 <div className="text-xl font-bold">110 </div> */}
                      {/*                                             </div> */}

                      {/*                                              <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm"> */}
                      {/*                                                 <div className="text-sm text-blue-200 mb-1">STBD Engine Hrs</div> */}
                      {/*                                                 <div className="text-xl font-bold">180 </div> */}
                      {/*                                             </div> */}
                    </div>

                    <div className="flex-1  ">
                      <div className=" bg-white/10 rounded-lg p-2 backdrop-blur-sm w-full h-full ">
                        <div className="flex justify-center  items-center">
                          <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-800 to-pink-400 text-yellow-400 text-lg mb-2  rounded-lg  w-full pb-1 backdrop-blur-sm">
                            Open Entries
                          </h2>
                        </div>
                        <div className="text-m text-yellow-200 flex ">
                          <ul className="space-y-3  text-lg flex-[4] ">
                            <li className="flex items-center gap-4 ">
                              {/*                                                            <div className="text-3xl text-green-400">✈</div> */}
                              <ExternalLink
                                className=" w-6 h-6 text-orange-400"
                                strokeWidth={2}
                              />
                              <Link
                                to="/usLog"
                                className="  hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105"
                              >
                                Change of Serviceability Log :{" "}
                              </Link>
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink
                                className=" w-6 h-6 text-purple-400"
                                strokeWidth={2}
                              />
                              <Link
                                to="/limitationLog"
                                className=" hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105"
                              >
                                Limitation Log :
                              </Link>
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink
                                className=" w-6 h-6 text-yellow-400"
                                strokeWidth={2}
                              />
                              Deferred Defect :{" "}
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink
                                className=" w-6 h-6 text-green-400"
                                strokeWidth={2}
                              />
                              Concession :
                            </li>
                          </ul>
                          <ul className=" ml-6 flex-3  flex-[1] space-y-3 text-lg ">
                            <li className="flex items-center gap-4 "> 10</li>
                            <li className="flex items-center gap-4 "> 06</li>
                            <li className="flex items-center gap-4 "> 05</li>
                            <li className="flex items-center gap-4 "> 00</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/*                              </div> */}
                </CardContent>
              </Card>
            </div>
            {/*                       starting left bottom div */}
            <div className="flex-1 flex items-center justify-center   w-full gap-2 ">
              <Card
                className="!flex-[2.5] !bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500
                     h-full hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                         transition-all duration-300"
              >
                <div className="m-2 h-[90%] ">
                  <div className=" bg-white/10 rounded-lg p-2 backdrop-blur-sm w-full h-full  flex">
                    <div className="flex flex-col items-center justify-between space-y-1 ">
                      <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-blue-500  to-pink-500 text-black text-m mb-1   rounded-lg  w-full p-1 backdrop-blur-sm">
                        Aircraft Functions
                      </h2>
                      <div className="flex flex-col  items-center justify-center  ">
                        <Card className=" !bg-gradient-to-r from-blue-800 to-green-400 shadow-xl   !rounded-full border-4 border-yellow-500 hover:scale-110 !backdrop-blur-lg  w-16 h-16">
                          {/*                             <Card className="!bg-gradient-to-r from-pink-800 to-orange-400 shadow-xl  !rounded-[50%] border border-orange-500 !backdrop-blur-lg  w-80 h-40"> */}
                          <CardContent
                            className="flex items-center justify-center w-full h-full p-0 "
                            onClick={() => navigate("/flying-operations")}
                          >
                            <Plane
                              className="w-14 h-14 text-white "
                              strokeWidth={1.5}
                            />
                          </CardContent>
                        </Card>
                        {/*                             </Card> */}
                        <div className="text-white text-sm bg-white/10 p-1 rounded-lg font-extrabold mt-1">
                          Flying Operation
                        </div>
                      </div>
                      <div className="flex flex-col  items-center justify-center  ">
                        <Card className="!bg-gradient-to-br from-sky-400 to-rose-600 shadow-xl  !rounded-full  hover:scale-110 border-4 border-emerald-400 backdrop-blur-lg w-16 h-16">
                          {/*                           <Card className="!bg-gradient-to-br from-orange-800 to-orange-600 shadow-xl  !rounded-[50%] border border-orange-500 backdrop-blur-lg w-80 h-40"> */}
                          <CardContent
                            className="flex items-center justify-center w-full h-full p-0"
                            onClick={() => navigate("/usLogForm")}
                          >
                            <Wrench
                              className="w-14 h-14 text-white"
                              strokeWidth={1.5}
                            />
                          </CardContent>
                          {/*                            </Card> */}
                        </Card>
                        <div className="text-white text-sm bg-white/10 p-1 rounded-lg font-extrabold mt-1">
                          Maintenance Activity
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card
                className="!flex-[3.5] !bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500
                     h-full "
              >
                <div className="m-4 h-[90%] ">
                  <div className=" bg-white/10 rounded-lg p-2 backdrop-blur-sm w-full h-full  flex">
                    ADDITIONAL INFO
                  </div>
                </div>
              </Card>

              <Card
                className="!flex-[5.5] !bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500
                     h-full hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                         transition-all duration-300"
              >
                <div className="m-4 h-[90%] ">
                  <div className=" bg-white/10 rounded-lg p-2 backdrop-blur-sm w-full h-full ">
                    <div className="flex justify-center  items-center">
                      <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-800 to-pink-400 text-yellow-400 text-lg mb-2  rounded-lg  w-full pb-1 backdrop-blur-sm">
                        Aircraft Information
                      </h2>
                    </div>
                    <div className="text-m text-yellow-200 flex ">
                      <ul className="space-y-3  text-lg flex-[4] ">
                        <li className="flex items-center gap-4 ">
                          <ArrowBigRightDash
                            className=" w-6 h-6 text-green-400"
                            strokeWidth={2}
                          />
                          Date of A/c Acceptance :
                        </li>
                        <li className="flex items-center gap-4 ">
                          <ArrowBigRightDash
                            className=" w-6 h-6 text-yellow-400"
                            strokeWidth={2}
                          />
                          Present Status :
                        </li>
                        <li className="flex items-center gap-4 ">
                          <ArrowBigRightDash
                            className=" w-6 h-6 text-purple-400"
                            strokeWidth={2}
                          />
                          Additional Info :
                        </li>
                        <li className="flex items-center gap-4 ">
                          <ArrowBigRightDash
                            className=" w-6 h-6 text-orange-400"
                            strokeWidth={2}
                          />
                           Additional Info :
                        </li>
                        <li className="flex items-center gap-4 ">
                          <ArrowBigRightDash
                            className=" w-6 h-6 text-orange-400"
                            strokeWidth={2}
                          />
                           Additional Info :
                        </li>
                      </ul>
                      <ul className=" ml-6 flex-3  font-bold text-yellow-300 flex-[1] space-y-3 text-lg ">
                        <li className="flex items-center gap-4 "> 18/09/25</li>
                        <li className="flex items-center gap-4 "> BFS </li>
                        <li className="flex items-center gap-4 "> NIL</li>
                        <li className="flex items-center gap-4 "> NIL</li>
                        <li className="flex items-center gap-4 "> NIL</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
          {/*           starting of right vertical div */}
          <div className="md:col-span-2 ">
            <Card
              className="!bg-gradient-to-br from-pink-300 to-indigo-400 shadow-2xl  !rounded-2xl border border-indigo-500
                     h-full "
            >
              <CardContent className=" !p-2">
                <div className="flex !text-black ">
                  <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm  ">
                    <Wrench className=" w-10 h-10 " strokeWidth={1.5} />
                  </div>
                  <div className="ml-2  ">
                    <h2 className="text-2xl font-bold  ">Short Forecast </h2>
                    <p className="!text-black text-sm leading-relaxed">
                      {" "}
                      Monitor aircraft forecast{" "}
                    </p>
                  </div>
                </div>
                {/*                        parent of 2 button */}
                <div className="flex p-1 gap-2">
                  <Card
                    className="  flex-[1] items-center justify-center  !bg-gradient-to-r from-sky-400  to-red-300   shadow-2xl
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-white "
                  >
                    <div className=" flex justify-content items-center p-1 text-black  ">
                      <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm ">
                        <Activity className=" w-4 h-4+ " strokeWidth={1.5} />
                      </div>

                      <div className="text-sm font-bold ml-2">
                    Modify
                      </div>
                    </div>
                  </Card>
                  <Card
                    className="  flex-[2] items-center justify-center  !bg-gradient-to-r from-blue-400  to-yellow-300   shadow-2xl
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-black "
                  >
                    <div className=" flex justify-content items-center pt-2 pl-2 text-black ">
                      <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm">
                        <Activity className=" w-4 h-4 " strokeWidth={1.5} />
                      </div>

                      <div className="text-sm font-bold ">Grant Latitude</div>
                    </div>
                  </Card>
                </div>

                <div className=" flex-1  flex bg-white/10 rounded-lg p-2 backdrop-blur-sm  mt-2 overflow-y-auto ">
                  <TableContainer>
                    <Table
                      size="small"
                      sx={{
                        "& th": { color: "black", fontWeight: "bold" },
                        "& td": { color: "black" },
                      }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            INSPECTION / <br />
                            COMPONENT
                          </TableCell>
                          <TableCell>TIME LEFT</TableCell>
                        </TableRow>
                      </TableHead>
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
                        </TableRow>
                        <TableRow>
                          <TableCell>12 Monthly</TableCell>
                          <TableCell>20 Days</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>200 Hrs</TableCell>
                          <TableCell>20 Hrs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>200 Hrs</TableCell>
                          <TableCell>20 Hrs</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>200 Hrs</TableCell>
                          <TableCell>20 Hrs</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <Card
                  className="  mt-4 flex-1 items-center justify-center  !bg-gradient-to-r from-pink-300 via-blue-400 to-violet-400   shadow-2xl
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              !text-white "
                >
                  <div className=" flex justify-content items-center p-1 ml-2 ">
                    <div className="p-1 bg-white/20 rounded-xl text-blue-800 backdrop-blur-sm">
                      <Activity className=" w-6 h-6 " strokeWidth={1.5} />
                    </div>

                    <div className="text-lg text-black font-bold ml-2">
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
