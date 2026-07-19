/* eslint-disable @typescript-eslint/no-explicit-any */
import { BarChart, icons, Search } from "lucide-react";
import { useMemo, useState } from "react";
import AddProductForm from "../../components/ShopPage/AddProductForm/AddProductForm";
import Categories from "../../components/Categories/Categories";
import toast from "react-hot-toast";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductQuery,
} from "../../redux/Features/Product/productApi";
import { useGetAllCategoriesQuery } from "../../redux/Features/Categories/ReelCategory/categoriesApi";
import ProductBanner from "../../components/ShopPage/ProductBanner/ProductBanner";
import Loader from "../../components/shared/Loader/Loader";
import DeleteConfirmationModal from "../../components/shared/DeleteConfirmationModal/DeleteConfirmationModal";
import Pagination from "./Pagination";

export type TProduct = {
  _id: string;
  imageUrl?: string;
  name: string;
  category: string;
  productLink: string;
  description: string;
  basePrice: string;
  discountedPrice: string;
  currency: string;
  label: string;
  tags: string;
  videoUrl?: string;
  clicks?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const Shop = () => {
  const [showCategoryForm, setShowCategoryForm] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const { Plus, Pencil, Trash2, Package } = icons;

  // Get all products with pagination
  const { data, isLoading, isFetching } = useGetAllProductsQuery({
    keyword: searchQuery,
    category: category || undefined,
    page: currentPage,
    limit: itemsPerPage,
  });

  const { data: categories } = useGetAllCategoriesQuery({});
  const filteredCategories = categories?.data?.filter(
    (category: any) => category.areaName === "product"
  );

  const categoryNames = filteredCategories?.map(
    (category: any) => category?.category
  );

  const allProducts = data?.data?.products || [];
  const pagination = data?.data?.pagination || {};
  console.log(pagination);

  const {
    data: singleProductData,
    isLoading: isSingleDataLoading,
    isFetching: isSingleDataFetching,
  } = useGetSingleProductQuery(productId, {
    skip: !productId,
  });

  const stats = useMemo(
    () => ({
      totalProducts: pagination?.total || 0,
      totalClicks: allProducts.reduce((acc: any, p: any) => acc + (p.clicks || 0), 0),
    }),
    [allProducts, pagination?.total]
  );

  const LabelBadge: React.FC<{ label: any | undefined }> = ({ label }) => {
    if (!label) return null;
    const styles: Record<any, string> = {
      "New Product":
        "bg-green-100 text-green-700",
      "Limited Product":
        "bg-amber-100 text-amber-700",
      "Best Seller":
        "bg-blue-100 text-blue-700",
    };
    return (
      <span
        className={`px-2 py-1 text-xs font-semibold rounded-full ${styles[label]}`}
      >
        {label}
      </span>
    );
  };

  const [deleteProduct] = useDeleteProductMutation();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleConfirmDelete = async () => {
    await toast.promise(deleteProduct(productId).unwrap(), {
      loading: "Deleting...",
      success: "Deleted successfully!",
      error: "Failed to delete.",
    });
    setShowDeleteModal(false);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">
        Shop Management
      </h2>

      {/* Stats card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-100">
            <Package className="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <p className="text-slate-500">Total Products</p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.totalProducts}
            </p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
          <div className="p-3 rounded-full bg-green-100">
            <BarChart className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <p className="text-slate-500">Total Clicks</p>
            <p className="text-2xl font-bold text-slate-900">
              {stats.totalClicks.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Table & Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200">
        {/* Table header */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <h3 className="text-lg font-bold">All Products</h3>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search product by name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                  }}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-primary-500 transition duration-300"
                />
              </div>
            </div>
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1); // Reset to first page on category change
              }}
              className="px-2 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-primary-500 transition duration-300"
            >
              <option value="">All Categories</option>
              {categoryNames?.map((category: any, index: number) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCategoryForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add category
            </button>
            <button
              onClick={() => {
                setShowForm(true);
                setMode("add");
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>
        </div>

        {/* Product table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="border-b border-slate-200 text-slate-500">
              <tr>
                <th className="p-3 font-semibold">PRODUCT</th>
                <th className="p-3 font-semibold">CATEGORY</th>
                <th className="p-3 font-semibold">PRICE</th>
                <th className="p-3 font-semibold">LABEL</th>
                <th className="p-3 font-semibold text-center">
                  ANALYTICS (Total Clicks)
                </th>
                <th className="p-3 font-semibold text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {isLoading || isFetching ? (
                <tr>
                  <td colSpan={6} className="py-10 text-center">
                    <Loader size="size-10" />
                  </td>
                </tr>
              ) : allProducts && allProducts.length > 0 ? (
                allProducts.map((product: TProduct) => (
                  <tr
                    key={product._id}
                    className="border-b border-slate-200/50 hover:bg-slate-50"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                        <span className="font-medium text-slate-900">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 text-slate-600">
                      {product.category}
                    </td>
                    <td className="p-3 font-mono text-slate-800">
                      {Number(product.discountedPrice)} 
                      <span className="text-sm line-through text-red-500 ml-1">
                        {Number(product.basePrice).toFixed(2)}
                      </span>
                      {product.currency}
                    </td>
                    <td className="p-3">
                      <LabelBadge label={product.label} />
                    </td>
                    <td className="p-3 text-center text-slate-600 font-mono">
                      {product.clicks || 0}
                    </td>
                    <td className="p-3">
                      <div className="flex justify-center items-center gap-1">
                        <button
                          onClick={() => {
                            setMode("edit");
                            setProductId(product._id);
                            setShowForm(true);
                          }}
                          className="p-2 text-slate-500 hover:text-green-500"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setShowDeleteModal(true);
                            setProductId(product._id);
                          }}
                          className="p-2 text-slate-500 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-500">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex flex-wrap justify-between items-center mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            
            <div className="text-sm text-slate-600">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, pagination.total)} of{' '}
              {pagination.total} entries
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      {showForm && (
        <AddProductForm
          setShowForm={setShowForm}
          defaultValues={singleProductData?.data}
          mode={mode}
          isSingleDataLoading={isSingleDataLoading || isSingleDataFetching}
        />
      )}

      {/* Category management */}
      <Categories
        showModal={showCategoryForm}
        setShowModal={setShowCategoryForm}
        areaName="product"
      />

      {showDeleteModal && (
        <DeleteConfirmationModal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <ProductBanner />
    </div>
  );
};

export default Shop;