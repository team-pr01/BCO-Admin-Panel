import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
      <div className="flex flex-col items-center space-y-4">
        <AlertTriangle className="w-16 h-16 text-yellow-500" />
        <h1 className="text-3xl font-bold text-gray-800 ">
          404 Not Found
        </h1>
        <p className="text-gray-600 ">
          The page you're looking for doesn't exist.
        </p>
      </div>
    </div>
  );
};

export default NotFound;