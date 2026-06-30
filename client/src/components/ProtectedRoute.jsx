import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const isAuthenticated = Boolean(token || localStorage.getItem('token'));

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
