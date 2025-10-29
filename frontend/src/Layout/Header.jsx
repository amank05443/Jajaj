import { useState, useEffect } from "react";


import {
  IconButton,TextField,Badge,Fab,InputAdornment,Tooltip,Divider,
  ListItemIcon,Typography,Avatar,Menu,MenuItem,AppBar,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon, Bell, LogOut, User, Plane, Search as SearchIcon,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Home, ContactMail, Logout, Settings, AccountCircle, HelpOutline, FileCopy,
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
  const navigate = useNavigate();

//   const { data: dataCoSLog, loading: loadingCoSLog } = useTableApi(
//     "change_of_serviceability_logs",
//     {
//       query: { aircraft_master_id: params.aircraft_master_id },
//     },
//   );

  const handleNotifClick = (event) => {
    setNotifAnchor(event.currentTarget);
  };
  const handleNotifClose = () => setNotifAnchor(null);
  const handleLogout = () => {
    logout();
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
        {" "}
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <IconButton
              onClick={toggleSidebar}
              edge="start"
              color="inherit"
              aria-label="toggle sidebar"
              size="large"
              className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 border border-cyan-500/30
            rounded-xl"
            >
              <MenuIcon size={24} />
            </IconButton>
          )}
          <div
            className="w-10 h-10 mr-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center
            justify-center shadow-lg shadow-cyan-500/30 rotate-3 hover:rotate-0 transition-transform duration-300"
             onClick={() => navigate("/exp1")}
                          >

            <Plane size={24} />
          </div>
          <div>
            <Typography
              variant="h6"
              component="h1"
              className="font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text text-transparent
            text-lg tracking-tight"
            >
              e700{" "}
            </Typography>
            <div className="text-cyan-400 text-xs font-mono">v1.0</div>
          </div>
        </div>
        {
          <div className="">
            {!loading && data && data.aircraft_type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Box
                  className="font-bold bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-300 bg-clip-text
                    text-transparent text-lg tracking-tight"
                  space-y-1
                >
                  {" "}
                  <Box display="flex" gap={3} flexWrap="wrap">
                    <Typography variant="h4" sx={{ color: "white" , fontWeight:"bold" }}>
{/*                       {data.aircraft_type?.aircraft_name} - {data.side_no} */}
                    DORNIER - 223
                    </Typography>

{/*                     <Typography variant="subtitle4" sx={{ color: "white" }}> */}
{/*                       {loading ? "" : "A/F Hrs: " + data.airframe_hrs} */}
{/*                     </Typography> */}
{/*                     <Typography variant="subtitle4"> */}
{/*                       <span style={{ color: "white" }}> Status: </span> */}
{/*                       {""} */}
{/*                       {dataCoSLog && ( */}
{/*                         <span */}
{/*                           style={{ */}
{/*                             color: "lightgreen", */}
{/*                           }} */}
{/*                         > */}
{/*                           {dataCoSLog[0].status} */}
{/*                         </span> */}
{/*                       )} */}
{/*                     </Typography> */}
                  </Box>
                </Box>
              </motion.div>
            )}
          </div>
        }
        {/* Notifications */}
        <div className="flex items-center gap-2">
          {" "}
{/*           <IconButton */}
{/*             color="inherit" */}
{/*             onClick={handleNotifClick} */}
{/*             aria-label="notifications" */}
{/*             className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 rounded-xl" */}
{/*           > */}
{/*             <Badge badgeContent={3} color="error"> */}
{/*               {" "} */}
{/*               <Bell size={20} /> */}
{/*             </Badge> */}
{/*           </IconButton> */}
          <Menu
            anchorE1={notifAnchor}
            open={Boolean(notifAnchor)}
            onClose={handleNotifClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "bottom", horizontal: "right" }}
            PaperProps={{ sx: { mt: 1.2, minWidth: 240 } }}
          >
            {" "}
            <MenuItem>New System Update Available.</MenuItem>
            <Divider />
            <MenuItem>Task Completed Successfully.</MenuItem>
            <Divider />
            <MenuItem>Server load high.</MenuItem>
          </Menu>{" "}
{/*           <IconButton */}
{/*             color="inherit" */}
{/*             aria-label="info" */}
{/*             className="text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all duration-300 rounded-xl" */}
{/*           > */}
{/*             <Info size={20} />{" "} */}
{/*           </IconButton> */}
          {/* Search Bar */}
{/*           <div className="flex-grow max-w-md hidden md:block"> */}
{/*             <TextField */}
{/*               placeholder="Search..." */}
{/*               size="small" */}
{/*               fullWidth */}
{/*               variant="outlined" */}
{/*               sx={{ */}
{/*                 "& .MuiOutlinedInput-root": { */}
{/*                   borderRadius: 2, */}
{/*                   background: "rgba(255,255,255,0.1)", */}
{/*                   color: "white", */}
{/*                   "& fieldset": { borderColor: "rgba(255,255,255,0.2)" }, */}
{/*                   "&:hover fieldset": { borderColor: "cyan" }, */}
{/*                 }, */}
{/*                 input: { color: "white" }, */}
{/*               }} */}
{/*               InputProps={{ */}
{/*                 startAdornment: ( */}
{/*                   <InputAdornment position="start"> */}
{/*                     <SearchIcon size={18} className="text-cyan-300" /> */}
{/*                   </InputAdornment> */}
{/*                 ), */}
{/*               }} */}
{/*             /> */}
{/*           </div> */}
        </div>
      </div>
    </motion.header>
  );
}
