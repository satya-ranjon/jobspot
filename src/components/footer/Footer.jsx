import Container from "../common/Container";
import Logo from "../common/Logo";
import { MdEmail, MdLocationPin } from "react-icons/md";
import categories from "../../data/categories.json";
import { Link } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  return (
    <Container>
      <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 my-10 gap-8 text-zinc-500">
        <div className=" col-span-2 flex flex-col gap-4 ">
          <Logo />
          <h3>
            ApplyJob wonderful serenity has taken possession of my entire soul
            like these sweet mornings of spring which I enjoy with my whole
            heart.
          </h3>
          <div className=" flex justify-start items-center gap-2">
            <MdEmail className=" text-xl" />{" "}
            <span className=" text-md">applyjob@ge.com</span>
          </div>
          <div className=" flex justify-start items-center gap-2">
            <MdLocationPin className=" text-xl" />
            <span className=" text-md">59 West 41th Street, Dhaka City</span>
          </div>
        </div>
        <div className=" col-span-1 flex flex-col gap-4 text-md">
          <h1 className=" text-xl font-bold text-zinc-700">Categories</h1>
          {categories.map((item) => (
            <span key={item.id}>{item.name}</span>
          ))}
        </div>
        <div className=" col-span-1 flex flex-col gap-4 text-md">
          <h1 className=" text-xl font-bold text-zinc-700">Community</h1>
          <Link to="#">Event</Link>
          <Link to="#">Blog</Link>
          <Link to="#">Forum</Link>
          <Link to="#">Podcast</Link>
          <Link to="#">Affiliates</Link>
        </div>
        <div className=" col-span-1 flex flex-col gap-4 text-md">
          <h1 className=" text-xl font-bold text-zinc-700">About</h1>
          <Link to="#">About Us</Link>
          <Link to="#">Partnerships</Link>
          <Link to="#">Finance Experts</Link>
          <Link to="#">Project Management</Link>
          <Link to="#">Product Manager</Link>
        </div>
        <div className=" col-span-1 flex flex-col gap-4 text-md">
          <h1 className=" text-xl font-bold text-zinc-700">Contact</h1>
          <Link to="#">Contact Us</Link>
          <Link to="#">Press Center</Link>
          <Link to="#">Careers</Link>
          <Link to="#">Faq</Link>
        </div>
      </div>
      <div className=" flex justify-center md:justify-start items-center gap-10 py-10 border-b-2">
        <Link
          to="#"
          className=" cursor-pointer w-10 h-10 rounded-full bg-[#22c55e1b] flex justify-center items-center text-xl">
          <FaFacebookF />
        </Link>
        <Link
          to="#"
          className=" cursor-pointer w-10 h-10 rounded-full bg-[#22c55e1b] flex justify-center items-center text-xl">
          <RiTwitterXFill />
        </Link>
        <Link
          to="#"
          className=" cursor-pointer w-10 h-10 rounded-full bg-[#22c55e1b] flex justify-center items-center text-xl">
          <BiLogoLinkedin />
        </Link>
      </div>
      <div className=" text-center py-8 text-zinc-400 text-sm">
        © 2023 All Right reserved by applyJob.com design by Satya Ranjon.
      </div>
    </Container>
  );
};

export default Footer;
