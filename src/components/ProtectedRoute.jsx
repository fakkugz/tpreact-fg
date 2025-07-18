import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {

    const { user, isLoggingOut } = useContext(AuthContext);
    
    if (!user && !isLoggingOut) {
        return <Navigate to="/login" />;
    }
    
    return children;
}

export default ProtectedRoute;