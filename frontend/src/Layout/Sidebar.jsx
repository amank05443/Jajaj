import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";
import {
  Home,
  Settings,
  ChevronRight,
  ChevronLeft,
  Compass,
  NavigationIcon,
  Eye,
  LogOut,
  User,
  HelpCircle,
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
  Tooltip,
} from "@mui/material";

const sidebarLinks = [
  {
    label: "Home",
    icon: <Home size={18} />,
    to: "/dashboard",
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Modify E700",
    icon: <Edit size={18} />,
    to: "/modify",
    color: "from-purple-500 to-pink-500",
  },
  {
    label: "Leading Particulars",
    icon: <Layers size={18} />,
    to: "/ViewLeadingParticulars",
    color: "from-amber-500 to-orange-500",
  },
  {
    label: "LDHC",
    icon: <AlertTriangle size={18} />,
    color: "from-red-500 to-rose-500",
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
    color: "from-emerald-500 to-teal-500",
    children: [
      { label: "Hourly", icon: <Gauge size={16} />, to: "/testQualsForm" },
      { label: "Calendar", icon: <Calendar size={16} />, to: "" },
      { label: "Out of Phase", icon: <Sparkles size={16} />, to: "" },
    ],
  },
  {
    label: "Weight & Balance",
    icon: <Scale size={18} />,
    color: "from-violet-500 to-purple-500",
    children: [
      { label: "Basic Weight & Moments", icon: <Scale size={16} />, to: "/BasicWeightAndMomentsForm" },
      { label: "Basic Weight & Moment", icon: <Scale size={16} />, to: "/BasicWeightAndMoment" },
      { label: "Variable Load Items", icon: <Layers size={16} />, to: "/VariableExpandableLoadItems" },
      { label: "Current Operating Data", icon: <Gauge size={16} />, to: "/ViewCurrentOperatingData" },
    ],
  },
  {
    label: "Routine Servicing",
    icon: <Wrench size={18} />,
    to: "/RoutineServicingTab",
    color: "from-sky-500 to-blue-500",
  },
  {
    label: "Compass Log",
    icon: <Compass size={18} />,
    color: "from-indigo-500 to-violet-500",
    children: [
      { label: "Compass Log Form", icon: <Edit size={16} />, to: "/compassLog" },
      { label: "Compass Log View", icon: <NavigationIcon size={16} />, to: "/compassLogView" },
    ],
  },
  {
    label: "Technical Instructions",
    icon: <FileText size={18} />,
    color: "from-fuchsia-500 to-pink-500",
    children: [
      { label: "View Instructions", icon: <Eye size={16} />, to: "/viewTechnicalInstructions" },
      { label: "Promulgate", icon: <Edit size={16} />, to: "/promulgateTechnicalInstruction" },
    ],
  },
  {
    label: "View/Download E-700",
    icon: <Download size={18} />,
    to: "/WeasyPrint",
    color: "from-cyan-500 to-teal-500",
  },
];

