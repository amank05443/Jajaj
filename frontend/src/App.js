import React,{useEffect,useState} from 'react';
import axios from 'axios';
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
import LeadingParticularTab from './PrepareE700/LeadingParticularTab';
import USLog from './USLog';
import AircraftHeader from './AircraftHeader';
import PrepareAircraft from './FlyingOperations/PrepareAircraft';
import PilotAcceptance from './FlyingOperations/PilotAcceptance';
import PostFlying from './FlyingOperations/PostFlying';
import PrivateRoute from './PrivateRoute';

function App() {
    const[user,setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://loaclhost:8000/user-profile/',{
                withCredentials:true,
                });
                if (res.data.response) {
                    const{name,rank,pno} = res.data.user;
                    setUser({name,rank,pno});
                }
                } catch(err) {
                    console.error('Failed to fetch user:',err);
            }
        };
        fetchUser();
        },
    []);

  return (
  <E700DataProvider>
    <Router>
   <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<UpdateE700 />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route element={<PrivateRoute />}/>
        <Route path="/sidebar/LeadingParticularTab" element={<LeadingParticularTab />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboardCards" element={<DashboardCards />} />
        <Route path="/e700" element={<E700Page />} /> {/* ✅ New route */}
        <Route path="/sidebar" element={<Sidebar />} /> {/* ✅ New route */}

        <Route path="/footer" element={<Footer />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/dashboard/modify" element={<Modify />} />
        <Route path="/dashboard/prepare" element={<Prepare />} />
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