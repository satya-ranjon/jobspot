const Avatar = ({ url, name }) => {
  const width = `w-${parseInt(name?.length) * 2 + 4}`;
  return (
    <>
      {url ? (
        <div className=" relative group">
          <img
            className="w-8 h-8 rounded-full"
            src={url}
            alt="Rounded avatar"
          />
          {name && (
            <div
              className={`${width} hidden z-50 group-hover:block absolute -bottom-8 bg-green-500 px-1 text-sm text-white`}>
              {name}
            </div>
          )}
        </div>
      ) : (
        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg
            className="absolute w-10 h-10 text-gray-400 -left-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"></path>
          </svg>
        </div>
      )}
    </>
  );
};

export default Avatar;