function SidebarItem({ item, open, expandedItems, toggleExpand, depth = 0 }) {
  const location = useLocation();
  const isActive = item.to && location.pathname === item.to;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.includes(item.label);

  const handleToggle = useCallback(() => {
    if (hasChildren && open) {
      toggleExpand(item.label);
    }
  }, [hasChildren, item.label, toggleExpand, open]);

  const content = (
    <motion.div
      className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all duration-200
        ${isActive
          ? "bg-gradient-to-r from-white/10 to-white/5"
          : "hover:bg-white/[0.05]"
        }
        ${depth > 0 ? "ml-3" : ""}`}
      whileHover={{ x: depth === 0 ? 4 : 2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Hover glow effect - placed first so it's behind content */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color || "from-purple-500/10 to-blue-500/10"} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none -z-10`} />

      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full bg-gradient-to-b ${item.color || "from-purple-500 to-blue-500"}`}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Icon */}
      <div className="flex-shrink-0 relative z-10">
        <span className={`transition-colors duration-200 ${isActive ? "text-purple-400" : "text-gray-400 group-hover:text-white"}`}>
          {item.icon}
        </span>
      </div>

      {/* Label */}
      {open && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className={`relative z-10 flex-1 text-sm font-medium truncate transition-colors duration-200 ${isActive ? "text-white" : "text-gray-400 group-hover:text-white"}`}
        >
          {item.label}
        </motion.span>
      )}

      {/* Expand Arrow */}
      {open && hasChildren && (
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 relative z-10"
        >
          <ChevronRight size={14} className={`transition-colors duration-200 ${isExpanded ? "text-gray-300" : "text-gray-500 group-hover:text-gray-300"}`} />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <div className="mb-1 group">
      <Tooltip title={!open ? item.label : ""} placement="right" arrow>
        <div>
          {item.to ? (
            <Link to={item.to}>{content}</Link>
          ) : (
            <div onClick={handleToggle}>{content}</div>
          )}
        </div>
      </Tooltip>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="relative mt-1 ml-4 pl-4 border-l border-white/[0.05]">
              {/* Gradient line */}
              <div className={`absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b ${item.color || "from-purple-500/50 to-transparent"}`} />

              {item.children.map((child) => (
                <SidebarItem
                  key={child.label}
                  item={child}
                  open={open}
                  expandedItems={expandedItems}
                  toggleExpand={toggleExpand}
                  depth={depth + 1}
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
    if (!shouldBeOpen) {
      setExpandedItems([]);
    }
  }, [shouldBeOpen]);

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
  }, [shouldBeOpen, closeSidebar]);

  return (
    <motion.aside
      animate={{
        width: shouldBeOpen ? 280 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0d0d14] flex flex-col select-none z-20 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={sidebarRef}
    >
      {/* Border gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/20 via-white/5 to-transparent" />

      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-purple-500/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-blue-500/5 to-transparent" />
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-4 border-b border-white/[0.03]">
        <div className="flex items-center gap-3">
          {/* Status indicators */}
          <div className="flex gap-1.5">
            <motion.div
              className="w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/30"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/30"
              whileHover={{ scale: 1.2 }}
            />
            <motion.div
              className="w-3 h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/30"
              whileHover={{ scale: 1.2 }}
            />
          </div>
          {shouldBeOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <span className="text-white font-bold text-lg tracking-tight">Navigation</span>
              <span className="px-2 py-0.5 text-[10px] font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/20 rounded-full text-purple-300">
                {sidebarLinks.length}
              </span>
            </motion.div>
          )}
        </div>
        {shouldBeOpen && (
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <ChevronLeft size={16} />
          </motion.button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {/* Section label */}
        {shouldBeOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-3 mb-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider"
          >
            Main Menu
          </motion.div>
        )}

        {sidebarLinks.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
          >
            <SidebarItem
              item={item}
              open={shouldBeOpen}
              expandedItems={expandedItems}
              toggleExpand={toggleExpand}
            />
          </motion.div>
        ))}
      </nav>

      {/* User Section */}
      <div className="relative p-3 border-t border-white/[0.03]">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />

        <motion.div
          className="relative flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.01]
            border border-white/[0.05] hover:border-white/[0.1] cursor-pointer transition-all group"
          onClick={handleAccountClick}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Avatar with glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
            <Avatar
              src={user?.avatarUrl}
              alt={user?.name}
              sx={{
                width: 40,
                height: 40,
                bgcolor: "transparent",
                background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                fontSize: "1rem",
                fontWeight: 600,
                border: "2px solid rgba(255,255,255,0.1)",
              }}
            >
              {user?.name?.[0] || "U"}
            </Avatar>
            {/* Online indicator */}
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d0d14] shadow-lg shadow-emerald-400/50" />
          </div>

          {shouldBeOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 min-w-0"
            >
              <div className="text-white text-sm font-semibold truncate">
                {user?.name || "User"}
              </div>
              <div className="text-gray-500 text-xs truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {user?.rank || "Operator"}
              </div>
            </motion.div>
          )}

          {shouldBeOpen && (
            <motion.div
              animate={{ rotate: accountAnchor ? 90 : 0 }}
              className="flex-shrink-0"
            >
              <ChevronRight size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
            </motion.div>
          )}
        </motion.div>

        {/* Account Menu */}
        <Menu
          anchorEl={accountAnchor}
          open={Boolean(accountAnchor)}
          onClose={handleAccountClose}
          transformOrigin={{ horizontal: "left", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "left", vertical: "top" }}
          slotProps={{
            paper: {
              sx: {
                bgcolor: "#13131f",
                color: "white",
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.05)",
                minWidth: "220px",
                mt: -1,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                backdropFilter: "blur(20px)",
              },
            },
          }}
        >
          <Box sx={{ px: 2, py: 2, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "white" }}>
              {user?.name || "User"}
            </Typography>
            <Typography variant="caption" sx={{ color: "#9ca3af" }}>
              {user?.rank || "Operator"}
            </Typography>
          </Box>

          <Box sx={{ py: 1 }}>
            <MenuItem
              sx={{
                py: 1.5,
                mx: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              }}
            >
              <User size={16} className="mr-3 text-gray-400" />
              <span className="text-sm">Profile</span>
            </MenuItem>

            <MenuItem
              onClick={() => { navigate("/PasswordReset"); handleAccountClose(); }}
              sx={{
                py: 1.5,
                mx: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              }}
            >
              <Edit size={16} className="mr-3 text-gray-400" />
              <span className="text-sm">T-PIN Reset</span>
            </MenuItem>

            <MenuItem
              sx={{
                py: 1.5,
                mx: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              }}
            >
              <Settings size={16} className="mr-3 text-gray-400" />
              <span className="text-sm">Settings</span>
            </MenuItem>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

          <Box sx={{ py: 1 }}>
            <MenuItem
              sx={{
                py: 1.5,
                mx: 1,
                borderRadius: "8px",
                "&:hover": { bgcolor: "rgba(255,255,255,0.03)" },
              }}
            >
              <HelpCircle size={16} className="mr-3 text-gray-400" />
              <span className="text-sm">Help Center</span>
            </MenuItem>
          </Box>

          <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />

          <Box sx={{ p: 1 }}>
            <MenuItem
              onClick={handleLogout}
              sx={{
                py: 1.5,
                mx: 0,
                borderRadius: "8px",
                background: "linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05))",
                "&:hover": { bgcolor: "rgba(239,68,68,0.15)" },
              }}
            >
              <LogOut size={16} className="mr-3 text-red-400" />
              <span className="text-sm text-red-400 font-medium">Logout</span>
            </MenuItem>
          </Box>
        </Menu>
      </div>
    </motion.aside>
  );
}
