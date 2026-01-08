/**
 * PREMIUM AIRLINE DASHBOARD CARDS
 * Comprehensive module cards for professional aviation operations
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaPlane,
  FaTools,
  FaClock,
  FaEye,
  FaClipboardList,
  FaBalanceScale,
  FaCompass,
  FaBookOpen,
  FaChartLine,
  FaCog
} from 'react-icons/fa';
import '../css/DashboardCards.css';

const cards = [
  {
    title: 'Flight Operations',
    description: 'Flight scheduling, crew assignments, and operational hours tracking',
    icon: <FaPlane />,
    color: 'aviation-blue',
    link: '/flying-operations',
    badge: 'Active',
  },
  {
    title: 'Maintenance Control',
    description: 'Aircraft maintenance logs, defects tracking, and service records',
    icon: <FaTools />,
    color: 'aviation-red',
    link: '/usLog',
    badge: '3 Pending',
  },
  {
    title: 'Technical Records',
    description: 'Leading particulars, aircraft configuration, and documentation',
    icon: <FaClipboardList />,
    color: 'aviation-green',
    link: '/ViewLeadingParticulars',
    badge: 'Updated',
  },
  {
    title: 'Weight & Balance',
    description: 'Load management, CG calculations, and weight distribution',
    icon: <FaBalanceScale />,
    color: 'aviation-purple',
    link: '/BasicWeightAndMomentsForm',
    badge: 'Current',
  },
  {
    title: 'Compass & Navigation',
    description: 'Compass calibration logs and navigation system records',
    icon: <FaCompass />,
    color: 'aviation-orange',
    link: '/compassLog',
    badge: 'Calibrated',
  },
  {
    title: 'Technical Instructions',
    description: 'Service bulletins, ADs, and technical directive management',
    icon: <FaBookOpen />,
    color: 'aviation-cyan',
    link: '/viewTechnicalInstructions',
    badge: '12 Items',
  },
  {
    title: 'Reports & Forms',
    description: 'E-700 forms, inspection reports, and official documentation',
    icon: <FaEye />,
    color: 'aviation-gold',
    link: '/WeasyPrint',
    badge: 'Generate',
  },
  {
    title: 'Fleet Analytics',
    description: 'Performance metrics, utilization reports, and trend analysis',
    icon: <FaChartLine />,
    color: 'aviation-teal',
    link: '/testQualsForm',
    badge: 'Live Data',
  },
];

function DashboardCards() {
  return (
    <div className="premium-card-grid">
      {cards.map((card, index) => (
        <Link
          to={card.link}
          className={`premium-card ${card.color}`}
          key={card.title}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="card-badge">{card.badge}</div>
          <div className="card-icon-wrapper">
            <div className="card-icon">{card.icon}</div>
          </div>
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
          <div className="card-footer">
            <span className="access-text">Access Module</span>
            <span className="arrow">→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DashboardCards;