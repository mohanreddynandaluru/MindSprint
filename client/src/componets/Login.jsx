import React, { useEffect } from "react";
import { PiHandsPraying } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../util/constants";

const Login = () => {
  const [email, setEmail] = useState("test1@gmail.com");
  const [password, setPassword] = useState("123");
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      axios
        .post(
          BASE_URL + "/api/auth/login",
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("Login successful:", response.data);
          dispatch(setUser(response.data.data));
          return navigate("/");
        })
        .catch((err) => {
          seterror(err?.response?.data?.message);
          console.error(error);
        });
    } catch (err) {
      seterror(err?.response?.data?.message);
      console.error("An error occurred during login:", err);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="h-[90vh] text-center flex items-center justify-center">
        <div className="login-container flex flex-col items-center justify-center gap-3 max-w-[600px] p-10 h-[70vh] bg-base-200 rounded-2xl shadow-lg">
          <PiHandsPraying className="text-3xl" />
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <h1 className="text-xl">Login</h1>
          <div>
            <p className="text-md text-start  m-2">Email ID</p>
            <input
              type="email"
              placeholder="Email"
              className="input rounded-2xl h-[45px] w-[300px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <p className="text-md text-start  m-2">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="input rounded-2xl h-[45px] w-[300px]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error}</p>
          <button
            className="btn text-white border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black"
            onClick={handleLogin}
          >
            Login with Email
          </button>
          <hr className="w-[300px] text-white" />
          <button
            className="btn hover:text-white hover:border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl bg-[#e5e5e5] text-black hover:bg-black"
            onClick={handleLogin}
          >
            Go with Google
          </button>

          <p className="text-sm">
            {" "}
            Don't have an account?{" "}
            <Link to="/signup" className="text-gray-600 hover:text-amber-50">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
