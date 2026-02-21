/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
  useGetSingleNewsQuery,
} from "../../redux/Features/News/newsApi";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader/Loader";
import NewsCard from "../../components/NewsPage/NewsCard/NewsCard";
import AddNewsForm from "../../components/NewsPage/AddNewsForm/AddNewsForm";
import Categories from "../../components/Categories/Categories";
import PageHeader from "../../components/reusable/PageHeader/PageHeader";
import { Newspaper } from "lucide-react";

const News = () => {
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("");
  const [id, setId] = useState("");
  const [mode, setMode] = useState<"add" | "edit">("add");

  const { data, isLoading, isFetching } = useGetAllNewsQuery({
    keyword: searchQuery,
    category,
  });
  const { data: singleNewsData } = useGetSingleNewsQuery(id);
  const [deleteNews] = useDeleteNewsMutation();

  const handleDeleteNews = async (id: string) => {
    console.log(id);
    if (!window.confirm("Are you sure you want to delete?")) return;

    toast.promise(deleteNews(id).unwrap(), {
      loading: "Deleting news...",
      success: "News deleted successfully!",
      error: "Failed to delete news.",
    });
  };
  return (
    <div>
      <PageHeader
        title="News Articles"
        buttonText="Add Article"
        icon={<Newspaper className="w-6 h-6 mr-2 text-white" />}
        onClick={() => {
          setMode("add");
          setShowForm(true);
        }}
        setShowCategoryForm={setShowCategoryForm}
      />

      <div className="flex flex-col gap-10">
        {isLoading || isFetching ? (
          <Loader size="size-10" />
        ) : data?.data?.length < 1 ? (
          <p className="text-center text-gray-500">
            No data found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.map((article: any) => (
              <NewsCard
                key={article?._id}
                article={article}
                setId={setId}
                setMode={setMode}
                setShowForm={setShowForm}
                handleDeleteNews={handleDeleteNews}
              />
            ))}
          </div>
        )}

        {/* Add/Edit Form Modal */}
        {showForm && (
          <AddNewsForm
            showForm={showForm}
            setShowForm={setShowForm}
            defaultValues={singleNewsData?.data}
            mode={mode}
          />
        )}

        {/* Category management */}
        <Categories
          showModal={showCategoryForm}
          setShowModal={setShowCategoryForm}
          areaName="news"
        />
      </div>
    </div>
  );
};

export default News;
