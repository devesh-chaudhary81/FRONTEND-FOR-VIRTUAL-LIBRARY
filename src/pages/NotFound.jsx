import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-6">Oops! You’re on the wrong page 😢</p>
      <p className="mb-8 text-lg max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-200 transition"
      >
        🔙 Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
