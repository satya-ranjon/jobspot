import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { request } from "../../utils/axios";
import JobCard from "../../components/common/JobCard";
import Container from "../../components/common/Container";
import { AiOutlineClose } from "react-icons/ai";
import JobCardSkeleton from "../../components/skeleton/JobCardSkeleton";
import useTitleSet from "../../hooks/useTitleSet";

const AllJobs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState(false);
  useTitleSet("All Jobs");

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

  const handleSearch = () => {
    if (!searchQuery) return;
    setLoading(true);
    setSearch(true);
    request
      .get(`/jobs/filter?search=${searchQuery}`)
      .then((res) => {
        setSearchData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  useEffect(() => {
    if (!searchQuery) {
      setSearchData([]);
      setSearch(false);
    }
  }, [searchQuery]);

  let jobs = searchQuery && search ? searchData : data;

  return (
    <div>
      <div className="bg-[#e8f3f7] py-16 px-5 md:px-0">
        <div className=" flex justify-center items-center w-full">
          <div className=" min-w-[200px] md:min-w-[600px]">
            <div className="w-full rounded-md bg-white p-1 lg:p-2 flex justify-start items-center">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder=" Search jobs..."
                type="text"
                className=" text-sm lg:text-xl w-full outline-none px-3 "
              />
              {searchQuery && (
                <AiOutlineClose
                  onClick={() => setSearchQuery("")}
                  className=" text-4xl mx-2 cursor-pointer duration-300 transition-colors text-zinc-700 hover:text-zinc-500"
                />
              )}
              <button
                onClick={handleSearch}
                className=" p-2 lg:p-4 bg-green-500 text-xl text-white">
                <BiSearch />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" my-16">
        <Container>
          {loading ? (
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
                jobs.map((item) => <JobCard key={item._id} item={item} />)}
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default AllJobs;
