import React, { Suspense } from "react";
import "./css/App.css";
import "./css/index.css";
import "./Layout/JqWidget"; // ✅ Importing all Jq-Widgets for JQXGrid.
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PublicRoute, PrivateRoute } from "./Authentication/RouteGuards";
import AppLayout from "./Layout/AppLayout";
import { publicRoutes, privateRoutes } from "./Layout/Routes";

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500">Loading...</div>
  </div>
);

export default function App() {
  return (
    <Router>
      <Suspense fallback={LoadingFallback}>
        <Routes>
          {publicRoutes.map(({ path, element }) => (
            <Route
              kay={path}
              path={path}
              element={<PublicRoute>{element}</PublicRoute>}
            />
          ))}
          <Route
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            {privateRoutes.map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
