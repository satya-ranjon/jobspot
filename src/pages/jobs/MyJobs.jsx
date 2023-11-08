import PageHeader from "../../components/common/PageHeader";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import useAuthentication from "../../hooks/useAuthentication";
import JobCardSkeleton from "../../components/skeleton/JobCardSkeleton";
import { bgColorByCatagories } from "../../components/common/JobCard";
import Container from "../../components/common/Container";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useTitleSet from "../../hooks/useTitleSet";

const catagories = ["All Job", "On Site", "Remote", "Hybrid", "Part Time"];

const MyJobs = () => {
  const [data, setData] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, loading: loadingUser } = useAuthentication();
  const [activeCatagoriesIndex, setActiveCatagoriesIndex] = useState(0);

  useTitleSet("My Jobs");

  useEffect(() => {
    setLoading(true);
    request
      .get(`/myjob?email=${user?.email}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [loadingUser]);

  const handleDeleteJob = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("delete");

        request
          .delete(`/jobs/${id}`)
          .then((res) => {
            const newMyjob = data?.filter((item) => item._id !== id);
            setData(newMyjob);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

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
  return (
    <div>
      <PageHeader title="My Jobs" />
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
                jobs.map((item) => (
                  <div
                    key={item._id}
                    className="shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6">
                    <div className=" flex justify-between items-start gap-2 w-full">
                      <div className=" flex justify-start items-start gap-3 text-zinc-700 w-full">
                        <img
                          src={item.author?.avatar}
                          alt={item.author?.name}
                          className=" w-14 h-14 rounded-full"
                        />
                        <div className=" w-full border-b-[1px] border-b-[#e8f3f7] pb-2">
                          <h1 className="w-full text-2xl font-bold">
                            {item.title}
                          </h1>
                          <div className="w-full flex justify-between items-center">
                            <h4 className=" text-sm text-zinc-400">
                              {item.author?.name}
                            </h4>
                            <span
                              className={` ${
                                bgColorByCatagories[item.catagories]
                              } text-xs px-2 py-1  rounded-sm`}>
                              {item.catagories}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex  justify-start items-center gap-3 ">
                      <Link
                        className=" text-sm  px-3 py-1 bg-green-500 text-white"
                        to={`/update-job/${item._id}`}>
                        Update
                      </Link>
                      <button
                        onClick={() => handleDeleteJob(item._id)}
                        className=" text-sm  px-3 py-1 bg-red-500 text-white">
                        delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}

          {jobs?.length === 0 && (
            <>
              <h1 className=" text-3xl font-semibold uppercase text-center w-full">
                No jobs
              </h1>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default MyJobs;
