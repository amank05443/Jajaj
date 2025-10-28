import React, { useState, useEffect,createContext,useContext} from "react";
import { ThemeProvider as MUIThemeProvider,createTheme} from "@mui/material/styles";

const ThemeContext = createContext();

export function useThemeMode(){
    return useContext(ThemeContext);
    }

export default function ThemeProvider({children}){
    const [mode,setMode]=useState("light");

//      useEffect(() => {
//           const saved= localStorage.getItem("theme")||"light";
//           setMode(saved);
//           document.documentElement.classList.toggle("dark",saved==="dark");
//   }, []);
//
//    useEffect(() => {
//        document.documentElement.classList.toggle("dark",mode==="dark");
//          localStorage.setItem("theme",mode);
//   }, [mode]);

useEffect(() => {
          const savedTheme= localStorage.getItem("theme")||"light";
          setMode(savedTheme);
          document.documentElement.classList.toggle("dark",savedTheme==="dark");
  }, []);

  const muiTheme = createTheme({
      palette:{
          mode,
          background:{
              default:mode==="dark" ? "#0f172a" : "#f8afc",
               paper:mode==="dark" ? "#1e293b" : "#ffffff",
              },
          text:{
              primary: mode === "dark" ?  "#000000" :"#000000",
              },
              },
          });
//       const toggleTheme=()=>setMode(mode === "light" ? "dark" : "light");
     const toggleTheme = ()=>{
      const newMode = mode ==="light" ? "dark" :"light";
      setMode(newMode);
      localStorage.setItem("theme",newMode);
      document.documentElement.classList.toggle("dark",newMode ==="dark");};

      return(
          <ThemeContext.Provider value={{ mode,toggleTheme }}>
              <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>
              </ThemeContext.Provider>
          );


    }