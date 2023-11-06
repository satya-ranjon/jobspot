import AppWrapper from "../layout/AppWrapper";
import Home from "../pages/home/Home";
import NotFound from "../pages/notfound";
import { createBrowserRouter } from "react-router-dom";

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
    ],
  },
]);

export default router;
