/**
 * UPDATED CODE - Light Theme with Dark Mode Support
 * Changes: Light background by default, proper dark mode toggle
 */

import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useAuth } from "../Authentication/AuthContext";
import { useThemeMode } from "./ThemeProvider";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const { params } = useParams();
  const { mode } = useThemeMode();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const showSidebar = isAuthenticated && params.aircraft_master_id;

  return (
    <div className={`h-screen flex flex-col overflow-auto-scroll transition-colors duration-300
      ${mode === 'dark'
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      }`}
    >
      {isAuthenticated && (
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className={`flex flex-1 ${isAuthenticated ? "pt-14" : ""}`}>
        {showSidebar && (
          <Sidebar
            open={sidebarOpen}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
          />
        )}
        <main
          className="flex-1 overflow-auto transition-all duration-300 ease-in-out ml-0"
        >
          <div
            className={`h-full pl-0 pt-3 pr-2 overflow-y-auto overflow-x-hidden
              scrollbar-thin scrollbar-track-transparent
              ${mode === 'dark'
                ? 'scrollbar-thumb-blue-500/40 hover:scrollbar-thumb-blue-500/60'
                : 'scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400'
              }`}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
