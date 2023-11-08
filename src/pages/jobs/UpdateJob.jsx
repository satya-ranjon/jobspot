import { useEffect, useState } from "react";
import { request } from "../../utils/axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/common/Loader";
import InputField from "../../components/common/InputField";
import Select from "react-select";
import DatePicker from "react-datepicker";
import Container from "../../components/common/Container";
import Swal from "sweetalert2";
import useTitleSet from "../../hooks/useTitleSet";

const options = [
  { value: "On Site", label: "On Site" },
  { value: "Remote", label: "Remote" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Part Time", label: "Part Time" },
];

const UpdateJob = () => {
  const [loadingInitialData, setLoadingInitialData] = useState(false);
  const [bannerUrl, setBannerUrl] = useState("");
  const [title, setTitle] = useState("");
  const [salary, setSalary] = useState("");
  const [catagories, setCatagories] = useState(null);
  const [deadline, setDeadline] = useState(new Date());
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useTitleSet("Update Job");

  const { id } = useParams();

  useEffect(() => {
    setLoadingInitialData(true);
    request
      .get(`/jobs/${id}`)
      .then((res) => {
        setBannerUrl(res.data?.bannerUrl);
        setTitle(res.data?.title);
        setSalary(res.data?.salary);
        setDeadline(new Date(res.data?.deadline));
        setDescription(res.data?.description);
        setCatagories({
          value: res.data?.catagories,
          label: res.data?.catagories,
        });
        setLoadingInitialData(false);
      })
      .catch((error) => {
        setLoadingInitialData(false);
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const updateData = {
      bannerUrl,
      title,
      salary,
      catagories: catagories?.value,
      deadline,
      description,
    };
    request
      .put(`/updatejob/${id}`, updateData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Response data:", response.data);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Job Update Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return loadingInitialData ? (
    <Loader />
  ) : (
    <div>
      <Container>
        <form onSubmit={handleSubmit} className=" my-14 flex flex-col gap-5">
          <InputField
            required
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            label="Job banner Url"
            type="url"
            placeholder=""
          />
          <InputField
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Job title"
          />
          <InputField
            required
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            label="Salary range"
          />
          <div>
            <label className="block text-md font-semibold leading-6 text-zinc-950 uppercase mb-2">
              Select Catagories
            </label>
            <Select
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  borderColor: state.isFocused ? "#22c55e" : "#ced2d8",
                  padding: ".3rem",
                }),
              }}
              defaultValue={catagories}
              onChange={setCatagories}
              options={options}
            />
          </div>
          <div>
            <label className="block text-md font-semibold leading-6 text-zinc-950 uppercase mb-2">
              Application Deadline
            </label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
            />
          </div>

          <InputField
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Job Description"
            textarea={true}
          />
          <button
            disabled={loading}
            className=" bg-green-500 text-md text-white p-2 rounded-md font-semibold flex justify-center items-center gap-3">
            {loading && (
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
            )}
            Post a Job {loading && "..."}
          </button>
        </form>
      </Container>
    </div>
  );
};

export default UpdateJob;
