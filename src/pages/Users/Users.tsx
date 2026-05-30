import { Bell, Search, User } from "lucide-react";
import UserTable from "../../components/UsersPage/UserTable/UserTable";
import { useState } from "react";
import SendNotificationForm from "./SendNotificationForm/SendNotificationForm";

const Users = () => {
  const [keyword, setKeyword] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900  flex items-center">
          <User className="h-6 w-6 mr-2" />
          All Users
        </h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={keyword}
              onChange={(e) => setKeyword && setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-slate-100"
            />
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Bell className="w-5 h-5 mr-2 text-white" />
            Send Notification
          </button>
        </div>
      </div>
      <UserTable keyword={keyword} />

      {showForm && (
        <SendNotificationForm showForm={showForm} setShowForm={setShowForm} />
      )}
    </div>
  );
};

export default Users;
