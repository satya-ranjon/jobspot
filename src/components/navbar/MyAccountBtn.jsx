import { useRef, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import Avatar from "../common/Avatar";
import { AiOutlineCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

const item = [
  { link: "/applied-jobs", id: "3", label: "Applied Jobs" },
  { link: "/create-job", id: "4", label: "Create Job" },
  { link: "/my-jobs", id: "4", label: "My Jobs" },
  { label: "Logout", id: "2", link: "logout" },
];

const MyAccountBtn = () => {
  const [dropdownIsOpen, setIsOpenDropdown] = useState(false);
  const { user, logoutUser } = useAuthentication();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const handleNavigate = (value) => {
    if (value === "logout") {
      logoutUser();
      setIsOpenDropdown(false);
      return;
    }
    navigate(value);
    setIsOpenDropdown(false);
  };

  useOutsideClick(dropdownRef, () => {
    setIsOpenDropdown(false);
  });
  return (
    <div ref={dropdownRef} className=" relative">
      <button
        onClick={() => setIsOpenDropdown((prev) => !prev)}
        className=" flex justify-start items-center gap-2 text-zinc-500 text-lg round-md font-normal px-3 py-1 border-[1px] border-[#22c55e45] ">
        <Avatar name={user?.displayName} url={user?.photoURL} /> My Account
        <AiOutlineCaretDown />
      </button>
      {dropdownIsOpen && (
        <div className=" absolute top-10 w-full z-50 bg-[#e8f3f7] border-[1px] border-[#22c55e45]">
          <div className=" flex flex-col gap-1 w-full">
            {item.map((i) => (
              <span
                key={i.id}
                onClick={() => handleNavigate(i.link)}
                className=" w-full px-2 text-md py-1 hover:bg-slate-50 cursor-pointer border-b-[1px]">
                {i.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccountBtn;
