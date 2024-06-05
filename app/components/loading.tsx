export function Loading() {
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="border-t-4 border-gray-300 rounded-full animate-spin w-10 h-10"></div>
      </div>
    );
  }