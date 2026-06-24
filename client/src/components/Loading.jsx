function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>

        <p className="text-gray-500 dark:text-gray-400 font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loading;
