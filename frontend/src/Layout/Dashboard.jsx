/**
 * UPDATED CODE - Aircraft Theme Redesign
 * Changes: Added dark/light mode background support with blue gradient theme
 * Modified: Dashboard container styling and video opacity for better visibility
 */

import React, { useEffect, useRef } from "react";
import DashboardCards from "./DashboardCards";
import "../css/Dashboard.css";
import AircraftHeader from "./AircraftHeader";
import WheelCards from "./WheelCards";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

function Dashboard() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className="dashboard-container bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900
    dark:from-slate-100 dark:via-blue-50 dark:to-slate-100 min-h-screen">
      <div className="dashboard-body relative">
        <video
          /* src="/images/migVideo.mp4" */
          type="video/mp4"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="dashboard-video opacity-20 dark:opacity-10"
          style={{
            borderRadius: "20px",
            filter: "blur(0px)",
            boxShadow: "0 0 20px 10px rgba(0, 0, 0, 0.3)",
            WebkitMaskSize: "100% 100%",
            WebkitMaskImage:
              "linear-gradient(to right,transparent 0%,black 10% 90%,transparent 100% ) ," +
              "linear-gradient(to bottom ,transparent 0%,black 10% 90%,transparent 100% )",
            WebkitMaskComposite: "intersect",
            maskComposite: "intersect",
            WebkitMaskRepeat: "no-repeat",
            width: "100%",
            objectFit: "cover",
            display: "block",
            zIndex: 0,
          }}
        />
        <div className="dashboard-wheelCard">
          <WheelCards radius={180} speed={0.1}
          panes={[
              {title:"Leading Particulars",data:{
                  }},
              {title:"Servicing Details",data:{}},
              {title:"Inspection Details",data:{}},
              {title:"Leading Particulars",data:{}},
              {title:"Servicing Details",data:{}},
              ]}
          />
        </div>
        <main className="dashboard-main">
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <DashboardCards />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
export default Dashboard;
