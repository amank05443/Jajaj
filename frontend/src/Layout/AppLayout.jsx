import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useParams } from "../Utils/CustomHooks/useParams";
import { useAuth } from "../Authentication/AuthContext";
import TopBar from "../Layout/TopBar";

export default function AppLayout() {
  const { isAuthenticated } = useAuth();
  const { params } = useParams();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const showSidebar = isAuthenticated && params.aircraft_master_id;

  return (
    <div className="h-screen flex flex-col overflow-auto-scroll
    bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
    dark:from-slate-50 dark:via-slate-100 dark:to-slate-50">
      {isAuthenticated && (
        <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className={`flex flex-1 ${isAuthenticated ? "pt-14" : ""}`}>
        {showSidebar && (
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} closeSidebar={closeSidebar}/>
        )}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ease-in-out
                        ${showSidebar ? (sidebarOpen ? "ml-[287px]" : "ml-[67px]") : "ml-0"} `}
        >
          <div
            className="h-full pl-0 pt-3 pr-2 overflow-y-auto overflow-x-hidden
            scrollbar-thin scrollbar-thumb-blue-500/40 dark:scrollbar-thumb-blue-600/50
            scrollbar-track-transparent hover:scrollbar-thumb-blue-500/60 dark:hover:scrollbar-thumb-blue-600/70"
          >
              <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
