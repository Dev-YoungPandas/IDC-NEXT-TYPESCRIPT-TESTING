export default function LoadingSpinner() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white mx-auto mb-4"></div>
        <p className="text-white text-xl">Loading...</p>
      </div>
    </div>
  );
}