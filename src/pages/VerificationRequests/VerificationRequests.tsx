/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircle, Eye, Clock, AlertCircle } from "lucide-react";
import {
  useGetAllVerificationRequestsQuery,
  useMarkAsReviewingMutation,
  useMarkAsVerifiedMutation,
} from "../../redux/Features/VerificationRequest/verificationRequestApi";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader/Loader";

const VerificationRequests = () => {
  const { data, isLoading, isFetching, refetch } = useGetAllVerificationRequestsQuery({});
  const [markAsReviewing, {isLoading: isMarkingAsReviewing}] = useMarkAsReviewingMutation();
  const [markAsVerified, {isLoading: isMarkingAsVerified}] = useMarkAsVerifiedMutation();

  const handleMarkAsReviewing = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to mark this verification request as reviewing? This will indicate that you're currently reviewing the documents."
    );
    
    if (confirmed) {
      try {
        await markAsReviewing(id).unwrap();
        toast.success("Request marked as reviewing");
        refetch();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update status");
      }
    }
  };

  const handleMarkAsVerified = async (id: string) => {
  const confirmed = window.confirm(
    "Are you sure you want to mark this request as verified? This action will confirm the user's verification and cannot be undone."
  );
  
  if (confirmed) {
    try {
      await markAsVerified(id).unwrap();
      toast.success("Request verified successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to verify request");
    }
  }
};

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string; icon: any; label: string }> = {
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
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };

  const verificationRequests = data?.data?.verificationRequests || [];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Verification Requests</h2>
        <p className="text-sm text-gray-500 mt-1">Manage user verification requests</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Professional Info
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Skills
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request Status
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
          ) : verificationRequests.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8}>
                  <div className="flex justify-center items-center py-10">
                    <p className="text-gray-500">No verification requests found</p>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="bg-white divide-y divide-gray-200">
              {verificationRequests.map((request: any) => (
                <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                  {/* User Details - Avatar, Name, Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {request.userId?.avatar ? (
                        <img
                          src={request.userId.avatar}
                          alt={request.userId?.name}
                          className="h-10 w-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <span className="text-gray-500 text-sm">
                            {request.userId?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {request.userId?.name || "N/A"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.userId?.email || "No email"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.userId?.designation || "N/A"}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  {/* Contact Info - Phone Number */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {request.userId?.phoneNumber || "N/A"}
                    </div>
                   </td>
                  
                  {/* Professional Info - Website, Designation */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {request.userId?.website && (
                        <div className="text-sm">
                          <a 
                            href={request.userId.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                   </td>
                  
                  {/* Location - Location, City, Country */}
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {request.userId?.location || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {[request.userId?.city, request.userId?.country]
                        .filter(Boolean)
                        .join(", ") || "No location info"}
                    </div>
                   </td>
                  
                  {/* Skills */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {request.userId?.skills && Array.isArray(request.userId.skills) ? (
                        request.userId.skills.slice(0, 3).map((skill: string, index: number) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No skills listed</span>
                      )}
                      {request.userId?.skills && request.userId.skills.length > 3 && (
                        <span className="text-xs text-gray-500">
                          +{request.userId.skills.length - 3} more
                        </span>
                      )}
                    </div>
                   </td>
                  
                  {/* Request Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(request.status)}
                   </td>
                
                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {request.status !== "reviewing" && request.status !== "verified" && (
                        <button
                          onClick={() => handleMarkAsReviewing(request._id)}
                          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 transition-colors"
                        >
                          <Eye className="w-3 h-3 mr-1" />
                          {
                            isMarkingAsReviewing ? "Updating..." : "Mark as Reviewing"
                          }
                        </button>
                      )}
                      
                      {request.status === "reviewing" && (
                        <button
                          onClick={() => {
                            handleMarkAsVerified(request._id);
                          }}
                          className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-xs font-medium rounded-md hover:bg-green-700 transition-colors"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {isMarkingAsVerified ? "Updating..." : "Mark as Verified"}
                        </button>
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

export default VerificationRequests;