import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ErrorContext } from "../../context/ErrorContext";
export const ToastErrors = () => {
  const { error } = useContext(ErrorContext);

  useEffect(() => {
    if (error) {
      toast.error(
        <>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
        </>
      );
    }
  }, [error]);

  return (
    <div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};
