import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import Swal from "sweetalert2";
import AuthLayout from "../../layout/AuthLayout";
import useTitleSet from "../../hooks/useTitleSet";

const Registration = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registration, updateUserProfile } = useAuthentication();

  const { state } = useLocation();
  const navigate = useNavigate();

  useTitleSet("Registration");

  const handleSubmit = (data) => {
    const { email, password, name, photoUrl } = data;
    setError(null);

    if (!name) {
      setError("Provide your name!");
      return;
    } else if (!photoUrl) {
      setError("Provide your profile picture url!");
      return;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      setError("Provide valid email");
      return;
    } else if (password.length < 6) {
      setError("password is less than 6 characters");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setError("password doesn't have a capital letter");
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(password)) {
      setError("password don't have a special character");
      return;
    }
    setLoading(true);
    registration(email, password)
      .then((result) => {
        setError(null);
        updateUserProfile(name, photoUrl)
          .then((res) => {
            setError(null);
            setLoading(false);
            setSuccess(true);
            Swal.fire({
              icon: "success",
              title: "Your Account Create Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate(state ? state : "/");
          })
          .catch((error) => {
            setError(error.code);
          });
      })
      .catch((error) => {
        setError(error.code);
      });
  };
  return (
    <AuthLayout title="Create your account ">
      <Form
        btnLabel="Registration"
        handleSubmit={handleSubmit}
        success={success}
        error={error}
        loading={loading}
      />
      <p className="mt-10 text-center text-sm text-gray-500">
        If have an account...
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Login
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Registration;
