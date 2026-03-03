import { Search, User } from "lucide-react";
import UserTable from "../../components/UsersPage/UserTable/UserTable";
import { useState } from "react";

const Users = () => {
  const [keyword, setKeyword] = useState<string>("");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900  flex items-center">
          <User className="h-6 w-6 mr-2" />
          All Users
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search books..."
            value={keyword}
            onChange={(e) => setKeyword && setKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-slate-100"
          />
        </div>
      </div>
      <UserTable keyword={keyword} />
    </div>
  );
};

export default Users;
