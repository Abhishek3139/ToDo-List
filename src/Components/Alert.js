import React, { useEffect } from "react";

function Alert({ type, msg, showAlert }) {
  useEffect(() => {
    const timeOut = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeOut);
  }, []);
  return <p className={`alert alert-${type}`}>{msg}</p>;
}

export default Alert;
