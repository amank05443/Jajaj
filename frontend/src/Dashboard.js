import React, { useState } from 'react';
import DashboardCards from './DashboardCards';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import './css/Dashboard.css';
import AircraftHeader from './AircraftHeader';

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
            <Footer />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
