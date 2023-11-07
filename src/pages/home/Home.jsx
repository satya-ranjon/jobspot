import useTitleSet from "../../hooks/useTitleSet";
import HeroSection from "./HeroSection";
import ProcessSection from "./ProcessSection";
import LatestJobs from "./LatestJobs";

const Home = () => {
  useTitleSet("Home");
  return (
    <>
      <HeroSection />
      <ProcessSection />
      <LatestJobs />
      <div className=" h-screen"></div>
    </>
  );
};

export default Home;
