import React from "react";

const Toast = ({ message }) => {
  return (
    <div>
      <div className="toast toast-top toast-start mt-20">
        <div className="alert alert-success">
          <span>{message}.</span>
        </div>
      </div>
    </div>
  );
};

export default Toast;
