import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import {
  Home,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  Zap,
  Compass,
  NavigationIcon,
} from "lucide-react";

import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  Divider,
  Collapse,
  Avatar,
  Menu,
  Box,
  Typography,
  MenuItem,
} from "@mui/material";
import {
  CompassCalibration,
  SportsSoccer,
  ChevronLeft,
  ChevronRightRounded,
  Edit,
  ExpandLess,
  ExpandMore,
  SafetyCheck,
  AddAlarm,
  ViewListTwoTone,
  CalendarTodayTwoTone,
  CompassCalibrationTwoTone,
  AlarmOn,
  DisabledByDefault,
  Discount,
  HomeWork,
  Timer3Select,
  BalanceTwoTone,
  LineWeightTwoTone,
  MonitorWeightTwoTone,
  Outbound,
  AvTimerSharp,
  CalendarMonthTwoTone,
  EngineeringIcon,
  Logout,
  AccountCircle,
  HelpOutline,
  FileCopy,
} from "@mui/icons-material";

const sidebarLinks = [
  { label: "Home", icon: <Home size={20} />, to: "/dashboard" },
  { label: "Modify E700", icon: <Edit size={20} />, to: "/modify" },
  {
    label: "Leading Particulars",
    icon: <ViewListTwoTone size={20} />,
    to: "/ViewLeadingParticulars",
  },
  {
    label: "LDHC",
    icon: <AddAlarm size={20} />,
    children: [
      {
        label: "Limitations",
        icon: <DisabledByDefault size={20} />,
        to: "/limitationLog",
      },
      {
        label: "Deferred Defects",
        icon: <AlarmOn size={20} />,
        to: "/deferredDefectLog",
      },
      {
        label: "Husbandry Defects",
        icon: <HomeWork size={20} />,
        to: "/husbandryLog",
      },
      {
        label: "Concessions",
        icon: <Discount size={20} />,
        to: "/concessions",
      },
    ],
  },
  {
    label: "Forecast",
    icon: <CalendarTodayTwoTone size={20} />,
    children: [
      {
        label: "Hourly",
        icon: <AvTimerSharp size={20} />,
        to: "/testQualsForm",
      },
      { label: "Calendar", icon: <CalendarMonthTwoTone size={20} />, to: "" },
      { label: "Out of Phase", icon: <Outbound size={20} />, to: "" },
    ],
  },
  {
    label: "Weight & Balance Data",
    icon: <BalanceTwoTone size={20} />,
    children: [
      {
        label: "Basic Weight and Moments",
        icon: <LineWeightTwoTone size={20} />,
        to: "/BasicWeightAndMomentsForm",
      },
      {
        label: "Basic Weight and Moment",
        icon: <LineWeightTwoTone size={20} />,
        to: "/BasicWeightAndMoment",
      },
      {
        label: "Variable / Expendable Load Items",
        icon: <MonitorWeightTwoTone size={20} />,
        to: "/VariableExpandableLoadItems",
      },
      {
        label: "Current Operating Data(WEIGHT AND BALANCE DATA)",
        icon: <SafetyCheck size={20} />,
        to: "/viewCurrentOperatingData",
      },
    ],
  },
  {
    label: "Routine Servicing",
    icon: <Discount size={20} />,
    to: "/RoutineServicingTab",
  },
  {
    label: "Compass Log",
    icon: <Compass size={20} />,
    children: [
      {
        label: "Compass Log Form",
        icon: <CompassCalibration size={20} />,
        to: "/compassLog",
      },
      {
        label: "Compass Log View",
        icon: <NavigationIcon size={20} />,
        to: "/compassLogView",
      },
    ],
  },
];

