import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateE700 from './UpdateE700';
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import DashboardCards from './DashboardCards';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import E700Page from './E700Page'; // ✅ Import the new E-700 page
import {E700DataProvider} from './E700DataContext'; // ✅ Import the new E-700 page
import CreateProfile from './CreateProfile';
import Prepare from './Prepare';
import Modify from './Modify';
import FlyingOperations from './FlyingOperations';
import NewEntry from './NewEntry';
import ViewE700 from './ViewE700';
import USLog from './USLog';
import AircraftHeader from './AircraftHeader';
import PrepareAircraft from './FlyingOperations/PrepareAircraft';
import PilotAcceptance from './FlyingOperations/PilotAcceptance';
import PostFlying from './FlyingOperations/PostFlying';
import ViewLeadingParticulars from './LeadingParticulars/ViewLeadingParticulars';

function App() {
  return (
  <E700DataProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardCards" element={<DashboardCards />} />
        <Route path="/e700" element={<E700Page />} /> {/* ✅ New route */}
        <Route path="/sidebar" element={<Sidebar />} /> {/* ✅ New route */}
        <Route path="/header" element={<Header />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/" element={<UpdateE700 />} /> {/* Optional: default to login */}
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/dashboard/modify" element={<Modify />} />
        <Route path="/ViewLeadingParticulars" element={<ViewLeadingParticulars />} />
        <Route path="/flying-operations" element={<FlyingOperations />} />
        <Route path="/newEntry" element={<NewEntry />} />
        <Route path="/viewE700" element={<ViewE700 />} />
        <Route path="/usLog" element={<USLog />} />
        <Route path="/aircraftHeader" element={<AircraftHeader />} />
      </Routes>
    </Router>
  </E700DataProvider>
  );
}

export default App;