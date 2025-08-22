import React from "react";
import { Link } from "react-router-dom";
import { PiBrainLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const username = useSelector((state) => state.user?.username);

  return (
    <>
      <div className="navbar bg-base-200 shadow-sm flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link className="btn btn-ghost text-xl p-1" to={"/"}>
            <PiBrainLight className="text-3xl" />
            MindSprint
          </Link>
        </div>
        {username == null ? (
          <div className="flex gap-2.5">
            <Link to="/login">
              <button className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black">
                LogIn
              </button>
            </Link>
            <Link to="/signup">
              <button className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black">
                SignUp
              </button>
            </Link>
          </div>
        ) : (
          <Link className="btn btn-ghost text-xl p-1" to={"/profile"}>
            {username}
          </Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
