import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SocialLogin from "./SocialLogin";
import { useLocation } from "react-router-dom";

const Form = ({
  btnLabel,
  handleSubmit,
  success = false,
  error,
  loading = false,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const inputRef = useRef(null);

  useLayoutEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const { pathname } = useLocation();

  const handleFormData = (e) => {
    e.preventDefault();
    handleSubmit({ email, password, name, photoUrl });
  };

  useEffect(() => {
    if (success) {
      setEmail("");
      setPassword("");
      setName("");
      setPhotoUrl("");
    }
  }, [success]);

  return (
    <>
      <div className=" h-6 text-red-400">{error}</div>

      <form
        onSubmit={handleFormData}
        className="space-y-6"
        action="#"
        method="POST">
        {pathname == "/registration" && (
          <>
            <div className="relative float-label-input">
              <input
                ref={inputRef}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                id="name"
                required
                className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-green-400"
              />
              <label
                htmlFor="name"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">
                Name
              </label>
            </div>
            <div className="relative float-label-input">
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                id="urlimg"
                placeholder=""
                type="url"
                required
                className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-green-400"
              />
              <label
                htmlFor="urlimg"
                className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">
                Photo URL
              </label>
            </div>
          </>
        )}

        <div className="relative float-label-input">
          <input
            ref={pathname === "/login" ? inputRef : null}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="email"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">
            Email address
          </label>
        </div>
        <div className="relative float-label-input">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-md py-3 px-3 block appearance-none leading-normal focus:border-green-400"
          />
          <label
            htmlFor="email"
            className="absolute top-3 left-0 text-gray-400 pointer-events-none transition duration-200 ease-in-outbg-white px-2 text-grey-darker">
            Password
          </label>
        </div>

        <div>
          <button
            disabled={loading}
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600  items-center">
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
            {btnLabel ? btnLabel : "Sign in"}
            {loading && "..."}
          </button>
        </div>
      </form>

      <SocialLogin />
    </>
  );
};

export default Form;
