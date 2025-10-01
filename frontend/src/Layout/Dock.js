import { motion } from "framer-motion";
import {
  FaGlobe,
  FaFolder,
  FaCog,
  FaStickyNote,
  FaCamera,
} from "react-icons/fa";
export default function Dock() {
  const apps = [
    { icon: <FaGlobe />, name: "Browser" },
    { icon: <FaFolder />, name: "Files" },
    { icon: <FaCog />, name: "Settings" },
    { icon: <FaStickyNote />, name: "Notes" },
    { icon: <FaCamera />, name: "Camera" },
  ];

  return (
    <div className="absolute bottom-4 w-full flex justify-center">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/40 backdrop-blur-lg rounded-2x1 px-4 py-2 flex gap-6 shadow-2x1"
      >
        {apps.map((app, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.3, y: -10 }}
            className="text-3x1 cursor-pointer txt-white hover:text-blue-400 transition"
            title={app.name}
          >
            {app.icon}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
