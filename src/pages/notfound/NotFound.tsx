import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center">
        <p className="text-sm font-medium text-indigo-600 mb-3">Error 404</p>

        <h1 className="text-7xl font-bold text-gray-900 tracking-tight">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900">
          Page not found
        </h2>

        <p className="mt-2 text-gray-500 max-w-md">
          The page you're looking for doesn't exist or may have been moved.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Go Back
          </button>

          <Link
            to="/dashboard"
            className="px-5 py-2.5 rounded-lg bg-indigo-600 text-sm font-medium text-white hover:bg-indigo-700 transition"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
