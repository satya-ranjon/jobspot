const MyJobSkeleton = () => {
  return (
    <div
      role="status"
      className="p-4  shadow-[0_8px_30px_rgb(0,0,0,0.12)]  border rounded  animate-pulse">
      <div className="flex items-center mt-4 space-x-3 w-full">
        <svg
          className="w-12 h-12 text-[#e8f3f7] "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div className="w-full">
          <div className=" h-4 bg-[#e8f3f7] rounded-md  w-48 mb-2"></div>
          <div className=" flex justify-between items-center w-full">
            <div className="w-32 h-3 bg-[#e8f3f7] rounded-md "></div>
            <div className="w-28 h-4 bg-[#e8f3f7] rounded-md "></div>
          </div>
        </div>
      </div>

      <div className=" w-full flex justify-between items-center">
        <div className="h-4 w-36 mt-4 bg-[#e8f3f7] rounded-md "></div>
        <div className="h-6 w-36 mt-4 bg-[#e8f3f7] rounded-md "></div>
      </div>
    </div>
  );
};

export default MyJobSkeleton;
