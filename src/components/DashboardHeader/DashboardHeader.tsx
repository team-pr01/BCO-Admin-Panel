/* eslint-disable @typescript-eslint/no-explicit-any */
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, useCurrentUser } from "../../redux/Features/Auth/authSlice";

export function DashboardHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(useCurrentUser) as any;

  const handleLogout = async () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 font-Inter">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-medium text-neutral-700">
              Welcome back,{" "}
              <span className="font-bold text-blue-600">
                {user?.name}
              </span>
            </h1>
            <div className="text-neutral-700 capitalize bg-green-100/50 w-fit px-3 py-1 rounded-lg text-sm">
              {user?.role}
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <LogOut className="size-5" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
