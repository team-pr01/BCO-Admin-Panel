{
  /* eslint-disable @typescript-eslint/no-explicit-any */
}
import { MapPin, Phone, Mail, Edit, Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import DeleteConfirmationModal from "../../shared/DeleteConfirmationModal/DeleteConfirmationModal";
import {
  useApproveBusinessMutation,
  useDeleteBusinessMutation,
} from "../../../redux/Features/BusinessList/businessListApi";
import { Link } from "react-router-dom";

type TBusinessCardProps = {
  business: any;
};

const BusinessListCard: React.FC<TBusinessCardProps> = ({ business }) => {
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

  const handleEditBusiness = () => {
    // Navigate to edit page or open edit modal
    console.log("Edit business:", business?._id);
  };

  const getInitials = (name: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
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
        <div className="p-4 space-y-3">
          {/* Business Name */}
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            {business?.businessName}
          </h3>

          {/* Business Details Grid */}
          <div className="grid grid-cols-2 gap-2">
            <p className="text-sm text-gray-500">
              <span className="font-medium">Type:</span>{" "}
              {business?.businessType}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Stage:</span>{" "}
              {business?.businessStage}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Valuation:</span>{" "}
              {business?.currency}{" "}
              {Number(business?.askingValuation).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Funding:</span> {business?.currency}{" "}
              {Number(business?.requiredFunding).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Investor %:</span>{" "}
              {business?.investorPercentage}%
            </p>
            <p className="text-sm text-gray-500">
              <span className="font-medium">Pitch Deck:</span>{" "}
              {business?.pitchDeckType}
            </p>
          </div>

          {/* Location & Phone */}
          <div className="space-y-1">
            <p className="text-sm text-gray-500 flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-400" />
              {business?.location}
            </p>
            <p className="text-sm text-gray-500 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              {business?.phoneNumber}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {business?.description}
          </p>

          {/* Divider */}
          <hr className="border-gray-200" />

          {/* Owner Details */}
          {business?.createdBy && (
            <div className="flex items-center gap-3">
              {business?.createdBy?.avatar ? (
                <img
                  src={business?.createdBy?.avatar}
                  alt={business?.createdBy?.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary-10/10 flex items-center justify-center border-2 border-gray-200">
                  <span className="text-sm font-semibold text-primary-10">
                    {getInitials(business?.createdBy?.name)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-gray-900">
                    {business?.createdBy?.name || "Unknown"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {business?.createdBy?.email || "No email"}
                  </p>
                  {business?.createdBy?.phoneNumber && (
                    <>
                      <span className="text-gray-300">|</span>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {business?.createdBy?.phoneNumber}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to={`/dashboard/business-list/edit/${business?._id}`}
              onClick={handleEditBusiness}
              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm flex items-center gap-1 hover:bg-blue-100 transition-colors"
            >
              <Edit className="h-3.5 w-3.5" />
              Edit
            </Link>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md text-sm flex items-center gap-1 hover:bg-red-100 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>

            {business?.status === "pending" && (
              <button
                onClick={handleApproveBusiness}
                className="px-3 py-1.5 bg-green-50 text-green-600 rounded-md text-sm flex items-center gap-1 hover:bg-green-100 transition-colors"
              >
                <CheckCircle className="h-3.5 w-3.5" />
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
