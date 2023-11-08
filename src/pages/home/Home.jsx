import useTitleSet from "../../hooks/useTitleSet";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import LatestJobs from "./LatestJobs";
import Container from "../../components/common/Container";
import { FaLaptopCode, FaUserTie } from "react-icons/fa";
import { FaMapLocation } from "react-icons/fa6";
import { PiAtom } from "react-icons/pi";
import RecentNews from "./RecentNews";

const Home = () => {
  useTitleSet("Home");
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <LatestJobs />
      <div className=" py-24 mt-20 bg-[#e8f3f7]">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 xl:gap-28">
            <div className="w-full flex flex-col gap-5">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-zinc-700">
                Connecting Job Seekers and Employers for Success
              </h1>
              <h5 className="text-sm lg:text-xl font-normal text-zinc-500">
                At ApplyJob, we understand that finding the right job can be a
                daunting task. That's wy we've bult a user-friendly and
                intuitive platform that simplifies the job search process
              </h5>
              <button className=" w-fit text-md font-semibold text-green-500 border-[1px] border-green-500 px-4 rounded-md py-2">
                Learn More
              </button>
            </div>
            <div className="w-full flex gap-2 lg:gap-5 xl:gap-10 justify-center ">
              <div className=" flex flex-col  gap-4">
                <div className=" max-w-[270px] p-4 rounded-md bg-white">
                  <div className="mt-5 lg:mt-10 w-10 h-10 text-green-500 text-xl flex justify-center items-center rounded-full bg-[#e8f3f7]">
                    <FaUserTie />
                  </div>
                  <h1 className="mt-4 text-lg lg:text-xl font-semibold text-zinc-700">
                    Search Millions of Jobs
                  </h1>
                  <h5 className="mt-2 mb-6 text-sm lg:text-md text-zinc-500">
                    Stay updated with real-time job market friends, salary
                    insights, and industry news.
                  </h5>
                </div>
                <div className=" max-w-[270px] p-4 rounded-md bg-white">
                  <div className="mt-5 lg:mt-10 w-10 h-10 text-green-500 text-xl flex justify-center items-center rounded-full bg-[#e8f3f7]">
                    <FaMapLocation />
                  </div>
                  <h1 className="mt-4 text-lg lg:text-xl font-semibold text-zinc-700">
                    Location Base Search
                  </h1>
                  <h5 className="mt-2 mb-6 text-sm lg:text-md text-zinc-500">
                    Stay updated with real-time job market friends, salary
                    insights, and industry news.
                  </h5>
                </div>
              </div>
              <div className=" flex flex-col  gap-4 mt-20">
                <div className=" max-w-[270px] p-4 rounded-md bg-white">
                  <div className="mt-5 lg:mt-10 w-10 h-10 text-green-500 text-xl flex justify-center items-center rounded-full bg-[#e8f3f7]">
                    <FaLaptopCode />
                  </div>
                  <h1 className="mt-4 text-lg lg:text-xl font-semibold text-zinc-700">
                    Top Careers{" "}
                  </h1>
                  <h5 className="mt-2 mb-6 text-sm lg:text-md text-zinc-500">
                    Stay updated with real-time job market friends, salary
                    insights, and industry news.
                  </h5>
                </div>
                <div className=" max-w-[270px] p-4 rounded-md bg-white">
                  <div className="mt-5 lg:mt-10 w-10 h-10 text-green-500 text-xl flex justify-center items-center rounded-full bg-[#e8f3f7]">
                    <PiAtom />
                  </div>
                  <h1 className="mt-4 text-lg lg:text-xl font-semibold text-zinc-700">
                    Skill Base Search
                  </h1>
                  <h5 className="mt-2 mb-6 text-sm lg:text-md text-zinc-500">
                    Stay updated with real-time job market friends, salary
                    insights, and industry news.
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <RecentNews />
    </>
  );
};

export default Home;
