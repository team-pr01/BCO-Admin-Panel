/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Edit2, Trash2 } from "lucide-react";
import { useDeleteReelMutation } from "../../../redux/Features/Reels/reelsApi";
import toast from "react-hot-toast";
import { getEmbedUrl } from "../../../utils/getEmbedUrl";

const ReelCard = ({
  reel,
  setShowForm,
  setMode,
  setReelId,
}: {
  reel: any;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  setMode?: React.Dispatch<React.SetStateAction<"add" | "edit">>;
  setReelId: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [deleteReel] = useDeleteReelMutation();

  const handleDeleteReel = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    toast.promise(deleteReel(id).unwrap(), {
      loading: "Deleting reel...",
      success: "Reel deleted successfully!",
      error: "Failed to delete reel.",
    });
  };

  const embedUrl = reel?.videoUrl ? getEmbedUrl(reel.videoUrl) : null;
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="aspect-video">
        <iframe
          src={embedUrl as string}
          className="w-full h-full"
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 ">
              {reel?.title}
            </h3>
            <div className="flex items-center gap-5">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-2">
                {reel?.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-200 text-blue-800 mt-2">
                {reel?.videoSource}
              </span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setReelId && setReelId(reel?._id);
                setMode && setMode("edit");
                setShowForm(true);
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => handleDeleteReel(reel?._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm text-gray-600 ">
          {reel?.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {reel?.tags.map((tag: string, index: number) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 "
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-gray-500 ">
          Added{" "}
          {reel?.createdAt
            ? new Date(reel.createdAt).toLocaleDateString()
            : "Unknown"}
        </div>
      </div>
    </div>
  );
};

export default ReelCard;
