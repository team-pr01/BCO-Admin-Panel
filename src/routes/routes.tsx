import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Unauthorized from './../pages/Unauthorized/Unauthorized';
import NotFound from "../pages/NotFound/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import Messages from "../pages/Messages/Messages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "dashboard",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    errorElement: <NotFound />,
    children: [
      {
        path: "messages",
        element: <Messages />,
      },
    ],
  },
]);