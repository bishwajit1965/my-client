import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../shared/socialLogin/SocialLogin";

const Login = () => {
  const { userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [show, setShow] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    userLogin(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>Summer camp yoga || Login</title>
      </Helmet>
      <div className="flex justify-center items-center h-screen">
        <div className="w-96 rounded-xl shadow-lg p-6 bg-white">
          <h1 className="text-2xl font-bold mb-6 text-center text-indigo-500">
            Login
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="password"
              >
                Email
              </label>
              <input
                type="text"
                {...register("email", { required: true })}
                name="email"
                placeholder="Email..."
                className="input input-bordered h-8 mb-2"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.email?.type === "required" && (
                <p className="text-red-600 text-xs mt-" role="alert">
                  Email is required
                </p>
              )}
            </div>
            <div className="form-control">
              <label
                className="block text-gray-700 font-bold"
                htmlFor="password"
              >
                Password
              </label>

              <input
                type={show ? "text" : "password"}
                name="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 20,
                })}
                placeholder="Password..."
                className="input input-bordered h-8"
                aria-invalid={errors.password ? "true" : "false"}
              />
              {errors.password?.type === "required" && (
                <p className="text-red-600 text-xs mt-1 italic" role="alert">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-600 text-xs mt-1 italic" role="alert">
                  Password should be at least 6 chars.
                </p>
              )}
              {errors.password?.type === "maxLength" && (
                <p className="text-red-600 text-xs mt-1 italic" role="alert">
                  Password max length is 20 chars.
                </p>
              )}
              <p
                className="text-indigo-500 font-bold italic mt-2"
                onClick={() => setShow(!show)}
              >
                <small>
                  {show ? (
                    <span className="cursor-pointer">Hide Password</span>
                  ) : (
                    <span className="cursor-pointer">Show Password</span>
                  )}
                </small>
              </p>
            </div>
            <label className="label">
              <div className="label-text-alt link link-hover my-2">
                <Link className="text-indigo-500" to="/register">
                  <span className="text-indigo-500">
                    <i> New to this site ? </i>
                  </span>
                  <span className="text-indigo-500">
                    <i> Create New Account </i>
                  </span>
                </Link>
              </div>
            </label>
            <div className="w-full">
              <button className="btn btn-primary btn-sm w-full" type="submit">
                Log In
              </button>
            </div>

            <div className="flex items-center justify-between my-1">
              <span> ----------------- </span>
              <span>OR</span>
              <span> ----------------- </span>
            </div>
            <div className="w-full">
              <span className="flex items-center justify-center text-indigo-500">
                <small>
                  <i>Sign in with Google</i>
                </small>
              </span>
            </div>
          </form>
          <SocialLogin />
        </div>
      </div>
    </>
  );
};

export default Login;
