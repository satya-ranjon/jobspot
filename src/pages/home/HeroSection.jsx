import images from "../../constant/images";
import Container from "../../components/common/Container";
import { BiSearch } from "react-icons/bi";

const HeroSection = () => {
  return (
    <div className=" flex flex-col md:flex-row justify-between items-center gap-3 bg-[#e8f3f7] relative">
      <div className=" w-full h-96"></div>
      <div className=" w-full">
        <img src={images.hero} alt="hero" />
      </div>
      <div className=" absolute h-full w-full">
        <Container>
          <div className=" text-zinc-700 flex flex-col md:flex-row justify-center md:justify-between  h-full items-center gap-3 ">
            <div
              className="w-full flex flex-col 
            gap-4 lg:gap-6  items-center md:items-start mt-14 md:mt-0">
              <span className="text-xs lg:text-sm py-2 pl-1 pr-3 bg-[#22c55e1b] rounded-3xl w-fit">
                <span className=" text-white m-1 px-2 py-1 bg-green-500 rounded-3xl">
                  NEW
                </span>
                <span> Stay connect to Get upcoming job with #ApplyJob</span>
              </span>
              <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold  text-center md:text-start">
                Find your job & make sure goal.
              </h1>
              {/* Search  */}
              <div className="w-full rounded-md bg-white p-1 lg:p-2 flex justify-start items-center">
                <input
                  placeholder=" Search jobs..."
                  type="text"
                  className=" text-sm lg:text-xl w-full outline-none px-3 "
                />
                <button className=" p-2 lg:p-4 bg-green-500 text-xl text-white">
                  <BiSearch />
                </button>
              </div>

              <h2 className=" text-lg lg:text-xl">We are trusted by:</h2>
              <div
                className="flex justify-start items-center 
              gap-2 lg:gap-4 lg:mt-2 bg-white p-3 w-fit rounded-md">
                <img
                  src={images.facebook}
                  alt="facebook"
                  className="w-7 h-7 lg:w-8 lg:h-8"
                />
                <img
                  src={images.twitter}
                  alt="facebook"
                  className="w-7 h-7 lg:w-8 lg:h-8"
                />
                <img
                  src={images.instagram}
                  alt="facebook"
                  className="w-7 h-7 lg:w-8 lg:h-8"
                />
                <img
                  src={images.slack}
                  alt="facebook"
                  className=" w-7 h-7 lg:w-8 lg:h-8"
                />
              </div>
            </div>
            <div className="w-full h-full"></div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default HeroSection;
