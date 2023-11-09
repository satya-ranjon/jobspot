import { useEffect, useRef, useState } from "react";
import { request } from "../../utils/axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import Container from "../../components/common/Container";
import { BsBookmark } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaUsers } from "react-icons/fa6";
import { AiOutlineArrowDown, AiOutlineClose } from "react-icons/ai";
import { dayMontYearDate } from "../../utils/formatDate";
import useAuthentication from "../../hooks/useAuthentication";
import InputField from "../../components/common/InputField";
import Swal from "sweetalert2";
import { bgColorByCatagories } from "../../components/common/JobCard";
import useTitleSet from "../../hooks/useTitleSet";
import { usePDF } from "react-to-pdf";

const JobDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [applyJobLoading, setApplyJobLoading] = useState(false);
  const { user } = useAuthentication();
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [resume, setResume] = useState("");
  const [applyModalIsOpen, setApplyModalIsOpen] = useState(false);
  useTitleSet("Job Details");
  const form = useRef();
  const { toPDF, targetRef } = usePDF({ filename: "page.pdf" });

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    request
      .get(`/jobs/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleApplyModal = () => {
    if (user?.email === data?.author?.email) {
      return;
    }
    setApplyModalIsOpen((prev) => !prev);
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!resume) {
      Swal.fire({
        icon: "error",
        title: "Resume link is Required!",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const apply = {
      applicantName: name,
      applicantEmail: email,
      applicantResume: resume,
      applicantId: user?.uid,
      jobId: data?._id,
      job: {
        _id: data?._id,
        title: data?.title,
        salary: data?.salary,
        catagories: data?.catagories,
        deadline: data?.deadline,
        applicants: data?.applicants,
        createAt: data?.createAt,
        author: data?.author,
      },
    };
    setApplyJobLoading(true);
    request
      .post("/apply", apply, {
        withCredentials: true,
      })
      .then((response) => {
        setApplyJobLoading(false);

        console.log("Response data:", response.data);
        handleApplyModal();
        Swal.fire({
          icon: "success",
          title: "Apply Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setResume("");
      })
      .catch((error) => {
        setApplyJobLoading(false);
        console.error("Error:", error);
      });
  };

  const date1 = new Date();
  const date2 = new Date(data?.deadline);

  let dateLineOver = false;

  if (date1 < date2 || date1 == date2) {
    dateLineOver = false;
  } else if (date1 > date2) {
    dateLineOver = true;
  }

  return loading ? (
    <Loader hight="h-[600px]" />
  ) : (
    <div ref={targetRef}>
      <Container>
        <div className="h-[250px] md:h-[400px] w-full text-zinc-700">
          <img
            src={data?.bannerUrl}
            alt=""
            className="h-[250px] md:h-[400px] w-full opacity-90"
          />
        </div>
        <div className="py-8">
          <div className=" flex justify-start items-start gap-4  ">
            <img
              src={data?.author?.avatar}
              alt=""
              className=" w-16 h-16 rounded-full"
            />
            <div className=" w-full">
              <div className=" flex justify-between items-center  w-full">
                <h1 className="text-xl md:text-4xl font-semibold">
                  {data?.title}
                </h1>
                <BsBookmark className=" text-3xl cursor-auto" />
              </div>
              <h5 className=" text-xl text-zinc-500">{data?.author?.name}</h5>
            </div>
          </div>

          <div className=" mt-5 flex flex-col gap-2 uppercase">
            <div className=" text-zinc-500 flex justify-start gap-3 items-center text-2xl ">
              <MdDateRange className=" text-3xl" />
              <span className="text-base font-normal">Posting : </span>
              <span className="text-sm font-normal">
                {dayMontYearDate(data?.createAt)}
              </span>
            </div>
            <div className=" text-zinc-500 flex justify-start gap-3 items-center text-2xl ">
              <MdDateRange className=" text-3xl" />
              <span className="text-base font-normal">Deadline : </span>
              <span className="text-sm font-normal">
                {dayMontYearDate(data?.deadline)}
              </span>
            </div>
            <div className=" text-zinc-500 flex justify-start gap-3 items-center text-2xl ">
              <FcMoneyTransfer className=" text-3xl" />
              <span className="text-base font-normal">Salary : </span>
              <span className="text-sm font-normal">{data?.salary}</span>
            </div>
            <div className=" text-zinc-500 flex justify-start gap-3 items-center text-2xl ">
              <FaUsers className=" text-3xl" />
              <span className="text-base font-normal">Applicants : </span>
              <span className="text-sm font-normal">{data?.applicants}</span>
              <span
                className={`text-xs  font-semibold py-1 px-3 ${
                  bgColorByCatagories[data?.catagories]
                }`}>
                {data?.catagories}
              </span>
            </div>

            <div className=" flex justify-start items-center gap-5">
              {!dateLineOver ? (
                <button
                  onClick={handleApplyModal}
                  disabled={user?.email === data?.author?.email}
                  className={` ${
                    user?.email === data?.author?.email
                      ? "text-green-100 border-green-100 cursor-not-allowed"
                      : "text-green-500 border-green-500"
                  } w-fit px-3 md:px-5 py-1 md:py-2 text-sm md:text-md  font-semibold rounded-md border-[2px]  `}>
                  Apply Now
                </button>
              ) : (
                <span className=" text-red-500 text-sm font-semibold uppercase">
                  dateline over
                </span>
              )}
              <button
                onClick={() => toPDF()}
                className="font-semibold hover:text-green-500 duration-300 transition-colors text-orange-500 flex justify-start items-center gap-1 text-sm">
                <AiOutlineArrowDown className=" text-xl " />
                Download Summary
              </button>
            </div>
          </div>
          <h5 className="mt-8 uppercase text-xl text-zinc-700 font-semibold">
            description :
          </h5>
          <h5 className="mt-4">{data?.description}</h5>
        </div>
      </Container>

      {applyModalIsOpen && (
        <div className=" fixed top-0 left-0 right-0 h-screen bg-[#1a1a1b2a]">
          <div className=" flex w-full h-full justify-center items-center">
            <div className=" bg-white p-5 rounded-lg z-50 min-w-[500px]">
              <div className=" border-b-2 pb-4 flex justify-between w-full items-center">
                <h1 className=" text-xl font-semibold text-zinc-700">
                  Apply Job
                </h1>
                <AiOutlineClose
                  onClick={handleApplyModal}
                  className=" text-2xl hover:text-green-500 cursor-pointer duration-300 transition-colors"
                />
              </div>

              <form ref={form} onSubmit={handleApply} className="mt-3">
                <InputField
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  value={name}
                />
                <InputField
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  value={email}
                />
                <InputField
                  onChange={(e) => setResume(e.target.value)}
                  label="resume Link"
                  value={resume}
                  type="url"
                />

                <button
                  disabled={applyJobLoading}
                  className=" text-white text-md font-semibold bg-green-500 px-4 py-2 w-full">
                  {applyJobLoading && (
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"></path>
                    </svg>
                  )}{" "}
                  Apply {applyJobLoading && "..."}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
