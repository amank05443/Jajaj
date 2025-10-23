import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "../Utils/CustomHooks/useParams";
import AtoOnly from "../Authentication/AuthenticationAto";
import AllUsers from "../Authentication/AuthenticationOne";
import TradeSupAto from "../Authentication/AuthenticationTwo";
import LimitationAuth from "../Authentication/LimAuthentication";
import {ModForm701} from "../WeasyPrintReports/WeasyPrint";
import { FuelGrid, OilAndGasesGrid } from "./Mygrid";

const ViewLeadingParticulars = () => {
  const [showFuelGrid, setShowFuelGrid] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showTyreGrid, setShowTyreGrid] = useState(false);
  const [showEngineGrid, setShowEngineGrid] = useState(false);
  const [showAircraftClock, setShowAircraftClock] = useState(false);
  const toggleGrid = () => {
    setShowGrid(!showGrid);
    setShowFuelGrid(false);
    setShowTyreGrid(false);
    setShowEngineGrid(false);
    setShowAircraftClock(false);
  };
  const toggleFuelGrid = () => {
    setShowGrid(false);
    setShowFuelGrid(!showFuelGrid);
    setShowTyreGrid(false);
    setShowEngineGrid(false);
    setShowAircraftClock(false);
  };
  const toggleTyreGrid = () => {
    setShowGrid(false);
    setShowFuelGrid(false);
    setShowTyreGrid(!showTyreGrid);
    setShowEngineGrid(false);
    setShowAircraftClock(false);
  };
  //   const handleClose = () => setOpen(false);
  const toggleEngineGrid = () => {
    setShowGrid(false);
    setShowFuelGrid(false);
    setShowTyreGrid(false);
    setShowEngineGrid(!showEngineGrid);
    setShowAircraftClock(false);
  };
  const toggleAircraftClock = () => {
    setShowGrid(false);
    setShowFuelGrid(false);
    setShowTyreGrid(false);
    setShowEngineGrid(false);
    setShowAircraftClock(!showAircraftClock);
  };
  const handleDataFromAtoOnly = (data) => {
    const { authenticated, user_id } = data;
    setAircraftDetails((prev) => ({
      ...prev,
      authenticated: authenticated,
      user_id: user_id,
    }));
  };
  const handleDataFromAllUsers = (data) => {
    const { authenticated, user_id } = data;
    setAircraftDetails((prev) => ({
      ...prev,
      authenticated: authenticated,
      user_id: user_id,
    }));
  };
  const handleDataFromTradeSupAto = (data) => {
    console.log("payloadArray :", data);
    const { byWhom, trade, qualification } = data;
    //     setAircraftDetails((prev) => ({
    //       ...prev,
    //       qualification: qualification,
    //       trade: trade,
    //       byWhom: byWhom,
    //     }));
  };
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
      <div className="bg-gray-100 min-h-screen items-center justify-center">
        {/*<h1>------------------------------Headings ----------------------------------</h1>*/}
        <div className="rounded-lg bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB]/60 to-[#FFD5E0] h-16 p-1 m-1 ml-2 mr-2">
          <h2
            className=" absolute text-md font-bold"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "35px",
              margin: 0,
              fontFamily: "algerian",
            }}
          >
            LEADING PARTICULARS
          </h2>
          {/*           <h2 */}
          {/*             style={{ */}
          {/*               marginLeft: "90%", */}
          {/*               fontWeight: "bold", */}
          {/*               fontSize: "15px", */}
          {/*               color: "crimson", */}
          {/*               margin: 0, */}
          {/*             }} */}
          {/*           > */}
          {/*             MOD Form 701 */}
          {/*           </h2> */}
        </div>
        {/*<h1>------------------------------------------Body---------------------------------------------</h1>*/}
        <div className="bg-gradient-to-r from-[#EEBBD5]/40 via-indigo-200 to-[#2F284E]/20 rounded-xl shadow-2xl boarder boarder-grey-300 p-3 ml-2 mr-3 transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm">
          {/*            className="bg-gradient-to-r from-purple-200 via-indigo-200 to-[#EEBBD5]/20 rounded-xl shadow-2xl boarder boarder-grey-300 p-5 ml-2 mr-3 transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm"> */}
          {aircraftDetails && (
            <>
              {/*<h1>----------Row 1--------------------Leading Particulars----------------------------------</h1>*/}
              {/*               <div className="border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm"> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🚀 &nbsp;Aircraft Type &nbsp;&nbsp;:{" "} */}
              {/*                     <b className="text-green-700"> */}
              {/*                       {aircraftDetails.ac_type || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     ✈️ &nbsp;Airframe Serial No :{" "} */}
              {/*                     <b className="text-green-700"> */}
              {/*                       {aircraftDetails.side_no || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                   <div> */}
              {/*                     ⏱️ Airframe Hours */}
              {/*                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "} */}
              {/*                     <b className="text-green-700"> */}
              {/*                       {aircraftDetails.side_no || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*                 <div className="grid grid-cols-3 gap-6 "> */}
              {/*                   <div> */}
              {/*                     🛫 Aircraft Mark &nbsp;&nbsp;:{" "} */}
              {/*                     <b className="text-green-700"> */}
              {/*                       {aircraftDetails.aircraft_mark || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}

              {/*                   <div> */}
              {/*                     🛸 Aircraft Primary / Secondary Role :{" "} */}
              {/*                     <b className="text-green-700"> */}
              {/*                       {aircraftDetails.roles || "NA"} */}
              {/*                     </b> */}
              {/*                   </div> */}
              {/*                 </div> */}
              {/*               </div> */}

              {/*<h1>----------Row 2--------------------Basic Information----------------------------------</h1>*/}
              <div className="border-2 border-black-400 rounded-lg p-1 backdrop-blur-sm mt-2">
                <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                  📑 Basic Information
                </div>
                {/*                 <div> */}
                {/*                   🛸 Aircraft Primary / Secondary Role :{" "} */}
                {/*                   <b className="text-green-700">{aircraftDetails.roles || "NA"}</b> */}
                {/*                 </div> */}
                <div className="grid grid-cols-3 gap-6 p-2">
                  <table>
                    <tbody>
                      <tr>
                        <td>✈️ A/C Registration Sl No&nbsp;</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.airframe_serial_no || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>📅 Date of Manufacture</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.date_of_manufacture || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>📆 Date of Acceptance</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.date_of_acceptance || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>📆 DOE of Warranty</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.date_of_expiry_of_warranty || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>📆 Date of Expiry of TTL</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.expiry_of_ttl_cal || "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table>
                    <tbody>
                      <tr>
                        <td>🛫 Max Take off Speed</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {" "}
                          {aircraftDetails.max_takeoff_speed + " Knots" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🌀 Max Landing Speed</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {" "}
                          {aircraftDetails.max_landing_speed + " Knots" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🏗️ Max Operating G Load</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {" "}
                          {aircraftDetails.max_operating_g_load + " m/sec 2" ||
                            "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🩸 Max Fuel Capacity</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {" "}
                          {aircraftDetails.max_fuel_capacity + " Ltr." || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⛓️‍ Max Combat Load</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.max_combat_load + " Kg" || "NA"}
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table>
                    <tbody>
                      <tr>
                        <td>🛸 Aircraft Primary / Secondary Role</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.roles || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>🛫 Max AUW</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.max_auw + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⚖ Max Landing Weight</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.max_landing_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⚖ Basic Weight</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.basic_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td>⚖ Empty Weight</td>
                        <td>:</td>
                        <td className="text-green-700 font-bold">
                          {aircraftDetails.empty_weight + " Kg" || "NA"}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                        <td className="text-green-700 font-bold"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-6 mt-2 ">
                {/*<h1>----------Row 2 column 1--------------------Basic Information----------------------------------</h1>*/}
                {/*                 <div className="col-span-12 lg:col-span-3 border-2 border-black-400 rounded-lg p-1 backdrop-blur-sm"> */}
                {/*                   <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-pink-300"> */}
                {/*                     📑 Basic Information */}
                {/*                   </div> */}
                {/*                   <table> */}
                {/*                     <tbody> */}
                {/*                       <tr> */}
                {/*                         <td>✈️ A/C Registration Sl No&nbsp;</td> */}
                {/*                         <td>: {aircraftDetails.airframe_serial_no || "NA"}</td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>📅 Date of Manufacture</td> */}
                {/*                         <td>: {aircraftDetails.date_of_manufacture || "NA"}</td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>📆 Date of Acceptance</td> */}
                {/*                         <td>: {aircraftDetails.date_of_acceptance || "NA"}</td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>📆 DOE of Warranty</td> */}
                {/*                         <td> */}
                {/*                           : {aircraftDetails.date_of_expiry_of_warranty || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>📆 Date of Expiry of TTL</td> */}
                {/*                         <td>: {aircraftDetails.expiry_of_ttl_cal || "NA"}</td> */}
                {/*                       </tr> */}

                {/*                       <tr> */}
                {/*                         <td>🛫 Max Take off Speed</td> */}
                {/*                         <td> */}
                {/*                           :{" "} */}
                {/*                           {aircraftDetails.max_takeoff_speed + " Knots" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>🌀 Max Landing Speed</td> */}
                {/*                         <td> */}
                {/*                           :{" "} */}
                {/*                           {aircraftDetails.max_landing_speed + " Knots" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>🏗️ Max Operating G Load</td> */}
                {/*                         <td> */}
                {/*                           :{" "} */}
                {/*                           {aircraftDetails.max_operating_g_load + " m/sec 2" || */}
                {/*                             "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>🩸 Max Fuel Capacity</td> */}
                {/*                         <td> */}
                {/*                           :{" "} */}
                {/*                           {aircraftDetails.max_fuel_capacity + " Ltr." || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>⛓️‍ Max Combat Load</td> */}
                {/*                         <td> */}
                {/*                           : {aircraftDetails.max_combat_load + " Kg" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>🛫 Max AUW</td> */}
                {/*                         <td>: {aircraftDetails.max_auw + " Kg" || "NA"}</td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>⚖ Max Landing Weight</td> */}
                {/*                         <td> */}
                {/*                           : {aircraftDetails.max_landing_weight + " Kg" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>⚖ Basic Weight</td> */}
                {/*                         <td> */}
                {/*                           : {aircraftDetails.basic_weight + " Kg" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                       <tr> */}
                {/*                         <td>⚖ Empty Weight</td> */}
                {/*                         <td> */}
                {/*                           : {aircraftDetails.empty_weight + " Kg" || "NA"} */}
                {/*                         </td> */}
                {/*                       </tr> */}
                {/*                     </tbody> */}
                {/*                   </table> */}
                {/*                 </div> */}

                {/*<h1>----------Row 3 ,4, 5 >> column 1 ----------------------------All Grids or Tables----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-3 ">
                  {/*<h1>----------Row 3 >> Column 1  ------------Engine / E.C.U. Details----------------------------------</h1>*/}
                  <div className="col-span-12 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleEngineGrid}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      ⚙️ Engine / E.C.U. Details
                    </div>
                  </div>
                  {/*<h1>-----Row 4 >> Column 1 ----------------Landing Gear & Tyre Pressure----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleTyreGrid}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      🛞 Landing Gear & Tyre Pressure
                    </div>
                  </div>
                  {/*<h1>----------Row 5 >> Column 1  --------------------Aircraft Clock----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleAircraftClock}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      ⏰ Aircraft Clock Details
                    </div>
                  </div>
                </div>
                {/*<h1>----------Row 3 ,4, 5 >> column 2----------------------------All Grids or Tables----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-3">
                  {/*<h1>----------Row 3 >> Column 2 -------------------- OLGs & Gases ----------------------------------</h1>*/}
                  <div className="col-span-12  border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleGrid}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      🩸 OLGs & Gases
                    </div>
                  </div>
                  {/*<h1>----------Row 4 >> Column 2  --------------------Fuels----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      onClick={toggleFuelGrid}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      ⛽ Fuels
                    </div>
                  </div>
                  {/*<h1>----------Row 5 >> Column 2  --------------------Fuels----------------------------------</h1>*/}
                  <div className="col-span-12 mt-2 border-2 border-black-400 rounded-lg p-4 backdrop-blur-sm">
                    <div
                      //                       onClick={toggleFuelGrid}
                      className=" cursor-pointer rounded-lg bg-gradient-to-r from-indigo-200 via-purple-300 to-indigo-300 hover:opacity-80 transition p-2 font-bold userSelect-none"
                    >
                      🛠️ System Details
                    </div>
                  </div>
                </div>
                {/*<h1>----------Row 2 >> column 3 ----------------------------Other System Details ----------------------------------</h1>*/}
                <div className="col-span-12 lg:col-span-6 border-2 border-black-400 rounded-lg p-1 backdrop-blur-sm">
                  {showGrid && (
                    <div
                      className="m-1"
                      style={{ marginTop: "1px", border: "1px solid" }}
                    >
                      <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                        🩸 OLGs & Gases
                      </div>
                      <OilAndGasesGrid olg_gases={aircraftDetails.olg_gases} />
                    </div>
                  )}

                  {showEngineGrid && (
                    <div
                      style={{
                        marginTop: "1px",
                        border: "1px solid",
                        padding: "2px",
                      }}
                    >
                      <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                        ⚙️ Engine / E.C.U. Details
                      </div>
                      <table className="table- auto border border-gray-400 w-full">
                        <thead className="bg-[#2F284E]/40">
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
                          {aircraftDetails.ecu_details.map((engine, index) => (
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
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {showTyreGrid && (
                    <div
                      style={{
                        marginTop: "1px",
                        border: "1px solid",
                        padding: "2px",
                      }}
                    >
                      <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                        🛞 Landing Gear & Tyre Pressure
                      </div>
                      <table className="table- auto border border-gray-400 w-full">
                        <thead className="bg-[#2F284E]/40">
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

                  {showAircraftClock && (
                    <div
                      style={{
                        marginTop: "1px",
                        border: "1px solid",
                        padding: "2px",
                      }}
                    >
                      <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                        ⏰ Aircraft Clock Details
                      </div>
                      <table className="table- auto border border-gray-400 w-full">
                        <thead className="bg-[#2F284E]/40">
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

                  {showFuelGrid && (
                    <div style={{ marginTop: "1px", border: "1px solid" }}>
                      <div className="text-center font-bold text-[#2c5364] p-1 backdrop-blur-sm bg-purple-300 rounded-md">
                        ⛽ Fuels
                      </div>
                      <div className="m-1">
                        <FuelGrid
                          olg_gases_fuel={aircraftDetails.olg_gases_fuel}
                        />
                      </div>
                      <div className="m-1">
                        <table className="table- auto border border-gray-400 w-full ">
                          <thead className="bg-[#2F284E]/40">
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

                  {!showGrid &&
                    !showEngineGrid &&
                    !showTyreGrid &&
                    !showAircraftClock &&
                    !showFuelGrid && (
                      <div className="w-full h-56 flex items-center justify-center p-1">
                        <img
                          src="./images/do.jpg"
                          alt="Sample"
                          className=" w-full h-full object-cover"
                        />
                      </div>
                    )}
                </div>
              </div>
            </>
          )}
        </div>
        {/*<h1>----------- Row 3 ---------------------------- Other System Details ----------------------------------</h1>*/}
        <div className="flex justify-center mt-5 gap-5">
           <AllUsers auth={handleDataFromAllUsers} />
          <AtoOnly auth={handleDataFromAtoOnly} />
           <TradeSupAto snowId={202520371} authTwo={handleDataFromTradeSupAto} />
{/*           <TradeSupAto snowId={202520380} authTwo={handleDataFromTradeSupAto} /> */}
          <LimitationAuth snowId={202520375} />
          {/*           <div> */}
          {/*             <h2>{aircraftDetails?.qualification}</h2> */}
          {/*             <h2>{aircraftDetails?.trade}</h2> */}
          {/*             <h2>{aircraftDetails?.byWhom}</h2> */}
          {/*           </div> */}

          {/*           className="bg-gradient-to-r from-[#EEBBD5]/70 via-[#F6909E]/50 to-[#2F284E]/40 rounded-xl shadow-2xl boarder boarder-grey-300 p-5 ml-2 mr-3 mt-4 */}
          {/*                             transform hover:shadow-[0_5px_rgba(0,0,0,0.2)] transition-all duration-500 backdrop-blur-sm" */}
          {/*         > */}
          {/*           🛠️ Other System Details :- */}
        </div>
         <div className="flex justify-center mt-5 gap-5">
           <ModForm701 />
      </div>
      </div>
    </div>
  );
};
export default ViewLeadingParticulars;
