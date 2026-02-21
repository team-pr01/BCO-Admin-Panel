/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Phone } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import DeleteConfirmationModal from "../../shared/DeleteConfirmationModal/DeleteConfirmationModal";
import {
  useApproveBusinessMutation,
  useDeleteBusinessMutation,
} from "../../../redux/Features/BusinessList/businessListApi";

type TBusinessCardProps = {
  business: any;
  setActiveTab: (tab: string) => void;
};

const BusinessListCard: React.FC<TBusinessCardProps> = ({
  business,
  setActiveTab,
}) => {
  const [approveBusiness] = useApproveBusinessMutation();
  const [deleteBusiness] = useDeleteBusinessMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = async () => {
    toast.promise(deleteBusiness(business?._id).unwrap(), {
      loading: "Deleting business...",
      success: "Business deleted successfully!",
      error: "Failed to delete business.",
    });
    setShowDeleteModal(false);
  };

  const handleApproveBusiness = async () => {
    toast.promise(
      approveBusiness({
        id: business?._id,
        data: { status: "approved" },
      }).unwrap(),
      {
        loading: "Approving business...",
        success: "Business approved successfully!",
        error: "Failed to approve business.",
      },
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Image */}
        <div className="h-64 overflow-hidden relative">
          <img
            src={business?.imageUrl}
            alt={business?.businessName}
            className="w-full h-full object-cover"
          />

          {/* Status Badge */}
          <div
            className={`capitalize text-xs px-4 py-2 rounded-3xl text-white absolute top-4 right-4 ${
              business?.status === "approved"
                ? "bg-green-500"
                : business?.status === "pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
            }`}
          >
            {business?.status}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
            {business?.businessName}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium">Type:</span> {business?.businessType}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {business?.location}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            {business?.phoneNumber}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
            {business?.description}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveTab("details");
              }}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-sm"
            >
              View Details
            </button>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md text-sm"
            >
              Delete
            </button>

            {business?.status === "pending" && (
              <button
                onClick={handleApproveBusiness}
                className="px-3 py-1 bg-green-100 dark:bg-green-600 text-green-600 dark:text-green-300 rounded-md text-sm"
              >
                Approve
              </button>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default BusinessListCard;
