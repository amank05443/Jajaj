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
    <div className="dashboard-container">
      <div className="dashboard-body">
        <video
          /* src="/images/migVideo.mp4" */
          type="video/mp4"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="dashboard-video"
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
            width: "auto",
            height: "auto",
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
