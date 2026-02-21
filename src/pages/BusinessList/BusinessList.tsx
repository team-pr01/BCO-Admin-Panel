import { useState } from "react";
import { useGetAllBusinessListQuery } from "../../redux/Features/BusinessList/businessListApi";
import Loader from "../../components/shared/Loader/Loader";
import BusinessLisCard from "../../components/BusinessListPage/BusinessLisCard/BusinessLisCard";
import AddBusinessListForm from "../../components/BusinessListPage/AddBusinessListForm/AddBusinessListForm";

export type TTemple = {
  _id: string;
  name: string;
  mainDeity: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  establishedYear: number;
  visitingHours: string;
  contactInfo: {
    phone: string;
    email: string;
    website?: string;
  };
  imageUrl: string;
  videoUrl?: string;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
};
const BusinessList = () => {
  const [activeTab, setActiveTab] = useState("list");
  const { data, isLoading } = useGetAllBusinessListQuery({});

  const tabButtons = [
    { key: "list", label: "Business List" },
    { key: "add", label: "Add New Business", resetSelection: true },
  ];

  return (
    <div>
      <div className="flex space-x-4 mb-6">
        {tabButtons.map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
            }}
            className={`px-4 py-2 rounded-lg ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "list" &&
        (isLoading ? (
          <Loader size="size-10" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((business: TTemple) => (
              <BusinessLisCard
                key={business?._id}
                business={business}
                setActiveTab={setActiveTab}
              />
            ))}
          </div>
        ))}

      {activeTab === "add" && <AddBusinessListForm />}
    </div>
  );
};

export default BusinessList;
