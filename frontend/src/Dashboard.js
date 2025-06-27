import React from 'react';
import DashboardCards from './DashboardCards';
import './css/Dashboard.css';
import AircraftHeader from './AircraftHeader';

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
