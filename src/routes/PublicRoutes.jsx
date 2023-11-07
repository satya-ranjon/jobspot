import Loader from "../components/common/Loader";
import useAuthentication from "../hooks/useAuthentication";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const { user, loading } = useAuthentication();
  const { state } = useLocation();

  if (loading) return <Loader hight="h-[600px]" />;

  if (user) {
    return <Navigate to={state ? state : "/"} />;
  }
  return children;
};

export default PublicRoutes;
