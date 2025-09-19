import { useAuth } from "@/lib/auth/auth-provider";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import paths from "@/config/paths";
import Loader from "@/components/ui/loader/Loader";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate to={paths.login.path} state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
