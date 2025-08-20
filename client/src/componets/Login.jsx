import React from "react";
import { PiHandsPraying } from "react-icons/pi";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="h-[90vh] text-center flex items-center justify-center">
        <div className="login-container flex flex-col items-center justify-center gap-6 max-w-[600px] p-10 h-[70vh] bg-base-200 rounded-2xl shadow-lg">
          <PiHandsPraying className="text-3xl" />
          <h1 className="text-3xl font-bold">Welcome back</h1>

          <h1 className="text-xl">Login</h1>
          <input
            type="email"
            placeholder="Email"
            className="input rounded-2xl h-[45px] w-[300px] text-center"
          />
          <input
            type="password"
            placeholder="Password"
            className="input rounded-2xl h-[45px] w-[300px] text-center"
          />
          <button className="btn text-white border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black">
            Login with Email
          </button>

          <p className="text-sm">
            {" "}
            Don't have an account?{" "}
            <Link to="/" className="text-gray-600 hover:text-amber-50">
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
