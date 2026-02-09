/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle } from "lucide-react";
import Loader from "../../components/shared/Loader/Loader";
import MessageCard from "../../components/EmergencyPage/MessageCard/MessageCard";
import { useGetAllMessagesQuery } from "../../redux/Features/Messages/messageApi";

const Messages = () => {
  const { data, isLoading, isFetching } = useGetAllMessagesQuery({});

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
        <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
        Contact Messages
      </h2>

      {/* Messages Cards */}
      <div className="flex flex-col gap-4">
        {isLoading || isFetching ? (
          <Loader size="size-10" />
        ) : (
          [...(data?.data || [])]
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .map((post: any) => <MessageCard key={post?._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Messages;
