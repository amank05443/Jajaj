/**
 * Dashboard - Light Theme with Dark Mode Support
 */

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Wrench,
  Calendar,
  Activity,
  PlaneTakeoff,
  CheckCircle2,
  ChevronRight,
  Gauge,
  FileText,
  Sparkles,
  Clock,
  AlertCircle,
  TrendingUp,
  Zap,
  Shield,
  BarChart3,
  ArrowUpRight,
  Cpu,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useThemeMode } from "./ThemeProvider";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// Premium Glass Card Component
const GlassCard = ({ children, className = "", isDark }) => (
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -2, scale: 1.005 }}
    className={`relative backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden group transition-colors duration-300
      ${isDark
        ? 'bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.05]'
        : 'bg-white border border-gray-200 shadow-lg'
      } ${className}`}
  >
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
      ${isDark ? 'bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`} />
    <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent
      ${isDark ? 'via-white/10' : 'via-blue-200'}`} />
    <div className="relative z-10">{children}</div>
  </motion.div>
);

// Stat Mini Card
const StatMini = ({ label, value, icon: Icon, color, trend, isDark }) => (
  <div className={`relative p-4 rounded-xl transition-all duration-300 group
    ${isDark
      ? 'bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08]'
      : 'bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-gray-100'
    }`}>
    <div className="flex items-start justify-between mb-3">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-lg`}>
        <Icon className="w-4 h-4 text-white" strokeWidth={2} />
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full
          ${isDark ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-emerald-50 border border-emerald-200'}`}>
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-[10px] font-medium text-emerald-500">{trend}</span>
        </div>
      )}
    </div>
    <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{value}</div>
    <div className={`text-xs uppercase tracking-wider font-medium ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{label}</div>
  </div>
);

// Action Button Component
const ActionButton = ({ icon: Icon, label, gradient, onClick, isDark }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -4 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className="group relative flex flex-col items-center gap-3"
  >
    <div className="relative">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity`} />
      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center
        border-2 border-white/20 shadow-2xl transform group-hover:rotate-3 transition-transform duration-300`}>
        <Icon className="w-9 h-9 text-white" strokeWidth={1.5} />
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <span className={`text-sm font-medium transition-colors ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
      {label}
    </span>
  </motion.button>
);

