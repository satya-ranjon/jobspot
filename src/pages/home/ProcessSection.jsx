import Container from "../../components/common/Container";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineArrowLongRight } from "react-icons/hi2";

const ProcessSection = () => {
  return (
    <Container>
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start py-32 gap-3 md:gap-0">
        <div className=" flex flex-col gap-2 justify-center items-center">
          <div className=" rotate-45 rounded-3xl w-24 h-24 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[#3b83f624] flex justify-center items-center text-2xl text-blue-500">
            <FaRegUser className=" -rotate-45 text-xl lg:text-2xl" />
          </div>
          <h2 className=" text-2xl md:text-xl lg:text-2xl font-bold text-zinc-700 mt-8">
            Account
          </h2>
          <h2 className=" text-md md:text-xs lg:text-md xl:text-xl font-normal text-zinc-500 text-center  ">
            First you have to create an Account in here
          </h2>
        </div>
        <HiOutlineArrowLongRight className=" text-5xl lg:text-7xl text-green-500 mt-2 lg:mt-4 rotate-90 md:rotate-0 " />
        <div className=" flex flex-col gap-2 justify-center items-center ">
          <div className=" rotate-45 rounded-3xl w-24 h-24 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[#f9741624] text-orange-500 flex justify-center items-center text-2xl ">
            <FaRegUser className=" -rotate-45 text-xl lg:text-2xl" />
          </div>
          <h2 className=" text-2xl md:text-xl lg:text-2xl font-bold text-zinc-700 mt-8">
            CV/Resume
          </h2>
          <h2 className=" text-md md:text-xs lg:text-md xl:text-xl font-normal text-zinc-500 text-center  ">
            For a job you have to upload your best CV or Resume.
          </h2>
        </div>
        <HiOutlineArrowLongRight className=" text-5xl lg:text-7xl text-green-500 mt-2 lg:mt-4 rotate-90 md:rotate-0" />
        <div className=" flex flex-col gap-2 justify-center items-center">
          <div className=" rotate-45 rounded-3xl w-24 h-24 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[#22c55e32] flex justify-center items-center text-2xl text-green-500">
            <FaRegUser className=" -rotate-45 text-xl lg:text-2xl" />
          </div>
          <h2 className=" text-2xl md:text-xl lg:text-2xl font-bold text-zinc-700 mt-8">
            Quick Jobs
          </h2>
          <h2 className=" text-md md:text-xs lg:text-md xl:text-xl font-normal text-zinc-500 text-center  ">
            Find your best job by using search or categories.
          </h2>
        </div>
        <HiOutlineArrowLongRight className=" text-5xl lg:text-7xl text-green-500 mt-2 lg:mt-4 rotate-90 md:rotate-0 " />
        <div className=" flex flex-col gap-2 justify-center items-center">
          <div className=" rotate-45 rounded-3xl w-24 h-24 md:w-16 md:h-16 lg:w-24 lg:h-24 bg-[#8a5cf629] flex justify-center items-center text-2xl text-violet-500">
            <FaRegUser className=" -rotate-45 text-xl lg:text-2xl" />
          </div>
          <h2 className=" text-2xl md:text-xl lg:text-2xl font-bold text-zinc-700 mt-8">
            Apply them
          </h2>
          <h2 className=" text-md md:text-xs lg:text-md xl:text-xl font-normal text-zinc-500 text-center  ">
            Finally you apply your job and enjoy your Work.
          </h2>
        </div>
      </div>
    </Container>
  );
};

export default ProcessSection;
