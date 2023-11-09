import PageHeader from "../../components/common/PageHeader";
import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import useAuthentication from "../../hooks/useAuthentication";
import useTitleSet from "../../hooks/useTitleSet";
import { Link } from "react-router-dom";
import TableSkeleton from "../../components/skeleton/TableSkeleton";
import CheckBoxInput from "../../components/common/ChakBoxInput";

const catagories = ["On Site", "Remote", "Hybrid", "Part Time"];

const bgColorByCatagories = {
  "On Site": "bg-green-100",
  Remote: "bg-violet-100",
  "Part Time": "bg-orange-100",
  Hybrid: "bg-lime-100",
};

const AppliedJobs = () => {
  const [data, setData] = useState([]);
  const [selectCatagories, setSelectCatagories] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const { user, loading: loadingUser } = useAuthentication();
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

  let jobs =
    filterJobs.length > 0 || selectCatagories?.length > 0 ? filterJobs : data;

  const handleCatagoriesCheck = (value) => {
    const findSelectCatagories = selectCatagories?.find((i) => i === value);

    if (findSelectCatagories) {
      const newSelectCatagories = selectCatagories?.filter((i) => i !== value);
      setSelectCatagories(newSelectCatagories);

      const RemoveSelectedCatagoriesJobs = filterJobs?.filter(
        (item) => item?.job.catagories !== value
      );
      setFilterJobs(RemoveSelectedCatagoriesJobs);
      return;
    }
    const filterSelectedCatagoriesJobs = data?.filter(
      (item) => item?.job.catagories === value
    );

    setFilterJobs((prev) => [...prev, ...filterSelectedCatagoriesJobs]);

    setSelectCatagories((prev) => [...prev, value]);
  };

  return (
    <div>
      <PageHeader title="Applied Jobs" />

      <section className="container px-4 mx-auto my-20">
        <div className=" flex flex-wrap justify-center items-center  mt-3 border-[1px] border-b-0 w-fit">
          {catagories.map((item, i) => {
            return (
              <span className={` px-2 md:px-3 py-2 cursor-pointer `} key={i}>
                <CheckBoxInput
                  label={item}
                  onClick={() => handleCatagoriesCheck(item)}
                />
              </span>
            );
          })}
        </div>
        <div className="flex flex-col min-h-[400px]">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200  md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 ">
                  <thead className="bg-gray-50 ">
                    <tr>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-700">
                        Name
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-700">
                        Catagories
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-700">
                        Salary
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-zinc-700">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y divide-gray-200 ">
                    {loading && (
                      <>
                        <TableSkeleton />
                        <TableSkeleton />
                        <TableSkeleton />
                        <TableSkeleton />
                      </>
                    )}
                    {jobs?.length === 0 && !loading && (
                      <tr>
                        <td className=" px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                          Empty
                        </td>
                        <td className=" px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                          Empty
                        </td>
                        <td className=" px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                          Empty
                        </td>
                        <td className=" px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                          Empty
                        </td>
                      </tr>
                    )}
                    {jobs?.length > 0 &&
                      !loading &&
                      jobs.map((item) => (
                        <tr key={item._id}>
                          <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                            {item.job.title}
                          </td>

                          <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                            <div
                              className={`${
                                bgColorByCatagories[item.job.catagories]
                              } w-fit px-2 pyy-1 rounded-2xl text-sm`}>
                              {item.job.catagories}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm text-zinc-700 whitespace-nowrap">
                            {item.job.salary}
                          </td>
                          <td className="px-4 py-4 text-sm whitespace-nowrap">
                            <div className="flex items-center gap-x-6">
                              <Link
                                to={`/job/${item.job._id}`}
                                className="text-blue-500 transition-colors duration-200 hover:text-indigo-500 focus:outline-none">
                                View
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppliedJobs;
