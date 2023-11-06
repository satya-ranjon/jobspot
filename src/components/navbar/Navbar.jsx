import useDisplayWidth from "../../hooks/useDisplayWidth";
import Avatar from "../common/Avatar";
import Container from "../common/Container";
import Logo from "../common/Logo";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useLayoutEffect, useState } from "react";

const menu = [
  { link: "/", label: "Home" },
  { link: "all-jobs", label: "All Jobs" },
  { link: "/applied-jobs", label: "Applied Jobs" },
  { link: "/my-jobs", label: "My Jobs" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useDisplayWidth();

  useLayoutEffect(() => {
    if (768 <= width) {
      setIsOpen(true);
    }
    if (768 >= width) {
      setIsOpen(false);
    }
  }, [width]);

  return (
    <div className=" py-4 ">
      <Container>
        <div className="flex justify-between items-center">
          <div className=" flex justify-start items-center gap-8">
            <Logo />
            {isOpen && (
              <div
                className={`${
                  width <= 768 &&
                  " absolute bg-white h-screen top-0 right-0 w-64 border-l-2 "
                } flex flex-col lg:flex-row justify-start items-center gap-3 text-zinc-500 text-md font-normal`}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 py-10 text-3xl lg:hidden hover:text-yellow-500 duration-300 transition-colors">
                  <AiOutlineClose />
                </button>
                {menu.map((item, i) => (
                  <NavLink
                    to={item.link}
                    key={i}
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-500 border-b-2 border-b-yellow-500 "
                        : "hover:text-yellow-500 duration-300 transition-colors"
                    }>
                    {item.label}
                  </NavLink>
                ))}
                <button className="lg:hidden flex justify-start items-center gap-2 text-zinc-500 text-lg round-md font-normal px-3 py-1 border-[1px] border-[#22c55e45] ">
                  <Avatar /> My Account
                </button>
                <button className=" lg:hidden text-green-500 text-lg round-md font-normal px-3 py-1 bg-[#22c55e2e] ">
                  Login/Register
                </button>
                <button className=" lg:hidden text-white text-lg round-md font-normal px-3 py-1 bg-green-500 ">
                  Add a Job
                </button>
              </div>
            )}
          </div>
          <div className=" hidden lg:flex justify-start gap-4 items-center ">
            {/* <button className=" flex justify-start items-center gap-2 text-zinc-500 text-lg round-md font-normal px-3 py-1 border-[1px] border-[#22c55e45] ">
              <Avatar /> My Account
            </button> */}
            <button className=" text-green-500 text-lg round-md font-normal px-3 py-1 bg-[#22c55e2e] ">
              Login/Register
            </button>
            <button className=" text-white text-lg round-md font-normal px-3 py-1 bg-green-500 ">
              Add a Job
            </button>
          </div>
          <div
            onClick={() => setIsOpen(true)}
            className=" cursor-pointer lg:hidden ">
            <FaBarsStaggered className="text-2xl text-zinc-500 hover:text-yellow-500 duration-300 transition-colors" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
