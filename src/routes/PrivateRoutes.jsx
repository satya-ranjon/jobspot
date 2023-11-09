import { Navigate, useLocation } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import Loader from "../components/common/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuthentication();
  const { pathname } = useLocation();

  if (loading) return <Loader />;

  if (!user?.email) {
    return <Navigate state={pathname} to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
