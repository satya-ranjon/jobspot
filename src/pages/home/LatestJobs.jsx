import { space } from "postcss/lib/list";
import Container from "../../components/common/Container";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import { dayMontYearDate } from "../../utils/formatDate";
import { BsBookmark } from "react-icons/bs";
import JobCard from "../../components/common/JobCard";
import Loader from "../../components/common/Loader";
import JobCardSkeleton from "../../components/skeleton/JobCardSkeleton";

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

  useEffect(() => {
    setLoading(true);
    request
      .get("/jobs")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-3xl md:text-5xl text-center md:text-start font-bold text-zinc-700 ">
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

      {loading ? (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-8">
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
          <JobCardSkeleton />
        </div>
      ) : (
        <div className=" grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 py-8">
          {jobs?.length > 0 &&
            jobs
              ?.slice(0, 9)
              .map((item) => <JobCard key={item._id} item={item} />)}
        </div>
      )}
    </Container>
  );
};

export default LatestJobs;
