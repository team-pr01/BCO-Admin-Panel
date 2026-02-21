import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import Unauthorized from "./../pages/Unauthorized/Unauthorized";
import NotFound from "../pages/NotFound/NotFound";
import { ProtectedRoute } from "./ProtectedRoute";
import Layout from "../layouts/Layout";
import Messages from "../pages/Messages/Messages";
import Books from "../pages/Books/Books";
import News from "../pages/News/News";
import Reels from "../pages/Reels/Reels";
import BusinessList from "../pages/BusinessList/BusinessList";

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
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "messages",
        element: <Messages />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "news",
        element: <News />,
      },
      {
        path: "reels",
        element: <Reels />,
      },
      {
        path: "business-list",
        element: <BusinessList />,
      },
    ],
  },
]);
