import React, { useState, useEffect, createContext, useContext } from "react";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";

const ThemeContext = createContext();

export function useThemeMode() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setMode(savedTheme);
    updateThemeClasses(savedTheme);
  }, []);

  const updateThemeClasses = (theme) => {
    // Toggle dark class
    document.documentElement.classList.toggle("dark", theme === "dark");
    // Set data-theme attribute for CSS selectors
    document.documentElement.setAttribute("data-theme", theme);
  };

  const muiTheme = createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#1f2937",
        secondary: mode === "dark" ? "#94a3b8" : "#6b7280",
      },
    },
  });

  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    updateThemeClasses(newMode);
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
