/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LayoutDashboard,
  Users,
  Bell,
  Sun,
  Moon,
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

interface SidebarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Sidebar({ isDarkMode, toggleDarkMode }: SidebarProps) {
  const location = useLocation();
  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
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
    <div className="h-screen w-67.5 sticky top-0 left-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2">
        <img src={logo} alt="" className="w-20" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white capitalize">
          {user?.role} Dashboard
        </h1>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto bg-white dark:bg-gray-800">
        <div className="space-y-2">
          {sidebarLinks?.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.path === location.pathname
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button
            onClick={toggleDarkMode}
            className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
