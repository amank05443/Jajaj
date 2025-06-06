import React,{useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPlane, FaTools,FaAtlas, FaClock, FaFileAlt, FaChartBar,FaGlobeAsia,FaCalendar,FaWeight,FaCalculator} from 'react-icons/fa';
import './Sidebar.css';
import {FaPencil} from "react-icons/fa6";

function Sidebar({ isOpen }) {
  const location = useLocation();
  const [isLimitationOpen,setIsLimitationOpen] = useState(false);
  const [isForecastOpen,setIsForecastOpen] = useState(false);
  const [isWeightBalanceData,setIsWeightBalanceData] = useState(false);
  const handleState = () => {
      setIsLimitationOpen(prev => !prev)
      setIsForecastOpen(false)
      setIsWeightBalanceData(false)
  }
  const handleState2 = () => {
      setIsForecastOpen(prev => !prev)
      setIsLimitationOpen(false)
      setIsWeightBalanceData(false)
  }
  const handleState3 = () => {
      setIsWeightBalanceData(prev => !prev)
      setIsLimitationOpen(false)
      setIsForecastOpen(false)
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
          <Link to='./modify'><FaPencil />&nbsp;&nbsp;<span>Modify E700</span></Link>
          <Link to='../ViewLeadingParticulars'><FaChartBar />&nbsp;&nbsp;<span>Leading Particulars</span></Link>

          <div className="dropdown-section">
              <button name="ldhc"  onClick={handleState} className="dropdown-toggle"><span><FaTools />&nbsp;&nbsp;LDHC</span></button>
              {isLimitationOpen && (
                  <div className="dropdown-menu">
                      <Link to=''><FaAtlas />&nbsp;&nbsp;<span>Limitations</span></Link>
                      <Link to=''><FaAtlas />&nbsp;&nbsp;<span>Deferred Defects</span></Link>
                      <Link to=''><FaAtlas />&nbsp;&nbsp;<span>Husbandry Defects</span></Link>
                      <Link to=''><FaAtlas />&nbsp;&nbsp;<span>Concessions</span></Link>
                  </div>
              )}
          </div>

          <div className="dropdown-section">
              <button name="ldhc1" onClick={handleState2}  className="dropdown-toggle"><span><FaCalculator />&nbsp;&nbsp;Forecast</span></button>
              {isForecastOpen && (
                  <div className="dropdown-menu">
                      <Link to=''><FaCalendar />&nbsp;&nbsp;<span>Hourly</span></Link>
                      <Link to=''><FaCalendar />&nbsp;&nbsp;<span>Calendar</span></Link>
                      <Link to=''><FaCalculator />&nbsp;&nbsp;<span>Out of Phase</span></Link>
                  </div>
              )}
          </div>

          <div className="dropdown-section">
              <button name="ldhc2" onClick={handleState3}  className="dropdown-toggle"><span><FaWeight />&nbsp;&nbsp;Weight & Balance Data</span></button>
              {isWeightBalanceData && (
                  <div className="dropdown-menu">
                      <Link to=''><FaCalendar />&nbsp;&nbsp;<span>Basic Weight and Moments</span></Link>
                      <Link to=''><FaCalculator />&nbsp;&nbsp;<span>Variable / Expendable Load Items</span></Link>
                  </div>
              )}
          </div>

          {/*<Link to='./Sidebar_Components/WeightAndBalanceTab'><FaWeight />&nbsp;&nbsp;<span>Weight & Balance Data</span></Link>*/}
          <Link to='./Sidebar_Components/CompassDataTab'><FaGlobeAsia />&nbsp;&nbsp;<span>Compass Log</span></Link>

      </nav>
    </div>
  );
}

export default Sidebar;