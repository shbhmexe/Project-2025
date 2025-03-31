import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, redirectTo = '/auth' }) => {
  const { currentUser, loading } = useAuth();

  // While checking auth state, show nothing (or could add a loading spinner here)
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If not authenticated, redirect to the auth page
  if (!currentUser) {
    return <Navigate to={redirectTo} />;
  }

  // If authenticated, render the protected component
  return children;
};

export default ProtectedRoute; 