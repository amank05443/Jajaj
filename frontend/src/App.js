import React, { useEffect, useState } from "react";
import "./css/App.css";
import "./css/index.css";
import "./Layout/JqWidget"; // ✅ Importing all Jq-Widgets for JQXGrid.
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateE700 from "./welcome";
import { useParams } from "./Utils/useParams";
import LoginPage from "./Authentication/LoginPage";
import Dashboard from "./Dashboard";
import DashboardCards from "./DashboardCards";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Sidebar from "./Layout/Sidebar";
import E700Page from "./E700Page"; // ✅ Import the new E-700 page
import { E700DataProvider } from "./E700DataContext"; // ✅ Import the new E-700 page
import { ParamsProvider } from "./Utils/useParams"; //✅useParams context
import { AlertProvider } from "./Utils/Alerts/AlertContext";
import { ConfirmProvider } from "./Utils/Alerts/ConfirmContext";
//import FloatingWindow from "./Utils/FloatingWindow";
import CreateProfile from "./CreateProfile";
import Prepare from "./Prepare";
import Modify from "./Modify";
import FlyingOperations from "./FlyingOperations";
import NewEntryForUSLog from "./Section-5/NewEntryForUSLog";
import ViewE700 from "./ViewE700";
import USLog from "./Section-5/USLog";
import OFPLog from "./Section-2/OFPLog";
import DemoSaveForm from "./Section-2/DemoSaveForm";
import LimitationLog from "./Section-2/LimitationLog";
import NewEntryForLimitationLog from "./Section-2/NewEntryForLimitationLog";
import DeferredDefectLog from "./Section-3/DeferredDefectLog";
import Concessions from "./Section-3/Concessions";
import NewEntryForConcessions from "./Section-3/NewEntryForConcessions";
import NewEntryForDeferredDefectLog from "./Section-3/NewEntryForDeferredDefectLog";
import HusbandryLog from "./Section-3/HusbandryLog";
import NewEntryForHusbandryLog from "./Section-3/NewEntryForHusbandryLog";
import AircraftHeader from "./Layout/AircraftHeader";
import PrepareAircraft from "./FlyingOperations/PrepareAircraft";
import PilotAcceptance from "./FlyingOperations/PilotAcceptance";
import PostFlying from "./FlyingOperations/PostFlying";
import ViewLeadingParticulars from "./LeadingParticulars/ViewLeadingParticulars";
import ViewLeadingParticular1 from "./LeadingParticulars/ViewLeadingParticular";
import LeadingParticularTab from "./PrepareE700/LeadingParticularTab";
import RoutineServicingTab from "./PrepareE700/RoutineServicingTab";
import PrivateRoute from "./Authentication/PrivateRoute";
import PublicRoute from "./Authentication/PublicRoute";
import AutoLogoutHandler from "./Authentication/AutoLogoutHandler";
import { AuthProvider, useAuth } from "./Authentication/AuthContext";
import VariableExpandableLoadItems from "./WeightAndBalanceData/VariableExpandableLoadItemsForm";
import BasicWeightAndMoments from "./WeightAndBalanceData/BasicWeightAndMomentsForm";
import TestQuals from "./LeadingParticulars/TestQualsSaveAsDraft";
import UserList from "./UserList";
import BasicWeightAndMoment from "./WeightAndBalanceData/BasicWeightAndMoment";
import ViewHistory from "./WeightAndBalanceData/BasicWeightAndMomentsForm";


const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const { params } = useParams();
  const aircraft_master_id = params.aircraft_master_id;

  return (
    <>
      <Router>
        <div className={"layout"}>
          <header className={"header"}>{isAuthenticated && <Header />}</header>
          <div className={"main1"}>
            {isAuthenticated && aircraft_master_id && (
              <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            )}
            <section className={"content"}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <PublicRoute>
                      <UpdateE700 />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path="/create-profile"
                  element={
                    <PublicRoute>
                      <CreateProfile />
                    </PublicRoute>
                  }
                />
                <Route element={<PrivateRoute />}>
                  <Route
                    path="/sidebar/LeadingParticularTab"
                    element={<LeadingParticularTab />}
                  />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboardCards" element={<DashboardCards />} />
                  <Route path="/e700" element={<E700Page />} />
                  <Route path="/prepare" element={<Prepare />} />
                  <Route path="/modify" element={<Modify />} />
                  <Route path="/userList" element={<UserList />} />
                  <Route path="/dashboard/modify" element={<Modify />} />
                  <Route
                    path="/viewLeadingParticulars"
                    element={<ViewLeadingParticular1 />}
                  />
                  <Route
                    path="/flying-operations"
                    element={<FlyingOperations />}
                  />
                  <Route
                    path="/newEntryForUSLog"
                    element={<NewEntryForUSLog />}
                  />
                  <Route path="/viewE700" element={<ViewE700 />} />
                  <Route path="/usLog" element={<USLog />} />
                  <Route path="/OFPLog" element={<OFPLog />} />
                  <Route path="/demoSaveForm" element={<DemoSaveForm />} />
                  <Route path="/limitationLog" element={<LimitationLog />} />
                  <Route
                    path="/deferredDefectLog"
                    element={<DeferredDefectLog />}
                  />
                  <Route path="/husbandryLog" element={<HusbandryLog />} />
                  <Route path="/concessions" element={<Concessions />} />
                  <Route
                    path="/newEntryForLimitationLog"
                    element={<NewEntryForLimitationLog />}
                  />
                  <Route
                    path="/newEntryForDeferredDefectLog"
                    element={<NewEntryForDeferredDefectLog />}
                  />
                  <Route
                    path="/newEntryForHusbandryLog"
                    element={<NewEntryForHusbandryLog />}
                  />
                  <Route
                    path="/newEntryForConcessions"
                    element={<NewEntryForConcessions />}
                  />
                  <Route path="/aircraftHeader" element={<AircraftHeader />} />
                  <Route
                    path="/weightAndBalanceData/VariableExpandableLoadItemsForm"
                    element={<VariableExpandableLoadItems />}
                  />
                  <Route
                    path="/weightAndBalanceData/BasicWeightAndMomentsForm"
                    element={<BasicWeightAndMoments />}
                  />
                  <Route
                    path="/WeightAndBalanceData/BasicWeightAndMoment"
                    element={<BasicWeightAndMoment />}
                  />
                  <Route
                    path="/WeightAndBalanceData/BasicWeightAndMoment/ViewHistory"
                    element={<ViewHistory />}
                  />
                  <Route
                    path="/RoutineServicingTab"
                    element={<RoutineServicingTab />}
                  />
                  <Route path="/testQualsForm" element={<TestQuals />} />
                </Route>
              </Routes>
            </section>
          </div>
        </div>
      </Router>
      {/*{isAuthenticated && <Footer/>}*/}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <ParamsProvider>
        <E700DataProvider>
          <AlertProvider>
            <ConfirmProvider>
              <AppContent />
            </ConfirmProvider>
          </AlertProvider>
        </E700DataProvider>
      </ParamsProvider>
    </AuthProvider>
  );
}

export default App;
