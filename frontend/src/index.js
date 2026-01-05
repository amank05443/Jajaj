// Purpose: Application entry point with Redux store and authentication setup
// Added: Redux Provider with persist for non-sensitive data
// JWT tokens are stored in httpOnly cookies (handled by browser)

// IMPORTANT: Import axiosSetup first to configure axios defaults before any other imports
import "./Authentication/axiosSetup";

import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./components/reportWebVitals";

// Redux imports
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./Store";
import { setAxiosStore } from "./Authentication/axiosSetup";

import { E700DataProvider } from "./PrepareE700/E700DataContext"; // ✅ Import the new E-700 page
import { ParamsProvider } from "./Utils/CustomHooks/useParams"; //✅useParams context
import { AlertProvider } from "./Utils/Alerts/AlertContext";
import { ConfirmProvider } from "./Utils/Alerts/ConfirmContext";
import { AuthProvider, useAuth } from "./Authentication/AuthContext";
import ThemeProvider from "./Layout/ThemeProvider";

// Set the Redux store reference for axios interceptors
// This allows the interceptor to dispatch logout action on auth failure
setAxiosStore(store);

// Loading component for PersistGate
const PersistLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading...</p>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={<PersistLoading />} persistor={persistor}>
        <AuthProvider>
          <ParamsProvider>
            <E700DataProvider>
              <AlertProvider>
                <ConfirmProvider>
                  <ThemeProvider>
                    <App />
                  </ThemeProvider>
                </ConfirmProvider>
              </AlertProvider>
            </E700DataProvider>
          </ParamsProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
