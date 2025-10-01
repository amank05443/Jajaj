import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import { FiWifi, FiBatteryCharging, FiVolume2 } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function topBar() {
  return (
    <div className="h-10 w-full  flex justify-between items-center px-4 text-white text-sm">
      {/* Left side - Apple style menu */}
      <div className="flex gap-4 items-center">
        <Link to="/flying-operations">Flying Operation </Link>
        <Link to="/usLog">Maintenance Log </Link>
        <Link to="/misc-entries">Miscellaneous Entries </Link>
        <Link to="/viewE700">View/ Download E 700 </Link>
      </div>
    </div>
  );
}
