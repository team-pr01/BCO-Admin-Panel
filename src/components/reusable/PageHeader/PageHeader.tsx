/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Plus, Search } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  buttonText: string;
  icon?: ReactNode;
  onClick: () => void;
  setShowCategoryForm?: React.Dispatch<React.SetStateAction<boolean>>;
  isCategoryButtonVisible?: boolean;
  isSearchBarVisible?: boolean;
  keyword?: string;
  setKeyword?: React.Dispatch<React.SetStateAction<string>>;
}

const PageHeader = ({
  title,
  buttonText,
  icon,
  onClick,
  setShowCategoryForm,
  isCategoryButtonVisible = true,
  isSearchBarVisible,
  keyword,
  setKeyword,
}: PageHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-5">
        <h2 className="text-2xl font-bold text-gray-900 ">{title}</h2>
        {isSearchBarVisible && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search books..."
              value={keyword}
              onChange={(e) => setKeyword && setKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 bg-slate-100"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        {isCategoryButtonVisible && (
          <button
            onClick={() => {
              setShowCategoryForm && setShowCategoryForm(true);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Manage Categories
          </button>
        )}
        <button
          onClick={onClick}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          {icon && <span className="mr-2">{icon}</span>}
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default PageHeader;
