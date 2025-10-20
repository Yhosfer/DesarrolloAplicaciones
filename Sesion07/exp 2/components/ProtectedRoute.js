import { Navigate, useLocation } from 'react-router-dom';
import { checkAuth } from '../auth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!checkAuth()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
