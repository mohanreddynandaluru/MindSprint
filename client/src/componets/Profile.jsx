import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../util/constants";
import { setUser } from "../slice/userSlice";
import Toast from "./toast";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState(user?.username);
  const [disabled, setDisabled] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const handleEdit = async () => {
    if (disabled == true) {
      return setDisabled(false);
    }
    try {
      const user = await axios.patch(
        BASE_URL + "/api/auth/update",
        {
          username,
        },
        { withCredentials: true }
      );
      setToast(true);
      setToastMessage("username updated successfull");
      dispatch(setUser(user.data.data));
      setTimeout(() => {
        setToast(false);
        setToastMessage("");
      }, 3000);
    } catch (err) {
      console.log("error in profile update");
      console.log(err);
    } finally {
      setDisabled(true);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 m-10">
      <div>
        <h1>Username: {user?.username || "username"}</h1>
        <h1>Email: {user?.email || "email"}</h1>
      </div>

      <div>
        <p className="text-md text-start  m-2">Username</p>
        <input
          type="text"
          placeholder="Username"
          className="input rounded-2xl h-[45px] w-[300px]"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={disabled}
        />
      </div>
      <button
        className="btn text-white border-[#e5e5e5] h-[37px] w-[100px] text-center rounded-2xl hover:bg-[#e5e5e5] hover:text-black"
        onClick={handleEdit}
      >
        Edit
      </button>
      {toast && <Toast message={toastMessage} />}
    </div>
  );
};

export default Profile;
