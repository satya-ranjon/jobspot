import useDisplayWidth from "../../hooks/useDisplayWidth";
import Container from "../common/Container";
import Logo from "../common/Logo";
import { NavLink } from "react-router-dom";
import { FaBarsStaggered } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useLayoutEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import MyAccountBtn from "./MyAccountBtn";

const menu = [
  { link: "/", label: "Home" },
  { link: "all-jobs", label: "All Jobs" },

  { link: "/blog/1", label: "Blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [width] = useDisplayWidth();
  const { user } = useAuthentication();

  useLayoutEffect(() => {
    if (width > 768) {
      setIsOpen(true);
    }
    if (width <= 768) {
      setIsOpen(false);
    }
  }, [width]);

  console.log("width", width > 768);
  console.log("width", width);

  return (
    <div className=" py-4 bg-[#e8f3f7] ">
      <Container>
        <div className="flex justify-between items-center">
          <div className=" flex justify-start items-center gap-8">
            <Logo />
            {isOpen && (
              <div
                className={`${
                  width <= 768 &&
                  " absolute bg-white h-screen top-0 right-0 w-64 border-l-2 "
                } flex flex-col lg:flex-row justify-start items-center gap-3 text-zinc-500 text-md font-normal z-50 `}>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 py-10 text-3xl lg:hidden hover:text-yellow-500 duration-300 transition-colors">
                  <AiOutlineClose />
                </button>
                {menu.map((item, i) => (
                  <NavLink
                    to={item.link}
                    key={item.link}
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-500 border-b-2 border-b-yellow-500 "
                        : "hover:text-yellow-500 duration-300 transition-colors"
                    }>
                    {item.label}
                  </NavLink>
                ))}

                {user ? (
                  <div className="lg:hidden">
                    <MyAccountBtn />
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    className=" lg:hidden text-green-500 text-lg round-md font-normal px-3 py-1 bg-[#22c55e1b] ">
                    Login/Register
                  </NavLink>
                )}
              </div>
            )}
          </div>
          <div className=" hidden lg:flex justify-start gap-4 items-center ">
            {user ? (
              <div className="hidden lg:block">
                <MyAccountBtn />
              </div>
            ) : (
              <NavLink
                to="/login"
                className=" text-green-500 text-lg round-md font-normal px-3 py-1 bg-[#22c55e1b] ">
                Login/Register
              </NavLink>
            )}
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
