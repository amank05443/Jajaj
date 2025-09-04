import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useParams } from "../Utils/CustomHooks/useParams";

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const { params } = useParams();

  return !isAuthenticated ? (
    children
  ) : params.aircraft_master_id ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/e700" replace />
  );
}

export function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
