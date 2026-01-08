import { useState, useRef, useCallback, useEffect } from "react";
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
  Eye,
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
  VisibilityIcon,
  Construction,
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
      {
        label: "OFP Logs",
        icon: <Construction size={20} />,
        to: "/oFPLog",
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
        to: "/ViewCurrentOperatingData",
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
  {
    label: "Technical Instructions",
    icon: <SafetyCheck size={20} />,
    children: [
      {
        label: "ViewTechnicalInstructions",
        icon: <CompassCalibration size={20} />,
        to: "/viewTechnicalInstructions",
      },
      {
        label: "PromulgateTechnicalInstruction",
        icon: <NavigationIcon size={20} />,
        to: "/promulgateTechnicalInstruction",
      },
    ],
  },
  {
    label: "View/Download E-700",
    icon: <Eye size={23} />,
    to: "/WeasyPrint",
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
              className={`group flex items-center h-11 px-4 rounded-lg transition-all duration-300 relative overflow-hidden border
                        ${
                          isActive
                            ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-400 dark:border-blue-600 shadow-lg shadow-blue-500/30"
                            : "text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-900 hover:bg-blue-500/80 dark:hover:bg-blue-200 border-transparent hover:border-blue-400/50 dark:hover:border-blue-500/50 hover:shadow-md"
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
                  <span className="font-semibold truncate relative z-10 text-sm ml-3">
                    {item.label}
                  </span>
                )}
              </div>
            </Link>
          ) : (
            <button
              onClick={handleToggle}
              className={`group flex items-center justify-between w-full h-11 px-4 rounded-lg transition-all duration-300 relative overflow-hidden border
                        ${
                          isExpanded
                            ? "bg-sky-600 dark:bg-sky-400 text-white dark:text-slate-900 border-sky-500 dark:border-sky-500 shadow-lg shadow-sky-500/20"
                            : "text-slate-300 dark:text-slate-700 hover:text-white dark:hover:text-slate-900 hover:bg-sky-500/80 dark:hover:bg-sky-200 border-transparent hover:border-sky-400/50 dark:hover:border-sky-500/50"
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
                  <span className="font-semibold truncate text-sm ml-3">
                    {item.label}
                  </span>
                )}
              </div>
              {open && hasChildren && (
                <motion.span
                  className="flex-shrink-0 relative z-10"
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
            className="ml-5 border-l-2 border-blue-400 dark:border-blue-500 overflow-hidden"
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

export default function Sidebar({ open, toggleSidebar, closeSidebar }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const sidebarRef = useRef(null);
  const shouldBeOpen = open;
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
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (shouldBeOpen) {
          closeSidebar();
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shouldBeOpen]);
  return (
    <motion.aside
      animate={{ width: shouldBeOpen ? 280 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)]
      bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800
      dark:from-slate-50 dark:via-slate-100 dark:to-slate-50
      border-r-2 border-blue-500/30 dark:border-blue-600/40
      shadow-xl shadow-blue-900/20 dark:shadow-blue-500/10
      flex flex-col select-none z-20 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sidebarRef}
    >
      <nav className="flex flex-col p-3 space-y-2 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-500/30 scrollbar-track-transparent">
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
      <div className="mt-auto p-3 border-t-2 border-blue-500/30 dark:border-blue-600/40 relative z-10
      bg-slate-900/50 dark:bg-slate-100/50">
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Account Settings">
              <IconButton
                onClick={handleAccountClick}
                className="p-0 hover:bg-blue-500/20 dark:hover:bg-blue-200/50 transition-all duration-300 rounded-xl"
                sx={{ backgroundColor: 'transparent' }}
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{
                    width: shouldBeOpen ? 40 : 32,
                    height: shouldBeOpen ? 40 : 32,
                    border: "2px solid rgba(59,130,246,0.6)",
                    bgcolor: "primary.main",
                    fontWeight: 'bold'
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
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
                <Logout />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          {shouldBeOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-1 min-w-0"
            >
              <div className="text-white dark:text-slate-900 text-sm font-semibold truncate">
                {user.name}
              </div>
              <div className="text-blue-300 dark:text-blue-600 text-xs truncate font-medium">{user.rank}</div>
            </motion.div>
          )}

          {shouldBeOpen && (
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  className="transition-all duration-300 rounded-lg"
                  sx={{
                    backgroundColor: "transparent",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.4)",
                    "&:hover": {
                      backgroundColor: "rgba(239,68,68,0.15)",
                      borderColor: "rgba(239,68,68,0.6)",
                    },
                  }}
                  size="small"
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
