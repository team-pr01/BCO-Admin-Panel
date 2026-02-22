import { Bell } from "lucide-react";
import { useState } from "react";
import AddPopupForm from "../../components/PopupsPage/AddPopupForm/AddPopupForm";
import {
  useGetAllPopupsQuery,
  useGetSinglePopupQuery,
} from "../../redux/Features/Popup/popupApi";
import PageHeader from "../../components/reusable/PageHeader/PageHeader";
import Loader from "../../components/shared/Loader/Loader";
import type { TPopup } from "../../components/PopupsPage/PopupCard/PopupCard";
import PopupCard from "../../components/PopupsPage/PopupCard/PopupCard";

const Popups = () => {
  const [id, setId] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { data, isLoading } = useGetAllPopupsQuery({});
  const { data: singlePopupData } = useGetSinglePopupQuery(id);
  const [mode, setMode] = useState<"add" | "edit">("add");
  return (
    <div>
      <PageHeader
        title="Popup Notifications"
        buttonText="Add Popup"
        icon={<Bell className="h-4 w-4" />}
        onClick={() => {
          setShowForm(true);
        }}
        isCategoryButtonVisible={false}
      />

      {isLoading ? (
        <Loader size="size-10" />
      ) : data?.data?.length < 1 ? (
        <p className="text-center text-gray-500 dark:text-gray-100">
          No data found
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {data?.data.map((popup: TPopup) => (
            <PopupCard
              key={popup._id}
              popup={popup}
              setShowForm={setShowForm}
              setMode={setMode}
              setId={setId}
            />
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      {showForm && (
        <AddPopupForm
          showForm={showForm}
          setShowForm={setShowForm}
          defaultValues={singlePopupData?.data}
          mode={mode}
        />
      )}
    </div>
  );
};

export default Popups;
