import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./components/reportWebVitals";

import { E700DataProvider } from "./PrepareE700/E700DataContext"; // ✅ Import the new E-700 page
import { ParamsProvider } from "./Utils/CustomHooks/useParams"; //✅useParams context
import { AlertProvider } from "./Utils/Alerts/AlertContext";
import { ConfirmProvider } from "./Utils/Alerts/ConfirmContext";
import { AuthProvider, useAuth } from "./Authentication/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <ParamsProvider>
        <E700DataProvider>
          <AlertProvider>
            <ConfirmProvider>
              <App />
            </ConfirmProvider>
          </AlertProvider>
        </E700DataProvider>
      </ParamsProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
