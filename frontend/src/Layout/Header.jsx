import { useState } from "react";
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

  const { params } = useParams();
  const { data, loading } = useTableApi("aircraft_masters", {
    id: params.aircraft_master_id,
    related: ["aircraft_type,customer"],
  });

  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);

  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };
  const handleUserClose = () => setUserAnchor(null);

  const handleLogout = () => {
    logout();
    handleUserClose();
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900
       backdrop-blur-xl border-b border-cyan-500/20 flex items-center px-4 z-30 shadow-2xl shadow-purple-500/10"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <IconButton
              onClick={toggleSidebar}
              edge="start"
              color="inherit"
              aria-label="toggle sidebar"
              size="large"
              className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30 rounded-xl"
            >
              <MenuIcon size={24} />
            </IconButton>
          )}
          <div
            className="w-10 h-10 mr-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg
            shadow-cyan-500/30 rotate-3 hover:rotate-0 transition-transform duration-300"
          >
            <Plane size={24} />
          </div>
          <div>
            <Typography
              variant="h6"
              component="h1"
              className="font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent text-lg tracking-tight"
            >
              E700
            </Typography>
            <div className="text-cyan-400 text-xs font-mono">v1.0</div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-grow max-w-md hidden md:block">
          <TextField
            placeholder="Search..."
            size="small"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                background: "rgba(255,255,255,0.1)",
                color: "white",
                "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
                "&:hover fieldset": { borderColor: "cyan" },
              },
              input: { color: "white" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={18} className="text-cyan-300" />
                </InputAdornment>
              ),
            }}
          />
        </div>

        {/* Notifications */}
        <div className="flex items-center gap-2">
          <IconButton
            color="inherit"
            onClick="handleNotifClick"
            aria-label="notifications"
            className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 rounded-xl"
          >
            <Badge badgeContent={3} color="error">
              <Bell size={20} />
            </Badge>
          </IconButton>
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

          <IconButton
            color="inherit"
            aria-label="info"
            className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 rounded-xl"
          >
            <Info size={20} />
          </IconButton>

          <Fab
            size="small"
            color="primary"
            aria-label="user-info"
            onClick={handleUserClick}
            sx={{
              ml: 1,
              boxShadow: 3,
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <User size={18} />
          </Fab>

          <Menu
            anchorE1={userAnchor}
            open={Boolean(userAnchor)}
            onClose={handleUserClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            PaperProps={{ sx: { mt: 1.2, minWidth: 180 } }}
          >
            <MenuItem>
              <User size={18} className="mr-2" /> Profile
            </MenuItem>
            <MenuItem>
              <Settings size={18} className="mr-2" /> Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogOut size={18} className="mr-2" /> LogOut
            </MenuItem>
          </Menu>
          {/* <div className="">
          {!loading && data && data.aircraft_type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Box className="font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent text-lg tracking-tight">
                <Typography variant="h6" fontWeight={200}>
                  {data.aircraft_type.aircraft_name}
                </Typography>
                <Typography variant="subtitle4">
                  Side No : {data.side_no}
                </Typography>
              </Box>
            </motion.div>
          )}
        </div> */}
        </div>
      </div>
    </motion.header>
  );
}
