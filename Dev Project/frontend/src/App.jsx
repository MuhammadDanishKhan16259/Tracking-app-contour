import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import "./App.css";
// import routes from "./routes";
import Home from "./pages/Home/";
import Signin from "./pages/SignIn/";
import Signup from "./pages/SignUp/";
import NotFound from "./pages/NotFound";
// import ProtectedRoutes from "./pages/ProtectedRoutes";
import User from "./pages/User/";
import ActivityForm from "./pages/Activity/";
import UserDashboard from "./pages/UserDashboardV2";
import Logout from "./pages/UserDashboardV2/Logout";
// import UserHistroy from "./pages/UserDashboardV2/History";
export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/activity",
    element: <ActivityForm />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  // {
  //   path: "/UserDashboard",
  //   element: <ProtectedRoutes />,
  //   children: [
  //     {
  //       index: true,
  //       path: "/UserDashboard/dashboard",
  //       element: <UserDashboard />,
  //     },
  //     {
  //       path: "/dashboard/history",
  //       element: <UserHistroy />,
  //     },
  //   ],
  // },

  {
    path: "/user/:userId",
    element: <User />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
