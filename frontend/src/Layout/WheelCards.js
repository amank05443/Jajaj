import React, { useEffect, useRef } from "react";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";
import "../css/WheelCards.css";

const WheelCards = ({ panes = [], radius = 350, speed = 0.2 }) => {
  const sphereRef = useRef(null);
  const angleStep = panes.length ? 360 / panes.length : 0;

  useEffect(() => {
    let angle = 0;
    let frameId;

    const rotate = () => {
      angle += speed;
      if (sphereRef.current) {
        sphereRef.current.style.transform = `rotateY(${angle}deg)`;
      }

      frameId = requestAnimationFrame(rotate);
    };
    rotate();
    return () => cancelAnimationFrame(frameId);
  }, [speed]);
  return (
    <div className="scene">
      <div className="sphere" ref={sphereRef}>
        {panes.map((pane, i) => {
          const rotation = i * angleStep;
          return (
            <div
              key={i}
              className="card-wrapper"
              style={{
                transform: `rotateY(${rotation}deg) translateZ(${radius}px)`,
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <Paper elevation={6} className="glass-pane">
                  {pane.title && (
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {pane.title}
                    </h3>
                  )}
                  {pane.data ? (
                    Object.entries(pane.data).map(([key, value]) => (
                      <p key={key} className="text-sm text-gray-200 mb-1">
                        <span className="font-medium capitalize">{key}:</span>{" "}
                        {String(value ?? "NA")}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-400">No Data</p>
                  )}
                </Paper>
                <div className="shadow" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WheelCards;
