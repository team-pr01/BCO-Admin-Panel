import { useParams } from "react-router-dom";
import { useGetSingleUserByIdQuery } from "../../redux/Features/Auth/authApi";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Briefcase, 
  Users, 
  Award,
  CheckCircle,
  XCircle,
  Code,
  BookOpen,
} from "lucide-react";

const UserDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetSingleUserByIdQuery(id);
  const user = data?.data || {};

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600">Failed to load user details</p>
        </div>
      </div>
    );
  }

  if (!user || Object.keys(user).length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto" />
          <p className="mt-4 text-gray-600">User not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Cover Photo Section */}
        <div className="relative">
          <div className="h-48 sm:h-64 rounded-t-2xl overflow-hidden bg-gradient-to-r from-blue-400 to-purple-500">
            {user.coverPhoto ? (
              <img
                src={user.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white text-opacity-50 text-lg">Cover Photo</p>
              </div>
            )}
          </div>
          
          {/* Avatar */}
          <div className="absolute -bottom-12 left-4 sm:left-8">
            <div className="relative">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-3xl sm:text-4xl font-bold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              
              {/* Verification Badge */}
              {user.isVerifiedMember && (
                <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border-2 border-white">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="bg-white rounded-b-2xl shadow-lg px-4 sm:px-8 pb-8 pt-16 sm:pt-20">
          {/* Name and Role */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {user.name}
                </h1>
                {user.designation && (
                  <p className="text-gray-600 mt-1 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {user.designation}
                  </p>
                )}
              </div>
              
              {/* Connection Status (Optional - if you have connection API) */}
              <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-blue-600 font-semibold">
                  {user.connections?.length || 0} Connections
                </span>
              </div>
            </div>
          </div>

          {/* About Section */}
          {user.about && (
            <div className="border-b border-gray-200 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                About
              </h2>
              <p className="text-gray-700 leading-relaxed">{user.about}</p>
            </div>
          )}

          {/* Contact Information */}
          <div className="border-b border-gray-200 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-600" />
              Contact Information
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {user.email && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>
              )}
              
              {user.phoneNumber && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">{user.phoneNumber}</p>
                  </div>
                </div>
              )}
              
              {user.website && (
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <a 
                      href={user.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {user.website}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Location Information */}
          {(user.location || user.city || user.country) && (
            <div className="border-b border-gray-200 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                Location
              </h2>
              
              <div className="space-y-2">
                {user.location && (
                  <p className="text-gray-700">
                    <span className="font-medium">Address:</span> {user.location}
                  </p>
                )}
                {(user.city || user.country) && (
                  <p className="text-gray-700">
                    <span className="font-medium">City/Country:</span>{" "}
                    {[user.city, user.country].filter(Boolean).join(", ")}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Skills Section */}
          {user.skills && user.skills.length > 0 && (
            <div className="border-b border-gray-200 py-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-600" />
                Skills & Expertise
              </h2>
              
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          <div className="py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              Additional Information
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="font-medium text-gray-900">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">Account Status</p>
                <p className={`font-medium ${!user.isSuspended && !user.isDeleted ? 'text-green-600' : 'text-red-600'}`}>
                  {!user.isSuspended && !user.isDeleted ? "Active" : 
                   user.isSuspended ? "Suspended" : "Deleted"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">Verification Status</p>
                <p className={`font-medium ${user.isVerifiedMember ? 'text-green-600' : 'text-yellow-600'}`}>
                  {user.isVerifiedMember ? "Verified Member" : "Not Verified"}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-500">Role</p>
                <p className="font-medium text-gray-900 capitalize">{user.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;