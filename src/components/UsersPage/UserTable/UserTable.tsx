/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserByIdQuery,
} from "../../../redux/Features/Auth/authApi";
import toast from "react-hot-toast";
import Loader from "../../shared/Loader/Loader";
import DeleteConfirmationModal from "../../shared/DeleteConfirmationModal/DeleteConfirmationModal";

const UserTable = () => {
  const [id, setId] = useState<string>("");
  const { data, isLoading, isFetching } = useGetAllUsersQuery({});

  const { data: singleUserData, isLoading: isUserDataLoading } =
    useGetSingleUserByIdQuery(id);

  const [showForm, setShowForm] = useState<boolean>(false);

  const [deleteUser] = useDeleteUserMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = async () => {
    toast.promise(deleteUser(id).unwrap(), {
      loading: "Deleting...",
      success: "Deleted successfully!",
      error: "Failed to delete.",
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phone Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Joined
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
             Actions
            </th>
          </tr>
        </thead>
        {isLoading || isFetching ? (
          <tbody>
            <tr>
              <td colSpan={6}>
                <div className="flex justify-center items-center py-10">
                  <Loader size="size-10" />
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="bg-white divide-y divide-gray-200 max-w-[1000px]">
            {data?.data?.map((user: any) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500 capitalize">
                    {user.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {user.email}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">
                    {user.phoneNumber}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.createdAt).toLocaleString()}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setId(user?._id);
                      }}
                      className="text-red-600  hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <UpdateUserModal
        showForm={showForm}
        setShowForm={setShowForm}
        defaultValues={singleUserData?.data}
        isLoading={isUserDataLoading}
      />

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default UserTable;
