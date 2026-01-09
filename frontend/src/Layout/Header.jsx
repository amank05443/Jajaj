/**
 * Header - Consistent Aviation Theme
 * Professional blue theme with proper dark/light mode support
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { useThemeMode } from "./ThemeProvider";
import { Typography, Box } from "@mui/material";
import { Menu as MenuIcon, Plane, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useNavigate } from "react-router-dom";

export default function Header({
  sidebarOpen,
  toggleSidebar,
  showSidebarToggle = true,
}) {
  const { user } = useAuth();
  const { params, loading } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    if (!loading) {
      const aircraft_master_id = params.aircraft_master_id;
      if (aircraft_master_id) {
        axios
          .get(`/api/headersData/${aircraft_master_id}`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error("Error Headers:", error);
          });
      }
    }
  }, [params, loading]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 h-16 flex items-center px-4 md:px-6 z-30 transition-all duration-300 shadow-lg
        ${isDark
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/50'
          : 'bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 border-b border-blue-800/30'
        }`}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {/* Left - Menu & Logo */}
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              aria-label="toggle sidebar"
              className="p-2.5 rounded-xl transition-all duration-300 bg-white/15 hover:bg-white/25 text-white border border-white/20"
            >
              <MenuIcon size={20} />
            </motion.button>
          )}

          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/exp1")}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg
              ${isDark
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                : 'bg-white/20 backdrop-blur-sm border border-white/30'
              }`}
            >
              <Plane size={20} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <Typography
                variant="h6"
                component="h1"
                className="text-white font-bold text-lg tracking-wide"
                sx={{ fontWeight: 700, lineHeight: 1.2 }}
              >
                E-700 SYSTEM
              </Typography>
              <div className="text-blue-200 text-[10px] font-medium tracking-wider uppercase">
                Aircraft Management
              </div>
            </div>
          </div>
        </div>

        {/* Center - Aircraft Info */}
        <div className="flex-1 flex justify-center">
          {!loading && data.side_no && data.aircraft_name && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Box className="rounded-xl px-4 md:px-6 py-2 backdrop-blur-sm bg-white/15 border border-white/20">
                <Typography
                  className="text-white font-bold tracking-wide text-center text-sm md:text-base"
                  sx={{ fontWeight: 700 }}
                >
                  {data.aircraft_name} - {data.side_no}
                </Typography>
              </Box>
            </motion.div>
          )}
        </div>

        {/* Right - Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl transition-all duration-300 font-medium text-sm bg-white/15 hover:bg-white/25 text-white border border-white/20"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-blue-100" />
              <span className="hidden sm:inline">Dark</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.header>
  );
}
