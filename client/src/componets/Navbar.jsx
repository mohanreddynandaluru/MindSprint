import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiBrainLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../util/constants";
import { removeUser } from "../slice/userSlice";

const Navbar = () => {
  const username = useSelector((state) => state.user?.username);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handlelogout = async () => {
    try {
      axios.get(BASE_URL + "/api/auth/logout", { withCredentials: true });
      await dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

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
          <div>
            <Link className="btn btn-ghost text-xl p-1" to={"/profile"}>
              {username}
            </Link>
            <button
              className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black"
              onClick={handlelogout}
            >
              logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
