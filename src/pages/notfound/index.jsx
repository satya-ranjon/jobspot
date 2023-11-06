import { images } from "../../constant";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex-col w-full flex justify-center items-center bg-[#f7f7f7]">
      <img
        src={images.notfound}
        alt="notfound"
        className=" h-[300px] w-[400px] md:h-[600px] md:w-[800px]"
      />
      <Link
        to="/"
        className=" text-xl font-bold text-zinc-600 cursor-pointer border-2 px-4 py-2 border-green-100 hover:text-green-500 duration-300 transition-colors">
        Back Home
      </Link>
    </div>
  );
};

export default NotFound;
