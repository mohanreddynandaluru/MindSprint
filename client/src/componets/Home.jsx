import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const navigateToCreate = () => {
    navigate("/create");
  };
  return (
    <div>
      <button
        className="btn hover:text-white hover:border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl bg-[#e5e5e5] text-black hover:bg-black"
        onClick={navigateToCreate}
      >
        Create a Quiz
      </button>
      <button
        className="btn hover:text-white hover:border-[#e5e5e5] h-[45px] w-[300px] text-center rounded-2xl bg-[#e5e5e5] text-black hover:bg-black"
        onClick={navigateToCreate}
      >
        Attempt a Quiz
      </button>
    </div>
  );
};

export default Home;
