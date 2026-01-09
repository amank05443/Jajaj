/**
 * PREMIUM AIRLINE DASHBOARD - Professional Aviation Management System
 * Design: Enterprise-grade dashboard for aircraft maintenance and flight operations
 * Features: Real-time status, comprehensive modules, professional airline industry design
 * Theme: Light by default with dark mode support
 */

import React from "react";
import DashboardCards from "./DashboardCards";
import "../css/Dashboard.css";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { TrendingUp, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import { useThemeMode } from "./ThemeProvider";

function Dashboard() {
  const { mode } = useThemeMode();

  // Premium Status Metrics
  const statusMetrics = [
    { label: "Aircraft Status", value: "Operational", icon: <CheckCircle size={24} />, color: "#10b981", bgLight: "rgba(16, 185, 129, 0.1)", bgDark: "rgba(16, 185, 129, 0.2)" },
    { label: "Active Flights", value: "24/45", icon: <Activity size={24} />, color: "#3b82f6", bgLight: "rgba(59, 130, 246, 0.1)", bgDark: "rgba(59, 130, 246, 0.2)" },
    { label: "Maintenance Due", value: "3", icon: <AlertTriangle size={24} />, color: "#f59e0b", bgLight: "rgba(245, 158, 11, 0.1)", bgDark: "rgba(245, 158, 11, 0.2)" },
    { label: "Fleet Efficiency", value: "94%", icon: <TrendingUp size={24} />, color: "#10b981", bgLight: "rgba(16, 185, 129, 0.1)", bgDark: "rgba(16, 185, 129, 0.2)" },
  ];

  return (
    <div className="premium-dashboard-container p-4">
      {/* Premium Status Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="status-metrics-bar"
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statusMetrics.map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Paper
                  elevation={mode === 'dark' ? 3 : 1}
                  sx={{
                    p: 3,
                    background: mode === 'dark'
                      ? `linear-gradient(135deg, ${metric.bgDark} 0%, rgba(30,41,59,0.8) 100%)`
                      : `linear-gradient(135deg, ${metric.bgLight} 0%, rgba(255,255,255,0.9) 100%)`,
                    border: `1px solid ${mode === 'dark' ? metric.color + '40' : metric.color + '30'}`,
                    borderRadius: "16px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                  className="metric-card"
                >
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === 'dark' ? "rgba(255,255,255,0.7)" : "#6b7280",
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          mb: 1,
                        }}
                      >
                        {metric.label}
                      </Typography>
                      <Typography
                        variant="h4"
                        sx={{
                          color: metric.color,
                          fontWeight: 700,
                          fontSize: "1.75rem",
                        }}
                      >
                        {metric.value}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        color: metric.color,
                        opacity: 0.8,
                      }}
                    >
                      {metric.icon}
                    </Box>
                  </Box>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>

      {/* Main Dashboard Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Typography
          variant="h5"
          sx={{
            color: mode === 'dark' ? "white" : "#1f2937",
            fontWeight: 700,
            mb: 3,
            fontSize: "1.5rem",
            letterSpacing: "0.5px",
          }}
        >
          Operations & Maintenance Control
        </Typography>
        <DashboardCards />
      </motion.div>
    </div>
  );
}
export default Dashboard;
