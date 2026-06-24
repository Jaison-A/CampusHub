import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { token } = useAuth();

  return token ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