export default function DashboardExp() {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const openEntries = [
    { to: "/usLog", label: "Change of Serviceability Log", count: 10, color: "from-orange-500 to-amber-500", icon: Shield },
    { to: "/limitationLog", label: "Limitation Log", count: 6, color: "from-purple-500 to-violet-500", icon: AlertCircle },
    { to: "/deferredDefectLog1", label: "Deferred Defect", count: 5, color: "from-yellow-500 to-orange-500", icon: Clock },
    { to: null, label: "Concession", count: 0, color: "from-emerald-500 to-teal-500", icon: CheckCircle2 },
  ];

  const inspections = [
    { inspection: "100 Hrs", time: "20 Hrs", status: "warning", progress: 80 },
    { inspection: "200 Hrs", time: "20 Hrs", status: "warning", progress: 90 },
    { inspection: "300 Hrs", time: "120 Hrs", status: "good", progress: 40 },
    { inspection: "30 Weekly", time: "10 Days", status: "warning", progress: 67 },
    { inspection: "06 Monthly", time: "10 Days", status: "warning", progress: 83 },
    { inspection: "12 Monthly", time: "20 Days", status: "good", progress: 33 },
  ];

  const aircraftInfo = [
    { label: "Date of A/c Acceptance", value: "18/09/25", color: "amber" },
    { label: "Present Status", value: "BFS", color: "sky" },
    { label: "Flight Hours Today", value: "2.5 Hrs", color: "purple" },
    { label: "Last Inspection", value: "15/09/25", color: "emerald" },
  ];

  return (
    <div className={`min-h-screen p-4 md:p-6 transition-colors duration-300
      ${isDark
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100'
      }`}>

      {/* Background Effects - Only show in dark mode */}
      {isDark && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/[0.07] rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.07] rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 h-[calc(100vh-80px)] w-full grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5"
      >
        {/* Left Section - 8 columns */}
        <div className="lg:col-span-8 flex flex-col gap-4 md:gap-5 h-full overflow-hidden">
          {/* Top Card - Aircraft Overview */}
          <GlassCard className="flex-1 p-5 md:p-6" isDark={isDark}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-50" />
                  <div className={`relative p-4 rounded-2xl border backdrop-blur-sm
                    ${isDark ? 'bg-gradient-to-br from-blue-500/20 to-purple-600/20 border-white/10' : 'bg-blue-100 border-blue-200'}`}>
                    <Plane className="w-7 h-7 text-blue-500" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Aircraft Overview</h2>
                  <p className={`text-sm mt-0.5 flex items-center gap-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Real-time monitoring active
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2
                  ${isDark
                    ? 'bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 hover:border-emerald-500/40'
                    : 'bg-emerald-50 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100'
                  }`}
              >
                <FileText className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-600 text-sm font-medium">Maintenance Card</span>
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
              </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
              <StatMini label="A/F Hours" value="4,000" icon={Gauge} color="from-blue-500 to-cyan-500" trend="+2.5%" isDark={isDark} />
              <StatMini label="Status" value="SVC" icon={CheckCircle2} color="from-emerald-500 to-teal-500" isDark={isDark} />
              <StatMini label="Port Engine" value="180 Hrs" icon={Cpu} color="from-pink-500 to-rose-500" isDark={isDark} />
              <StatMini label="STBD Engine" value="210 Hrs" icon={Cpu} color="from-cyan-500 to-blue-500" isDark={isDark} />
            </div>

            {/* Open Entries */}
            <div className={`rounded-xl p-4 transition-colors duration-300
              ${isDark ? 'bg-white/[0.02] border border-white/[0.03]' : 'bg-gray-50 border border-gray-100'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-amber-600 text-sm font-semibold">Open Entries</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'text-gray-500 bg-white/[0.03]' : 'text-gray-500 bg-gray-200'}`}>
                  {openEntries.reduce((sum, e) => sum + e.count, 0)} Total
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {openEntries.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all duration-200 group
                          ${isDark
                            ? 'bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.04] hover:border-white/[0.08]'
                            : 'bg-white border border-gray-100 hover:bg-gray-50 hover:border-gray-200 shadow-sm'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color}`}>
                            <item.icon className="w-4 h-4 text-white" />
                          </div>
                          <span className={`text-sm transition-colors truncate max-w-[140px]
                            ${isDark ? 'text-gray-400 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'}`}>
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                            {item.count.toString().padStart(2, "0")}
                          </span>
                          <ChevronRight className={`w-4 h-4 group-hover:translate-x-1 transition-all
                            ${isDark ? 'text-gray-600 group-hover:text-gray-400' : 'text-gray-400 group-hover:text-gray-600'}`} />
                        </div>
                      </Link>
                    ) : (
                      <div className={`flex items-center justify-between p-3 rounded-xl
                        ${isDark ? 'bg-white/[0.01] border border-white/[0.02]' : 'bg-gray-50 border border-gray-100'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${item.color} opacity-50`}>
                            <item.icon className="w-4 h-4 text-white/50" />
                          </div>
                          <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{item.label}</span>
                        </div>
                        <span className={`font-bold text-sm ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>--</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Bottom Row - Two Cards */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 flex-1">
            {/* Quick Actions */}
            <GlassCard className="flex-1 md:flex-[1.2] p-5" isDark={isDark}>
              <div className="flex items-center gap-2 mb-6">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-amber-500/10' : 'bg-amber-100'}`}>
                  <Zap className="w-4 h-4 text-amber-500" />
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Actions</span>
              </div>

              <div className="flex items-center justify-center gap-8 h-[calc(100%-60px)]">
                <ActionButton
                  icon={PlaneTakeoff}
                  label="Flying Ops"
                  gradient="from-blue-500 via-blue-600 to-cyan-500"
                  onClick={() => navigate("/flying-operations")}
                  isDark={isDark}
                />
                <ActionButton
                  icon={Wrench}
                  label="Maintenance"
                  gradient="from-rose-500 via-pink-500 to-orange-500"
                  onClick={() => navigate("/usLogForm")}
                  isDark={isDark}
                />
              </div>
            </GlassCard>

            {/* Aircraft Information */}
            <GlassCard className="flex-1 md:flex-[1.8] p-5" isDark={isDark}>
              <div className="flex items-center gap-2 mb-5">
                <div className={`p-1.5 rounded-lg ${isDark ? 'bg-blue-500/10' : 'bg-blue-100'}`}>
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                </div>
                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Aircraft Details</span>
              </div>

              <div className="space-y-2">
                {aircraftInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all group
                      ${isDark
                        ? 'bg-white/[0.02] border border-white/[0.03] hover:border-white/[0.08]'
                        : 'bg-gray-50 border border-gray-100 hover:border-gray-200'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full bg-${item.color}-500`} />
                      <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.label}</span>
                    </div>
                    <span className={`font-semibold text-sm text-${item.color}-500`}>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Right Section - Short Forecast */}
        <GlassCard className="lg:col-span-4 p-5 flex flex-col" isDark={isDark}>
          {/* Header */}
          <div className="flex items-center gap-4 mb-5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl blur-lg opacity-40" />
              <div className={`relative p-3 rounded-xl border
                ${isDark ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-white/10' : 'bg-purple-100 border-purple-200'}`}>
                <Calendar className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Short Forecast</h2>
              <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Upcoming inspections</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-5">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-1 py-2.5 rounded-xl transition-all text-sm font-medium
                ${isDark
                  ? 'bg-gradient-to-r from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400'
                  : 'bg-emerald-50 border border-emerald-200 hover:border-emerald-300 text-emerald-600'
                }`}
            >
              Modify
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex-[1.5] py-2.5 rounded-xl transition-all text-sm font-medium
                ${isDark
                  ? 'bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 text-blue-400'
                  : 'bg-blue-50 border border-blue-200 hover:border-blue-300 text-blue-600'
                }`}
            >
              Grant Latitude
            </motion.button>
          </div>

          {/* Inspection List */}
          <div className={`flex-1 rounded-xl border overflow-hidden flex flex-col
            ${isDark ? 'bg-white/[0.02] border-white/[0.03]' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`p-3 border-b ${isDark ? 'border-white/[0.03] bg-white/[0.02]' : 'border-gray-100 bg-gray-100'}`}>
              <div className={`flex items-center justify-between text-[10px] font-semibold uppercase tracking-wider
                ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                <span>Inspection</span>
                <span>Time Left</span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {inspections.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className={`relative flex items-center justify-between px-3 py-3 border-b transition-colors group
                    ${isDark ? 'border-white/[0.02] hover:bg-white/[0.02]' : 'border-gray-100 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-1.5 rounded-full shadow-lg ${item.status === "good" ? "bg-emerald-400" : "bg-amber-400"}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{item.inspection}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`w-16 h-1 rounded-full overflow-hidden ${isDark ? 'bg-white/[0.05]' : 'bg-gray-200'}`}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full rounded-full ${item.status === "good"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : "bg-gradient-to-r from-amber-500 to-orange-500"}`}
                      />
                    </div>
                    <span className={`text-sm font-medium min-w-[60px] text-right ${item.status === "good" ? "text-emerald-500" : "text-amber-500"}`}>
                      {item.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* View Detailed Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`mt-4 w-full py-3.5 rounded-xl transition-all group relative overflow-hidden
              ${isDark
                ? 'bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-purple-500/20 border border-purple-500/20 hover:border-purple-500/40'
                : 'bg-purple-50 border border-purple-200 hover:border-purple-300 hover:bg-purple-100'
              }`}
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity
              ${isDark ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10' : 'bg-purple-100'}`} />
            <div className="relative flex items-center gap-2 justify-center">
              <Activity className="w-5 h-5 text-purple-500 group-hover:scale-110 transition-transform" />
              <span className="text-purple-600 font-semibold">View Detailed Forecast</span>
              <ArrowUpRight className="w-4 h-4 text-purple-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </motion.button>
        </GlassCard>
      </motion.div>
    </div>
  );
}
