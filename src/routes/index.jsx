import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound";
import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/registration/Registration";
import PublicRoutes from "./PublicRoutes";
import AllJobs from "../pages/jobs/AllJobs";
import AppliedJobs from "../pages/AppliedJobs/AppliedJobs";
import MyJobs from "../pages/my-jobs/MyJobs";
import CreateJob from "../pages/jobs/CreateJob";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppWrapper />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/registration",
        element: (
          <PublicRoutes>
            <Registration />
          </PublicRoutes>
        ),
      },
      {
        path: "/all-jobs",
        element: <AllJobs />,
      },
      {
        path: "/applied-jobs",
        element: <AppliedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/create-job",
        element: <CreateJob />,
      },
    ],
  },
]);

export default router;
