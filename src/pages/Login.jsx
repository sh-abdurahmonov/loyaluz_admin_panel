import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
// import axiosClient from "../axios-client";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const usernameRef = useRef();
  const passwordRef = useRef();
  // Submit form function
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      phone_number: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    // POST
    axios
      .post("https://api.dezinfeksiyatashkent.uz/api/auth/signin", payload)
      .then((res) => {
        if (res.data.success === true) {
          console.log(res.data);
          navigate("/categories");
          localStorage.setItem(
            "ACCESS_TOKEN",
            res?.data?.data?.tokens?.accessToken?.token
          );
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
          console.error("Login failed: ", res?.data?.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };
  // function for showing password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className="container h-screen  mx-auto">
      <div className="flex p-3 flex-auto mx-auto h-screen  flex-row">
        <div className="xl:basis-1/3 lg:basis-2/3 md:basis-8/12 basis-full mx-auto h-fit self-center drop-shadow-xl rounded-md bg-white p-6">
          <h4 className="text-2xl pb-2 font-bold text-gray-500">Login</h4>
          <p className="text-lg pb-5 font-normal text-gray-500">
            Enter your username and password to log in
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                id="username"
                ref={usernameRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Username"
                required
              />
            </div>
            <div className="mb-6 relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                ref={passwordRef}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Password"
                required
              />
              <div className="absolute top-1/3 right-0 pr-3 flex items-center text-lg leading-5">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 duration-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 text-center"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
