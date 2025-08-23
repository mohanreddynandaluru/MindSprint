import React, { useEffect, useState } from "react";
import Navbar from "../componets/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../util/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../slice/userSlice";
import Toast from "../componets/toast";

const Body = () => {
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/auth/profile", {
          withCredentials: true,
        });
        // console.log(res.data);

        dispatch(setUser(res.data.data));
      } catch (err) {
        console.log(err);
        if (
          err.response.status === 401 &&
          location.pathname !== "/signup" &&
          location.pathname !== "/login"
        ) {
          setToast(true);
          setToastMessage("Login is must and should");
          setTimeout(() => {
            setToast(false);
          }, 3000);
          return navigate("/login");
        }
      }
    };
    if (!user) {
      fetchUser();
    }
  }, [dispatch, navigate, user]);
  return (
    <>
      <Navbar />
      {toast && <Toast message={toastMessage} />}
      <Outlet />
    </>
  );
};

export default Body;
