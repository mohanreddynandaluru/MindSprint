import React, { useState } from "react";
import { PiHandsPraying } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../slice/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("testuser7");
  const [email, setEmail] = useState("test7@gmail.com");
  const [password, setPassword] = useState("123");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          "http://localhost:4000/api/auth/register",
          {
            username,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log("SignUp successful:", response.data);
          dispatch(setUser(response.data.data));
          return navigate("/");
        })
        .catch((error) => {
          console.error("SignUp failed:", error);
        });
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  return (
    <>
      <div className="h-[90vh] text-center flex items-center justify-center">
        <div className="login-container flex flex-col items-center justify-center gap-3 max-w-[600px] p-10 h-[80vh] bg-base-200 rounded-2xl shadow-lg">
          <PiHandsPraying className="text-3xl" />
          <h1 className="text-3xl font-bold">
            Join us, <i>Sign Up</i>
          </h1>

          <div>
            <p className="text-md text-start  m-2">Username</p>
            <input
              type="text"
              placeholder="Username"
              className="input rounded-2xl h-[45px] w-[300px]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <button
            className="btn text-white border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black"
            onClick={handleSignUp}
          >
            Sign Up with Email
          </button>
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-600 hover:text-amber-50">
              Login
            </Link>
          </p>
          <hr className="w-[300px] text-white" />
          <button
            className="btn hover:text-white hover:border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl bg-[#e5e5e5] text-black hover:bg-black"
            onClick={handleSignUp}
          >
            Go with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default SignUp;
