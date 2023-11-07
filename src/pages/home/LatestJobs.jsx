import { space } from "postcss/lib/list";
import Container from "../../components/common/Container";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import { dayMontYearDate } from "../../utils/formatDate";
import { BsBookmark } from "react-icons/bs";

export const catagories = [
  "All Job",
  "On Site",
  "Remote",
  "Hybrid",
  "Part Time",
];

const LatestJobs = () => {
  const [activeCatagoriesIndex, setActiveCatagoriesIndex] = useState(0);
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleActiveCatagories = (index) => {
    setActiveCatagoriesIndex(index);
    if (index === 0) {
      setJobs(data);
      return;
    } else if (index > 0) {
      const filterJobs = data?.filter(
        (item) => item.catagories === catagories[index]
      );
      setJobs(filterJobs);
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      setJobs(data);
    }
  }, [data]);

  console.log(jobs);

  useEffect(() => {
    setLoading(true);
    request
      .get("/jobs")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-3xl md:text-5xl font-bold text-zinc-700 ">
        Latest <span className=" text-green-500">Job</span> Here
      </h1>
      <div className=" flex flex-wrap justify-center items-center gap-4 my-5">
        {catagories.map((item, i) => {
          const active = activeCatagoriesIndex === i;
          return (
            <span
              onClick={() => handleActiveCatagories(i)}
              className={` ${
                active
                  ? " bg-green-500 text-white"
                  : "text-green-500 bg-[#22c55e32]"
              } p-2 px-4 rounded-md  font-semibold text-md cursor-pointer `}
              key={i}>
              {item}
            </span>
          );
        })}
      </div>

      {!loading && (
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
          {jobs?.length > 0 &&
            jobs.map((item) => (
              <div
                key={item._id}
                className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
                <div className=" flex justify-between items-start gap-2">
                  <div className=" flex justify-start items-start gap-3 text-zinc-700">
                    <img
                      src={item.author?.avatar}
                      alt={item.author?.name}
                      className=" w-14 h-14 rounded-full"
                    />
                    <div className="">
                      <h1 className=" text-2xl font-bold">{item.title}</h1>
                      <h4 className=" text-sm text-zinc-400">
                        {item.author?.name}
                      </h4>
                    </div>
                  </div>
                  <BsBookmark className=" text-2xl" />
                </div>
                <div className=" border-l-4 border-l-green-100 pl-2  mt-3">
                  <h1 className=" text-lg font-bold">
                    Salary:{" "}
                    <span className=" text-zinc-500 text-sm">
                      {item.salary}
                    </span>
                  </h1>
                  <h1 className=" text-lg font-bold mt-2">
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
                  <button className=" text-green-500 border-b-2 border-green-500">
                    View
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </Container>
  );
};

export default LatestJobs;
