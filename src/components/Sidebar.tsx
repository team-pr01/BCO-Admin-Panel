/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Users,
  BookOpen,
  Headphones,
  FileText,
  Building,
  Newspaper,
  AlertTriangle,
  Film,
  ShoppingBag,
  UserCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useCurrentUser } from "../redux/Features/Auth/authSlice";
import logo from "../assets/logo.png";

export function Sidebar() {
  const location = useLocation();
  const sidebarLinks = [
    // { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Users, label: "Users", path: "/dashboard/users" },
    { icon: AlertTriangle, label: "Messages", path: "/dashboard/messages" },
    {
      icon: BookOpen,
      label: "Books",
      path: "/dashboard/books",
    },
    { icon: Film, label: "Reels", path: "/dashboard/reels" },
    { icon: Building, label: "Business List", path: "/dashboard/business-list" },
    { icon: Newspaper, label: "News", path: "/dashboard/news" },
    { icon: FileText, label: "Content Management", path: "/dashboard/content" },
    {
      icon: Headphones,
      label: "Consultancy Service",
      path: "/dashboard/consultancy-service",
    },
    {
      icon: UserCheck,
      label: "Consultations",
      path: "/dashboard/consultation",
    },
    {
      icon: ShoppingBag,
      label: "Shop",
      path: "/dashboard/shop",
    },
  ];

  const user = useSelector(useCurrentUser) as any;

  return (
    <div className="h-screen w-67.5 sticky top-0 left-0 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-4 py-6 border-b border-gray-200 flex flex-col items-center gap-2">
        <img src={logo} alt="" className="w-20" />
        <h1 className="text-xl font-bold text-gray-800  capitalize">
          {user?.role} Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-white">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.path === location.pathname
                  ? "bg-blue-50 /20 text-blue-600"
                  : "text-gray-700  hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
