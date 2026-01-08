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
      className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900
      dark:from-slate-100 dark:via-blue-50 dark:to-slate-100
      backdrop-blur-xl border-b-2 border-blue-500/30 dark:border-blue-600/50
      flex items-center px-4 z-30 shadow-xl shadow-blue-900/20 dark:shadow-blue-500/10"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        {" "}
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <IconButton
              onClick={toggleSidebar}
              edge="start"
              aria-label="toggle sidebar"
              size="large"
              className="text-blue-300 dark:text-blue-700 hover:text-white dark:hover:text-blue-900
              hover:bg-blue-500/20 dark:hover:bg-blue-200/50
              transition-all duration-300 border border-blue-400/30 dark:border-blue-600/40 rounded-xl"
              sx={{
                color: 'inherit',
                '&:hover': { backgroundColor: 'transparent' }
              }}
            >
              <MenuIcon size={24} />
            </IconButton>
          )}
          <div
            className="w-10 h-10 mr-1 bg-gradient-to-br from-blue-500 via-sky-400 to-blue-600
            dark:from-blue-600 dark:via-sky-500 dark:to-blue-700
            rounded-lg flex items-center justify-center
            shadow-lg shadow-blue-500/50 dark:shadow-blue-600/40
            rotate-3 hover:rotate-0 transition-transform duration-300 cursor-pointer
            border-2 border-blue-400/50 dark:border-blue-500/60"
            onClick={() => navigate("/exp1")}
          >
            <Plane size={24} className="text-white" />
          </div>
          <div>
            <Typography
              variant="h6"
              component="h1"
              className="font-bold text-white dark:text-slate-900 text-lg tracking-wide uppercase"
              sx={{ fontFamily: 'monospace', letterSpacing: '0.1em' }}
            >
              E-700
            </Typography>
            <div className="text-blue-300 dark:text-blue-600 text-xs font-mono font-semibold">
              Aircraft Log
            </div>
          </div>
        </div>
        {
          <div>
            {!loading && data.side_no && data.aircraft_name && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Box display="flex" gap={3} flexWrap="wrap" alignItems="center">
                  <Typography
                    variant="h5"
                    className="font-bold text-white dark:text-slate-900 tracking-wide"
                    sx={{
                      fontFamily: 'Arial, sans-serif',
                      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {data.aircraft_name} - {data.side_no}
                  </Typography>
                </Box>
              </motion.div>
            )}
          </div>
        }
        {/* Notifications */}
        <div className="flex items-center gap-3">
          <Menu
            anchorE1={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            PaperProps={{ sx: { mt: 1.2, minWidth: 240 } }}
          >
            <MenuItem>New System Update Available.</MenuItem>
            <Divider />
            <MenuItem>Task Completed Successfully.</MenuItem>
            <Divider />
            <MenuItem>Server load high.</MenuItem>
          </Menu>

          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
            bg-slate-800 dark:bg-slate-200
            text-blue-300 dark:text-blue-700
            border border-blue-400/30 dark:border-blue-500/50
            hover:bg-slate-700 dark:hover:bg-slate-300
            shadow-md hover:shadow-lg transition-all duration-300 font-medium"
          >
            {mode === "light" ? (
              <>
                <Moon className="w-5 h-5" />
                <span className="text-sm">Dark</span>
              </>
            ) : (
              <>
                <Sun className="w-5 h-5" />
                <span className="text-sm">Light</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
