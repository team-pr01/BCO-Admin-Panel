/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../redux/Features/Auth/authSlice";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const user = useSelector(useCurrentUser) as any;

  if (user) {
    return <Navigate to="/dashboard/users" replace />;
  }

  return <>{children}</>;
};