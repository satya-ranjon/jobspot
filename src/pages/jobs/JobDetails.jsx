import { useEffect, useRef, useState } from "react";
import { request } from "../../utils/axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import Container from "../../components/common/Container";
import { BsBookmark } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaUsers } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { dayMontYearDate } from "../../utils/formatDate";
import useAuthentication from "../../hooks/useAuthentication";
import InputField from "../../components/common/InputField";
import Swal from "sweetalert2";
import { bgColorByCatagories } from "../../components/common/JobCard";
import useTitleSet from "../../hooks/useTitleSet";
import emailjs from "@emailjs/browser";

const JobDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthentication();
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);
  const [resume, setResume] = useState("");
  const [applyModalIsOpen, setApplyModalIsOpen] = useState(false);
  useTitleSet("Job Details");
  const form = useRef();

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
    request
      .post("/apply", apply, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response data:", response.data);
        handleApplyModal();
        emailjs
          .sendForm(
            "service_6sq35us",
            "template_xjvpamt",
            form.current,
            "3ubMgALnbHWBTu2Mw"
          )
          .then(
            (result) => {
              console.log(result.text);
            },
            (error) => {
              console.log(error.text);
            }
          );

        Swal.fire({
          icon: "success",
          title: "Apply Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
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
    <div>
      <div className="h-[400px] w-full text-zinc-700">
        <img
          src={data?.bannerUrl}
          alt=""
          className=" h-[400px] w-full opacity-90"
        />
      </div>
      <Container>
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
            {!dateLineOver ? (
              <button
                onClick={handleApplyModal}
                disabled={user?.email === data?.author?.email}
                className={` ${
                  user?.email === data?.author?.email
                    ? "text-green-100 border-green-100"
                    : "text-green-500 border-green-500"
                } w-fit px-5 py-2 text-md  font-semibold rounded-md border-[2px]  `}>
                Apply Now
              </button>
            ) : (
              <span className=" text-red-500 text-sm font-semibold uppercase">
                dateline over
              </span>
            )}
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

                <button className=" text-white text-md font-semibold bg-green-500 px-4 py-2 w-full">
                  apply
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
