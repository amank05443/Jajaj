/**
 * UPDATED CODE - Aircraft Theme Redesign
 * Changes: Blue navigation theme, improved text visibility in both light/dark modes
 * Modified: Sidebar navigation items, user profile section, and expandable menus
 */

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
  Logout,
} from "lucide-react";

import {
  Divider,
  Avatar,
  Menu,
  Box,
  Typography,
  MenuItem,
  Tooltip,
  IconButton,
  ListItemIcon,
} from "@mui/material";

import {
  AccountCircle,
  FileCopy,
  HelpOutline,
} from "@mui/icons-material";

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

  return (
    <div className="mb-1 group">
      <Tooltip title={!open ? item.label : ""} placement="right" arrow>
        <div>
          {item.to ? (
            <Link
              to={item.to}
              className={`group flex items-center h-11 px-3 rounded-xl transition-all duration-300 relative overflow-hidden
                        ${
                          isActive
                            ? "bg-blue-500/20 dark:bg-blue-500/15 text-white dark:text-slate-900 shadow-lg backdrop-blur-sm border border-blue-400/30 dark:border-blue-500/30"
                            : "text-slate-300 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-200/50 border border-transparent hover:border-white/20 dark:hover:border-slate-300"
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
              className={`group flex items-center justify-between w-full h-11 px-3 rounded-xl transition-all duration-300 relative overflow-hidden
                        ${
                          isExpanded
                            ? "bg-blue-500/20 dark:bg-blue-500/15 text-white dark:text-slate-900 border border-blue-400/30 dark:border-blue-500/30 backdrop-blur-sm"
                            : "text-slate-300 dark:text-slate-600 hover:text-white dark:hover:text-slate-900 hover:bg-white/10 dark:hover:bg-slate-200/50 border border-transparent hover:border-white/20 dark:hover:border-slate-300"
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

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-5 border-l-2 border-blue-400/30 dark:border-blue-500/30 overflow-hidden"
          >
            <div className="relative mt-1 ml-4 pl-4 border-l border-white/[0.05]">
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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

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
      animate={{ width: shouldBeOpen ? 280 : 60 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed top-16 left-0 h-[calc(100vh-4rem)]
      flex flex-col select-none z-20 overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sidebarRef}
      style={{
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)'
      }}
    >
      <style>{`
        .dark aside {
          background: rgba(248, 250, 252, 0.95) !important;
          border-right: 1px solid rgba(226, 232, 240, 0.8) !important;
        }
      `}</style>
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
      <div className="mt-auto p-3 border-t border-white/10 dark:border-slate-300/50 relative z-10"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)'
      }}>
        <style>{`
          .dark aside > div:last-child {
            background: rgba(226, 232, 240, 0.5) !important;
          }
        `}</style>
        <div className="flex items-center space-x-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Tooltip title="Account Settings">
              <IconButton
                onClick={handleAccountClick}
                sx={{
                  padding: 0,
                  backgroundColor: 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)'
                  }
                }}
              >
                <Avatar
                  src={user.avatarUrl}
                  alt={user.name}
                  sx={{
                    width: shouldBeOpen ? 40 : 32,
                    height: shouldBeOpen ? 40 : 32,
                    border: "2px solid rgba(59,130,246,0.4)",
                    bgcolor: "#3b82f6",
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
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
                <Edit size={20} />
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
                <Settings size={20} />
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
                <Logout size={20} />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>

          {shouldBeOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 min-w-0"
            >
              <div className="text-white dark:text-slate-900 text-sm font-semibold truncate">
                {user.name}
              </div>
              <div className="text-blue-300 dark:text-blue-600 text-xs truncate font-medium">{user.rank}</div>
            </motion.div>
          )}

          {shouldBeOpen && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Tooltip title="Logout">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    color: "#ef4444",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: '10px',
                    padding: '8px',
                    "&:hover": {
                      backgroundColor: "rgba(239,68,68,0.2)",
                      borderColor: "rgba(239,68,68,0.5)",
                    },
                    transition: 'all 0.3s'
                  }}
                  size="small"
                >
                  <Logout size={16} />
                </IconButton>
              </Tooltip>
            </motion.div>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
