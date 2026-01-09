/**
 * Sidebar - Glass/Transparent Theme
 * Modern glassmorphism design with blur effect
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useThemeMode } from "./ThemeProvider";
import {
  Home,
  Settings,
  ChevronRight,
  Compass,
  NavigationIcon,
  Eye,
  LogOut,
  Edit,
  Layers,
  Clock,
  Scale,
  Wrench,
  FileText,
  AlertTriangle,
  Calendar,
  Construction,
  Download,
  Sparkles,
  Shield,
  Gauge,
} from "lucide-react";

import {
  Divider,
  Avatar,
  Menu,
  Box,
  Typography,
  MenuItem,
  IconButton,
  ListItemIcon,
} from "@mui/material";

import {
  AccountCircle,
  HelpOutline,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const sidebarLinks = [
  { label: "Home", icon: <Home size={18} />, to: "/dashboard" },
  { label: "Modify E700", icon: <Edit size={18} />, to: "/modify" },
  { label: "Leading Particulars", icon: <Layers size={18} />, to: "/ViewLeadingParticulars" },
  {
    label: "LDHC",
    icon: <AlertTriangle size={18} />,
    children: [
      { label: "Limitations", icon: <Shield size={16} />, to: "/limitationLog" },
      { label: "Deferred Defects", icon: <Clock size={16} />, to: "/deferredDefectLog" },
      { label: "Husbandry Defects", icon: <Wrench size={16} />, to: "/husbandryLog" },
      { label: "Concessions", icon: <FileText size={16} />, to: "/concessions" },
      { label: "OFP Logs", icon: <Construction size={16} />, to: "/oFPLog" },
    ],
  },
  {
    label: "Forecast",
    icon: <Calendar size={18} />,
    children: [
      { label: "Hourly", icon: <Gauge size={16} />, to: "/testQualsForm" },
      { label: "Calendar", icon: <Calendar size={16} />, to: "" },
      { label: "Out of Phase", icon: <Sparkles size={16} />, to: "" },
    ],
  },
  {
    label: "Weight & Balance",
    icon: <Scale size={18} />,
    children: [
      { label: "Basic Weight & Moments", icon: <Scale size={16} />, to: "/BasicWeightAndMomentsForm" },
      { label: "Basic Weight & Moment", icon: <Scale size={16} />, to: "/BasicWeightAndMoment" },
      { label: "Variable Load Items", icon: <Layers size={16} />, to: "/VariableExpandableLoadItems" },
      { label: "Current Operating Data", icon: <Gauge size={16} />, to: "/ViewCurrentOperatingData" },
    ],
  },
  { label: "Routine Servicing", icon: <Wrench size={18} />, to: "/RoutineServicingTab" },
  {
    label: "Compass Log",
    icon: <Compass size={18} />,
    children: [
      { label: "Compass Log Form", icon: <Edit size={16} />, to: "/compassLog" },
      { label: "Compass Log View", icon: <NavigationIcon size={16} />, to: "/compassLogView" },
    ],
  },
  {
    label: "Technical Instructions",
    icon: <FileText size={18} />,
    children: [
      { label: "View Instructions", icon: <Eye size={16} />, to: "/viewTechnicalInstructions" },
      { label: "Promulgate", icon: <Edit size={16} />, to: "/promulgateTechnicalInstruction" },
    ],
  },
  { label: "View/Download E-700", icon: <Download size={18} />, to: "/WeasyPrint" },
];

function SidebarItem({ item, expandedItems, toggleExpand, isDark, depth = 0 }) {
  const location = useLocation();
  const isActive = item.to && location.pathname === item.to;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.label);

  const handleToggle = useCallback(() => {
    if (hasChildren) {
      toggleExpand(item.label);
    }
  }, [hasChildren, item.label, toggleExpand]);

  const baseClasses = `group flex items-center h-10 px-3 rounded-xl transition-all duration-200 relative w-full`;

  const activeClasses = isDark
    ? "bg-white/20 text-white shadow-lg shadow-blue-500/10 border border-white/20"
    : "bg-blue-500/20 text-blue-700 shadow-lg shadow-blue-500/10 border border-blue-300/50";

  const inactiveClasses = isDark
    ? "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent"
    : "text-gray-700 hover:text-blue-700 hover:bg-blue-500/10 border border-transparent";

  const expandedClasses = isDark
    ? "bg-white/15 text-white border border-white/10"
    : "bg-blue-500/15 text-blue-700 border border-blue-200/50";

  return (
    <div className="mb-1">
      {item.to ? (
        <Link
          to={item.to}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          <span className={`flex-shrink-0 mr-3 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{item.icon}</span>
          <span className="font-medium truncate text-sm">{item.label}</span>
        </Link>
      ) : (
        <button
          onClick={handleToggle}
          className={`${baseClasses} justify-between ${isExpanded ? expandedClasses : inactiveClasses}`}
          type="button"
        >
          <div className="flex items-center">
            <span className={`flex-shrink-0 mr-3 ${isExpanded ? 'opacity-100' : 'opacity-70'}`}>{item.icon}</span>
            <span className="font-medium truncate text-sm">{item.label}</span>
          </div>
          {hasChildren && (
            <motion.span
              className="flex-shrink-0 opacity-60"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronRight size={14} />
            </motion.span>
          )}
        </button>
      )}

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`ml-4 mt-1 pl-3 border-l-2 overflow-hidden
              ${isDark ? 'border-white/20' : 'border-blue-300/50'}`}
          >
            {item.children.map((child) => (
              <SidebarItem
                key={child.label}
                item={child}
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                isDark={isDark}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ open, toggleSidebar, closeSidebar }) {
  const [expandedItems, setExpandedItems] = useState([]);
  const sidebarRef = useRef(null);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const toggleExpand = useCallback((label) => {
    setExpandedItems((prev) =>
      prev.includes(label) ? prev.filter((i) => i !== label) : [label]
    );
  }, []);

  const [accountAnchor, setAccountAnchor] = useState(null);
  const handleAccountClick = (e) => setAccountAnchor(e.currentTarget);
  const handleAccountClose = () => setAccountAnchor(null);

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { clearParams } = useParams();

  const handleLogout = () => {
    clearParams();
    logout();
    handleAccountClose();
    navigate("/login");
  };

  useEffect(() => {
    if (!open) setExpandedItems([]);
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (open) closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, closeSidebar]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10 lg:hidden"
            onClick={closeSidebar}
          />

          {/* Sidebar - Glass Effect */}
          <motion.aside
            initial={{ x: -280, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -280, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-[260px]
              flex flex-col select-none z-20 overflow-hidden
              backdrop-blur-xl shadow-2xl
              ${isDark
                ? 'bg-slate-900/80 border-r border-white/10'
                : 'bg-white/70 border-r border-white/50'
              }`}
            ref={sidebarRef}
            style={{
              boxShadow: isDark
                ? '4px 0 30px rgba(0, 0, 0, 0.3)'
                : '4px 0 30px rgba(59, 130, 246, 0.15)',
            }}
          >
            {/* Gradient Overlay for Glass Effect */}
            <div className={`absolute inset-0 pointer-events-none
              ${isDark
                ? 'bg-gradient-to-b from-blue-500/5 via-transparent to-purple-500/5'
                : 'bg-gradient-to-b from-blue-100/30 via-transparent to-indigo-100/30'
              }`}
            />

            {/* Navigation */}
            <nav className="relative flex-1 overflow-y-auto p-3 space-y-0.5 scrollbar-thin scrollbar-thumb-blue-500/20 scrollbar-track-transparent">
              {sidebarLinks.map((item) => (
                <SidebarItem
                  key={item.label}
                  item={item}
                  expandedItems={expandedItems}
                  toggleExpand={toggleExpand}
                  isDark={isDark}
                />
              ))}
            </nav>

            {/* User Section */}
            <div className={`relative p-3 border-t backdrop-blur-sm
              ${isDark
                ? 'border-white/10 bg-white/5'
                : 'border-blue-200/50 bg-blue-50/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <IconButton onClick={handleAccountClick} sx={{ padding: 0 }}>
                  <Avatar
                    src={user?.avatarUrl}
                    alt={user?.name}
                    sx={{
                      width: 38,
                      height: 38,
                      border: isDark ? "2px solid rgba(255,255,255,0.2)" : "2px solid rgba(59,130,246,0.3)",
                      bgcolor: "#3b82f6",
                      fontWeight: 'bold',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                    }}
                  >
                    {user?.name?.[0]}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={accountAnchor}
                  open={Boolean(accountAnchor)}
                  onClose={handleAccountClose}
                  transformOrigin={{ horizontal: "left", vertical: "bottom" }}
                  anchorOrigin={{ horizontal: "left", vertical: "top" }}
                  PaperProps={{
                    sx: {
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(20px)',
                      color: isDark ? '#ffffff' : '#1f2937',
                      border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(59,130,246,0.2)',
                      borderRadius: '16px',
                      minWidth: '200px',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
                    }
                  }}
                >
                  <Box sx={{ px: 2, py: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{user?.name}</Typography>
                    <Typography variant="body2" sx={{ color: isDark ? '#9ca3af' : '#6b7280' }}>{user?.rank}</Typography>
                  </Box>
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)' }} />
                  <MenuItem sx={{ py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ListItemIcon sx={{ color: 'inherit' }}><AccountCircle fontSize="small" /></ListItemIcon>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={() => { navigate("/PasswordReset"); handleAccountClose(); }} sx={{ py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ListItemIcon sx={{ color: 'inherit' }}><Edit size={18} /></ListItemIcon>
                    T-PIN Reset
                  </MenuItem>
                  <MenuItem sx={{ py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ListItemIcon sx={{ color: 'inherit' }}><Settings size={18} /></ListItemIcon>
                    Settings
                  </MenuItem>
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)' }} />
                  <MenuItem sx={{ py: 1.5, borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ListItemIcon sx={{ color: 'inherit' }}><HelpOutline fontSize="small" /></ListItemIcon>
                    Help Center
                  </MenuItem>
                  <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(59,130,246,0.1)' }} />
                  <MenuItem onClick={handleLogout} sx={{ py: 1.5, color: '#ef4444', borderRadius: '8px', mx: 1, my: 0.5 }}>
                    <ListItemIcon sx={{ color: '#ef4444' }}><LogoutIcon fontSize="small" /></ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold truncate ${isDark ? 'text-white' : 'text-gray-800'}`}>
                    {user?.name}
                  </div>
                  <div className={`text-xs truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.rank}
                  </div>
                </div>

                <IconButton
                  onClick={handleLogout}
                  size="small"
                  sx={{
                    backgroundColor: isDark ? "rgba(239, 68, 68, 0.15)" : "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: '10px',
                    "&:hover": {
                      backgroundColor: "rgba(239,68,68,0.25)",
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  <LogOut size={16} />
                </IconButton>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
