/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../../redux/Features/Auth/authApi";
import { v4 as uuidv4 } from "uuid";
import { useSendNotificationMutation } from "../../../redux/Features/Notification/notificationApi";
import TextInput from "../../../components/reusable/TextInput/TextInput";
import Textarea from "../../../components/reusable/TextArea/TextArea";
import SelectDropdown from "../../../components/reusable/SelectDropdown/SelectDropdown";
import Loader from "../../../components/shared/Loader/Loader";

type TFormValues = {
  notificationId: string;
  title: string;
  message: string;
};

type TSendNotificationFormProps = {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const SendNotificationForm: React.FC<TSendNotificationFormProps> = ({
  showForm,
  setShowForm,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormValues>();

  const [sendNotification, { isLoading }] = useSendNotificationMutation();

  const {
    data: allUsers,
    isLoading: isUserLoading,
    isFetching,
  } = useGetAllUsersQuery({});

  console.log(allUsers);

  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

const filteredUsers = selectedCountry
  ? allUsers?.data?.filter((user: any) => {
      // Filter by country first
      if (user?.country !== selectedCountry) return false;

      // Filter by district only if selected
      if (selectedDistrict && user?.city !== selectedDistrict) return false;

      return true;
    })
  : [];


  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const isAllSelected = selectedUserIds?.length === filteredUsers?.length;

  // const bangladeshDistricts = [
  //   "Bagerhat",
  //   "Bandarban",
  //   "Barguna",
  //   "Barishal",
  //   "Bhola",
  //   "Bogra",
  //   "Brahmanbaria",
  //   "Chandpur",
  //   "Chapai Nawabganj",
  //   "Chattogram",
  //   "Chuadanga",
  //   "Cox's Bazar",
  //   "Cumilla",
  //   "Dhaka",
  //   "Dinajpur",
  //   "Faridpur",
  //   "Feni",
  //   "Gaibandha",
  //   "Gazipur",
  //   "Gopalganj",
  //   "Habiganj",
  //   "Jamalpur",
  //   "Jashore",
  //   "Jhalokati",
  //   "Jhenaidah",
  //   "Joypurhat",
  //   "Khagrachari",
  //   "Khulna",
  //   "Kishoreganj",
  //   "Kurigram",
  //   "Kushtia",
  //   "Lakshmipur",
  //   "Lalmonirhat",
  //   "Madaripur",
  //   "Magura",
  //   "Manikganj",
  //   "Meherpur",
  //   "Moulvibazar",
  //   "Munshiganj",
  //   "Mymensingh",
  //   "Naogaon",
  //   "Narail",
  //   "Narayanganj",
  //   "Narsingdi",
  //   "Natore",
  //   "Netrokona",
  //   "Nilphamari",
  //   "Noakhali",
  //   "Pabna",
  //   "Panchagarh",
  //   "Patuakhali",
  //   "Pirojpur",
  //   "Rajbari",
  //   "Rajshahi",
  //   "Rangamati",
  //   "Rangpur",
  //   "Satkhira",
  //   "Shariatpur",
  //   "Sherpur",
  //   "Sirajganj",
  //   "Sunamganj",
  //   "Sylhet",
  //   "Tangail",
  //   "Thakurgaon",
  // ];

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCountry(value);
    setSelectedDistrict("");
  };

  // const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = e.target.value;
  //   setSelectedDistrict(value);
  // };

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUserIds([]);
    } else {
      const allIds = filteredUsers?.map((user: any) => user._id) || [];
      setSelectedUserIds(allIds);
    }
  };

  const toggleSelectUser = (id: string) => {
    if (selectedUserIds.includes(id)) {
      setSelectedUserIds((prev) => prev.filter((_id) => _id !== id));
    } else {
      setSelectedUserIds((prev) => [...prev, id]);
    }
  };

  const handleSendNotification = async (data: TFormValues) => {
    if (selectedUserIds?.length === 0) {
      toast.error("Please select at least one targeted audience");
      return;
    }

    try {
      const payload = {
        ...data,
        userIds: selectedUserIds,
        requestId: uuidv4()
      };
      const response = await sendNotification(payload).unwrap();
      if (response?.success) {
        toast.success(response?.message || "Notification sent successfully");
        setShowForm(false);
      }
    } catch (error) {
      const errMsg =
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        typeof (error as any).data?.message === "string"
          ? (error as any).data.message
          : "Something went wrong";
      toast.error(errMsg);
    }
  };

  return (
    showForm && (
      <div className="fixed inset-0 bg-gray-800/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <form
            onSubmit={handleSubmit(handleSendNotification)}
            className="p-6 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                Send Notification
              </h3>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-4">
              <TextInput
                label="Title"
                placeholder="Enter Title"
                {...register("title", {
                  required: "Title is required",
                })}
                error={errors.title}
              />

              <Textarea
                label="Message"
                placeholder="Write Message here..."
                rows={6}
                error={errors.message}
                {...register("message", {
                  required: "Message is required",
                })}
              />

              <SelectDropdown
                label="Targeted Country"
                value={selectedCountry}
                onChange={handleCountryChange}
                options={["Bangladesh"]}
              />

              {/* <SelectDropdown
                label="Targeted District"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                options={
                  selectedCountry === "Bangladesh" ? bangladeshDistricts : []
                }
                isDisabled={!selectedCountry}
                isRequired={false}
              /> */}

              <div>
                <p className="font-medium text-gray-700 mb-2">
                  Targeted Audience <span className="text-red-600"> *</span>
                </p>

                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={toggleSelectAll}
                          />
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          User ID
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Location
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Phone Number
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {isUserLoading || isFetching ? (
                        <tr>
                          <td colSpan={5} className="py-6 text-center">
                            <Loader size="size-10" />
                          </td>
                        </tr>
                      ) : filteredUsers?.length === 0 ? (
                        <tr>
                          <td
                            colSpan={5}
                            className="py-6 text-center text-gray-500"
                          >
                            No user found
                          </td>
                        </tr>
                      ) : (
                        filteredUsers?.map((user: any) => (
                          <tr
                            key={user._id}
                            className="border-b border-gray-300"
                          >
                            <td className="px-4 py-2">
                              <input
                                type="checkbox"
                                checked={selectedUserIds.includes(user._id)}
                                onChange={() => toggleSelectUser(user._id)}
                              />
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {user._id}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {user.name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {user.district || "N/A"}, {user.country || "N/A"}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-800">
                              {user.phone || "N/A"}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? <Loader size="size-4" /> : "Send Notification"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default SendNotificationForm;
