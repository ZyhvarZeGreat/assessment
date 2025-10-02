import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-[#1a1f4d] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-[#1a1f4d] text-white font-medium rounded-md hover:bg-[#252c5f] transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
