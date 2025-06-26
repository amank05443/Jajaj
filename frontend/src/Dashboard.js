import React, { useState } from 'react';
import DashboardCards from './DashboardCards';
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';

import './css/Dashboard.css';
import AircraftHeader from './Layout/AircraftHeader';

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="dashboard-container">
      <div className="dashboard-body" >
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="dashboard-main">
            <AircraftHeader/>
            <DashboardCards />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
