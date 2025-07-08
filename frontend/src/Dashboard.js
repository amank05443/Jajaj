import React from 'react';
import DashboardCards from './DashboardCards';
import Sidebar from './Layout/Sidebar';
import Header from './Layout/Header';

import './css/Dashboard.css';
import AircraftHeader from './Layout/AircraftHeader';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-body" >
        <main className="dashboard-main">
            <AircraftHeader/>
            <DashboardCards />
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
