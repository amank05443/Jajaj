/**
 * Dashboard - Light Theme with Dark Mode Support
 */

import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Wrench,
  ClockPlus,
  Cog,
  CalendarCog,
  ExternalLink,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "./ThemeProvider";

export default function DashboardExp() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const { mode } = useThemeMode();

  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflow = "hidden";
  }, []);

  // Theme-based styles
  const isDark = mode === 'dark';

  const containerBg = isDark
    ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    : "bg-gradient-to-br from-gray-50 via-white to-blue-50";

  const mainCardBg = isDark
    ? "!bg-gradient-to-r from-slate-800 to-indigo-900 border-indigo-500/50"
    : "!bg-white border-blue-200 shadow-xl";

  const statCardBg = isDark
    ? "bg-white/10"
    : "bg-blue-50 border border-blue-100";

  const textPrimary = isDark ? "text-white" : "text-gray-900";
  const textSecondary = isDark ? "text-blue-200" : "text-blue-600";
  const textMuted = isDark ? "text-gray-300" : "text-gray-600";

  const forecastCardBg1 = isDark
    ? "!bg-gradient-to-br from-slate-800 to-blue-900 border-blue-500/50"
    : "!bg-white border-blue-200 shadow-lg";

  const forecastCardBg2 = isDark
    ? "!bg-gradient-to-br from-slate-800 to-teal-900 border-teal-500/50"
    : "!bg-white border-teal-200 shadow-lg";

  const forecastCardBg3 = isDark
    ? "!bg-gradient-to-br from-slate-800 to-purple-900 border-purple-500/50"
    : "!bg-white border-purple-200 shadow-lg";

  const tableStyles = isDark
    ? { "& th": { color: "white", fontWeight: "bold" }, "& td": { color: "white" } }
    : { "& th": { color: "#1f2937", fontWeight: "bold" }, "& td": { color: "#374151" } };

  const innerCardBg = isDark ? "bg-white/10" : "bg-gray-50 border border-gray-200";

  return (
    <div className={`min-h-screen ${containerBg} p-3 rounded-xl transition-colors duration-300`}>
      <div className="flex flex-col h-[calc(100vh-93px)]">
        {/* Top Section */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-6 mb-2">
          <div className="md:col-span-3">
            <Card
              className={`${mainCardBg} shadow-2xl !rounded-2xl border h-full hover:shadow-2xl transition-all duration-300`}
            >
              <CardContent className="!p-3">
                <div className={`items-start ${textPrimary}`}>
                  <div className="flex">
                    <div className={`p-3 ${isDark ? 'bg-white/20' : 'bg-blue-100'} rounded-xl`}>
                      <Plane className={`w-10 h-10 ${isDark ? 'text-white' : 'text-blue-600'}`} strokeWidth={1.5} />
                    </div>
                    <div className="ml-2">
                      <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
                        Flight Overview
                      </h2>
                      <p className={`text-sm leading-relaxed ${textSecondary}`}>
                        Monitor real-time aircraft status
                      </p>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="flex gap-4 mt-2">
                    <div className="flex-1 grid grid-cols-2 gap-4">
                      <div className={`${statCardBg} rounded-lg p-3`}>
                        <div className={`text-sm ${textSecondary} mb-1`}>A/F Hours</div>
                        <div className={`text-xl font-bold ${textPrimary}`}>4000</div>
                      </div>

                      <div className={`${statCardBg} rounded-lg p-3`}>
                        <div className={`text-sm ${textSecondary} mb-1`}>Status</div>
                        <div className="text-xl font-bold text-red-500">Unserviceable</div>
                      </div>

                      <div className={`${statCardBg} rounded-lg p-3`}>
                        <div className={`text-sm ${textSecondary} mb-1`}>PORT Engine Hrs</div>
                        <div className={`text-xl font-bold ${textPrimary}`}>110</div>
                      </div>

                      <div className={`${statCardBg} rounded-lg p-3`}>
                        <div className={`text-sm ${textSecondary} mb-1`}>STBD Engine Hrs</div>
                        <div className={`text-xl font-bold ${textPrimary}`}>180</div>
                      </div>
                    </div>

                    {/* Open Entries */}
                    <div className="flex-1">
                      <div className={`${statCardBg} rounded-lg p-2 w-full h-full`}>
                        <div className="flex justify-center items-center">
                          <h2 className={`flex justify-center items-center font-bold ${isDark ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'bg-blue-100 text-blue-800'} text-lg mb-2 rounded-lg w-full pb-1`}>
                            Open Entries
                          </h2>
                        </div>
                        <div className={textMuted}>
                          <ul className="space-y-3 text-base">
                            <li className="flex items-center gap-4">
                              <ExternalLink className="w-5 h-5 text-orange-500" strokeWidth={2} />
                              <Link
                                to="/usLog"
                                className={`hover:text-blue-500 hover:underline transition-colors ${textPrimary}`}
                              >
                                Change of Serviceability Log : 10
                              </Link>
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink className="w-5 h-5 text-purple-500" strokeWidth={2} />
                              <Link
                                to="/limitationLog"
                                className={`hover:text-blue-500 hover:underline transition-colors ${textPrimary}`}
                              >
                                Limitation Log : 06
                              </Link>
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink className="w-5 h-5 text-yellow-500" strokeWidth={2} />
                              <span className={textPrimary}>Deferred Defect : 05</span>
                            </li>

                            <li className="flex items-center gap-4">
                              <ExternalLink className="w-5 h-5 text-green-500" strokeWidth={2} />
                              <span className={textPrimary}>Concession : 00</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Quick Actions */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${isDark ? 'bg-gradient-to-br from-blue-600 to-purple-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'} rounded-2xl p-6 cursor-pointer shadow-xl w-full`}
              onClick={() => navigate("/flying-operations")}
            >
              <div className="flex flex-col items-center text-white">
                <Plane className="w-12 h-12 mb-2" strokeWidth={1.5} />
                <span className="font-bold text-lg">Flying Operations</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${isDark ? 'bg-gradient-to-br from-teal-600 to-green-600' : 'bg-gradient-to-br from-teal-500 to-teal-600'} rounded-2xl p-6 cursor-pointer shadow-xl w-full`}
              onClick={() => navigate("/usLogForm")}
            >
              <div className="flex flex-col items-center text-white">
                <Wrench className="w-12 h-12 mb-2" strokeWidth={1.5} />
                <span className="font-bold text-lg">Maintenance</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section - Short Forecast */}
        <Card
          className={`flex-1 ${mainCardBg} shadow-2xl !rounded-2xl border hover:shadow-2xl transition-all duration-300`}
        >
          <CardContent className="!p-2">
            <div className={`flex justify-between ${textPrimary}`}>
              <div className="flex">
                <div className={`p-1 ${isDark ? 'bg-white/20' : 'bg-blue-100'} rounded-xl`}>
                  <Wrench className={`w-10 h-10 ${isDark ? 'text-white' : 'text-blue-600'}`} strokeWidth={1.5} />
                </div>
                <div className="ml-2">
                  <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>Short Forecast</h2>
                </div>
              </div>
              <div>
                <Card
                  className={`flex items-center justify-center pr-4 pl-4 p-2 ${isDark ? '!bg-gradient-to-r from-blue-600 to-green-600' : '!bg-gradient-to-r from-blue-500 to-teal-500'} shadow-2xl !rounded-2xl border-0 ml-4 !text-white font-bold text-xl cursor-pointer`}
                >
                  <div className="flex justify-content items-center">
                    <div className="p-1 bg-white/20 rounded-xl">
                      <Activity className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div className="ml-2">
                      <h2 className="text-xl font-bold">Define Short Forecast</h2>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Forecast Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Hourly Based */}
              <Card className={`${forecastCardBg1} shadow-xl !rounded-2xl border transition-all duration-300 hover:shadow-2xl`}>
                <CardContent className="flex flex-col p-6 h-48">
                  <div className="flex">
                    <div className={`flex gap-2 p-2 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} text-white rounded-lg`}>
                      <ClockPlus className="w-6 h-6" strokeWidth={1.5} />
                      <h2 className="text-base font-semibold">Hourly Based</h2>
                    </div>
                  </div>
                  <div className={`flex-1 flex ${innerCardBg} rounded-lg p-2 mt-2 overflow-y-auto`}>
                    <TableContainer>
                      <Table size="small" sx={tableStyles}>
                        <TableHead>
                          <TableRow>
                            <TableCell>INSPECTION</TableCell>
                            <TableCell>TIME LEFT</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Calendar Based */}
              <Card className={`${forecastCardBg2} shadow-xl !rounded-2xl border transition-all duration-300 hover:shadow-2xl`}>
                <CardContent className="flex flex-col p-6 h-48">
                  <div className="flex">
                    <div className={`flex gap-2 p-2 ${isDark ? 'bg-teal-600' : 'bg-teal-500'} text-white rounded-lg`}>
                      <CalendarCog className="w-6 h-6" strokeWidth={1.5} />
                      <h2 className="text-base font-semibold">Calendar Based</h2>
                    </div>
                  </div>
                  <div className={`flex-1 flex ${innerCardBg} rounded-lg p-2 mt-2 overflow-y-auto`}>
                    <TableContainer>
                      <Table size="small" sx={tableStyles}>
                        <TableHead>
                          <TableRow>
                            <TableCell>INSPECTION</TableCell>
                            <TableCell>TIME LEFT</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow><TableCell>30 Weekly</TableCell><TableCell>10 Days</TableCell></TableRow>
                          <TableRow><TableCell>06 Monthly</TableCell><TableCell>10 Days</TableCell></TableRow>
                          <TableRow><TableCell>12 Monthly</TableCell><TableCell>20 days</TableCell></TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Component Based */}
              <Card className={`${forecastCardBg3} shadow-xl !rounded-2xl border transition-all duration-300 hover:shadow-2xl`}>
                <CardContent className="flex flex-col p-6 h-48">
                  <div className="flex">
                    <div className={`flex gap-2 p-2 ${isDark ? 'bg-purple-600' : 'bg-purple-500'} text-white rounded-lg`}>
                      <Cog className="w-6 h-6" strokeWidth={1.5} />
                      <h2 className="text-base font-semibold">Component Based</h2>
                    </div>
                  </div>
                  <div className={`flex-1 flex ${innerCardBg} rounded-lg p-2 mt-2 overflow-y-auto`}>
                    <TableContainer>
                      <Table size="small" sx={tableStyles}>
                        <TableHead>
                          <TableRow>
                            <TableCell>COMPONENT</TableCell>
                            <TableCell>TIME LEFT</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
                          <TableRow><TableCell>200 hrs</TableCell><TableCell>20 hrs</TableCell></TableRow>
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
