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
import ConsultancyService from "../pages/ConsultancyService/ConsultancyService";
import Consultations from "../pages/Consultations/Consultations";
import Shop from "../pages/Shop/Shop";
import ContentManagement from "../pages/ContentManagement/ContentManagement";
import Users from "../pages/Users/Users";
import { PublicRoute } from "./PublicRoute";
import Popups from "../pages/Popups/Popups";
import VerificationRequests from "../pages/VerificationRequests/VerificationRequests";
import UserDetails from "../pages/Users/UserDetails";
import BusinessVerificationRequests from "../pages/BusinessVerificationRequests/BusinessVerificationRequests";
import EditBusinessList from "../pages/BusinessList/EditBusinessList/EditBusinessList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
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
        path: "verification-requests",
        element: <VerificationRequests />,
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
      {
        path: "business-list/edit/:id",
        element: <EditBusinessList />,
      },
      {
        path: "business-verification-requests",
        element: <BusinessVerificationRequests />,
      },
      {
        path: "consultancy-service",
        element: <ConsultancyService />,
      },
      {
        path: "consultation",
        element: <Consultations />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "content",
        element: <ContentManagement />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "user/:id",
        element: <UserDetails />,
      },
      {
        path: "popups",
        element: <Popups />,
      },
    ],
  },
]);
