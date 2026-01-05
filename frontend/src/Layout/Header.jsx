import { useState, useEffect } from "react";
import axios from "axios";
import { useThemeMode } from "./ThemeProvider";
import {
  IconButton,
  Divider,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Bell,
  Plane,
  Sun,
  Moon,
  Search,
  Command,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useNavigate } from "react-router-dom";

export default function Header({
  sidebarOpen,
  toggleSidebar,
  showSidebarToggle = true,
}) {
  const [notifAnchor, setNotifAnchor] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { logout, user } = useAuth();
  const { params, loading } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 h-16 z-30 transition-all duration-500
        ${scrolled
          ? "bg-white/95 dark:bg-[#0d0d14]/95 backdrop-blur-2xl shadow-2xl shadow-gray-500/10 dark:shadow-purple-500/5 border-b border-gray-200 dark:border-white/5"
          : "bg-gradient-to-r from-gray-50 via-white to-gray-50 dark:from-[#0d0d14] dark:via-[#13131f] dark:to-[#0d0d14] backdrop-blur-xl border-b border-gray-200 dark:border-white/[0.03]"
        }`}
      initial={{ y: -64 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Animated gradient line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Subtle glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none dark:block hidden">
        <div className="absolute -top-20 left-1/4 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-1/4 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative flex items-center justify-between w-full h-full px-4 gap-4">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-4">
          {showSidebarToggle && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleSidebar}
              className="relative p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.05]
                hover:bg-gray-200 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300 group"
            >
              <MenuIcon size={20} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
            </motion.button>
          )}

          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/exp1")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-purple-500 via-blue-500 to-cyan-400 rounded-xl
                flex items-center justify-center shadow-lg transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                <Plane size={20} className="text-white" strokeWidth={2} />
              </div>
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent">
                  e-700
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-gradient-to-r from-purple-500/20 to-blue-500/20
                  border border-purple-500/20 rounded-md text-purple-300">
                  PRO
                </span>
              </div>
              <div className="text-[10px] text-gray-500 font-medium tracking-wider">
                AVIATION SYSTEM
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Section - Aircraft Info */}
        <AnimatePresence>
          {!loading && data.side_no && data.aircraft_name && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex items-center gap-4"
            >
              <div className="relative px-6 py-2 rounded-2xl bg-gradient-to-r from-white/[0.03] to-white/[0.01]
                border border-white/[0.05] backdrop-blur-sm">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-blue-500/5" />
                <div className="relative flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-lg shadow-emerald-400/50" />
                    <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">Active</span>
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex items-center gap-3">
                    <Sparkles size={16} className="text-amber-400" />
                    <span className="text-lg font-bold text-white tracking-wide">
                      {data.aircraft_name}
                    </span>
                    <span className="text-lg text-gray-400">-</span>
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      {data.side_no}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-2">
          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05]
              hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group"
          >
            <Search size={16} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
            <span className="text-sm text-gray-500 group-hover:text-gray-300 transition-colors">Search</span>
            <div className="flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-md bg-white/[0.05]">
              <Command size={10} className="text-gray-500" />
              <span className="text-[10px] text-gray-500">K</span>
            </div>
          </motion.button>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNotifClick}
            className="relative p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]
              hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group"
          >
            <Bell size={18} className="text-gray-400 group-hover:text-white transition-colors" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </motion.button>

          <Menu
            anchorEl={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 320,
                bgcolor: "#1a1a2e",
                border: "1px solid rgba(255,255,255,0.05)",
                borderRadius: "16px",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "white" }}>
                Notifications
              </Typography>
              <Typography variant="caption" sx={{ color: "#9ca3af" }}>
                You have 3 unread messages
              </Typography>
            </Box>
            <MenuItem sx={{ py: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.03)" } }}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Zap size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-sm text-white">New System Update</div>
                  <div className="text-xs text-gray-500">Version 2.0 is available</div>
                </div>
              </div>
            </MenuItem>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
            <MenuItem sx={{ py: 2, "&:hover": { bgcolor: "rgba(255,255,255,0.03)" } }}>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Sparkles size={16} className="text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm text-white">Task Completed</div>
                  <div className="text-xs text-gray-500">Maintenance check passed</div>
                </div>
              </div>
            </MenuItem>
          </Menu>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="relative p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]
              hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300 group overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {mode === "light" ? (
                <motion.div
                  key="moon"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={18} className="text-amber-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={18} className="text-amber-400" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="hidden sm:flex items-center gap-3 pl-3 ml-1 border-l border-white/[0.05]"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full blur-md opacity-40" />
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  bgcolor: "transparent",
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
              >
                {user?.name?.[0] || "U"}
              </Avatar>
            </div>
            <div className="hidden lg:block">
              <div className="text-sm font-medium text-white">{user?.name || "User"}</div>
              <div className="text-[10px] text-gray-500">{user?.rank || "Operator"}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
