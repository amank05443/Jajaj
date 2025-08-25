import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Modal,
  TextField,
  Typography,
  Paper,
  Box,
  Link,
  Button,
} from "@mui/material";
import {
  FaPlane,
  FaTools,
  FaAtlas,
  FaClock,
  FaFileAlt,
  FaChartBar,
  FaGlobeAsia,
  FaCalendar,
  FaWeight,
  FaCalculator,
  FaCogs,
} from "react-icons/fa";
import { useParams } from "../Utils/CustomHooks/useParams";
import { FuelGrid, OilAndGasesGrid } from "./Mygrid";

const ViewLeadingParticular1 = () => {
  const [showFuelGrid, setShowFuelGrid] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
//   const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [showTyreGrid, setShowTyreGrid] = useState(false);
  const [showEngineGrid, setShowEngineGrid] = useState(false);
  const [showAircraftClock, setShowAircraftClock] = useState(false);
  const toggleGrid = () => {
    setShowGrid(!showGrid);
//     setOpen(true);
  };
  const toggleFuelGrid = () => {
    setShowFuelGrid(!showFuelGrid);
//     setOpen(true);
  };
  const toggleTyreGrid = () => {
    setShowTyreGrid(!showTyreGrid);
  };
//   const handleClose = () => setOpen(false);
  const toggleEngineGrid = () => setShowEngineGrid(!showEngineGrid);
  const toggleAircraftClock = () => setShowAircraftClock(!showAircraftClock);
  const [selectedAircraft, setSelectedAircraft] = useState("");
  const [aircraftDetails, setAircraftDetails] = useState(null);
  const { params, loading } = useParams();

  //  False: To all the details of an aircraft from aircraft master table.
  useEffect(() => {
    if (!loading) {
      const aircraft_master_id = params.aircraft_master_id;
      setSelectedAircraft(aircraft_master_id);
      if (selectedAircraft) {
        axios
          .get(`/api/leadingParticularsOfAircraft/${selectedAircraft}`)
          .then((response) => {
            setAircraftDetails(response.data);
            console.log("Aircraft data found :");
            console.log(response.data);
          })
          .catch((error) => {
            console.error("Error aircraft Marks:", error);
          });
      }
    }
  }, [selectedAircraft, params, loading]);
  return (
    <div>
      <div className="bg-gray-200 min-h-screen items-center justify-center">
        {/*<h1>------------------------------Headings ----------------------------------</h1>*/}
        <div className="rounded-md bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/80 to-[#FFD5E0] h-12 p-1 m-1 ml-2 mr-2">
          <h2
            className=" absolute font-serif text-md"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "25px",
              margin: 0,
              fontFamily: "sans-serif",
            }}
          >
            Leading Particulars
          </h2>
          <h2
            style={{
              marginLeft: "90%",
              fontWeight: "bold",
              fontSize: "15px",
              color: "crimson",
              margin: 0,
            }}
          >
            MOD Form 701
          </h2>
        </div>

        {/*<h1>------------------------------------------Body---------------------------------------------</h1>*/}

        <div
          class="bg-gradient-to-r from-[#EEBBD5]/70 via-[#F6909E]/50 to-[#2F284E]/40 rounded-xl shadow-2xl boarder boarder-grey-300 p-5 ml-2 mr-3
            transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm"
        >
          {aircraftDetails && (
            <>
              {/*<h1>----------Row 1--------------------Leading Particulars----------------------------------</h1>*/}
              <div className="border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                <div className="grid grid-cols-3 gap-6 ">
                  <div>
                    🚀 &nbsp;Aircraft Type &nbsp;&nbsp;:{" "}
                    <b class="text-green-700">
                      {aircraftDetails.ac_type || "NA"}
                    </b>
                  </div>
                  <div>
                    ✈️ &nbsp;Airframe Serial No :{" "}
                    <b class="text-green-700">
                      {aircraftDetails.side_no || "NA"}
                    </b>
                  </div>
                  <div>
                    ⏱️ Airframe Hours
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
                    <b class="text-green-700">
                      {aircraftDetails.side_no || "NA"}
                    </b>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6 ">
                  <div>
                    🛫 Aircraft Mark &nbsp;&nbsp;:{" "}
                    <b class="text-green-700">
                      {aircraftDetails.aircraft_mark || "NA"}
                    </b>
                  </div>

                  <div>
                    🛸 Aircraft Primary / Secondary Role :{" "}
                    <b class="text-green-700">
                      {aircraftDetails.roles || "NA"}
                    </b>
                  </div>
                </div>
              </div>
              {/*<h1>----------Row 2--------------------Basic Informations----------------------------------</h1>*/}
              {/*               <div className="border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm mt-2"> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 A/C Registration Ser No :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.airframe_serial_no || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Date of Acceptance */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.date_of_acceptance || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Date of Manufacture &nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.date_of_manufacture || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 Date of Expiry of TTL &nbsp;&nbsp;&nbsp;&nbsp; :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.expiry_of_ttl_cal || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Date of Expiry of Warranty :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.date_of_expiry_of_warranty || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Max Operating G Load :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_operating_g_load || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 Basic Weight */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              {/*                     :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.basic_weight || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Max Landing Weight */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_landing_weight || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Max AUW */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_auw || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 Max Combat Load */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              {/*                     :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_combat_load || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Max Fuel Capacity */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_fuel_capacity || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Empty Weight */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.empty_weight || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 Max Take off Speed */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_takeoff_speed || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     🚀 Max Landing Speed */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b class="text-green-700"> */}
              {/*                       {aircraftDetails.max_landing_speed || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*               </div> */}

              {/*               <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 max-w-3lg mx-auto mt-3"></div> */}
              <div className="grid grid-cols-12 gap-6 mt-2 ">
                {/*<h1>----------Row 2 column 1--------------------Basic Information----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-3 border-2 border-black-400 rounded-lg p-1 backdrop-blur-sm">
                  <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-pink-300">
                    📑 Basic Information
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>✈️ A/C Registration Sl No&nbsp;</td>
                        <td>: {aircraftDetails.airframe_serial_no || "NA"}</td>
                      </tr>
                      <tr>
                        <td>📅 Date of Manufacture</td>
                        <td>: {aircraftDetails.date_of_manufacture || "NA"}</td>
                      </tr>
                      <tr>
                        <td>📆 Date of Acceptance</td>
                        <td>: {aircraftDetails.date_of_acceptance || "NA"}</td>
                      </tr>
                      <tr>
                        <td>📆 DOE of Warranty</td>
                        <td>
                          : {aircraftDetails.date_of_expiry_of_warranty || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>📆 Date of Expiry of TTL</td>
                        <td>: {aircraftDetails.expiry_of_ttl_cal || "NA"}</td>
                      </tr>

                      <tr>
                        <td>🛫 Max Take off Speed</td>
                        <td>
                          :{" "}
                          {aircraftDetails.max_takeoff_speed + " Knots" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🌀 Max Landing Speed</td>
                        <td>
                          :{" "}
                          {aircraftDetails.max_landing_speed + " Knots" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🏗️ Max Operating G Load</td>
                        <td>
                          :{" "}
                          {aircraftDetails.max_operating_g_load + " m/sec 2" ||
                            "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🩸 Max Fuel Capacity</td>
                        <td>
                          :{" "}
                          {aircraftDetails.max_fuel_capacity + " Ltr." || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⛓️‍ Max Combat Load</td>
                        <td>
                          : {aircraftDetails.max_combat_load + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🛫 Max AUW</td>
                        <td>: {aircraftDetails.max_auw + " Kg" || "NA"}</td>
                      </tr>
                      <tr>
                        <td>⚖ Max Landing Weight</td>
                        <td>
                          : {aircraftDetails.max_landing_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⚖ Basic Weight</td>
                        <td>
                          : {aircraftDetails.basic_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⚖ Empty Weight</td>
                        <td>
                          : {aircraftDetails.empty_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/*<h1>----------Row 2 >> column 2----------------------------All Grids or Tables----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-6">
                  {/*<h1>----------Row 2 >> Column 2 >> Row 1 ------------Engine / E.C.U. Details----------------------------------</h1>*/}
                  <div className="col-span-12 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleEngineGrid}
                      class=" cursor-pointer bg-[#eee] p-2 font-bold userSelect-none"
                    >
                      {showEngineGrid ? " ⚙️ " : " ⚙️ "} Engine / E.C.U. Details
                    </div>
                    {showEngineGrid && (
                      <div
                        style={{
                          marginTop: "1px",
                          border: "1px solid",
                          padding: "2px",
                        }}
                      >
                        <table className="table- auto border border-gray-400 w-full">
                          <thead>
                            <tr>
                              <th className="border border-gray-400 px-2 py-1">
                                Description
                              </th>
                              <th className="border border-gray-400 px-2 py-1">
                                Type
                              </th>
                              <th className="border border-gray-400 px-2 py-1">
                                Mark
                              </th>
                              <th className="border border-gray-400 px-2 py-1">
                                Serial Number
                              </th>
                              <th className="border border-gray-400 px-2 py-1">
                                Date of Fitment
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {aircraftDetails.ecu_details.map(
                              (engine, index) => (
                                <tr key={index}>
                                  <td className="border border-gray-400 px-2 py-1">
                                    Engine {engine.location || " "}
                                  </td>
                                  <td className="border border-gray-400 px-2 py-1">
                                    {engine.type || "--"}
                                  </td>
                                  <td className="border border-gray-400 px-2 py-1">
                                    {engine.mark || "--"}
                                  </td>
                                  <td className="border border-gray-400 px-2 py-1">
                                    {engine.serial_no || "NA"}
                                  </td>
                                  <td className="border border-gray-400 px-2 py-1">
                                    {engine.date_of_fitment || "Not Available"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  {/*<h1>----------Row 2 >> Column 2 >> Row 2 -------------------- OLGs & Gases ----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleGrid}
                      class=" cursor-pointer bg-[#eee] p-2 font-bold userSelect-none"
                    >
                      {showGrid ? " 🩸 " : " 🩸 "} OLGs & Gases
                    </div>
                    {showGrid && (
                      <div style={{ marginTop: "1px", border: "1px solid" }}>
                        <OilAndGasesGrid
                          olg_gases={aircraftDetails.olg_gases}
                        />
                      </div>
                    )}
                  </div>
                  {/*<h1>----------Row 2 >> Column 2 >> Row 3 --------------------Fuels----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleFuelGrid}
                      class=" cursor-pointer bg-[#eee] p-2 font-bold userSelect-none"
                    >
                      {showFuelGrid ? " ⛽ " : " ⛽ "} Fuels
                    </div>
                    {showFuelGrid && (
                      <div style={{ marginTop: "1px", border: "1px solid" }}>
                        <FuelGrid
                          olg_gases_fuel={aircraftDetails.olg_gases_fuel}
                        />

                        <div>
                          <table className="table- auto border border-gray-400 w-full">
                            <thead>
                              <tr>
                                <th
                                  colSpan={6}
                                  className="border border-gray-400 px-2 py-1"
                                >
                                  Fuel Capacity
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th className="border border-gray-400 px-2 py-1">
                                  Tank Group
                                </th>
                                {aircraftDetails.fuel_tanks.map(
                                  (fuel_tank, index) => (
                                    <td
                                      key={index}
                                      className="border border-gray-400 px-2 py-1"
                                    >
                                      {fuel_tank.tank_group || "Main"}
                                    </td>
                                  ),
                                )}
                              </tr>
                              <tr>
                                <th className="border border-gray-400 px-2 py-1">
                                  Capacity (Ltr.)
                                </th>
                                {aircraftDetails.fuel_tanks.map(
                                  (fuel_tank, index) => (
                                    <td
                                      key={index}
                                      className="border border-gray-400 px-2 py-1"
                                    >
                                      {fuel_tank.capacity || "100"}
                                    </td>
                                  ),
                                )}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                  {/*<h1>-----Row 2 >> Column 2 >> Row 4----------------Landing Gear & Tyre Pressure----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleTyreGrid}
                      class=" cursor-pointer bg-[#eee] p-2 font-bold userSelect-none"
                    >
                      {showTyreGrid ? " 🛞 " : " 🛞 "} Landing Gear & Tyre
                      Pressure
                    </div>
                    {showTyreGrid && (
                      <div
                        style={{
                          marginTop: "1px",
                          border: "1px solid",
                          padding: "2px",
                        }}
                      >
                        <table className="table- auto border border-gray-400 w-full">
                          <thead>
                            <tr>
                              <th className="border border-gray-400 px-4 py-2">
                                A/C Condition
                              </th>
                              <th className="border border-gray-400 px-4 py-2">
                                Main
                              </th>
                              <th className="border border-gray-400 px-4 py-2">
                                Nose / Tail
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {aircraftDetails.lg_tyre_pressure.map(
                              (landing_gear, index) => (
                                <tr key={index}>
                                  <td className="border border-gray-400 px-4 py-2">
                                    {landing_gear.ac_condition || " "}
                                  </td>
                                  <td className="border border-gray-400 px-4 py-2">
                                    {landing_gear.max_main || "--"}
                                  </td>
                                  <td className="border border-gray-400 px-4 py-2">
                                    {landing_gear.max_nose_tail || "--"}
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                  {/*<h1>----------Row 2 >> Column 2 >> Row 5 --------------------Aircraft Clock----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleAircraftClock}
                      class=" cursor-pointer bg-[#eee] p-2 font-bold userSelect-none"
                    >
                      {showAircraftClock ? " ⏰ " : " ⏰ "} Aircraft Clock
                      Details
                    </div>
                    {showAircraftClock && (
                      <div
                        style={{
                          marginTop: "1px",
                          border: "1px solid",
                          padding: "2px",
                        }}
                      >
                        <table className="table- auto border border-gray-400 w-full">
                          <thead>
                            <tr>
                              <th className="border border-gray-400 px-4 py-2">
                                Position
                              </th>
                              <th className="border border-gray-400 px-4 py-2">
                                SL No.
                              </th>
                              <th className="border border-gray-400 px-4 py-2">
                                Date of Installation
                              </th>
                              <th className="border border-gray-400 px-4 py-2">
                                Date of Removal
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {/*                                       {aircraftDetails.clock_details.map( */}
                            {/*                                         (clock, index) => ( */}
                            {/*                                           <tr key={index}> */}
                            {/*                                             <td className="border border-gray-400 px-4 py-2" >{clock.location || " "}</td> */}
                            {/*                                             <td className="border border-gray-400 px-4 py-2" >{clock.ser || "--"}</td> */}
                            {/*                                             <td className="border border-gray-400 px-4 py-2" >{clock.date_of_installation || "NA"}</td> */}
                            {/*                                             <td className="border border-gray-400 px-4 py-2" >{clock.date_of_removal || "NA"}</td> */}
                            {/*                                           </tr> */}
                            {/*                                         ), */}
                            {/*                                       )} */}
                            <tr>
                              <td className="border border-gray-400 px-4 py-2">
                                P PORT
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                Ser 1
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                01 Jun 2025
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                06 Jun 2025
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-400 px-4 py-2">
                                P STBD
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                Ser 2
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                01 Jun 2025
                              </td>
                              <td className="border border-gray-400 px-4 py-2">
                                06 Jun 2025
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
                {/*<h1>----------Row 2 >> column 3 ----------------------------Other System Details ----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-3 border-2 border-black-400 rounded-lg p-1 backdrop-blur-sm">
                  <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-pink-300">
                    🛠️ Other System Details
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/*<h1>----------- Row 3 ---------------------------- Other System Details ----------------------------------</h1>*/}
        {/*         <div */}
        {/*           class="bg-gradient-to-r from-[#EEBBD5]/70 via-[#F6909E]/50 to-[#2F284E]/40 rounded-xl shadow-2xl boarder boarder-grey-300 p-5 ml-2 mr-3 mt-4 */}
        {/*             transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm" */}
        {/*         > */}
        {/*           🛠️ Other System Details :- */}
        {/*         </div> */}
      </div>
    </div>
  );
};
export default ViewLeadingParticular1;
