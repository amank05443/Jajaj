import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { useParams as useParamsHook } from "../Utils/CustomHooks/useParams";

function InlineLoader() {
    return (
        <div >
            <div style = {{textAlign:"center"}}>
                <div />
                <div style={{fontSize:146,color:"#222"}}>Loading.</div>

                    <style>{`
                    @keyframes spin{
                        0% {transform:rotate(0deg);}
                        100% {transform:rotate(360deg);}
                        }
                    `}</style>
                </div>
        </div>

        );
    }

export function PublicRoute({ children }) {
  const { isAuthenticated,authChecked } = useAuth();
  const { params, loading: paramsLoading } = useParamsHook();

    if(!authChecked){
        return<InlineLoader />
        }

    if(!isAuthenticated) {
        return children;
        }

    if(paramsLoading) {
        return <InlineLoader />
        }

    if (params?.aircraft_master_id) {
        return  <Navigate to="/dashboard" replace />
 }
    return <Navigate to="/e700" replace />

        }

export function PrivateRoute({ children }) {
  const { isAuthenticated,authChecked } = useAuth();
  const location = useLocation();

 if(!authChecked){
     return <InlineLoader/>
     }
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
