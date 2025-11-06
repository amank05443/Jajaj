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
    <div className="h-screen flex flex-col overflow-auto-scroll bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
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
            className="h-full pl-0 pt-3 pr-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-cyan-500/30
            scrollbar-track-transparent hover:scrollbar-thumb-cyan-500/50"
          >
              <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
