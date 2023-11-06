import useTitleSet from "../../hooks/useTitleSet";
import HeroSection from "./HeroSection";

const Home = () => {
  useTitleSet("Home");
  return (
    <>
      <HeroSection />
      <div className=" h-screen"></div>
    </>
  );
};

export default Home;
