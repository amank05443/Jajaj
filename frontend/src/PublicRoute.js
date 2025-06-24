import {Navigate} from 'react-router-dom';
import {useAuth} from './AuthContext';

const PublicRoute = ({children}) => {
    const {isAuthenticated} = useAuth();
    return isAuthenticated ? <Navigate to="/e700"
    replace /> : children;
};

export default PublicRoute;