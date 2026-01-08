/**
 * UPDATED CODE - Aircraft Theme Redesign
 * Changes: Professional blue color scheme, improved dark/light mode support
 * Modified: Header component with aircraft branding and theme toggle
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { useThemeMode } from "./ThemeProvider";
import {
  IconButton,
  TextField,
  Badge,
  Fab,
  InputAdornment,
  Tooltip,
  Divider,
  ListItemIcon,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  AppBar,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Bell,
  LogOut,
  User,
  Plane,
  Search as SearchIcon,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Home,
  ContactMail,
  Logout,
  Settings,
  AccountCircle,
  HelpOutline,
  FileCopy,
} from "@mui/icons-material";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import useTableApi from "../Utils/CustomHooks/useTableApi";
import { Link as RouterLink, useNavigate } from "react-router-dom";
export default function Header({
  sidebarOpen,
  toggleSidebar,
  showSidebarToggle = true,
}) {
  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [userAnchor, setUserAnchor] = useState(null);
  const { logout } = useAuth();
  const { params, loading } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //   const { data: dataCoSLog, loading: loadingCoSLog } = useTableApi(
  //     "change_of_serviceability_logs",
  //     {
  //       query: { aircraft_master_id: params.aircraft_master_id },
  //     },
  //   );
  const { mode, toggleTheme } = useThemeMode();
  useEffect(() => {
    if (!loading) {
      const aircraft_master_id = params.aircraft_master_id;
      if (aircraft_master_id) {
        axios
          .get(`/api/headersData/${aircraft_master_id}`)
          .then((response) => {
            setData(response.data);
            console.log("Headers data found :", response.data);
          })
          .catch((error) => {
            console.error("Error Headers:", error);
          });
      }
    }
  }, [params, loading]);
  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);
  const handleLogout = () => {
    logout();
  };
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 h-16
      bg-white/10 dark:bg-white/90
      backdrop-blur-2xl
      border-b border-white/20 dark:border-slate-200
      flex items-center px-6 z-30
      shadow-lg shadow-black/5 dark:shadow-slate-200/20"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: 'rgba(15, 23, 42, 0.7)',
      }}
    >
      <style>{`
        .dark header {
          background: rgba(248, 250, 252, 0.95) !important;
        }
      `}</style>
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <IconButton
              onClick={toggleSidebar}
              edge="start"
              aria-label="toggle sidebar"
              size="large"
              sx={{
                color: 'white',
                backgroundColor: 'rgba(59, 130, 246, 0.15)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '12px',
                '&:hover': {
                  backgroundColor: 'rgba(59, 130, 246, 0.25)',
                  border: '1px solid rgba(59, 130, 246, 0.5)',
                },
                '.dark &': {
                  color: '#1e293b',
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                },
                transition: 'all 0.3s'
              }}
            >
              <MenuIcon size={22} />
            </IconButton>
          )}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/exp1")}
          >
            <div
              className="w-11 h-11 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700
              dark:from-blue-500 dark:via-blue-600 dark:to-blue-700
              rounded-xl flex items-center justify-center
              shadow-lg shadow-blue-500/40 dark:shadow-blue-500/30
              hover:scale-105 transition-transform duration-300
              border border-blue-400/30"
            >
              <Plane size={22} className="text-white" />
            </div>
            <div>
              <Typography
                variant="h6"
                component="h1"
                className="font-bold text-white dark:text-slate-900 text-lg tracking-wide"
                sx={{
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                  letterSpacing: '0.02em',
                  fontWeight: 700
                }}
              >
                E-700 SYSTEM
              </Typography>
              <div className="text-blue-200 dark:text-blue-600 text-[10px] font-semibold tracking-wider uppercase">
                Aircraft Management
              </div>
            </div>
          </div>
        </div>

        {/* Aircraft Info */}
        <div className="flex-1 flex justify-center">
          {!loading && data.side_no && data.aircraft_name && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  padding: '8px 24px',
                }}
                className="dark:bg-white/80 dark:border-slate-300"
              >
                <Typography
                  variant="h6"
                  className="font-bold text-white dark:text-slate-900 tracking-wide text-center"
                  sx={{
                    fontFamily: 'system-ui, sans-serif',
                    fontSize: '1.1rem',
                    fontWeight: 700
                  }}
                >
                  {data.aircraft_name} - {data.side_no}
                </Typography>
              </Box>
            </motion.div>
          )}
        </div>

        {/* Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl
            bg-white/10 dark:bg-slate-800/80
            text-white dark:text-slate-900
            border border-white/20 dark:border-slate-300
            hover:bg-white/20 dark:hover:bg-slate-700/80
            backdrop-blur-md
            shadow-md hover:shadow-lg transition-all duration-300 font-semibold text-sm"
          >
            {mode === "light" ? (
              <>
                <Moon className="w-4 h-4" />
                <span>Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-4 h-4" />
                <span>Light</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
