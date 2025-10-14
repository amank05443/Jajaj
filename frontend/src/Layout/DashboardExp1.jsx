import{ React,useEffect,useState} from "react";
import { Link } from "react-router-dom";
import AircraftHeader from "./AircraftHeader";
import { Card, CardContent, Typography,  Box,TableCell,TableRow,Table,TableBody,TableHead,TableContainer } from "@mui/material";
import { motion } from "framer-motion";
import {
  Plane,Layers,Settings,Zap,Wrench,CalendarClock,CalendarCog,ClockPlus,Cog,FileCog,StepForward,ArrowBigRightDash,ExternalLink,Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {DisabledByDefault,AlarmOn,Discount,ArrowCircleRight} from "@mui/icons-material";

export default function DashboardExp() {
      useEffect(() => {
        document.body.style.margin="0";
        document.body.style.padding="0";
        document.body.style.overflow="hidden";


  }, []);
    const navigate = useNavigate();
  return (



// start

<div className=" min-h-screen bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 p-3 rounded-xl ">

   <div className="flex flex-col h-[calc(100vh-93px)]  ">
          <div className=" flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 mb-2 ">

                <div className="md:col-span-3">
                    <Card className="!bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500
                     h-full hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                         transition-all duration-300">
                         <CardContent className=" !p-3">
                             <div className=" items-start text-white  ">

                                  <div className=" flex ">
                                     <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                       <Plane className=" w-10 h-10 " strokeWidth={1.5}/>
                                     </div>
                                     <div className="ml-2">
                                        <h2 className="text-2xl font-bold mb-2">Flight overview </h2>
                                        <p className="text-blue-100 text-sm leading-relaxed"> Monitor real-time aircraft status </p>
                                     </div>
                                  </div>


                                 <div className="flex gap-4 mt-2 ">
                                        <div className="flex-1 grid grid-cols-2 gap-4 ">
                                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                <div className="text-sm text-blue-200 mb-1 ">A/F Hours</div>
                                                <div className="text-xl font-bold">4000 </div>
                                            </div>

                                            <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                <div className="text-sm text-blue-200 mb-1">Status</div>
                                                <div className="text-xl font-bold text-red-400">Unserviceable </div>
                                            </div>

                                             <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                <div className="text-sm text-blue-200 mb-1">PORT Engine Hrs</div>
                                                <div className="text-xl font-bold">110 </div>
                                            </div>

                                             <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                                <div className="text-sm text-blue-200 mb-1">STBD Engine Hrs</div>
                                                <div className="text-xl font-bold">180 </div>
                                            </div>
                                        </div>

                                         <div className="flex-1   " >
                                        <div className=" bg-white/10 rounded-lg p-2 backdrop-blur-sm w-full h-full ">
                                        <div className="flex justify-center  items-center">
                                            <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-800 to-pink-400 text-yellow-400 text-lg mb-2  rounded-lg  w-full pb-1 backdrop-blur-sm">
                                            Open Entries</h2>

                                            </div>
                                                <div className="text-m text-yellow-200 ">
                                                   <ul className="space-y-3  text-lg ">
                                                       <li className="flex items-center gap-4 ">
{/*                                                            <div className="text-3xl text-green-400">✈</div> */}
                                                           <ExternalLink className=" w-6 h-6 text-orange-400" strokeWidth={2}/>
                                                        < Link to ="/usLog"
                                                            className="  hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105">
                                                          Change of Serviceability Log  : 10 </Link>
                                                           </li>




                                                       <li className="flex items-center gap-4">
                                                           <ExternalLink className=" w-6 h-6 text-purple-400" strokeWidth={2}/>
                                                             < Link to ="/limitationLog"
                                                             className=" hover:text-green-300 hover:underline decoration-pink-100 transition-colors hover:scale-105">
                                                             Limitation Log  :06</Link>
                                                             </li>




                                                       <li className="flex items-center gap-4">
                                                           <ExternalLink className=" w-6 h-6 text-yellow-400" strokeWidth={2}/>
                                                         Deferred Defect  :05 </li>



                                                       <li className="flex items-center gap-4">
                                                           <ExternalLink className=" w-6 h-6 text-green-400" strokeWidth={2}/>
                                                          Concession :00</li>

                                                       </ul>
                                                    </div>

                                        </div>
                                        </div>




                                 </div>
                             </div>
                         </CardContent>
                    </Card>
                </div>



{/* inclined start */}

          <div className="flex flex-col items-center justify-between space-y-1 ">
              <h2 className="flex justify-center  items-center font-bold bg-gradient-to-r from-teal-400 via-blue-800 to-pink-400 text-yellow-400 text-xl mb-1   rounded-lg  w-full p-1 backdrop-blur-sm">
                                           Aircraft Functions</h2>
              <div className="flex flex-col  items-center justify-center  " >

                      <Card className="!bg-gradient-to-r from-blue-800 to-green-400 shadow-xl   !rounded-full border-4 border-yellow-500 hover:scale-110 !backdrop-blur-lg  w-24 h-24">
{/*                             <Card className="!bg-gradient-to-r from-pink-800 to-orange-400 shadow-xl  !rounded-[50%] border border-orange-500 !backdrop-blur-lg  w-80 h-40"> */}
                                  <CardContent className="flex items-center justify-center w-full h-full p-0 "  onClick={() => navigate("/flying-operations")}>
                                      <Plane className="w-14 h-14 text-white " strokeWidth={1.5}/>
                                  </CardContent>
                                  </Card>
{/*                             </Card> */}
                        <div className="text-white  bg-white/10 p-1 rounded-lg font-extrabold mt-1">
                             Flying Operation


                      </div>
              </div>
               <div className="flex flex-col  items-center justify-center  " >
                      <Card className="!bg-gradient-to-br from-sky-400 to-rose-600 shadow-xl  !rounded-full  hover:scale-110 border-4 border-emerald-400 backdrop-blur-lg w-24 h-24">
{/*                           <Card className="!bg-gradient-to-br from-orange-800 to-orange-600 shadow-xl  !rounded-[50%] border border-orange-500 backdrop-blur-lg w-80 h-40"> */}
                              <CardContent className="flex items-center justify-center w-full h-full p-0"  onClick={() => navigate("/usLogForm")}>
                                  <Wrench className="w-14 h-14 text-white" strokeWidth={1.5}/>



                              </CardContent>
{/*                            </Card> */}
                      </Card>
                       <div className="text-white bg-white/10 p-1 rounded-lg font-extrabold mt-1">
                                                     Maintenance Activity
                      </div>

                </div>
                </div>


            </div>


            <Card className=" flex-1 !bg-gradient-to-r from-gray-800 to-indigo-600 shadow-2xl  !rounded-2xl border border-indigo-500  hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                         transition-all duration-300">
                    <CardContent className=" !p-2">
{/*             <div className="  flex mb-4"> */}
{/*                     <Card className="  flex items-center justify-center w-1/4 !bg-gradient-to-br from-blue-800 via-gray-900/95 to-purple-800  shadow-2xl */}
{/*                            !rounded-tr-3xl  !rounded-bl-3xl border border-white/20 !backdrop-blur-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] */}
{/*                             transition-all duration-300 "> */}
{/*                            <div className="m-2 p-2 bg-white/10  border border-white/15 rounded-lg backdrop-blur-sm "> */}
{/*                                       <Wrench className="w-8 h-8 text-white" strokeWidth={2}/> */}
{/*                                       </div> */}
{/*                             <h2 className="text-white text-2xl font-bold tracking-wide">Short Forecast </h2> */}
{/*                     </Card> */}
{/*             </div> */}
                   <div className=" flex  justify-between text-white  ">
                       <div className="flex">
                       <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm  ">
                              <Wrench className=" w-10 h-10 " strokeWidth={1.5}/>
                       </div>
                       <div className="ml-2  ">
                           <h2 className="text-2xl font-bold mb-2 ">Short Forecast </h2>
{/*                             <p className="text-blue-100 text-sm leading-relaxed"> Monitor real-time aircraft status </p> */}
                       </div>
                       </div>
                       <div >
                        <Card className="  flex items-center justify-center pr-4 pl-4  p-2 !bg-gradient-to-r from-blue-600 via-green-700 to-yellow-600   shadow-2xl
                         !rounded-2xl  border border-green-500 !backdrop-blur-lg
                              ml-4 !text-white font-bold text-xl">

                               <div className=" flex justify-content items-center  ">
                                     <div className="p-1 bg-white/20 rounded-xl backdrop-blur-sm">
                                       <Activity className=" w-6 h-6 " strokeWidth={1.5}/>
                                     </div>
                                     <div className="ml-2">
                                        <h2 className="text-2xl font-bold ">Define Short Forecast </h2>

                                     </div>
                                  </div>


                           </Card>
                      </div>
                   </div>





          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
               <Card className="!bg-gradient-to-br from-gray-800 to-blue-700  shadow-2xl  !rounded-2xl border border-blue-500 !backdrop-blur-lg
               hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
               transition-all duration-300">
{/*                     <CardContent className="flex  flex-col h-full"> */}

{/*                                 <div className="flex gap-2 bg-white/10 text-white/90 rounded-lg p-2 w-1/2"> */}
{/*                                      <ClockPlus className="text-white w-7 h-7 " strokeWidth={1.5}/> */}
{/*                                       <h2 className="text-white text-lg font-semibold tracking-wide">Hourly Based </h2> */}
{/*                                 </div> */}
{/*                                  <div className=" flex-1  flex bg-white/10 rounded-lg p-2 backdrop-blur-sm  mt-2"> */}
{/*                                  <TableContainer> */}
{/*                                  <Table size="small" sx={{"& th":{color:"white",fontWeight:"bold"},"& td":{color:"white"}}}> */}
{/*                                      <TableHead> */}
{/*                                          <TableRow > */}
{/*                                              <TableCell >INSPECTION</TableCell> */}
{/*                                              <TableCell>TIME LEFT</TableCell> */}

{/*                                             </TableRow> */}
{/*                                      </TableHead> */}
{/*                                      <TableBody> */}
{/*                                           <TableRow> */}
{/*                                              <TableCell>200 hrs</TableCell> */}
{/*                                              <TableCell>20 hrs</TableCell> */}

{/*                                             </TableRow> */}


{/*                                     </TableBody> */}
{/*                                     </Table> */}
{/*                                     </TableContainer> */}
{/*                                  </div> */}


{/*                     </CardContent> */}
 <CardContent className="flex flex-col   p-6 h-48">
                            <div className=" flex ">
                           <div className="flex gap-2  p-2 bg-gradient-to-br from-blue-800 via-pink-800 to-purple-700 text-white/90 rounded-lg backdrop-blur-sm">
{/*                            <div className="flex gap-2 bg-white/10 text-white/90 rounded-lg p-2 w-48"> */}
                                     <ClockPlus className="text-white w-7 h-7 " strokeWidth={1.5}/>
                                      <h2 className="text-white text-lg font-semibold tracking-wide">Hourly Based </h2>
                                </div>
                                </div>
                                 <div className=" flex-1  flex bg-white/10 rounded-lg p-2 backdrop-blur-sm  mt-2 overflow-y-auto ">
                                 <TableContainer >
                                 <Table size="small" sx={{"& th":{color:"white",fontWeight:"bold"},"& td":{color:"white"}}}>
                                     <TableHead>
                                         <TableRow >
                                             <TableCell >INSPECTION</TableCell>
                                             <TableCell>TIME LEFT</TableCell>

                                            </TableRow>
                                     </TableHead>
                                     <TableBody >
                                          <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>
                                             <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>
                                            <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>




                                    </TableBody>
                                    </Table>
                                    </TableContainer>
                                 </div>
                    </CardContent>
               </Card>


                 <Card className="!bg-gradient-to-br from-teal-700 to-blue-900 shadow-2xl  !rounded-2xl border border-indigo-500 !backdrop-blur-lg
                 hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                 transition-all duration-300 ">
                    <CardContent className="flex flex-col   p-6 h-48">
                            <div className=" flex ">
                           <div className="flex gap-2  p-2 bg-gradient-to-br from-blue-800 via-pink-800 to-purple-700 text-white/90 rounded-lg backdrop-blur-sm">
{/*                            <div className="flex gap-2 bg-white/10 text-white/90 rounded-lg p-2 w-48"> */}
                                     <CalendarCog className="text-white w-7 h-7 " strokeWidth={1.5}/>
                                      <h2 className="text-white text-lg font-semibold tracking-wide">Calender Based </h2>
                                </div>
                                </div>
                                 <div className=" flex-1  flex bg-white/10 rounded-lg p-2 backdrop-blur-sm  mt-2 overflow-y-auto ">
                                 <TableContainer >
                                 <Table size="small" sx={{"& th":{color:"white",fontWeight:"bold"},"& td":{color:"white"}}}>
                                     <TableHead>
                                         <TableRow >
                                             <TableCell >INSPECTION</TableCell>
                                             <TableCell>TIME LEFT</TableCell>

                                            </TableRow>
                                     </TableHead>
                                     <TableBody >
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
                                             <TableCell>20 days</TableCell>

                                            </TableRow>




                                    </TableBody>
                                    </Table>
                                    </TableContainer>
                                 </div>
                    </CardContent>
               </Card>

                 <Card className="!bg-gradient-to-br from-cyan-800 to-purple-600  shadow-2xl  !rounded-2xl border border-purple-500 !backdrop-blur-lg
                    hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]
                    transition-all duration-300">
                    <CardContent className="flex flex-col   p-6 h-48">
                             <div className=" flex ">
                           <div className="flex gap-2  p-2 bg-gradient-to-br from-blue-800 via-pink-800 to-purple-700 text-white/90 rounded-lg backdrop-blur-sm">
{/*                            <div className="flex gap-2 bg-white/10 text-white/90 rounded-lg p-2 w-48"> */}
                                     <Cog className="text-white w-7 h-7 " strokeWidth={1.5}/>
                                      <h2 className="text-white text-lg font-semibold tracking-wide">Component Based </h2>
                                </div>
                                </div>
                                 <div className=" flex-1  flex bg-white/10 rounded-lg p-2 backdrop-blur-sm  mt-2 overflow-y-auto ">
                                 <TableContainer >
                                 <Table size="small" sx={{"& th":{color:"white",fontWeight:"bold"},"& td":{color:"white"}}}>
                                     <TableHead>
                                         <TableRow >
                                             <TableCell >INSPECTION/COMPONENT</TableCell>
                                             <TableCell>TIME LEFT</TableCell>

                                            </TableRow>
                                     </TableHead>
                                     <TableBody >
                                          <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>
                                             <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>
                                            <TableRow>
                                             <TableCell>200 hrs</TableCell>
                                             <TableCell>20 hrs</TableCell>

                                            </TableRow>




                                    </TableBody>
                                    </Table>
                                    </TableContainer>
                                 </div>
                    </CardContent>
               </Card>

          </div>
          </CardContent>
            </Card>










</div>
</div>









  );
}