function SidebarItem({ item, open, expandedItems, toggleExpand }) {
  const location = useLocation();
  const isActive = item.to && location.pathname === item.to;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.label);

  const handleToggle = useCallback(() => {
    if (hasChildren && open) {
      toggleExpand(item.label);
    }
  }, [hasChildren, item.label, toggleExpand, open]);

  return (
    <div>
      <Tooltip title={!open ? item.label : ""} placement="right" arrow>
        <div>
          {item.to ? (
            <Link
              to={item.to}
              className={`group flex items-center h-11 px-4 rounded-2xl transition-all duration-300 relative overflow-hidden border
                        ${
                          isActive
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-300 border-cyan-500/40 shadow-lg shadow-cyan-500/20"
                            : "text-slate-400 hover:text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-purple-500/5 border-transparent hover:border-cyan-500/20 hover:shadow-md"
                        }`}
            >
              <div
                className={`flex items-center w-full ${open ? "justify-start" : "justify-center"}`}
              >
                {item.icon && (
                  <span className="flex-shrink-0 relative z-10">
                    {item.icon}
                  </span>
                )}
                {open && (
                  <span className="font-semibold truncate relative z-10 text-lg ml-3">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className={`group flex items-center justify-between w-full h-11 px-4 rounded-2xl transition-all duration-300 relative overflow-hidden border
                        ${
                          isExpanded
                            ? "bg-gradient-to-r from-purple-500/15 to-indigo-500/15 text-purple-300 border-purple-500/30 shadow-lg shadow-purple-500/10"
                            : "text-slate-400 hover:text-purple-300 hover:bg-gradient-to-r hover:from-purple-500/5 hover:to-indigo-500/5 border-transparent hover:border-purple-500/20"
                        }`}
              type="button"
              disabled={!open}
            >
              <div
                className={`flex items-center w-full ${open ? "justify-start" : "justify-center"}`}
              >
                {item.icon && (
                  <span className="flex-shrink-0 relative z-10">
                    {item.icon}
                  </span>
                )}
                {open && (
                  <span className="font-semibold truncate text-lg ml-3">
                    {item.label}
                  </span>
                )}
              </div>
              {open && hasChildren && (
                <motion.span
                  className="flex-shrink-0 relative z-10 text-purple-400"
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <ChevronRight size={16} />
                </motion.span>
              )}
            </button>
          )}
        </div>
      </Tooltip>
      <AnimatePresence>
        {hasChildren && isExpanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-5 border-l border-gray-200 overflow-hidden"
          >
            <div className="py-1 pl-2">
              {item.children.map((child) => (
                <SidebarItem
                  key={child.label}
                  item={child}
                  open={open}
                  expandedItems={expandedItems}
                  toggleExpand={toggleExpand}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ open, toggleSidebar }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const shouldBeOpen = open || isHovered;
  const toggleExpand = useCallback((label) => {
    setExpandedItems((prev) => {
      if (prev.includes(label)) {
        return prev.filter((i) => i !== label);
      } else {
        return [label];
      }
    });
  }, []);

  const [accountAnchor, setAccountAnchor] = useState(null);
  const handleAccountClick = (e) => setAccountAnchor(e.currentTarget);
  const handleAccountClose = () => setAccountAnchor(null);

  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { params, clearParams } = useParams();
  const handleLogout = () => {
    clearParams();
    logout();
    handleAccountClose();
    navigate("/login");
  };

  useEffect(() => {
    if (!shouldBeOpen) {
      setExpandedItems([]);
    }
  }, [shouldBeOpen]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <motion.aside
      animate={{ width: shouldBeOpen ? 280 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 to-gray-50 via-slate-800 to-slate-900
       to-blue-50 shadow-lg flex flex-col select-none z-20 overflow-hidden shadow-2xl shadow-cyan-500/5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/*       <div className="absolute inset-0 overflow-hidden"> */}
      {/*         <div className="absolute top-10 left-4 w-20 h-20 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div> */}
      {/*         <div className="absolute bottom-20 right-4 w-16 h-16 bg-gradient-ro-r from-purple-500/10 to-indigo-500/10 rounded-full blur-xl animate-pulse delay-1000"></div> */}
      {/*       </div> */}
      <nav className="flex flex-col p-2 space-y-1 overflow-y-auto flex-1">
        {sidebarLinks.map((item) => (
          <SidebarItem
            key={item.label}
            item={item}
            open={shouldBeOpen}
            expandedItems={expandedItems}
            toggleExpand={toggleExpand}
          />
        ))}
      </nav>
      <div className="mt-auto p-2 border-t border-cyan-500/20 relative z-10">
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Account Settings">
              <IconButton
                onClick={handleAccountClick}
                className="p-0 hover:bg-cyan-500/20 transition-all duration-300 rounded-xl"
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{
                    width: shouldBeOpen ? 40 : 32,
                    height: shouldBeOpen ? 40 : 32,
                    border: "2px solid rgba(34,211,238,0.5)",
                    boxShadow: "0 0 20px rgba(34,211,238,0.6)",
                  }}
                >
                  {user.name?.[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
          </motion.div>
          <Menu
            anchorEl={accountAnchor}
            open={Boolean(accountAnchor)}
            onClose={handleAccountClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user.rank}
              </Typography>
            </Box>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem onClick={() => navigate("/PasswordReset")}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
                T-PIN Reset
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <FileCopy />
              </ListItemIcon>
              Integrations
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem>
              <ListItemIcon>
                <HelpOutline />
              </ListItemIcon>
              Help Center
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout />{" "}
              </ListItemIcon>
              logout
            </MenuItem>
          </Menu>

          {shouldBeOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <div className="text-white text-sm font-medium truncate">
                {user.name}
              </div>
              <div className="text-cyan-400 text-xs truncate">{user.rank}</div>
            </motion.div>
          )}

          {shouldBeOpen && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  className="transition-all duration-300 rounded-xl shadow-lg"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#f87171",
                    border: "1px solid rgba(239,68,68,0.3)",
                    boxShadow: "0 0 10px rgba(239,68,68,0.7)",
                    "&:hover": {
                      backgroundColor: "rgba(239,68,68,0.15)",
                      color: "#fecaca",
                      boxShadow: "0 0 20px rgba(239,68,68,0.9)",
                    },
                  }}
                  size="medium"
                >
                  <Logout size={18} />
                </IconButton>
              </Tooltip>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
