import { images } from "../../constant";

const Logo = () => {
  return (
    <div className=" flex justify-start items-center gap-2">
      <img src={images.logo} alt="logo" className="w-10 h-10 lg:w-14 lg:h-14" />
      <span className=" font-bold text-xl lg:text-2xl tracking-widest text-zinc-800">
        Apply <span className=" text-green-500">Job</span>
      </span>
    </div>
  );
};

export default Logo;
