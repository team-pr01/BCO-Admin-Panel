/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CheckCircle,
  Eye,
  Clock,
  AlertCircle,
  Building,
  Calendar,
  User,
  Mail,
  Phone,
} from "lucide-react";
import {
  useChangeStatusMutation,
  useGetAllBusinessVerificationRequestsQuery,
} from "../../redux/Features/BusinessVerificationRequest/businessVerificationRequestApi";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader/Loader";

const BusinessVerificationRequests = () => {
  const { data, isLoading, isFetching, refetch } =
    useGetAllBusinessVerificationRequestsQuery({});
  const [changeStatus, { isLoading: isUpdating }] = useChangeStatusMutation();

  const handleMarkAsReviewing = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this verification request as reviewing? This will indicate that you're currently reviewing the documents.",
    );

    if (confirmed) {
      try {
        await changeStatus({ id, status: "reviewing" }).unwrap();
        toast.success("Request marked as reviewing");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update status");
      }
    }
  };

  const handleMarkAsVerified = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this request as verified? This action will confirm the business verification and cannot be undone.",
    );

    if (confirmed) {
      try {
        await changeStatus({ id, status: "verified" }).unwrap();
        toast.success("Business verified successfully!");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to verify business");
      }
    }
  };

  const handleMarkAsRejected = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to reject this verification request? You can add a reason in the next step.",
    );

    if (confirmed) {
      try {
        await changeStatus({ id, status: "rejected"}).unwrap();
        toast.success("Request rejected successfully");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to reject request");
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { color: string; icon: any; label: string }
    > = {
      pending: {
        color: "bg-yellow-100 text-yellow-800",
        icon: <Clock className="w-3 h-3 mr-1" />,
        label: "Pending",
      },
      reviewing: {
        color: "bg-blue-100 text-blue-800",
        icon: <Eye className="w-3 h-3 mr-1" />,
        label: "Reviewing",
      },
      verified: {
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3 mr-1" />,
        label: "Verified",
      },
      rejected: {
        color: "bg-red-100 text-red-800",
        icon: <AlertCircle className="w-3 h-3 mr-1" />,
        label: "Rejected",
      },
    };

    const config = statusConfig[status?.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.icon}
        {config.label}
      </span>
    );
  };

  const businessVerificationRequests = data?.data?.verificationRequests || [];
  console.log(businessVerificationRequests);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Business Verification Requests
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage business verification requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Owner Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamps
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          {isLoading || isFetching ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center py-10">
                    <Loader size="size-10" />
                  </div>
                </td>
              </tr>
            </tbody>
          ) : businessVerificationRequests.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center py-10">
                    <p className="text-gray-500">
                      No business verification requests found
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {businessVerificationRequests.map((request: any) => (
                <tr
                  key={request._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Business Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-start">
                      <Building className="w-5 h-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.businessId?.businessName || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          ID: {request.businessId?._id || "N/A"}
                        </div>
                        {request.businessId?.businessType && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800 mt-1">
                            {request.businessId.businessType}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Owner Details */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {request.userId?.avatar ? (
                        <img
                          src={request.userId.avatar}
                          alt={request.userId?.name}
                          className="h-8 w-8 rounded-full object-cover mr-2"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.userId?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.userId?.designation || "Business Owner"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {request.userId?.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">
                            {request.userId.email}
                          </span>
                        </div>
                      )}
                      {request.userId?.phoneNumber && (
                        <div className="flex items-center text-sm">
                          <Phone className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-600">
                            {request.userId.phoneNumber}
                          </span>
                        </div>
                      )}
                      {request.businessId?.email && (
                        <div className="flex items-center text-sm">
                          <Mail className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-gray-500 text-xs">
                            {request.businessId.email}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Request Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                    {request.notes && request.status === "rejected" && (
                      <div className="text-xs text-red-600 mt-1 max-w-[150px]">
                        Reason: {request.notes}
                      </div>
                    )}
                  </td>

                  {/* Timestamps */}
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>
                          Submitted:{" "}
                          {new Date(request.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {request.completedAt && (
                        <div className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                          <span>
                            Completed:{" "}
                            {new Date(request.completedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex flex-col space-y-2">
                      {request.status === "pending" && (
                        <button
                          onClick={() => handleMarkAsReviewing(request._id)}
                          disabled={isUpdating}
                          className="inline-flex items-center justify-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {isUpdating ? "Updating..." : "Mark as Reviewing"}
                        </button>
                      )}

                      {request.status === "reviewing" && (
                        <>
                          <button
                            onClick={() => handleMarkAsVerified(request._id)}
                            disabled={isUpdating}
                            className="inline-flex items-center justify-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors disabled:opacity-50"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {isUpdating ? "Updating..." : "Approve & Verify"}
                          </button>
                          <button
                            onClick={() => handleMarkAsRejected(request._id)}
                            disabled={isUpdating}
                            className="inline-flex items-center justify-center px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                          >
                            <AlertCircle className="w-3 h-3 mr-1" />
                            Reject
                          </button>
                        </>
                      )}

                      {request.status === "verified" && (
                        <span className="text-xs text-green-600 font-medium">
                          ✓ Verified
                        </span>
                      )}

                      {request.status === "rejected" && (
                        <span className="text-xs text-red-600 font-medium">
                          ✗ Rejected
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default BusinessVerificationRequests;
