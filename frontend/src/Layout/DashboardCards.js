import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlane, FaTools, FaClock, FaChartBar, FaCompare, FaEye } from 'react-icons/fa';
import '../css/DashboardCards.css';

const cards = [
  {
    title: 'Flying Operation',
    description: 'Flight assignments, hours, and crew data',
    icon: <FaPlane />,
    color: 'green',
    link: '/flying-operations',
  },
  {
    title: 'Maintenance Log',
    description: 'Track maintenance issues and defects',
    icon: <FaTools />,
    color: 'red',
    link: '/usLog',
  },
  {
    title: 'Miscellaneous Entries',
    description: 'Software info, clocks, special logs',
    icon: <FaClock />,
    color: 'purple',
    link: '/clearUsLog',
  },
//  {
//    title: 'View/Download E700',
//    description: 'Form 701, Form 703, Form 703 A',
//    icon: <FaEye />,
//    color: 'orange',
//    link: '/viewE700',
//  },

   {
    title: 'View/Download E700',
    description: 'Form 701, Form 703, Form 703 A',
    icon: <FaEye />,
    color: 'orange',
    link: '/weasyPrint',
  },

];

function DashboardCards() {
  return (
    <div className="card-grid">
      {cards.map(card => (
        <Link to={card.link} className={`card ${card.color}`} key={card.title}>
          <div className="card-icon">{card.icon}</div>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </Link>
      ))}
    </div>
  );
}

export default DashboardCards;