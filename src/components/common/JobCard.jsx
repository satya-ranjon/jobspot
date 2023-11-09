import { BsBookmark } from "react-icons/bs";
import { dayMontYearDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

export const bgColorByCatagories = {
  "On Site": "bg-green-100",
  Remote: "bg-violet-100",
  "Part Time": "bg-orange-100",
  Hybrid: "bg-lime-100",
};

const JobCard = ({ item }) => {
  return (
    <div className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
      <div className=" flex justify-between items-start gap-2 w-full">
        <div className=" flex justify-start items-start gap-3 text-zinc-700 w-full">
          <img
            src={item.author?.avatar}
            alt={item.author?.name}
            className=" w-14 h-14 rounded-full"
          />
          <div className=" w-full border-b-[1px] border-b-[#e8f3f7] pb-2">
            <h1 className="w-full text-2xl font-bold">{item.title}</h1>
            <div className="w-full flex justify-between items-center">
              <h4 className=" text-sm text-zinc-400">{item.author?.name}</h4>
              <span
                className={` ${
                  bgColorByCatagories[item.catagories]
                } text-xs px-2 py-1  rounded-sm`}>
                {item.catagories}
              </span>
            </div>
          </div>
        </div>
        <BsBookmark className=" text-2xl" />
      </div>
      <div className=" border-l-4 border-l-green-100 pl-2  mt-3">
        <h1 className=" text-lg font-bold">
          Salary: <span className=" text-zinc-500 text-sm">{item.salary}</span>
        </h1>
        <h1 className=" text-lg font-bold">
          Posting:{" "}
          <span className=" text-zinc-500 text-sm">
            {dayMontYearDate(item.createAt)}
          </span>
        </h1>
        <h1 className=" text-lg font-bold">
          Deadline:{" "}
          <span className=" text-zinc-500 text-sm">
            {dayMontYearDate(item.deadline)}
          </span>
        </h1>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="">
          <span className=" text-lg font-semibold">Applicants</span>{" "}
          {item.applicants}
        </div>
        <Link
          to={`/job/${item._id}`}
          className=" text-green-500 border-b-2 border-green-500">
          View
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
