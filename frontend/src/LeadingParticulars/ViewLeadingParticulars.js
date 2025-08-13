import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Typography, Paper, Box, Link } from "@mui/material";
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
import { useParams } from "../Utils/useParams";
import { FuelGrid, OilAndGasesGrid } from "./Mygrid";

const ViewLeadingParticulars = () => {
  const [showFuelGrid, setShowFuelGrid] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const toggleGrid = () => setShowGrid(!showGrid);
  const toggleFuelGrid = () => setShowFuelGrid(!showFuelGrid);
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
    <div className={"layout-container "}>
      <div className={`main-content }`}>
        {/*<h1>------------------------------Leading Particulars----------------------------------</h1>*/}
        <div className="body_leading" style={{ height: "auto", margin: "4px" }}>
          {/**<div style={{padding: 12, position: 'relative', display: 'flex', height: '3vh', backgroundImage: 'linear-gradient(to right, #FFE6CC, #87CEEB,#FFD5E0 )'}}>*/}
          <div className="bg-gradient-to-r from-[#FFE6CC] via-[#87CEEB] to-[#FFD5E0] h-10">
            <h2
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "20px",
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

          {aircraftDetails && (
            <div>
              <Grid container spacing={2} sx={{ fontSize: "13px" }}>
                {/*---------------------------------------- First row ---------------------------------------------------*/}
                <Grid size={12}>
                  <table
                    className="outline-color: inherit"
                    border="1"
                    cellPadding="2"
                    style={{ width: "100%", fontSize: "15px" }}
                  >
                    <tbody>
                      <tr>
                        <td>
                          <FaPlane /> &nbsp;Aircraft Type :{" "}
                          <b style={{ color: "green" }}>
                            {aircraftDetails.ac_type || "NA"}
                          </b>
                        </td>
                        <td>
                          <FaPlane /> &nbsp; Aircraft Mark
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;&nbsp;
                          <b style={{ color: "green" }}>
                            {" "}
                            {aircraftDetails.aircraft_mark || "NA"}{" "}
                          </b>
                        </td>
                        <td>
                          <FaPlane /> &nbsp; Airframe Serial No
                          &nbsp;&nbsp;&nbsp;:{" "}
                          <b style={{ color: "green" }}>
                            <i>{aircraftDetails.side_no || "NA"}</i>
                          </b>
                        </td>
                        <td>
                          <FaGlobeAsia /> Aircraft Primary / Secondary Role
                          &nbsp;&nbsp;&nbsp; :{" "}
                          <b style={{ color: "green" }}>
                            {aircraftDetails.roles || "NA"}
                          </b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Grid>
                {/*<Grid size={2}>
                            <Typography ><FaPlane />&nbsp; Aircraft Type : <u style= {{color: 'green'}}>{aircraftDetails.ac_type||'NA'}</u></Typography>
                        </Grid>
                        <Grid  size={2}>
                            <Typography ><FaPlane />&nbsp; Mark &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <u style= {{color: 'green'}}> {aircraftDetails.aircraft_mark||'NA'} </u></Typography>
                        </Grid>
                        <Grid  size={2}>
                            <Typography ><FaPlane />&nbsp; Airframe Serial No &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <u style= {{color: 'green'}}><i>{aircraftDetails.side_no||'IN 224'}</i></u> </Typography>
                        </Grid>
                        <Grid  size={6}>
                            <Typography ><FaGlobeAsia /> Aircraft Primary / Secondary Role &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <u style= {{color: 'green'}}>{aircraftDetails.roles||'NA'}</u></Typography>
                        </Grid>*/}

                {/*----------------------------------------------------- Second row -------------------------------------------------------*/}
                <Grid size={12}>
                  <Grid container spacing={2}>
                    {/*---------------------------Second row First Grid (Ecu and Aircraft Details)----------------------------------*/}
                    <Grid size={9}>
                      <Grid container spacing={2}>
                        <Grid size={7}>
                          <table
                            border="1"
                            cellPadding="6"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colSpan={5}
                                  style={{ background: "#FFD5E0" }}
                                >
                                  <FaCogs /> Engine / E.C.U. Details
                                </th>
                              </tr>
                              <tr>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Mark</th>
                                <th>Serial Number</th>
                                <th>Date of Fitment</th>
                              </tr>
                            </thead>
                            <tbody>
                              {/*<tr>
                                                        <td>Engine {aircraftDetails.ecu_details[0].location || '00'}</td>
                                                        <td>{aircraftDetails.ecu_details[0].type || '00'}</td>
                                                        <td>{aircraftDetails.ecu_details[0].mark || '00'}</td>
                                                        <td>{aircraftDetails.ecu_details[0].serial_no || '00'}</td>
                                                        <td>{aircraftDetails.ecu_details[0].date_of_fitment || '00'}</td>
                                                    </tr>
                                                        <tr >
                                                        <td>Engine {aircraftDetails.ecu_details[1].location ||'00'}</td>
                                                    <td>{aircraftDetails.ecu_details[1].type || '00'}</td>
                                                    <td>{aircraftDetails.ecu_details[1].mark || '00'}</td>
                                                    <td>{aircraftDetails.ecu_details[1].serial_no || '00'}</td>
                                                    <td>{aircraftDetails.ecu_details[1].date_of_fitment || '00'}</td>
                                                </tr>*/}
                              {aircraftDetails.ecu_details.map(
                                (engine, index) => (
                                  <tr key={index}>
                                    <td>Engine {engine.location || " "}</td>
                                    <td>{engine.type || "--"}</td>
                                    <td>{engine.mark || "--"}</td>
                                    <td>{engine.serial_no || "NA"}</td>
                                    <td>
                                      {engine.date_of_fitment ||
                                        "Not Available"}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </Grid>
                        {/*-------------------------------Second row Second Grid (Aircraft Clock details)------------------------------------*/}
                        <Grid size={5}>
                          <table
                            border="1"
                            cellPadding="6"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colSpan={4}
                                  style={{ background: "#FFD5E0" }}
                                >
                                  <FaClock /> Aircraft Clock Details
                                </th>
                              </tr>
                              <tr>
                                <th>Position</th>
                                <th>Ser.</th>
                                <th>Date of Installation</th>
                                <th>Date of Removal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>P PORT</td>
                                <td>Ser1</td>
                                <td>01 Jun 2025</td>
                                <td>06 Jun 2025</td>
                              </tr>
                              <tr>
                                <td>P STBD</td>
                                <td>Ser2</td>
                                <td>01 Jun 2025</td>
                                <td>06 Jun 2025</td>
                              </tr>
                            </tbody>
                          </table>
                        </Grid>
                        {/*--------------------------------------- Third row First Grid (OLGs & Gases)-------------------------------*/}
                        <Grid size={7}>
                          <div
                            style={{
                              height: "200px",
                              overflowY: "auto",
                              border: "1px solid #ccc",
                            }}
                          >
                            <table
                              border="1"
                              cellPadding="6"
                              style={{ width: "100%" }}
                            >
                              <thead
                                style={{
                                  width: "100%",
                                  borderCollapse: "collapse",
                                }}
                              >
                                <tr>
                                  <th
                                    colSpan={5}
                                    style={{ background: "#FFD5E0" }}
                                  >
                                    <FaCogs /> OLGs & Gases
                                  </th>
                                </tr>
                                <tr>
                                  <th rowSpan={2}>System</th>
                                  <th colSpan={3}>Standard</th>
                                  <th rowSpan={2}>Alternate/ Substitute</th>
                                </tr>
                                <tr>
                                  <th>Type</th>
                                  <th>Store Ref</th>
                                  <th> GOST / NATO</th>
                                </tr>
                              </thead>
                              <tbody>
                                {aircraftDetails.olg_gases.map((olg, index) => (
                                  <tr key={index}>
                                    <td>{olg.system_name || "--"}</td>
                                    <td>{olg.type_of_pol || "--"}</td>
                                    <td>{olg.description || "--"}</td>
                                    <td>{olg.nato_code || "--"}</td>
                                    <td>{olg.substitute_id || "--"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Grid>
                        {/*---------------------------------- Third row Second Grid (Landing Gear & Tyre pressure)----------------------------*/}
                        <Grid size={5}>
                          <table
                            border="1"
                            cellPadding="6"
                            style={{ width: "100%" }}
                          >
                            <thead>
                              <tr>
                                <th
                                  colSpan={3}
                                  style={{ background: "#FFD5E0" }}
                                >
                                  <FaClock /> Landing Gear & Tyre Pressure
                                </th>
                              </tr>
                              <tr>
                                <th>A/C Condition</th>
                                <th>Main</th>
                                <th>Nose / Tail</th>
                              </tr>
                            </thead>
                            <tbody>
                              {aircraftDetails.lg_tyre_pressure.map(
                                (landing_gear, index) => (
                                  <tr key={index}>
                                    <td>{landing_gear.ac_condition || " "}</td>
                                    <td>{landing_gear.max_main || "--"}</td>
                                    <td>
                                      {landing_gear.max_nose_tail || "--"}
                                    </td>
                                  </tr>
                                ),
                              )}
                            </tbody>
                          </table>
                        </Grid>
                        <Grid size={8}>
                          {/*---------------Grid 1------------------*/}
                          <div
                            onClick={toggleGrid}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#eee",
                              padding: "10px",
                              fontSize: "18px",
                              fontWeight: "bold",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              userSelect: "none",
                            }}
                          >
                            {showGrid ? "📜" : "📕"} OLGs & Gases
                          </div>
                          {showGrid && (
                            <div
                              style={{ marginTop: "1px", border: "1px solid" }}
                            >
                              <OilAndGasesGrid
                                olg_gases={aircraftDetails.olg_gases}
                              />
                            </div>
                          )}
                        </Grid>
                        <Grid size={4}>
                          {/*---------------Grid 2------------------*/}
                          <div
                            onClick={toggleFuelGrid}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#eee",
                              padding: "10px",
                              fontSize: "18px",
                              fontWeight: "bold",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              userSelect: "none",
                            }}
                          >
                            {showFuelGrid ? "📜" : "📕"} Fuels
                          </div>
                          {showFuelGrid && (
                            <div
                              style={{ marginTop: "1px", border: "1px solid" }}
                            >
                              <FuelGrid
                                olg_gases_fuel={aircraftDetails.olg_gases_fuel}
                              />
                            </div>
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*--------------------- Second & Third row Last Grid (Basic Information)---------------------------------*/}
                    <Grid size={3}>
                      <table
                        border="1"
                        cellPadding="2"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th colSpan={2} style={{ background: "#FFC5F0" }}>
                              Basic Information
                            </th>
                          </tr>
                          <tr>
                            <th>Description</th>
                            <th>Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td> A/C Registration Ser No.</td>
                            <td>
                              {" "}
                              {aircraftDetails.airframe_serial_no || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Date of Acceptance</td>
                            <td>
                              {" "}
                              {aircraftDetails.date_of_acceptance || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Date of Manufacture</td>
                            <td>
                              {" "}
                              {aircraftDetails.date_of_manufacture || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Date of Expiry of TTL</td>
                            <td>
                              {" "}
                              {aircraftDetails.expiry_of_ttl_cal || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Date of Expiry of Warranty</td>
                            <td>
                              {" "}
                              {aircraftDetails.date_of_expiry_of_warranty ||
                                "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Basic Weight</td>
                            <td> {aircraftDetails.basic_weight || "NA"}</td>
                          </tr>
                          <tr>
                            <td> Max AUW</td>
                            <td> {aircraftDetails.max_auw || "NA"}</td>
                          </tr>
                          <tr>
                            <td> Max Landing Weight</td>
                            <td>
                              {" "}
                              {aircraftDetails.max_landing_weight || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Max Combat Load</td>
                            <td> {aircraftDetails.max_combat_load || "NA"}</td>
                          </tr>
                          <tr>
                            <td> Max Operating G Load</td>
                            <td>
                              {" "}
                              {aircraftDetails.max_operating_g_load || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Max Fuel Capacity</td>
                            <td>
                              {" "}
                              {aircraftDetails.max_fuel_capacity || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Empty Weight</td>
                            <td> {aircraftDetails.empty_weight || "NA"}</td>
                          </tr>
                          <tr>
                            <td> Max Take off Speed</td>
                            <td>
                              {" "}
                              {aircraftDetails.max_takeoff_speed || "NA"}
                            </td>
                          </tr>
                          <tr>
                            <td> Max Landing Speed</td>
                            <td>
                              {" "}
                              {aircraftDetails.max_landing_speed || "NA"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default ViewLeadingParticulars;
