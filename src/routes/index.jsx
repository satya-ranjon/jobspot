import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import NotFound from "../pages/notfound";
import { createBrowserRouter } from "react-router-dom";
import Registration from "../pages/registration/Registration";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import AllJobs from "../pages/jobs/AllJobs";
import MyJobs from "../pages/jobs/MyJobs";
import CreateJob from "../pages/jobs/CreateJob";
import JobDetails from "../pages/jobs/JobDetails";
import Blog from "../pages/blog/Blog";
import AppliedJobs from "../pages/jobs/AppliedJobs";
import UpdateJob from "../pages/jobs/UpdateJob";

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
        element: (
          <PrivateRoutes>
            <AppliedJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <PrivateRoutes>
            <MyJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: "/create-job",
        element: (
          <PrivateRoutes>
            <CreateJob />
          </PrivateRoutes>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoutes>
            <JobDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: "/update-job/:id",
        element: (
          <PrivateRoutes>
            <UpdateJob />
          </PrivateRoutes>
        ),
      },
      {
        path: "/blog/:id",
        element: <Blog />,
      },
    ],
  },
]);

export default router;
