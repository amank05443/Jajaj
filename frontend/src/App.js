import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateE700 from './welcome';
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
import QualsForm from './LeadingParticulars/QualsForm';
import LeadingParticularTab from './PrepareE700/LeadingParticularTab';
import PrivateRoute from './PrivateRoute';

import {AuthProvider,useAuth} from './AuthContext';

//         --------------------------------  JQX Widget Functional  -----------------------------------
import 'jqwidgets-scripts/jqwidgets/jqxcore'
import 'jqwidgets-scripts/jqwidgets/jqxdata'
import 'jqwidgets-scripts/jqwidgets/jqxbuttons'
import 'jqwidgets-scripts/jqwidgets/jqxscrollbar'
import 'jqwidgets-scripts/jqwidgets/jqxmenu'
import 'jqwidgets-scripts/jqwidgets/jqxgrid'
import 'jqwidgets-scripts/jqwidgets/jqxtoolbar'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.selection'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.columnsresize'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.filter'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.sort'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.edit'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.columnsreorder'
import 'jqwidgets-scripts/jqwidgets/jqxgrid.pager'
import 'jqwidgets-scripts/jqwidgets/jqxdropdownlist'
import 'jqwidgets-scripts/jqwidgets/jqxlistbox'
// import JqxGrid from 'jqwidgets-scripts/jqwidgets/jqx-all';
// import JqxGrid from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid';

//     ------------------------------  JQX Widget Style & CSS  ------------------------------------
import 'jqwidgets-scripts/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.light.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.energyblue.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.office.css';
import 'jqwidgets-scripts/jqwidgets/styles/jqx.material.css';


const AppContent = () => {
    const {isAuthenticated} = useAuth();

    return (
        <>
        {isAuthenticated && <Header />}
      {/* {isAuthenticated && <Sidebar />}*/}

      <Routes>
        <Route path="/" element={<UpdateE700 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route element={<PrivateRoute />}>
        <Route path="/sidebar/LeadingParticularTab" element={<LeadingParticularTab />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardCards" element={<DashboardCards />} />
        <Route path="/e700" element={<E700Page />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/dashboard/modify" element={<Modify />} />
        <Route path="/ViewLeadingParticulars" element={<ViewLeadingParticulars />} />
        <Route path="/flying-operations" element={<FlyingOperations />} />
        <Route path="/newEntry" element={<NewEntry />} />
        <Route path="/viewE700" element={<ViewE700 />} />
        <Route path="/usLog" element={<USLog />} />
        <Route path="/aircraftHeader" element={<AircraftHeader />} />
        <Route path="/formQuals" element={<QualsForm />} />
        </Route>
      </Routes>

      {isAuthenticated && <Footer/>}
      </>
      );
      };

      function App() {
        return (
         <AuthProvider>
        <E700DataProvider>
         <Router>
         <AppContent />

        </Router>
        </E700DataProvider>
    </AuthProvider>
  );
}

export default App;