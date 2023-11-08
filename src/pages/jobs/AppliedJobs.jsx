import PageHeader from "../../components/common/PageHeader";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import useAuthentication from "../../hooks/useAuthentication";
import JobCardSkeleton from "../../components/skeleton/JobCardSkeleton";
import JobCard from "../../components/common/JobCard";
import Container from "../../components/common/Container";
import useTitleSet from "../../hooks/useTitleSet";
const catagories = ["All Job", "On Site", "Remote", "Hybrid", "Part Time"];

const AppliedJobs = () => {
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loading: loadingUser } = useAuthentication();
  const [activeCatagoriesIndex, setActiveCatagoriesIndex] = useState(0);
  useTitleSet("Applied Jobs");

  useEffect(() => {
    setLoading(true);
    request
      .get(`/apply/${user?.uid}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [loadingUser]);

  const handleActiveCatagories = (index) => {
    setActiveCatagoriesIndex(index);
    if (index === 0) {
      setJobs(data);
      return;
    } else if (index > 0) {
      const filterJobs = data?.filter(
        (item) => item?.job.catagories === catagories[index]
      );
      console.log("filterJobs", filterJobs);
      setJobs(filterJobs);
    }
  };

  useEffect(() => {
    if (data?.length > 0) {
      setJobs(data);
    }
  }, [data]);

  return (
    <div>
      <PageHeader title="Applied Jobs" />
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
      <div className=" my-16">
        <Container>
          {loading || loadingUser ? (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </div>
          ) : (
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-8">
              {jobs?.length > 0 &&
                jobs.map((item) => <JobCard key={item._id} item={item.job} />)}
            </div>
          )}
        </Container>
        {jobs?.length === 0 && (
          <>
            <h1 className=" text-3xl font-semibold uppercase text-center w-full">
              No jobs
            </h1>
          </>
        )}
      </div>
    </div>
  );
};

export default AppliedJobs;
