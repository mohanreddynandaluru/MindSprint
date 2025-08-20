import React from "react";
import { Link } from "react-router-dom";
import { PiBrainLight } from "react-icons/pi";
const Navbar = () => {
  return (
    <>
      <div className="navbar bg-base-200 shadow-sm flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link className="btn btn-ghost text-xl p-1" to={"/"}>
            <PiBrainLight className="text-3xl" />
            MindSprint
          </Link>
        </div>

        <div className="flex gap-2.5">
          <Link to="/login">
            <button className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black">
              LogIn
            </button>
          </Link>
          <Link to="/login">
            <button className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black">
              SignUp
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
