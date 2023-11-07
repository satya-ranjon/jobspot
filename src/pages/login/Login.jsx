import { Link, useLocation, useNavigate } from "react-router-dom";
import Form from "../../components/form/Form";
import { useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import Swal from "sweetalert2";
import AuthLayout from "../../layout/AuthLayout";

const Login = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuthentication();

  const { state } = useLocation();
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const { email, password } = data;
    setError(null);
    setLoading(true);
    login(email, password)
      .then((result) => {
        setError(null);
        setSuccess(true);
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "You Have Successfully Login!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(state ? state : "/");
      })
      .catch((error) => {
        setError("Your email and password doesn't match");
      });
  };

  if (user?.email) {
    return navigate("/");
  }
  return (
    <AuthLayout title="Login in to your account ">
      <Form
        btnLabel="Sign in"
        handleSubmit={handleSubmit}
        success={success}
        error={error}
        loading={loading}
      />
      <p className="mt-10 text-center text-sm text-gray-500">
        If you don't have an account...
        <Link
          to="/registration"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Create Account
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;
