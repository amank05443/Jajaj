import { useState } from "react";
import {
  IconButton,
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
import { Menu as MenuIcon, LogOut, User, Plane } from "lucide-react";
import { motion } from "framer-motion";
import {
  Home,
  ContactMail,
  Info,
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

  const { params } = useParams();
  const { data, loading } = useTableApi("aircraft_masters", {
    id: params.aircraft_master_id,
    related: ["aircraft_type,customer"],
  });
  console.log("data:", data);
//   if(!loading) {console.log(data.aircraft_type.ac_type)};

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 h-16 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900
       backdrop-blur-xl border-b border-cyan-500/20 flex items-center px-4 z-30 shadow-2xl shadow-purple-500/10"
      initial={{ y: -56 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center w-full">
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
          <div className="text-cyan-400 text-xs -mt-1 font-mono">v1.0</div>
        </div>
        <div className="">
          {!loading && data && data.aircraft_type && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* <Box className="font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent text-lg tracking-tight">
                <Typography variant="h6" fontWeight={200}>
                  {data.aircraft_type.aircraft_name}
                </Typography>
                <Typography variant="subtitle4">
                  Side No : {data.side_no}
                </Typography>
              </Box> */}
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
